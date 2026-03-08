export function CTASection() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/5 rounded-full blur-[80px]" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-muted text-sm md:text-base mb-4 uppercase tracking-wider">
          Não deixe para depois
        </p>
        <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
          Comece agora a transformar <span className="gradient-text-gold">sua esquadria</span>
        </h2>
        <p className="text-muted text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
          Junte-se a centenas de empresários que já estão faturando mais e construindo negócios sólidos
          com o método Esquadria Milionária.
        </p>
        <a
          href="#oferta"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-background bg-gold hover:bg-gold-light transition-all duration-200 rounded-full shadow-lg shadow-black/20 hover:shadow-gold/30 uppercase tracking-wider"
        >
          QUERO ENTRAR NO ESQUADRIA MILIONÁRIA
        </a>
      </div>
    </section>
  )
}
