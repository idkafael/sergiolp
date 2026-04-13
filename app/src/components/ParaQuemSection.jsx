import { TechLabel, MetalProfile, IBeamDivider, CornerBrackets } from './Decorations'

const pilares = [
  {
    code: 'P·G·L — 01',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Lucro',
    spec: 'Controle financeiro',
    desc: 'Precificação correta e controle financeiro que transforma obra em margem real.',
  },
  {
    code: 'P·G·L — 02',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Produtividade',
    spec: 'Gestão de equipe',
    desc: 'Equipe alinhada e processos claros que eliminam retrabalho e gargalos.',
  },
  {
    code: 'P·G·L — 03',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    title: 'Encantamento',
    spec: 'Experiência do cliente',
    desc: 'Experiência de cliente que gera indicações e abre portas para obras maiores.',
  },
]

export function ParaQuemSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Blueprint grid — subtle on this section */}
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <TechLabel className="mb-6 mx-auto w-fit block">REF. EM-002 · Sistema</TechLabel>

        <h2 className="text-2xl md:text-4xl font-bold mb-5 leading-tight text-center">
          O que{' '}
          <span className="underline-gold">
            <span className="gradient-text-gold">mudou tudo</span>
          </span>
        </h2>
        <p className="text-muted text-base md:text-lg font-medium leading-relaxed mb-12 max-w-2xl text-center mx-auto">
          Sérgio estruturou um método baseado em três pilares fundamentais.
        </p>

        {/* PGL header — styled as a technical drawing title block */}
        <div className="mb-10 relative">
          <div className="inline-block border border-gold/20 bg-surface/80">
            <div className="flex items-stretch">
              {/* Left accent bar */}
              <div className="w-1 bg-gold/60 self-stretch" />
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold/50 font-mono mb-0.5">
                  Sistema · Método exclusivo
                </p>
                <p className="text-lg md:text-2xl font-bold gradient-text-gold">
                  PGL: Processo de Geração de Lucro
                </p>
                <p className="text-muted text-xs md:text-sm font-medium mt-1">
                  Um sistema que organiza a vidraçaria em três dimensões
                </p>
              </div>
              {/* Right code block */}
              <div className="hidden sm:flex items-center px-4 border-l border-gold/15 bg-background/40">
                <MetalProfile className="w-8 h-8 opacity-60" />
              </div>
            </div>
          </div>
        </div>

        {/* Three pillar rows — styled as technical spec sheet rows */}
        <div className="border border-gold/10 bg-surface/40 divide-y divide-gold/8 mb-12">
          {pilares.map((item, i) => (
            <div
              key={item.title}
              className="group flex items-stretch hover:bg-gold/3 transition-colors duration-300"
            >
              {/* Left: code + number */}
              <div className="hidden sm:flex flex-col items-center justify-center px-4 border-r border-gold/10 bg-background/30 min-w-[72px]">
                <span className="text-[9px] font-bold tracking-widest text-gold/40 font-mono rotate-180"
                  style={{ writingMode: 'vertical-rl' }}>
                  {item.code}
                </span>
              </div>

              {/* Icon */}
              <div className="flex items-center justify-center px-5 border-r border-gold/10 bg-background/20 min-w-[60px]">
                <div className="w-10 h-10 rounded bg-gold/8 border border-gold/15 flex items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/30 transition-all duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-6 py-5">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <h3 className="text-base md:text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="text-[10px] tracking-widest text-gold/40 font-mono uppercase hidden md:block">
                    · {item.spec}
                  </span>
                </div>
                <p className="text-muted text-sm md:text-base leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Right: status indicator */}
              <div className="hidden md:flex items-center px-5 border-l border-gold/10">
                <div className="w-2 h-2 rounded-full bg-gold/30 group-hover:bg-gold/70 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* IBeam divider */}
        <IBeamDivider className="w-full max-w-sm mb-10 opacity-40" />

        {/* Closing — in corner brackets */}
        <CornerBrackets className="p-5 md:p-6 max-w-2xl" size={14} opacity={0.4}>
          <div className="space-y-3 px-2 py-1">
            <p className="text-muted text-base md:text-lg font-medium leading-relaxed">
              Quando esses três elementos funcionam juntos, a vidraçaria deixa de ser apenas um lugar que executa obras…
            </p>
            <p className="text-white text-base md:text-lg font-semibold">
              e passa a ser uma{' '}
              <span className="gradient-text-gold">empresa estruturada</span>.
            </p>
          </div>
        </CornerBrackets>

      </div>
    </section>
  )
}
