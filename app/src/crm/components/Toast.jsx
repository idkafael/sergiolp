export function Toast({ toast }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-xl
        bg-surface border border-gold/40 text-foreground text-sm font-medium shadow-gold
        transition-all duration-300
        ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      {toast.message}
    </div>
  )
}
