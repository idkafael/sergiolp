import { useState } from 'react'
import { KanbanCard }      from './KanbanCard'
import { getKbStageMeta }  from '../utils/stageUtils'

export function KanbanColumn({
  stage, cards, onDropCard,
  fuLog, onFuToggle, onDragStart,
  assign, offers,
  newColSearch, setNewColSearch,
}) {
  const [isDragOver, setIsDragOver] = useState(false)
  const meta = getKbStageMeta(stage)

  const displayed = stage === 'novo' && newColSearch
    ? cards.filter((c) => {
        const q = newColSearch.toLowerCase()
        return [c.full_name, c.name, c.email, c.phone].some((v) => (v||'').toLowerCase().includes(q))
      })
    : cards

  return (
    <div
      className={`flex flex-col min-w-[230px] w-[230px] shrink-0 rounded-2xl border transition-colors
        ${isDragOver ? 'border-gold/50 bg-gold/5' : 'border-surface-light bg-surface'}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragOver(false); onDropCard(stage) }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-surface-light">
        <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${meta.color}`}>
          {meta.label}
        </span>
        <span className="text-xs text-muted font-medium">{cards.length}</span>
      </div>

      {/* Search exclusiva da coluna NOVO */}
      {stage === 'novo' && (
        <div className="px-2 pt-2">
          <input
            type="search"
            value={newColSearch}
            onChange={(e) => setNewColSearch(e.target.value)}
            placeholder="Buscar novo…"
            className="w-full px-3 py-1.5 text-xs rounded-lg bg-background border border-surface-light
              text-foreground placeholder:text-muted/40 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
      )}

      {/* Cards */}
      <div className="flex flex-col gap-2 p-2 overflow-y-auto max-h-[calc(100vh-280px)]">
        {displayed.length === 0 && (
          <p className="text-center text-muted text-xs py-6">Vazio</p>
        )}
        {displayed.map((lead) => {
          const key      = `${lead._source || 'organic'}_${lead.id}`
          const offerId  = assign[key]
          const offer    = offerId ? offers.find((o) => o.id === offerId) : null
          const leadFu   = fuLog[key] || {}

          return (
            <KanbanCard
              key={lead.id}
              lead={lead}
              stage={stage}
              fuLog={leadFu}
              offerName={offer?.name}
              onDragStart={(e) => onDragStart(e, lead)}
              onFuToggle={() => onFuToggle(lead)}
            />
          )
        })}
      </div>
    </div>
  )
}
