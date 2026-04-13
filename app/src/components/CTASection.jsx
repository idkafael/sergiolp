import { TechLabel } from './Decorations'

/** Large window frame SVG for dramatic background decoration */
function LargeWindowFrame() {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[480px] h-auto pointer-events-none"
      opacity={0.055}
      aria-hidden
    >
      {/* Outer structural frame */}
      <rect x="2" y="2" width="316" height="416" stroke="#C9981A" strokeWidth="4" />
      {/* Inner bevel */}
      <rect x="14" y="14" width="292" height="392" stroke="#C9981A" strokeWidth="1" strokeOpacity="0.5" />

      {/* Vertical center mullion */}
      <rect x="155" y="14" width="10" height="392" fill="#C9981A" fillOpacity="0.15" />
      <line x1="160" y1="14" x2="160" y2="406" stroke="#C9981A" strokeWidth="3" />

      {/* Horizontal rails — upper third and lower third */}
      <rect x="14" y="146" width="292" height="8" fill="#C9981A" fillOpacity="0.1" />
      <line x1="14" y1="150" x2="306" y2="150" stroke="#C9981A" strokeWidth="2" />

      <rect x="14" y="264" width="292" height="8" fill="#C9981A" fillOpacity="0.1" />
      <line x1="14" y1="268" x2="306" y2="268" stroke="#C9981A" strokeWidth="2" />

      {/* Joints */}
      {[
        [14, 14], [306, 14], [14, 406], [306, 406],
        [160, 14], [160, 406], [14, 150], [306, 150],
        [14, 268], [306, 268],
        [160, 150], [160, 268],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i < 4 ? 5 : 3.5} fill="#C9981A" fillOpacity={i < 4 ? 0.5 : 0.35} />
      ))}

      {/* Glass pane shimmer lines */}
      {[
        [20, 20, 80, 60], [20, 156, 80, 196], [20, 274, 80, 314],
        [166, 20, 226, 60], [166, 156, 226, 196], [166, 274, 226, 314],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1.5" strokeOpacity="0.05" />
      ))}

      {/* Dimension annotation lines */}
      <line x1="2" y1="-20" x2="318" y2="-20" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.4" />
      <line x1="2" y1="-16" x2="2" y2="-24" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.4" />
      <line x1="318" y1="-16" x2="318" y2="-24" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.4" />
      <text x="160" y="-22" textAnchor="middle" fill="#C9981A" fillOpacity="0.4" fontSize="8" fontFamily="monospace">1200mm</text>

      <line x1="-20" y1="2" x2="-20" y2="418" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.4" />
      <line x1="-16" y1="2" x2="-24" y2="2" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.4" />
      <line x1="-16" y1="418" x2="-24" y2="418" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.4" />
      <text x="-22" y="212" textAnchor="middle" fill="#C9981A" fillOpacity="0.4" fontSize="8" fontFamily="monospace" transform="rotate(-90 -22 212)">1600mm</text>
    </svg>
  )
}

export function CTASection() {
  return (
    <section className="relative py-24 md:py-40 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Blueprint grid — very subtle */}
      <div className="absolute inset-0 bg-blueprint opacity-25 pointer-events-none" />

      {/* The large window frame as background decoration */}
      <LargeWindowFrame />

      {/* Radial glow through the "glass" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <TechLabel className="mb-6 block mx-auto w-fit">REF. EM-007 · Chamada para ação</TechLabel>

        <p className="text-gold/60 text-xs font-bold tracking-[0.25em] uppercase font-mono mb-5">
          Não deixe para depois
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-[1.1]">
          Comece agora a transformar{' '}
          <span className="gradient-text-gold">sua esquadria</span>
        </h2>
        <p className="text-muted text-sm md:text-base mb-12 max-w-lg mx-auto leading-relaxed font-medium">
          Junte-se a centenas de empresários que já estão faturando mais e construindo
          negócios sólidos com o método Esquadria Milionária.
        </p>

        {/* CTA button — industrial square style */}
        <div className="inline-block relative group">
          {/* Corner brackets on button */}
          {[
            'absolute -top-2 -left-2 w-3 h-3',
            'absolute -top-2 -right-2 w-3 h-3 rotate-90',
            'absolute -bottom-2 -left-2 w-3 h-3 -rotate-90',
            'absolute -bottom-2 -right-2 w-3 h-3 rotate-180',
          ].map((cls, i) => (
            <svg key={i} className={`${cls} text-gold/50 group-hover:text-gold transition-colors duration-300`} viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M0 12 L0 0 L12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          ))}
          <a
            href="#oferta"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold text-background bg-gold hover:bg-gold-light active:scale-[0.98] transition-all duration-200 shadow-[0_4px_32px_rgba(201,152,26,0.35)] hover:shadow-[0_4px_48px_rgba(201,152,26,0.55)] uppercase tracking-wider"
          >
            Quero entrar no Esquadria Milionária
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        <p className="text-muted/40 text-[10px] mt-8 font-mono tracking-wider uppercase">
          Evento Online e Gratuito · Vagas Limitadas
        </p>
      </div>
    </section>
  )
}
