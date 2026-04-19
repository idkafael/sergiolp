import { useState, useEffect, useRef, useCallback } from 'react'
import { KB_STAGES } from '../utils/stageUtils'
import { bulkAction } from '../utils/api'
import {
  getKbStages, setKbStages, getOffers, setOffers,
  getAssign,   setAssign,   getGuests, setGuests,
  getFuLog,    setFuLog,
} from '../utils/storage'
import { KanbanColumn } from './KanbanColumn'

const DEFAULT_OFFERS = [
  { id: 'offer_1', name: 'Corpo Musical' },
  { id: 'offer_2', name: 'Date fora do comum' },
  { id: 'offer_3', name: 'Profissionais Musicais' },
]

function todayStr() { return new Date().toISOString().slice(0, 10) }

export function KanbanView({ organic, ads, secret, showToast }) {
  const [kbSource,     setKbSource]     = useState('organic')
  const [kbStages,     setKbStagesState] = useState({})
  const [offers,       setOffersState]  = useState([])
  const [assign,       setAssignState]  = useState({})
  const [guests,       setGuestsState]  = useState([])
  const [fuLog,        setFuLogState]   = useState({})
  const [activeOffer,  setActiveOffer]  = useState(null)
  const [kbSearch,     setKbSearch]     = useState('')
  const [newColSearch, setNewColSearch] = useState('')
  const [showGuestModal, setShowGuestModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [newOfferName,   setNewOfferName]   = useState('')
  const [guestInput,     setGuestInput]     = useState('')
  const dragRow = useRef(null)

  // ── Mount ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const storedOffers = getOffers()
    setOffersState(storedOffers.length ? storedOffers : DEFAULT_OFFERS)
    if (!storedOffers.length) setOffers(DEFAULT_OFFERS)
    setAssignState(getAssign())
    setGuestsState(getGuests())
    setKbStagesState(getKbStages())
    const log = getFuLog()
    setFuLogState(log)
    backfillFuLog(log)
  }, [])

  // ── backfill fu_log ──────────────────────────────────────────────────────
  function backfillFuLog(log = null) {
    const fuData = log || getFuLog()
    const today  = todayStr()
    let changed  = false
    Object.entries(fuData).forEach(([key, entry]) => {
      if (!entry._entered) return
      const entered = entry._entered
      let cur = new Date(entered + 'T12:00:00')
      const end = new Date(today + 'T12:00:00')
      while (cur < end) {
        const d = cur.toISOString().slice(0, 10)
        if (!(d in entry)) { entry[d] = false; changed = true }
        cur.setDate(cur.getDate() + 1)
      }
    })
    if (changed) {
      setFuLog(fuData)
      setFuLogState({ ...fuData })
    }
  }

  // ── Leads da fonte ativa ─────────────────────────────────────────────────
  const sourceRows = kbSource === 'organic' ? organic : ads
  const allLeads   = [
    ...sourceRows.map((r) => ({ ...r, _source: kbSource })),
    ...guests,
  ]

  function getLeadStage(lead) {
    const key = `${lead._source || kbSource}_${lead.id}`
    return kbStages[key] || 'novo'
  }
  function getLeadKey(lead) {
    return `${lead._source || kbSource}_${lead.id}`
  }

  // ── Filtro geral ─────────────────────────────────────────────────────────
  const filteredLeads = kbSearch
    ? allLeads.filter((l) => {
        const q = kbSearch.toLowerCase()
        return [l.full_name, l.name, l.email, l.phone].some((v) => (v||'').toLowerCase().includes(q))
      })
    : allLeads

  // ── Cards por coluna ─────────────────────────────────────────────────────
  function getCards(stage) {
    return filteredLeads.filter((l) => {
      const s = getLeadStage(l)
      if (s !== stage) return false
      // Filtro de oferta — apenas fora da coluna 'novo'
      if (activeOffer && stage !== 'novo') {
        const key = getLeadKey(l)
        return assign[key] === activeOffer
      }
      return true
    })
  }

  // ── Mover card ───────────────────────────────────────────────────────────
  function moveCard(lead, newStage) {
    const key     = getLeadKey(lead)
    const updated = { ...kbStages, [key]: newStage }
    setKbStagesState(updated)
    setKbStages(updated)

    // Registra _entered ao entrar em 'proposta'
    if (newStage === 'proposta') {
      const log = getFuLog()
      if (!log[key] || !log[key]._entered) {
        const today = todayStr()
        log[key] = { ...(log[key] || {}), _entered: today }
        setFuLog(log)
        setFuLogState({ ...log })
      }
    }

    // Sync API em background
    if (lead._source !== 'guest') {
      const src = lead._source || kbSource
      bulkAction(secret, { ids: [lead.id], source: src, action: 'set_stage', value: newStage }).catch(() => {})
    }
  }

  // ── Follow-up toggle ─────────────────────────────────────────────────────
  function handleFuToggle(lead) {
    const key    = getLeadKey(lead)
    const today  = todayStr()
    const log    = getFuLog()
    const entry  = log[key] || {}
    entry[today] = !entry[today]
    log[key]     = entry
    setFuLog(log)
    setFuLogState({ ...log })
    showToast(entry[today] ? '✓ Follow-up marcado' : 'Follow-up desmarcado')
  }

  // ── Drag & drop ──────────────────────────────────────────────────────────
  function handleDragStart(e, lead) {
    dragRow.current = lead
    e.dataTransfer.effectAllowed = 'move'
  }
  function handleDropCard(targetStage) {
    if (dragRow.current) {
      moveCard(dragRow.current, targetStage)
      dragRow.current = null
    }
  }

  // ── Ofertas ───────────────────────────────────────────────────────────────
  function createOffer() {
    if (!newOfferName.trim()) return
    const offer = { id: crypto.randomUUID(), name: newOfferName.trim() }
    const next  = [...offers, offer]
    setOffersState(next)
    setOffers(next)
    setNewOfferName('')
    setShowOfferModal(false)
    showToast(`Oferta "${offer.name}" criada`)
  }
  function deleteOffer(id) {
    if (!window.confirm('Excluir esta oferta?')) return
    const next = offers.filter((o) => o.id !== id)
    setOffersState(next)
    setOffers(next)
    if (activeOffer === id) setActiveOffer(null)
  }

  // ── Convidadas ────────────────────────────────────────────────────────────
  function addGuests() {
    const lines = guestInput.split(/[\n,]+/).map((l) => l.trim()).filter(Boolean)
    const newGuests = []
    lines.forEach((line, i) => {
      const parts = line.split(',').map((p) => p.trim())
      newGuests.push({
        id:      `g_${Date.now()}_${i}`,
        name:    parts[0] || '',
        email:   parts[1] || '',
        phone:   parts[2] || '',
        _source: 'guest',
      })
    })
    const next = [...guests, ...newGuests]
    setGuestsState(next)
    setGuests(next)
    setGuestInput('')
    setShowGuestModal(false)
    showToast(`${newGuests.length} convidada(s) adicionada(s)`)
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Controles superiores */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Toggle fonte */}
        <div className="flex rounded-xl border border-surface-light overflow-hidden">
          {[['organic','🌱 Orgânico'], ['ads','📢 Anúncios']].map(([k,l]) => (
            <button
              key={k}
              onClick={() => setKbSource(k)}
              className={`px-4 py-2 text-sm font-medium transition-colors
                ${kbSource === k ? 'bg-gold text-background' : 'text-muted hover:text-foreground'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Busca geral */}
        <input
          type="search"
          value={kbSearch}
          onChange={(e) => setKbSearch(e.target.value)}
          placeholder="Buscar leads…"
          className="flex-1 min-w-[180px] px-4 py-2 text-sm rounded-xl bg-surface border border-surface-light
            text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold/50 transition-colors"
        />

        {/* Botão + convidada */}
        <button
          onClick={() => setShowGuestModal(true)}
          className="px-4 py-2 text-sm rounded-xl bg-surface border border-surface-light text-muted hover:text-foreground hover:border-gold/30 transition-colors"
        >+ Convidada</button>
      </div>

      {/* Abas de ofertas */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setActiveOffer(null)}
          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors
            ${!activeOffer ? 'bg-gold/20 text-gold border-gold/40' : 'bg-surface text-muted border-surface-light hover:border-gold/30'}`}
        >Todas</button>
        {offers.map((o) => (
          <div key={o.id} className="flex items-center gap-1">
            <button
              onClick={() => setActiveOffer(activeOffer === o.id ? null : o.id)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors
                ${activeOffer === o.id ? 'bg-gold/20 text-gold border-gold/40' : 'bg-surface text-muted border-surface-light hover:border-gold/30'}`}
            >{o.name}</button>
            <button
              onClick={() => deleteOffer(o.id)}
              className="text-muted hover:text-red-400 text-xs transition-colors"
            >×</button>
          </div>
        ))}
        <button
          onClick={() => setShowOfferModal(true)}
          className="px-3 py-1.5 text-xs rounded-lg bg-surface border border-dashed border-surface-light text-muted hover:border-gold/30 hover:text-foreground transition-colors"
        >+ Oferta</button>
      </div>

      {/* Board */}
      <div className="flex gap-3 overflow-x-auto pb-4 flex-1">
        {KB_STAGES.map((s) => (
          <KanbanColumn
            key={s.value}
            stage={s.value}
            cards={getCards(s.value)}
            onDropCard={handleDropCard}
            onDragStart={handleDragStart}
            fuLog={fuLog}
            onFuToggle={handleFuToggle}
            assign={assign}
            offers={offers}
            newColSearch={newColSearch}
            setNewColSearch={setNewColSearch}
          />
        ))}
      </div>

      {/* Modal nova oferta */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-sm bg-surface border border-surface-light rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-foreground">Nova oferta</h3>
            <input
              type="text"
              value={newOfferName}
              onChange={(e) => setNewOfferName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createOffer()}
              placeholder="Nome da oferta"
              autoFocus
              className="w-full px-4 py-2 text-sm rounded-xl bg-background border border-surface-light text-foreground
                placeholder:text-muted/40 focus:outline-none focus:border-gold/50 transition-colors"
            />
            <div className="flex gap-2">
              <button onClick={createOffer} className="flex-1 py-2 rounded-xl bg-gold text-background text-sm font-bold">Criar</button>
              <button onClick={() => setShowOfferModal(false)} className="flex-1 py-2 rounded-xl bg-surface-light text-muted text-sm">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal convidadas */}
      {showGuestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-md bg-surface border border-surface-light rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-foreground">Adicionar convidadas</h3>
            <p className="text-xs text-muted">Uma por linha: <code className="bg-surface-light px-1 rounded">nome, email, telefone</code> (email e telefone opcionais)</p>
            <textarea
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              rows={6}
              placeholder={"Ana Silva, ana@email.com, (11) 99999-9999\nBruna Santos"}
              className="w-full px-4 py-3 text-sm rounded-xl bg-background border border-surface-light text-foreground
                placeholder:text-muted/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
            />
            <div className="flex gap-2">
              <button onClick={addGuests} className="flex-1 py-2 rounded-xl bg-gold text-background text-sm font-bold">Adicionar</button>
              <button onClick={() => setShowGuestModal(false)} className="flex-1 py-2 rounded-xl bg-surface-light text-muted text-sm">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
