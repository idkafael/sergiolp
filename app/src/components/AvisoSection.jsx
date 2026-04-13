import { TechLabel } from './Decorations'

const itens = [
  { code: 'C.01', text: 'crescer' },
  { code: 'C.02', text: 'estruturar empresa' },
  { code: 'C.03', text: 'aumentar faturamento' },
  { code: 'C.04', text: 'e construir algo grande no setor.' },
]

export function AvisoSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Industrial hatch background — full section */}
      <div className="absolute inset-0 bg-hatch opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Stencil-style warning header */}
        <div className="mb-10">
          {/* Top caution stripe */}
          <div className="flex items-center gap-0 mb-6 overflow-hidden rounded-sm" style={{ height: '8px' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-full"
                style={{
                  background: i % 2 === 0 ? 'rgba(201,152,26,0.55)' : 'rgba(8,8,8,0.8)',
                  transform: 'skewX(-20deg)',
                }}
              />
            ))}
          </div>

          <div className="flex items-start gap-4">
            {/* Warning triangle — metalwork style */}
            <div className="flex-shrink-0 mt-1">
              <svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M18 2 L34 30 L2 30 Z" stroke="#C9981A" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M18 12 L18 21" stroke="#C9981A" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="18" cy="25.5" r="1.5" fill="#C9981A" />
              </svg>
            </div>

            <div>
              <TechLabel className="mb-2">Aviso · Restrição de acesso</TechLabel>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                Esse evento não é para{' '}
                <span className="text-muted font-medium">qualquer vidraceiro.</span>
              </h2>
            </div>
          </div>

          {/* Bottom caution stripe */}
          <div className="flex items-center gap-0 mt-6 overflow-hidden rounded-sm" style={{ height: '8px' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-full"
                style={{
                  background: i % 2 === 0 ? 'rgba(201,152,26,0.55)' : 'rgba(8,8,8,0.8)',
                  transform: 'skewX(-20deg)',
                }}
              />
            ))}
          </div>
        </div>

        <p className="text-white text-base md:text-lg font-semibold mb-6">
          É exclusivo para quem quer:
        </p>

        {/* Criteria list — industrial spec style */}
        <div className="space-y-0 border border-gold/12 bg-surface/50 divide-y divide-gold/8 mb-10 max-w-md">
          {itens.map((item) => (
            <div key={item.code} className="flex items-center gap-0">
              <div className="px-4 py-3.5 border-r border-gold/10 bg-background/30 min-w-[64px]">
                <span className="text-[9px] font-bold tracking-widest text-gold/50 font-mono">{item.code}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5 flex-1">
                <div className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                <span className="text-muted text-sm md:text-base font-medium">{item.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 border-l-4 border-gold/50 bg-gold/4">
          <p className="text-muted text-sm md:text-base leading-relaxed font-medium">
            Se você está comprometido com a transformação do seu negócio,{' '}
            <span className="text-white font-semibold">este evento foi feito para você</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
