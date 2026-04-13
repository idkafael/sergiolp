import { AnimatedCard } from './AnimatedCard'
import { LeadForm } from './LeadForm'
import { CornerBrackets, TechLabel, WindowFrameSVG } from './Decorations'

export function OfertaSection({ onSubmit }) {
  return (
    <section id="oferta" className="relative py-20 md:py-32 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />

      {/* Decorative window frame — large, centered, very faint */}
      <WindowFrameSVG
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] md:w-[340px] h-auto pointer-events-none"
        opacity={0.04}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto">
        <TechLabel className="mb-6 block mx-auto w-fit">REF. EM-005 · Formulário de Inscrição</TechLabel>

        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center leading-tight">
          Garanta sua vaga no Evento{' '}
          <span className="underline-gold">
            <span className="gradient-text-gold">Esquadria Milionária</span>
          </span>
        </h2>
        <p className="text-muted text-sm md:text-base text-center mb-8 font-medium">
          Preencha seus dados e receba o acesso.{' '}
          <span className="text-gold/70">Vagas limitadas.</span>
        </p>

        {/* Form card — architectural corner bracket treatment */}
        <CornerBrackets className="p-1" size={20} opacity={0.5}>
          <AnimatedCard className="p-6 md:p-8" innerBg="bg-surface">

            {/* Document-style header inside card */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-light">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold/40 font-mono">
                  Cadastro · Evento gratuito
                </p>
                <p className="text-white text-sm font-semibold mt-0.5">Esquadria Milionária</p>
              </div>
              {/* Small window frame icon */}
              <div className="opacity-40" aria-hidden>
                <svg viewBox="0 0 28 36" fill="none" width="28" height="36">
                  <rect x="1" y="1" width="26" height="34" stroke="#C9981A" strokeWidth="2"/>
                  <line x1="14" y1="1" x2="14" y2="35" stroke="#C9981A" strokeWidth="1.5"/>
                  <line x1="1" y1="18" x2="27" y2="18" stroke="#C9981A" strokeWidth="1.5"/>
                  <rect x="4" y="4" width="8" height="12" fill="#C9981A" fillOpacity="0.06"/>
                  <rect x="16" y="4" width="9" height="12" fill="#C9981A" fillOpacity="0.06"/>
                  <rect x="4" y="20" width="8" height="13" fill="#C9981A" fillOpacity="0.06"/>
                  <rect x="16" y="20" width="9" height="13" fill="#C9981A" fillOpacity="0.06"/>
                </svg>
              </div>
            </div>

            <LeadForm onSubmit={onSubmit} />

            <p className="text-muted/40 text-[10px] text-center mt-5 font-mono tracking-wider uppercase">
              Evento Online e Gratuito · Vagas Limitadas
            </p>
          </AnimatedCard>
        </CornerBrackets>
      </div>
    </section>
  )
}
