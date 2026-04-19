import { useMemo } from 'react'

function today() { return new Date().toISOString().slice(0, 10) }
function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export function CobrancasView({ organic, ads }) {
  const todayStr = today()
  const in7      = addDays(todayStr, 7)

  const all = useMemo(() => {
    return [...organic, ...ads].filter((r) => r.payment_value && r.payment_date)
  }, [organic, ads])

  const groups = useMemo(() => {
    const vencendo = [], proximos = [], vencidos = []
    all.forEach((r) => {
      if (r.payment_date === todayStr) vencendo.push(r)
      else if (r.payment_date > todayStr && r.payment_date <= in7) proximos.push(r)
      else if (r.payment_date < todayStr) vencidos.push(r)
    })
    return { vencendo, proximos, vencidos }
  }, [all, todayStr, in7])

  function waLink(lead) {
    const phone  = (lead.phone || '').replace(/\D/g, '')
    const valor  = lead.payment_value ? `R$ ${lead.payment_value}` : 'o valor combinado'
    const msg    = encodeURIComponent(`Olá ${lead.full_name || ''}! Passando para lembrar sobre o pagamento de ${valor} referente ao seu curso. 😊`)
    return `https://wa.me/55${phone}?text=${msg}`
  }

  return (
    <div className="space-y-6">
      {/* Banner de alerta */}
      {groups.vencendo.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold text-sm font-medium">
          ⚠️ {groups.vencendo.length} cobrança(s) vence(m) hoje!
        </div>
      )}

      {all.length === 0 && (
        <div className="text-center py-16 text-muted">
          Nenhum lead com pagamento registrado.
        </div>
      )}

      <CobrancaGroup title="🔴 Vencendo hoje"      leads={groups.vencendo} waLink={waLink} emptyMsg="Nenhuma cobrança para hoje." />
      <CobrancaGroup title="🟡 Próximos 7 dias"    leads={groups.proximos} waLink={waLink} emptyMsg="Nenhuma cobrança próxima." />
      <CobrancaGroup title="⚫ Vencidos"           leads={groups.vencidos} waLink={waLink} emptyMsg="Nenhuma cobrança vencida." />
    </div>
  )
}

function CobrancaGroup({ title, leads, waLink, emptyMsg }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-muted uppercase tracking-wide mb-3">{title}</h3>
      {leads.length === 0
        ? <p className="text-muted text-sm">{emptyMsg}</p>
        : (
          <div className="space-y-2">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-surface border border-surface-light rounded-xl"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{lead.full_name}</p>
                  <p className="text-xs text-muted">{lead.email} · {lead.phone}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold text-gold">
                    R$ {Number(lead.payment_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-lg bg-surface-light text-muted border border-surface-light">
                    {new Date(lead.payment_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                  </span>
                  <a
                    href={waLink(lead)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs rounded-lg bg-green-500/20 border border-green-500/30 text-green-300
                      hover:bg-green-500/30 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
