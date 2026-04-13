import { TechLabel, CornerBrackets, IBeamDivider } from './Decorations'

const stats = [
  { code: 'EXP', value: '25+', label: 'anos de experiência', unit: 'anos' },
  { code: 'FAT', value: '50M+', label: 'em faturamento gerado', unit: 'BRL' },
  { code: 'EMP', value: '100+', label: 'empresários mentorados', unit: 'clientes' },
]

export function SergioLimaSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gold/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <TechLabel className="mb-8 block">REF. EM-004 · Instrutor</TechLabel>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* Photo — in a window frame shape */}
          <div className="flex-shrink-0 self-center lg:self-start">
            {/* Outer frame decoration */}
            <div className="relative">
              {/* Frame rails — top and bottom horizontal I-beams */}
              <div className="absolute -top-3 left-0 right-0 h-3 flex flex-col justify-between" aria-hidden>
                <div className="h-px w-full bg-gold/40" />
                <div className="h-px w-full bg-gold/20" />
              </div>
              <div className="absolute -bottom-3 left-0 right-0 h-3 flex flex-col justify-between" aria-hidden>
                <div className="h-px w-full bg-gold/20" />
                <div className="h-px w-full bg-gold/40" />
              </div>

              {/* Side column marks */}
              <div className="absolute -left-3 top-0 bottom-0 w-3 flex flex-row justify-between" aria-hidden>
                <div className="w-px h-full bg-gold/40" />
                <div className="w-px h-full bg-gold/20" />
              </div>
              <div className="absolute -right-3 top-0 bottom-0 w-3 flex flex-row justify-between" aria-hidden>
                <div className="w-px h-full bg-gold/20" />
                <div className="w-px h-full bg-gold/40" />
              </div>

              {/* Corner joints — bolt-like */}
              {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-2 h-2 border border-gold/60 bg-background`} aria-hidden />
              ))}

              {/* Photo — tall rectangle (portrait window frame shape) */}
              <div className="relative w-[200px] h-[250px] md:w-[260px] md:h-[320px] overflow-hidden border border-gold/25 isolate glass-shine">
                <img
                  src="/images/IMG_4691.JPEG"
                  alt="Sérgio Lima — mentor Esquadria Milionária"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-top"
                  style={{ imageRendering: '-webkit-optimize-contrast', transform: 'translateZ(0)' }}
                />
                {/* Vignette bottom */}
                <div className="absolute inset-0 shadow-[inset_0_-80px_60px_rgba(8,8,8,0.7)]" />
                {/* Horizontal rail across middle — like a window rail */}
                <div className="absolute left-0 right-0 border-b border-gold/10 pointer-events-none" style={{ top: '55%' }} aria-hidden />
              </div>
            </div>

            {/* Profile code below photo */}
            <div className="mt-4 text-center">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-gold/30 font-mono">
                SL · Perfil Técnico · 2026
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Sérgio <span className="gradient-text-gold">Lima</span>
            </h2>

            <div className="space-y-4 text-muted text-sm md:text-base leading-relaxed mb-10">
              <p>
                Empresário, mentor e especialista no mercado de esquadrias com mais de 25 anos de
                experiência no setor. Fundou e escalou sua própria empresa de esquadrias,
                transformando um pequeno negócio local em uma referência regional.
              </p>
              <p>
                Ao longo de sua trajetória, desenvolveu métodos exclusivos de gestão, vendas e
                operação que já ajudaram{' '}
                <span className="text-gold font-semibold">centenas de empresários</span> do ramo a
                multiplicarem seus faturamentos e construírem negócios sólidos e lucrativos.
              </p>
              <p>
                Hoje, através da mentoria{' '}
                <span className="text-gold-light font-semibold">Esquadria Milionária</span>, Sérgio
                compartilha todo o conhecimento acumulado em anos de prática, entregando um passo a
                passo claro para quem quer transformar sua esquadria em uma verdadeira máquina de
                faturamento.
              </p>
            </div>

            {/* Stats — styled as a "Ficha Técnica" (product spec sheet) */}
            <div className="border border-gold/12 bg-surface/50 divide-y divide-gold/8 max-w-sm mx-auto lg:mx-0">
              {/* Spec sheet header */}
              <div className="px-4 py-2 bg-background/50 flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold/40 font-mono">
                  Ficha Técnica · Indicadores
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
              </div>
              {/* Spec rows */}
              {stats.map((stat) => (
                <div key={stat.code} className="flex items-stretch">
                  <div className="px-3 py-3 border-r border-gold/10 bg-background/30 w-14 flex items-center justify-center">
                    <span className="text-[8px] font-bold tracking-widest text-gold/40 font-mono">{stat.code}</span>
                  </div>
                  <div className="flex-1 px-4 py-3 flex items-center gap-3">
                    <span className="text-xl md:text-2xl font-extrabold gradient-text-gold leading-none">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted font-medium leading-tight max-w-[120px]">
                      {stat.label}
                    </span>
                  </div>
                  <div className="px-3 py-3 border-l border-gold/10 flex items-center">
                    <span className="text-[8px] text-gold/25 font-mono">{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
