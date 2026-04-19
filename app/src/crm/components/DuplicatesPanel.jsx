import { useState, useMemo } from 'react'
import { bulkAction } from '../utils/api'

export function DuplicatesPanel({ rows, source, secret, onBulkDone, onClose, showToast }) {
  const [selected, setSelected] = useState([])

  // Agrupa por email ou telefone
  const groups = useMemo(() => {
    const byEmail = {}
    const byPhone = {}
    rows.forEach((r) => {
      if (r.email) {
        const k = r.email.toLowerCase().trim()
        if (!byEmail[k]) byEmail[k] = []
        byEmail[k].push(r)
      }
      if (r.phone) {
        const k = r.phone.replace(/\D/g, '')
        if (!byPhone[k]) byPhone[k] = []
        byPhone[k].push(r)
      }
    })
    const seen = new Set()
    const result = []
    const addGroup = (leads, label) => {
      if (leads.length < 2) return
      const key = leads.map((l) => l.id).sort().join('_')
      if (seen.has(key)) return
      seen.add(key)
      result.push({ label, leads })
    }
    Object.entries(byEmail).forEach(([k, v]) => addGroup(v, `email: ${k}`))
    Object.entries(byPhone).forEach(([k, v]) => addGroup(v, `tel: ${k}`))
    return result
  }, [rows])

  function toggle(id) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  function copyEmails() {
    const emails = rows.filter((r) => selected.includes(r.id) && r.email).map((r) => r.email).join('\n')
    navigator.clipboard.writeText(emails).then(() => showToast('Emails copiados!'))
  }

  async function handleDelete() {
    if (!selected.length) return
    if (!window.confirm(`Excluir ${selected.length} lead(s) duplicado(s)?`)) return
    try {
      await bulkAction(secret, { ids: selected, source, action: 'delete' })
      onBulkDone('delete', selected)
      showToast(`✓ ${selected.length} lead(s) excluído(s)`)
      setSelected([])
      onClose()
    } catch { showToast('Erro ao excluir') }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-2xl max-h-[80vh] flex flex-col bg-surface border border-surface-light rounded-2xl shadow-gold">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-light">
          <h2 className="font-bold text-foreground">Duplicatas ({groups.length} grupos)</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground text-xl leading-none">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {groups.length === 0 && (
            <p className="text-muted text-sm text-center py-8">Nenhuma duplicata encontrada.</p>
          )}
          {groups.map((g, gi) => (
            <div key={gi} className="bg-background rounded-xl border border-surface-light p-4">
              <p className="text-xs text-muted mb-3 font-medium uppercase tracking-wide">{g.label}</p>
              <div className="space-y-2">
                {g.leads.map((lead) => (
                  <label key={lead.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selected.includes(lead.id)}
                      onChange={() => toggle(lead.id)}
                      className="accent-gold w-4 h-4"
                    />
                    <span className="text-sm text-foreground group-hover:text-gold transition-colors">
                      {lead.full_name}
                    </span>
                    <span className="text-xs text-muted">{lead.email}</span>
                    <span className="text-xs text-muted">{lead.phone}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-surface-light">
          <span className="text-sm text-muted">{selected.length} selecionado(s)</span>
          <div className="flex gap-2">
            <button
              onClick={copyEmails}
              disabled={!selected.length}
              className="px-4 py-2 text-sm rounded-lg bg-surface-light text-foreground hover:border-gold/40 transition-colors disabled:opacity-40"
            >
              📋 Copiar emails
            </button>
            <button
              onClick={handleDelete}
              disabled={!selected.length}
              className="px-4 py-2 text-sm rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-colors disabled:opacity-40"
            >
              🗑 Excluir selecionados
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
