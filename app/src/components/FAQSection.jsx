import { useState } from 'react'
import { TechLabel } from './Decorations'

const faqs = [
  {
    code: 'Q.01',
    q: 'O que é o Esquadria Milionária?',
    a: 'O Esquadria Milionária é uma mentoria completa para donos de esquadrias que desejam escalar seus negócios e multiplicar o faturamento.',
  },
  {
    code: 'Q.02',
    q: 'Para quem é essa mentoria?',
    a: 'Para donos de esquadrias que querem sair do operacional, empresários estagnados que precisam dar o próximo passo, e quem deseja multiplicar o faturamento.',
  },
  {
    code: 'Q.03',
    q: 'Quanto tempo dura o acesso?',
    a: 'O acesso à mentoria é completo e você pode assistir no seu ritmo. São 2 dias de imersão + todo o material de apoio.',
  },
  {
    code: 'Q.04',
    q: 'Eu já tenho uma empresa, mas estou estagnado. Essa mentoria serve para mim?',
    a: 'Sim. A mentoria foi desenvolvida especialmente para ajudar empresários que estão estagnados a quebrar barreiras e dar o próximo passo no crescimento.',
  },
]

function FAQItem({ code, pergunta, resposta, isOpen, onClick }) {
  return (
    <div className={`border-b border-gold/8 last:border-b-0 transition-all duration-200 ${isOpen ? 'bg-gold/3' : ''}`}>
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left flex items-stretch gap-0 group"
      >
        {/* Code column — blueprint style */}
        <div className="flex items-center justify-center px-4 py-5 border-r border-gold/8 bg-background/40 min-w-[60px] flex-shrink-0">
          <span className={`text-[9px] font-bold tracking-[0.2em] font-mono transition-colors duration-200 ${isOpen ? 'text-gold/70' : 'text-gold/30 group-hover:text-gold/50'}`}>
            {code}
          </span>
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-between gap-6 px-5 py-5">
          <span className={`text-sm md:text-base font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-gold' : 'text-white group-hover:text-gold/80'}`}>
            {pergunta}
          </span>

          {/* Chevron — like a fold-out panel */}
          <span
            className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-gold/50 bg-gold/10 rotate-180' : 'border-gold/15 bg-background/60 group-hover:border-gold/30'}`}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isOpen ? 'text-gold' : 'text-muted'}`}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </button>

      {/* Answer */}
      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="flex items-stretch">
          {/* Left accent — active indicator */}
          <div className="w-[60px] flex-shrink-0 border-r border-gold/8 flex items-center justify-center bg-background/40">
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          </div>
          <p className="flex-1 text-muted text-sm md:text-base leading-relaxed px-5 py-4 font-medium pr-14">
            {resposta}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Very subtle blueprint grid */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <TechLabel className="mb-6 block mx-auto w-fit">REF. EM-006 · Especificações</TechLabel>

        <h2 className="text-2xl md:text-4xl font-bold mb-14 text-center leading-tight">
          Dúvidas{' '}
          <span className="italic gradient-text-gold">frequentes</span>
        </h2>

        {/* FAQ table — styled as a spec/Q&A document */}
        <div className="border border-gold/10 bg-surface/40">
          {/* Document title row */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-gold/10 bg-background/50">
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold/35 font-mono">
              Documento de perguntas e respostas · v2026
            </span>
            <div className="flex gap-1" aria-hidden>
              <div className="w-1.5 h-1.5 rounded-full bg-gold/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold/15" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold/8" />
            </div>
          </div>

          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.code}
              code={faq.code}
              pergunta={faq.q}
              resposta={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
