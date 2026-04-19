import { useState, useMemo } from 'react'
import { STAGES, getStageMeta } from '../utils/stageUtils'
import { updateLead } from '../utils/api'
import { exportLeadsCSV, exportMetaCSV } from '../utils/csv'
import { BulkToolbar }     from './BulkToolbar'
import { LeadDetailPanel } from './LeadDetailPanel'
import { DuplicatesPanel } from './DuplicatesPanel'

const PAGE_SIZE = 50

export function LeadsView({ rows, source, secret, onUpdate, showToast, currentPage, setCurrentPage }) {
  const [search,      setSearch]      = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [selected,    setSelected]    = useState([])
  const [detailLead,  setDetailLead]  = useState(null)
  const [showDups,    setShowDups]    = useState(false)

  // Stats por stage
  const stats = useMemo(() => {
    const counts = {}
    rows.forEach((r) => { counts[r.stage] = (counts[r.stage] || 0) + 1 })
    return counts
  }, [rows])

  // Filtro
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return rows.filter((r) => {
      const matchSearch = !q || [r.full_name, r.email, r.phone].some((v) => (v || '').toLowerCase().includes(q))
      const matchStage  = !stageFilter || r.stage === stageFilter
      return matchSearch && matchStage
    })
  }, [rows, search, stageFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page       = Math.min(currentPage, totalPages)
  const pageStart  = (page - 1) * PAGE_SIZE
  const pageRows   = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  // Duplicatas
  const dupCount = useMemo(() => {
    const emails = {}, phones = {}, dups = new Set()
    rows.forEach((r) => {
      if (r.email) { const k = r.email.toLowerCase(); if (emails[k]) dups.add(r.id); else emails[k] = r.id }
      if (r.phone) { const k = r.phone.replace(/\D/g,''); if (phones[k]) dups.add(r.id); else phones[k] = r.id }
    })
    return dups.size
  }, [rows])

  function toggleSelect(id) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }
  function toggleAll() {
    const ids = pageRows.map((r) => r.id)
    const allSel = ids.every((id) => selected.includes(id))
    setSelected(allSel ? selected.filter((id) => !ids.includes(id)) : [...new Set([...selected, ...ids])])
  }

  async function toggleStar(e, row) {
    e.stopPropagation()
    try {
      await updateLead(secret, { id: row.id, source, field: 'starred', value: !row.starred })
      onUpdate(row.id, 'starred', !row.starred)
    } catch { showToast('Erro ao atualizar') }
  }

  function handleBulkDone(action, ids, value) {
    if (action === 'delete') {
      ids.forEach((id) => onUpdate(id, '_deleted', true))
    } else if (action === 'set_stage')    ids.forEach((id) => onUpdate(id, 'stage', value))
    else if (action === 'set_starred')    ids.forEach((id) => onUpdate(id, 'starred', value))
    else if (action === 'set_archived')   ids.forEach((id) => onUpdate(id, 'archived', value))
    else if (action === 'set_follow_up')  ids.forEach((id) => onUpdate(id, 'follow_up_done', value))
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Stats */}
      <div className="flex flex-wrap gap-2">
        <StatCard label="Total" count={rows.length} />
        {STAGES.map((s) => (
          <StatCard key={s.value} label={s.label} count={stats[s.value] || 0} color={s.color} />
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
          placeholder="Buscar por nome, email ou telefone…"
          className="flex-1 min-w-[200px] px-4 py-2 text-sm rounded-xl bg-surface border border-surface-light
            text-foreground placeholder:text-muted/50 focus:outline-none focus:border-gold/50 transition-colors"
        />
        <select
          value={stageFilter}
          onChange={(e) => { setStageFilter(e.target.value); setCurrentPage(1) }}
          className="px-3 py-2 text-sm rounded-xl bg-surface border border-surface-light text-foreground
            focus:outline-none focus:border-gold/50 transition-colors"
        >
          <option value="">Todos os stages</option>
          {STAGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <button
          onClick={() => exportLeadsCSV(filtered, source)}
          className="px-3 py-2 text-xs rounded-xl bg-surface border border-surface-light text-muted hover:text-foreground hover:border-gold/30 transition-colors"
        >⬇ CSV</button>
        <button
          onClick={() => exportMetaCSV(filtered)}
          className="px-3 py-2 text-xs rounded-xl bg-surface border border-surface-light text-muted hover:text-foreground hover:border-gold/30 transition-colors"
        >📊 Meta CSV</button>
        <button
          onClick={() => setShowDups(true)}
          className="relative px-3 py-2 text-xs rounded-xl bg-surface border border-surface-light text-muted hover:text-foreground hover:border-gold/30 transition-colors"
        >
          🔍 Duplicatas
          {dupCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              {dupCount}
            </span>
          )}
        </button>
      </div>

      {/* Bulk toolbar */}
      <BulkToolbar
        selectedIds={selected}
        source={source}
        secret={secret}
        onClear={() => setSelected([])}
        onBulkDone={handleBulkDone}
        showToast={showToast}
      />

      {/* Tabela */}
      <div className="bg-surface border border-surface-light rounded-2xl overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-light">
                <Th><input type="checkbox" onChange={toggleAll} className="accent-gold" /></Th>
                <Th>⭐</Th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Stage</Th>
                <Th>Cadastro</Th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr><td colSpan={7} className="py-12 text-center text-muted">Nenhum lead encontrado.</td></tr>
              )}
              {pageRows.map((row) => {
                const stageMeta = getStageMeta(row.stage)
                const isArch    = row.archived
                const isSel     = selected.includes(row.id)
                return (
                  <tr
                    key={row.id}
                    onClick={() => setDetailLead(row)}
                    className={`border-b border-surface-light last:border-0 cursor-pointer transition-colors
                      hover:bg-surface-light
                      ${isArch ? 'opacity-40' : ''}
                      ${isSel  ? 'bg-gold/5' : ''}`}
                  >
                    <Td onClick={(e) => { e.stopPropagation(); toggleSelect(row.id) }}>
                      <input type="checkbox" checked={isSel} onChange={() => toggleSelect(row.id)} className="accent-gold" />
                    </Td>
                    <Td>
                      <button
                        onClick={(e) => toggleStar(e, row)}
                        className={`text-base transition-opacity ${row.starred ? 'opacity-100' : 'opacity-20 hover:opacity-60'}`}
                      >⭐</button>
                    </Td>
                    <Td><span className="font-medium text-foreground">{row.full_name || '—'}</span></Td>
                    <Td><span className="text-muted">{row.email || '—'}</span></Td>
                    <Td><span className="text-muted">{row.phone || '—'}</span></Td>
                    <Td>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${stageMeta.color}`}>
                        {stageMeta.label}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-muted text-xs">
                        {row.created_at ? new Date(row.created_at).toLocaleDateString('pt-BR') : '—'}
                      </span>
                    </Td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filtered.length)} de {filtered.length}</span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1.5 rounded-lg bg-surface border border-surface-light hover:border-gold/40 transition-colors disabled:opacity-30"
          >←</button>
          <button
            disabled={page >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg bg-surface border border-surface-light hover:border-gold/40 transition-colors disabled:opacity-30"
          >→</button>
        </div>
      </div>

      {/* Detail panel */}
      {detailLead && (
        <LeadDetailPanel
          lead={rows.find((r) => r.id === detailLead.id) || detailLead}
          source={source}
          secret={secret}
          onClose={() => setDetailLead(null)}
          onUpdate={(id, field, value) => {
            onUpdate(id, field, value)
            setDetailLead((prev) => prev ? { ...prev, [field]: value } : prev)
          }}
        />
      )}

      {/* Duplicatas panel */}
      {showDups && (
        <DuplicatesPanel
          rows={rows}
          source={source}
          secret={secret}
          onBulkDone={handleBulkDone}
          onClose={() => setShowDups(false)}
          showToast={showToast}
        />
      )}
    </div>
  )
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide whitespace-nowrap">
      {children}
    </th>
  )
}
function Td({ children, onClick }) {
  return (
    <td className="px-4 py-3 whitespace-nowrap" onClick={onClick}>
      {children}
    </td>
  )
}
function StatCard({ label, count, color }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-surface border border-surface-light rounded-xl">
      {color && <span className={`w-2 h-2 rounded-full inline-block ${color.split(' ')[0].replace('/20','')}`} />}
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-bold text-foreground">{count}</span>
    </div>
  )
}
