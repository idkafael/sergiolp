import { TechLabel, WeldSeam } from './Decorations'

const momentos = [
  { label: 'A estrutura', text: 'Uma vidraçaria pequena.' },
  { label: 'O espaço', text: 'Apenas 40 metros quadrados.' },
  { label: 'A equipe', text: 'Equipe reduzida.' },
  { label: 'As obras', text: 'Obras pequenas.' },
  { label: 'O esforço', text: 'Muito trabalho.' },
  { label: 'O resultado', text: 'Pouco lucro.' },
]

export function VideoSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-3xl mx-auto">
        <TechLabel className="mb-6 mx-auto w-fit block">REF. EM-001 · Histórico</TechLabel>

        <h2 className="text-2xl md:text-4xl font-bold mb-14 leading-tight text-center">
          A história que{' '}
          <span className="underline-gold">
            <span className="gradient-text-gold">poucos conhecem</span>
          </span>
        </h2>

        <p className="text-muted text-base md:text-lg leading-relaxed mb-12 font-medium text-center mx-auto">
          Durante anos, Sérgio Lima viveu a realidade que a maioria dos vidraceiros conhece bem.
        </p>

        {/* Measuring tape / ruler timeline */}
        <div className="relative flex gap-6 mb-14">

          {/* The ruler column */}
          <div className="relative flex flex-col items-center flex-shrink-0 w-8" aria-hidden>
            {/* Top cap */}
            <div className="w-full h-1.5 bg-gold/50 rounded-sm mb-0" />
            {/* Ruler body */}
            <div className="relative flex-1 w-full bg-surface border-x border-gold/25 flex flex-col">
              {Array.from({ length: momentos.length * 8 }, (_, i) => (
                <div key={i} className="flex items-center" style={{ flex: 1 }}>
                  <div
                    className="absolute right-0 bg-gold/40"
                    style={{
                      width: i % 8 === 0 ? '100%' : i % 4 === 0 ? '60%' : i % 2 === 0 ? '40%' : '25%',
                      height: '1px',
                    }}
                  />
                  {i % 8 === 0 && (
                    <span
                      className="absolute left-0.5 text-gold/30 font-mono select-none"
                      style={{ fontSize: '5px', lineHeight: 1 }}
                    >
                      {i}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Bottom cap */}
            <div className="w-full h-1.5 bg-gold/50 rounded-sm mt-0" />
          </div>

          {/* Timeline entries */}
          <div className="flex-1 space-y-0">
            {momentos.map((item, index) => (
              <div key={item.text} className="relative flex items-start" style={{ minHeight: `${100 / momentos.length}%` }}>
                {/* Connector tick to ruler */}
                <div className="absolute -left-6 top-5 w-4 h-px bg-gold/30" aria-hidden />

                <div className="flex-1 pt-3 pb-6 border-b border-surface-light/40 last:border-b-0">
                  <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gold/50 font-mono mb-1">
                    {String(index + 1).padStart(2, '0')} · {item.label}
                  </span>
                  <p className="text-muted text-base md:text-lg font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weld seam divider */}
        <WeldSeam className="mb-10" />

        <div className="space-y-5 pl-4 border-l-2 border-gold/30">
          <p className="text-white text-lg md:text-xl font-semibold">
            Mas algo mudou.
          </p>
          <p className="text-muted text-base md:text-lg leading-relaxed font-medium">
            Ele começou a entender que o problema não era o mercado.
          </p>
          <p className="text-muted text-base md:text-lg leading-relaxed font-medium">
            O problema era que a maioria das vidraçarias não possui um{' '}
            <span className="gradient-text-gold font-semibold">processo de geração de lucro</span>.
          </p>
        </div>

      </div>
    </section>
  )
}
