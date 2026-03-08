import { AnimatedCard } from './AnimatedCard'
import { AnimatedNumberBadge } from './AnimatedNumberBadge'
import { LeadForm } from './LeadForm'

export function HeroSection({ onSubmit }) {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="hidden lg:block relative w-full min-h-screen">
        <div className="absolute inset-0 z-0">
          <img
            alt="Sérgio Lima"
            className="object-cover object-[65%_top] w-full h-full"
            src="https://sergiolima-lp.vercel.app/images/sergio-lima-hero.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 via-35% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent via-15% to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 min-h-screen flex items-center">
          <div className="w-[55%] xl:w-[50%]">
            <div className="text-left">
              <div className="mb-6">
                <div className="inline-block">
                  <p className="text-gold text-[10px] md:text-xs tracking-[0.25em] uppercase mb-2">
                    EVENTO
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider">
                    <span className="text-white">ESQUADRIA</span>{' '}
                    <span className="underline-gold"><span className="gradient-text-gold">MILIONÁRIA</span></span>
                  </h2>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] leading-[1.15] mb-5">
                Descubra o segredo que transformou uma{' '}
                <span className="gradient-text-gold font-extrabold">vidraçaria de 40m²</span>{' '}
                em uma estrutura de mais de{' '}
                <span className="gradient-text-gold font-extrabold">1000m²</span>
              </h1>
              <div className="text-muted text-sm md:text-base mb-8 leading-relaxed max-w-lg space-y-4 font-medium">
                <p>
                  Existe um tipo de vidraceiro que vive preso em um ciclo:
                </p>
                <ul className="space-y-4 pl-0 list-none">
                  {['Trabalha o dia inteiro na obra', 'Corre atrás de orçamento', 'Negocia preço com cliente', 'Resolve problema de equipe', 'E no final do mês… sobra pouco lucro.'].map((texto, index) => (
                    <li key={texto} className="flex gap-4 items-start">
                      <AnimatedNumberBadge number={index + 1} />
                      <span className="pt-1">{texto}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Esse é o <span className="text-white font-semibold">vidraceiro travado</span>.
                </p>
                <p>
                  Mas existe outro tipo de profissional no mercado.
                  Um que construiu algo completamente diferente.
                  Um <span className="gradient-text-gold font-semibold">vidraceiro High Ticket</span>.
                </p>
              </div>
              <div className="flex flex-col gap-4 items-start w-full max-w-md">
                <div className="w-full">
                  <LeadForm
                    idPrefix="hero-desktop"
                    onSubmit={onSubmit}
                    submitLabel="Participar gratuitamente"
                  />
                </div>
                <p className="text-muted text-[11px] md:text-xs uppercase tracking-wider">
                  Esquadria Milionária — Vagas limitadas
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      <div className="lg:hidden relative w-full">
        <div className="relative w-full aspect-[3/4] max-h-[55vh]">
          <img
            alt="Sérgio Lima"
            className="object-cover object-top w-full h-full"
            src="https://sergiolima-lp.vercel.app/images/sergio-lima-hero-mobile.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent via-20% to-transparent" />
        </div>
        <div className="relative z-10 px-4 pb-12 -mt-8">
          <AnimatedCard className="bg-background/80 backdrop-blur-md p-6 sm:p-8" innerBg="bg-background/90">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-block">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider">
                    <span className="text-white">ESQUADRIA</span>{' '}
                    <span className="underline-gold"><span className="gradient-text-gold">MILIONÁRIA</span></span>
                  </h2>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl leading-[1.15] mb-5">
                Descubra o segredo que transformou uma{' '}
                <span className="gradient-text-gold font-extrabold">vidraçaria de 40m²</span>{' '}
                em uma estrutura de mais de{' '}
                <span className="gradient-text-gold font-extrabold">1000m²</span>
              </h1>
              <div className="flex flex-col gap-4 items-center w-full">
                <div className="w-full max-w-sm">
                  <LeadForm
                    idPrefix="hero-mobile"
                    onSubmit={onSubmit}
                    submitLabel="Participar gratuitamente"
                  />
                </div>
              </div>
            </div>
          </AnimatedCard>
          <div className="text-muted text-sm md:text-base mt-8 leading-relaxed max-w-md mx-auto space-y-4 font-medium">
            <p>Existe um tipo de vidraceiro que vive preso em um ciclo:</p>
            <ul className="space-y-4 pl-0 list-none">
              {['Trabalha o dia inteiro na obra', 'Corre atrás de orçamento', 'Negocia preço com cliente', 'Resolve problema de equipe', 'E no final do mês… sobra pouco lucro.'].map((texto, index) => (
                <li key={texto} className="flex gap-4 items-start">
                  <AnimatedNumberBadge number={index + 1} />
                  <span className="pt-1">{texto}</span>
                </li>
              ))}
            </ul>
            <p>
              Mas existe outro tipo de profissional no mercado.
              Um que construiu algo completamente diferente.
              Um <span className="gradient-text-gold font-semibold">vidraceiro High Ticket</span>.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

    </section>
  )
}
