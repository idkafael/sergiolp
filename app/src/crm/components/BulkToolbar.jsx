import { STAGES } from '../utils/stageUtils'
import { bulkAction } from '../utils/api'

export function BulkToolbar({ selectedIds, source, secret, onClear, onBulkDone, showToast }) {
  if (!selectedIds.length) return null

  async function doAction(action, value) {
    try {
      await bulkAction(secret, { ids: selectedIds, source, action, value })
      onBulkDone(action, selectedIds, value)
      showToast(`✓ Ação aplicada a ${selectedIds.length} lead(s)`)
      onClear()
    } catch (err) {
      showToast('Erro ao executar ação em massa')
      console.error(err)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Excluir ${selectedIds.length} lead(s)? Essa ação não pode ser desfeita.`)) return
    await doAction('delete')
  }

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl">
      <span className="text-sm font-medium text-gold">{selectedIds.length} selecionado(s)</span>
      <div className="w-px h-5 bg-gold/30 hidden sm:block" />

      {/* Mudar stage */}
      <select
        defaultValue=""
        onChange={(e) => { if (e.target.value) doAction('set_stage', e.target.value) }}
        className="px-3 py-1.5 text-xs rounded-lg bg-surface border border-surface-light text-foreground
          focus:outline-none focus:border-gold/50 cursor-pointer"
      >
        <option value="" disabled>Mover para…</option>
        {STAGES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <button
        onClick={() => doAction('set_starred', true)}
        className="px-3 py-1.5 text-xs rounded-lg bg-surface border border-surface-light text-foreground hover:border-gold/40 transition-colors"
      >⭐ Estrelar</button>
      <button
        onClick={() => doAction('set_archived', true)}
        className="px-3 py-1.5 text-xs rounded-lg bg-surface border border-surface-light text-foreground hover:border-gold/40 transition-colors"
      >📁 Arquivar</button>
      <button
        onClick={() => doAction('set_follow_up', true)}
        className="px-3 py-1.5 text-xs rounded-lg bg-surface border border-surface-light text-foreground hover:border-gold/40 transition-colors"
      >✅ Follow-up feito</button>
      <button
        onClick={handleDelete}
        className="px-3 py-1.5 text-xs rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-colors"
      >🗑 Excluir</button>
      <button
        onClick={onClear}
        className="px-3 py-1.5 text-xs rounded-lg text-muted hover:text-foreground transition-colors"
      >Cancelar</button>
    </div>
  )
}
