export function Footer() {
  return (
    <footer className="relative py-10 bg-background border-t border-surface-light/20 px-4">
      {/* Top horizontal I-beam detail */}
      <div className="absolute top-0 left-0 right-0 flex items-center" aria-hidden>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          {/* Brand — with small window icon */}
          <div className="flex items-center gap-3">
            <div aria-hidden>
              <svg viewBox="0 0 20 26" fill="none" width="16" height="20">
                <rect x="1" y="1" width="18" height="24" stroke="#C9981A" strokeWidth="1.5" strokeOpacity="0.5"/>
                <line x1="10" y1="1" x2="10" y2="25" stroke="#C9981A" strokeWidth="1" strokeOpacity="0.4"/>
                <line x1="1" y1="13" x2="19" y2="13" stroke="#C9981A" strokeWidth="1" strokeOpacity="0.4"/>
              </svg>
            </div>
            <span className="text-sm font-bold tracking-[0.12em] uppercase">
              <span className="text-white">Esquadria</span>{' '}
              <span className="gradient-text-gold">Milionária</span>
            </span>
          </div>

          <p className="text-muted/40 text-[10px] text-center font-mono tracking-wider uppercase">
            © 2026 Sérgio Lima · Todos os direitos reservados
          </p>

          <div className="flex items-center gap-5">
            <a href="#" className="text-muted/40 text-xs hover:text-gold transition-colors duration-200 font-mono">
              Termos de Uso
            </a>
            <div className="w-px h-3 bg-surface-light" aria-hidden />
            <a href="#" className="text-muted/40 text-xs hover:text-gold transition-colors duration-200 font-mono">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
