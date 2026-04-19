import { useState } from 'react'
import { STAGES, getStageMeta } from '../utils/stageUtils'
import { updateLead } from '../utils/api'

const PAYMENT_METHODS = ['Cartão', 'Pix', 'TMB', 'Boca a boca']
const QUIZ_LABELS = [
  'Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8','Q9','Q10'
]

export function LeadDetailPanel({ lead, source, secret, onClose, onUpdate }) {
  const [showStageMenu, setShowStageMenu] = useState(false)

  if (!lead) return null

  const stage = getStageMeta(lead.stage)

  async function patch(field, value) {
    try {
      await updateLead(secret, { id: lead.id, source, field, value })
      onUpdate(lead.id, field, value)
    } catch { /* silent */ }
  }

  function togglePayment(method) {
    const current = lead.payment_method || ''
    const parts   = current.split(',').map((s) => s.trim()).filter(Boolean)
    const next    = parts.includes(method)
      ? parts.filter((p) => p !== method)
      : [...parts, method]
    patch('payment_method', next.join(', '))
  }

  const paymentParts = (lead.payment_method || '').split(',').map((s) => s.trim()).filter(Boolean)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md h-full bg-surface border-l border-surface-light flex flex-col shadow-gold overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-light sticky top-0 bg-surface z-10">
          <h2 className="font-bold text-foreground truncate">{lead.full_name || '—'}</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground text-2xl leading-none ml-2">×</button>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Info básica */}
          <div className="space-y-2 text-sm">
            <InfoRow label="Email"    value={lead.email}      />
            <InfoRow label="Telefone" value={lead.phone}      />
            <InfoRow label="Cadastro" value={lead.created_at ? new Date(lead.created_at).toLocaleDateString('pt-BR') : '—'} />
          </div>

          {/* Stage */}
          <div>
            <p className="text-xs text-muted uppercase tracking-wide mb-2">Stage</p>
            <div className="relative inline-block">
              <button
                onClick={() => setShowStageMenu((v) => !v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${stage.color} cursor-pointer`}
              >
                {stage.label} ▾
              </button>
              {showStageMenu && (
                <div className="absolute left-0 top-full mt-1 bg-surface border border-surface-light rounded-xl shadow-gold z-20 py-1 min-w-[140px]">
                  {STAGES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => { patch('stage', s.value); setShowStageMenu(false) }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-surface-light transition-colors text-foreground"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Toggle badges */}
          <div className="flex flex-wrap gap-2">
            <ToggleBadge
              active={lead.starred}
              onToggle={() => patch('starred', !lead.starred)}
              activeClass="bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
              label="⭐ Estrelar"
            />
            <ToggleBadge
              active={lead.archived}
              onToggle={() => patch('archived', !lead.archived)}
              activeClass="bg-blue-500/20 text-blue-300 border-blue-500/30"
              label="📁 Arquivar"
            />
            <ToggleBadge
              active={lead.follow_up_done}
              onToggle={() => patch('follow_up_done', !lead.follow_up_done)}
              activeClass="bg-green-500/20 text-green-300 border-green-500/30"
              label="✅ Follow-up feito"
            />
          </div>

          {/* Método de pagamento */}
          <div>
            <p className="text-xs text-muted uppercase tracking-wide mb-2">Método de pagamento</p>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => togglePayment(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
                    ${paymentParts.includes(m)
                      ? 'bg-gold/20 text-gold border-gold/40'
                      : 'bg-surface-light text-muted border-surface-light hover:border-gold/30'
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Valor contratado e data de pagamento */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted uppercase tracking-wide block mb-1">Valor (R$)</label>
              <input
                type="number"
                defaultValue={lead.payment_value || ''}
                onBlur={(e) => patch('payment_value', e.target.value)}
                placeholder="0,00"
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-surface-light text-foreground
                  focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-muted uppercase tracking-wide block mb-1">Data de pgto</label>
              <input
                type="date"
                defaultValue={lead.payment_date || ''}
                onBlur={(e) => patch('payment_date', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-surface-light text-foreground
                  focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          {/* Quiz */}
          {Array.from({ length: 10 }, (_, i) => `q${i + 1}`).some((k) => lead[k]) && (
            <div>
              <p className="text-xs text-muted uppercase tracking-wide mb-2">Respostas do quiz</p>
              <div className="space-y-2">
                {Array.from({ length: 10 }, (_, i) => {
                  const key = `q${i + 1}`
                  const val = lead[key]
                  if (!val) return null
                  return (
                    <div key={key} className="bg-background rounded-lg p-3">
                      <p className="text-xs text-muted mb-1">{QUIZ_LABELS[i]}</p>
                      <p className="text-sm text-foreground">{val}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-2">
      <span className="text-muted w-20 shrink-0">{label}</span>
      <span className="text-foreground break-all">{value || '—'}</span>
    </div>
  )
}

function ToggleBadge({ active, onToggle, activeClass, label }) {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
        ${active
          ? activeClass
          : 'bg-surface-light text-muted border-surface-light hover:border-gold/30'
        }`}
    >
      {label}
    </button>
  )
}
