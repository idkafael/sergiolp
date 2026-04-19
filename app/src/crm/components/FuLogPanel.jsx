export function FuLogPanel({ lead, fuLog, onClose }) {
  if (!lead) return null

  const log     = fuLog || {}
  const entered = log._entered

  // Gera lista de datas desde _entered até hoje
  const dates = []
  if (entered) {
    const todayStr = new Date().toISOString().slice(0, 10)
    let cur = new Date(entered + 'T12:00:00')
    const end = new Date(todayStr + 'T12:00:00')
    while (cur <= end) {
      dates.push(cur.toISOString().slice(0, 10))
      cur.setDate(cur.getDate() + 1)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-sm bg-surface border border-surface-light rounded-2xl shadow-gold">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-light">
          <h3 className="font-bold text-foreground">Log de Follow-up</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground text-xl">×</button>
        </div>
        <div className="px-5 py-3 border-b border-surface-light">
          <p className="text-sm font-medium text-foreground">{lead.full_name || lead.name || '—'}</p>
          <p className="text-xs text-muted mt-0.5">
            Entrou em Follow Up: {entered
              ? new Date(entered + 'T12:00:00').toLocaleDateString('pt-BR')
              : '—'}
          </p>
        </div>
        <div className="max-h-72 overflow-y-auto p-5 space-y-2">
          {dates.length === 0
            ? <p className="text-muted text-sm text-center py-4">Sem registros.</p>
            : [...dates].reverse().map((d) => {
                const val = log[d]
                const done = val === true
                const miss = val === false || (val == null && d !== new Date().toISOString().slice(0,10))
                return (
                  <div key={d} className="flex items-center gap-3">
                    <span className="text-lg">{done ? '✅' : '❌'}</span>
                    <span className="text-sm text-foreground">
                      {new Date(d + 'T12:00:00').toLocaleDateString('pt-BR')}
                    </span>
                    <span className={`text-xs ml-auto ${done ? 'text-green-400' : 'text-red-400'}`}>
                      {done ? 'Feito' : 'Pendente'}
                    </span>
                  </div>
                )
              })
          }
        </div>
      </div>
    </div>
  )
}
