const stats = [
  { value: '25+', label: 'Anos de experiência' },
  { value: '50M+', label: 'Faturamento gerado' },
]

export function SergioLimaSection() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden px-4">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-gold/20 via-gold-light/10 to-gold/20 blur-xl" />
              <div className="absolute -inset-3 rounded-full border border-gold/30" />
              <div className="absolute -inset-4 rounded-full border border-gold/10" />
              <div className="relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-2 border-gold/40 isolate">
                <img
                  src="/images/IMG_4691.JPEG"
                  alt="Sérgio Lima"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-top"
                  style={{ imageRendering: '-webkit-optimize-contrast', transform: 'translateZ(0)' }}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Sérgio <span className="gradient-text-gold">Lima</span>
            </h2>
            <div className="space-y-4 text-muted text-sm md:text-base leading-relaxed">
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
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center px-4 py-3 rounded-xl bg-surface border border-surface-light"
                >
                  <p className="text-2xl md:text-3xl font-extrabold gradient-text-gold">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
