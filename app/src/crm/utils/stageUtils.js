// ─── Stage definitions ───────────────────────────────────────────────────────

export const STAGES = [
  { value: 'novo',        label: 'Novo',        color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
  { value: 'contatado',   label: 'Contatado',   color: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' },
  { value: 'interessado', label: 'Interessado', color: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
  { value: 'follow_up',   label: 'Follow Up',   color: 'bg-orange-500/20 text-orange-300 border border-orange-500/30' },
  { value: 'fechado',     label: 'Fechado',     color: 'bg-green-500/20 text-green-300 border border-green-500/30' },
  { value: 'perdido',     label: 'Perdido',     color: 'bg-red-500/20 text-red-300 border border-red-500/30' },
]

// Kanban usa "proposta" no lugar de "follow_up" (localStorage-only)
export const KB_STAGES = [
  { value: 'novo',        label: 'Novo',        color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
  { value: 'contatado',   label: 'Contatado',   color: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' },
  { value: 'interessado', label: 'Interessado', color: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
  { value: 'proposta',    label: 'Follow Up',   color: 'bg-orange-500/20 text-orange-300 border border-orange-500/30' },
  { value: 'fechado',     label: 'Fechado',     color: 'bg-green-500/20 text-green-300 border border-green-500/30' },
  { value: 'perdido',     label: 'Perdido',     color: 'bg-red-500/20 text-red-300 border border-red-500/30' },
]

export function getStageMeta(value) {
  return STAGES.find((s) => s.value === value) || STAGES[0]
}

export function getKbStageMeta(value) {
  return KB_STAGES.find((s) => s.value === value) || KB_STAGES[0]
}
