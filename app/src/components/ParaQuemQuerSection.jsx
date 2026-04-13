import { TechLabel, SinglePaneSVG } from './Decorations'

const itens = [
  { code: 'OBJ.01', text: 'parar de viver apenas de obra pequena' },
  { code: 'OBJ.02', text: 'estruturar uma empresa de verdade' },
  { code: 'OBJ.03', text: 'aumentar o faturamento da vidraçaria' },
  { code: 'OBJ.04', text: 'construir uma operação profissional' },
]

/** A glass pane card with window-grid motif */
function GlassPaneCard({ code, text }) {
  return (
    <div className="group relative overflow-hidden border border-gold/12 bg-surface hover:border-gold/30 transition-all duration-300 rounded-sm glass-shine">
      {/* Window pane grid inside card — decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Vertical mullion */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/4" />
        {/* Horizontal rail */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/4" />
        {/* Corner bolts */}
        <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-gold/15" />
        <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-gold/15" />
        <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-gold/15" />
        <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-gold/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 flex items-start gap-4">
        {/* Check icon in a gold frame */}
        <div className="flex-shrink-0 w-9 h-9 border border-gold/25 bg-gold/6 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/12 transition-all duration-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <span className="block text-[9px] font-bold tracking-[0.2em] uppercase text-gold/35 font-mono mb-1">
            {code}
          </span>
          <span className="text-muted text-sm md:text-base font-medium leading-snug group-hover:text-foreground transition-colors duration-200">
            {text}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ParaQuemQuerSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Decorative single-pane window — right side background */}
      <SinglePaneSVG
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 w-32 md:w-48 h-auto pointer-events-none"
        opacity={0.06}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <TechLabel className="mb-6 mx-auto w-fit block">REF. EM-003 · Perfil do participante</TechLabel>

        <h2 className="text-2xl md:text-4xl font-bold mb-12 leading-tight text-center">
          Este evento é{' '}
          <span className="underline-gold">
            <span className="gradient-text-gold">para quem quer:</span>
          </span>
        </h2>

        {/* Glass panel cards — 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {itens.map((item) => (
            <GlassPaneCard key={item.code} code={item.code} text={item.text} />
          ))}
        </div>

        {/* Closing — with weld seam style bottom accent */}
        <div className="text-center space-y-3 py-8 border-t border-b border-surface-light/50 relative">
          {/* Top measurement line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 -translate-y-1/2" aria-hidden>
            <div className="w-8 h-px bg-gold/30" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="w-8 h-px bg-gold/30" />
          </div>
          <p className="text-white text-base md:text-lg font-semibold">E principalmente…</p>
          <p className="text-muted text-base md:text-lg leading-relaxed font-medium">
            deixar de ser um vidraceiro travado
            <br />
            para se tornar um{' '}
            <span className="gradient-text-gold font-bold">Vidraceiro High Ticket</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
