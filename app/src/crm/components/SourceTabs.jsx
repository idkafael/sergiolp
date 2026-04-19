export function SourceTabs({ current, onChange, organicCount, adsCount }) {
  const tabs = [
    { key: 'organic',  label: '🌱 Orgânico',    count: organicCount },
    { key: 'ads',      label: '📢 Anúncios',     count: adsCount },
    { key: 'payments', label: '💳 Cobranças',    count: null },
    { key: 'kanban',   label: '🗂 Kanban',       count: null },
  ]

  return (
    <div className="flex gap-1 border-b border-surface-light overflow-x-auto shrink-0">
      {tabs.map((tab) => {
        const active = current === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
              transition-colors border-b-2 -mb-px
              ${active
                ? 'border-gold text-gold'
                : 'border-transparent text-muted hover:text-foreground hover:border-surface-light'
              }`}
          >
            {tab.label}
            {tab.count != null && (
              <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold
                ${active ? 'bg-gold/20 text-gold' : 'bg-surface-light text-muted'}`}>
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
