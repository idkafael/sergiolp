import { AnimatedCard } from './AnimatedCard'

const pilares = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold"
      >
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Lucro',
    desc: 'Precificação correta e controle financeiro.',
    gradient: 'from-gold/20',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Produtividade',
    desc: 'Equipe alinhada e processos claros de execução.',
    gradient: 'from-gold-light/20',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    title: 'Encantamento',
    desc: 'Experiência de cliente que gera indicações e obras maiores.',
    gradient: 'from-mustard/20',
  },
]

export function ParaQuemSection() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">
          O que <span className="underline-gold"><span className="gradient-text-gold">mudou tudo</span></span>
        </h2>
        <p className="text-muted text-base md:text-lg text-center mb-12 font-medium max-w-2xl mx-auto">
          Sérgio estruturou um método baseado em três pilares fundamentais:
        </p>
        <div className="inline-block w-full mb-8">
          <p className="text-xl md:text-2xl font-bold text-center">
            <span className="gradient-text-gold">PGL: Processo de Geração de Lucro</span>
          </p>
          <p className="text-muted text-sm md:text-base text-center mt-2 font-medium">
            Um sistema que organiza uma vidraçaria em três dimensões:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {pilares.map((item) => (
            <div key={item.title} className="group relative">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
              <AnimatedCard
                className="h-full p-6 md:p-8 flex flex-col items-center text-center transition-all duration-500 group-hover:border-gold/30"
                innerBg="bg-surface"
              >
                <div
                  className={`w-full h-32 absolute top-0 left-0 right-0 rounded-t-2xl bg-gradient-to-b ${item.gradient} to-transparent opacity-50`}
                />
                <div className="relative z-10 w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="relative z-10 text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="relative z-10 text-muted text-sm md:text-base leading-relaxed font-medium">
                  {item.desc}
                </p>
              </AnimatedCard>
            </div>
          ))}
        </div>
        <div className="text-muted text-base md:text-lg leading-relaxed space-y-4 max-w-3xl mx-auto font-medium text-center">
          <p>
            Quando esses três elementos funcionam juntos…
          </p>
          <p>
            A vidraçaria deixa de ser apenas um lugar que executa obras…
          </p>
          <p>
            e passa a se tornar uma{' '}
            <span className="gradient-text-gold font-semibold">empresa estruturada</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
