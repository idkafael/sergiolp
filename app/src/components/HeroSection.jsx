import { AnimatedCard } from './AnimatedCard'
import { AnimatedNumberBadge } from './AnimatedNumberBadge'
import { LeadForm } from './LeadForm'
import { WindowFrameSVG, TechLabel } from './Decorations'

const PAIN_POINTS = [
  'Trabalha o dia inteiro na obra',
  'Corre atrás de orçamento',
  'Negocia preço com cliente',
  'Resolve problema de equipe',
  'E no final do mês… sobra pouco lucro.',
]

export function HeroSection({ onSubmit }) {
  return (
    <section className="relative w-full overflow-hidden bg-background">

      {/* ── DESKTOP ── */}
      <div className="hidden lg:block relative w-full min-h-screen">
        {/* Hero photo */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Sérgio Lima"
            className="object-cover object-[65%_top] w-full h-full"
            src="https://sergiolima-lp.vercel.app/images/sergio-lima-hero.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 via-40% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent via-15% to-transparent" />
        </div>

        {/* Blueprint grid — only on the left (dark) side */}
        <div className="absolute inset-0 z-[1] bg-blueprint opacity-60"
          style={{ maskImage: 'linear-gradient(to right, black 20%, transparent 55%)' }}
        />

        {/* Decorative window frame — far right, large, very faint */}
        <WindowFrameSVG
          className="absolute right-4 top-1/2 -translate-y-1/2 h-[70vh] w-auto z-[1] pointer-events-none"
          opacity={0.07}
        />

        {/* Vertical ruler on far left edge */}
        <div className="absolute left-0 top-0 bottom-0 z-[2] flex flex-col justify-center py-16 pointer-events-none" aria-hidden>
          <div className="relative h-full flex flex-col items-start pl-1">
            {Array.from({ length: 40 }, (_, i) => (
              <div key={i} className="flex-1 flex items-center">
                <div
                  className="bg-gold/25"
                  style={{
                    width: i % 10 === 0 ? '12px' : i % 5 === 0 ? '8px' : '5px',
                    height: '1px',
                  }}
                />
                {i % 10 === 0 && (
                  <span className="ml-1 text-gold/20 font-mono" style={{ fontSize: '6px', letterSpacing: '0.1em' }}>
                    {i * 10}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-10 min-h-screen flex items-center">
          <div className="w-[55%] xl:w-[50%]">
            <div className="text-left">

              {/* Event badge — technical label */}
              <div className="mb-7">
                <TechLabel className="mb-4 block w-fit">Evento · ao vivo · gratuito</TechLabel>
                <div className="inline-block">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider">
                    <span className="text-white">ESQUADRIA</span>{' '}
                    <span className="underline-gold"><span className="gradient-text-gold">MILIONÁRIA</span></span>
                  </h2>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] leading-[1.15] mb-6 font-light">
                Descubra o segredo que transformou uma{' '}
                <span className="gradient-text-gold font-extrabold">vidraçaria de 40m²</span>{' '}
                em uma estrutura de mais de{' '}
                <span className="gradient-text-gold font-extrabold">1000m²</span>
              </h1>

              <div className="text-muted text-sm md:text-base mb-9 leading-relaxed max-w-lg space-y-4 font-medium">
                <p>Existe um tipo de vidraceiro que vive preso em um ciclo:</p>
                <ul className="space-y-4 pl-0 list-none">
                  {PAIN_POINTS.map((texto, index) => (
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

              <div className="flex flex-col gap-3 items-start w-full max-w-md">
                <div className="w-full">
                  <LeadForm
                    idPrefix="hero-desktop"
                    onSubmit={onSubmit}
                    submitLabel="Participar gratuitamente"
                  />
                </div>
                <p className="text-muted/50 text-[10px] uppercase tracking-[0.2em] font-mono">
                  Esquadria Milionária · Vagas limitadas
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden relative w-full">
        {/* Blueprint grid background for mobile */}
        <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />

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
              <TechLabel className="mb-4 mx-auto block w-fit">Evento · ao vivo · gratuito</TechLabel>
              <div className="mb-6 inline-block">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider">
                  <span className="text-white">ESQUADRIA</span>{' '}
                  <span className="underline-gold"><span className="gradient-text-gold">MILIONÁRIA</span></span>
                </h2>
              </div>
              <h1 className="text-2xl sm:text-3xl leading-[1.15] mb-6 font-light">
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
                <p className="text-muted/50 text-[10px] uppercase tracking-[0.2em] font-mono">
                  Evento Online e Gratuito · Vagas Limitadas
                </p>
              </div>
            </div>
          </AnimatedCard>

          <div className="text-muted text-sm md:text-base mt-8 leading-relaxed max-w-md mx-auto space-y-4 font-medium">
            <p>Existe um tipo de vidraceiro que vive preso em um ciclo:</p>
            <ul className="space-y-4 pl-0 list-none">
              {PAIN_POINTS.map((texto, index) => (
                <li key={texto} className="flex gap-4 items-start">
                  <AnimatedNumberBadge number={index + 1} />
                  <span className="pt-1">{texto}</span>
                </li>
              ))}
            </ul>
            <p>
              Mas existe outro tipo de profissional no mercado.
              Um <span className="gradient-text-gold font-semibold">vidraceiro High Ticket</span>.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
