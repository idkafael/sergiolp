import { AnimatedNumberBadge } from './AnimatedNumberBadge'

export function VideoSection() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">
          A história que <span className="underline-gold"><span className="gradient-text-gold">poucos conhecem</span></span>
        </h2>
        <div className="text-muted text-base md:text-lg leading-relaxed space-y-6 font-medium">
          <p>
            Durante anos, Sérgio Lima viveu a realidade que a maioria dos vidraceiros conhece bem.
          </p>
          <ul className="space-y-5 pl-0 list-none">
            {['Uma vidraçaria pequena.', 'Apenas 40 metros quadrados de estrutura.', 'Equipe reduzida.', 'Obras pequenas.', 'Muito trabalho.', 'Pouco lucro.'].map((texto, index) => (
              <li key={texto} className="flex gap-4 items-start">
                <AnimatedNumberBadge number={index + 1} />
                <span className="text-muted pt-1">{texto}</span>
              </li>
            ))}
          </ul>
          <p className="text-white font-semibold">
            Mas algo mudou.
          </p>
          <p>
            Ele começou a entender que o problema não era o mercado.
          </p>
          <p>
            O problema era que a maioria das vidraçarias não possui um{' '}
            <span className="gradient-text-gold font-semibold">processo de geração de lucro</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
