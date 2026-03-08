import { AnimatedNumberBadge } from './AnimatedNumberBadge'

export function ParaQuemQuerSection() {
  const itens = [
    'parar de viver apenas de obra pequena',
    'estruturar uma empresa de verdade',
    'aumentar o faturamento da vidraçaria',
    'construir uma operação profissional',
  ]

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center">
          Este evento é <span className="underline-gold"><span className="gradient-text-gold">para quem quer:</span></span>
        </h2>
        <ul className="space-y-5 mb-10 pl-0 list-none max-w-2xl mx-auto">
          {itens.map((item, index) => (
            <li key={item} className="flex gap-4 items-start">
              <AnimatedNumberBadge number={index + 1} />
              <span className="text-muted text-base md:text-lg leading-relaxed font-medium pt-1">{item}</span>
            </li>
          ))}
        </ul>
        <div className="text-center space-y-4">
          <p className="text-white text-base md:text-lg font-semibold">
            E principalmente…
          </p>
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
