import { AnimatedNumberBadge } from './AnimatedNumberBadge'

export function AvisoSection() {
  const itens = [
    'crescer',
    'estruturar empresa',
    'aumentar faturamento',
    'e construir algo grande no setor.',
  ]

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">
          Aviso <span className="underline-gold"><span className="gradient-text-gold">importante</span></span>
        </h2>
        <p className="text-muted text-base md:text-lg text-center mb-8 font-medium">
          Esse evento não é para qualquer vidraceiro.
        </p>
        <p className="text-white text-base md:text-lg text-center mb-6 font-semibold">
          É para quem quer:
        </p>
        <ul className="space-y-5 pl-0 list-none max-w-md mx-auto">
          {itens.map((item, index) => (
            <li key={item} className="flex gap-4 items-start">
              <AnimatedNumberBadge number={index + 1} />
              <span className="text-muted text-base md:text-lg leading-relaxed font-medium pt-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
