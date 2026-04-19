import { useState } from 'react'
import { FuLogPanel } from './FuLogPanel'

export function KanbanCard({ lead, stage, fuLog, onFuToggle, onViewLog, onDragStart, offerName }) {
  const [showLog, setShowLog] = useState(false)
  const todayStr = new Date().toISOString().slice(0, 10)
  const doneTodayFu = fuLog && fuLog[todayStr] === true

  const name  = lead.full_name || lead.name  || '—'
  const email = lead.email || ''
  const phone = lead.phone || ''

  return (
    <>
      <div
        draggable
        onDragStart={onDragStart}
        className="bg-background border border-surface-light rounded-xl p-3 cursor-grab active:cursor-grabbing
          hover:border-gold/30 transition-colors select-none"
      >
        <p className="font-medium text-sm text-foreground truncate">{name}</p>
        {email && <p className="text-xs text-muted mt-0.5 truncate">{email}</p>}
        {phone && <p className="text-xs text-muted truncate">{phone}</p>}

        {offerName && (
          <span className="inline-block mt-2 px-2 py-0.5 text-[10px] rounded-md bg-gold/15 text-gold border border-gold/25 font-medium">
            {offerName}
          </span>
        )}

        {stage === 'proposta' && (
          <div className="mt-2 flex flex-col gap-1.5">
            <button
              onClick={onFuToggle}
              className={`w-full py-1.5 rounded-lg text-xs font-medium border transition-colors
                ${doneTodayFu
                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                  : 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                }`}
            >
              {doneTodayFu ? '✓ Follow-up feito hoje' : '⚠ Marcar follow-up de hoje'}
            </button>
            <button
              onClick={() => setShowLog(true)}
              className="w-full py-1.5 rounded-lg text-xs text-muted border border-surface-light hover:border-gold/30 transition-colors"
            >
              📋 Ver Log
            </button>
          </div>
        )}
      </div>

      {showLog && (
        <FuLogPanel
          lead={lead}
          fuLog={fuLog}
          onClose={() => setShowLog(false)}
        />
      )}
    </>
  )
}
