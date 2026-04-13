/**
 * Decorative SVG elements themed around the esquadrias niche
 * (window frames, metalwork, glass panels, technical blueprints)
 */

/** A 4-pane window frame — the core product visual metaphor */
export function WindowFrameSVG({ className = '', opacity = 1 }) {
  return (
    <svg
      viewBox="0 0 180 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      {/* Outer structural frame */}
      <rect x="1.5" y="1.5" width="177" height="237" rx="1" stroke="#C9981A" strokeWidth="3" />
      {/* Inner bevel */}
      <rect x="10" y="10" width="160" height="220" rx="0.5" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.35" />
      {/* Vertical center mullion */}
      <rect x="86.5" y="10" width="7" height="220" fill="#C9981A" fillOpacity="0.08" />
      <line x1="90" y1="10" x2="90" y2="230" stroke="#C9981A" strokeWidth="2" />
      {/* Horizontal center rail */}
      <rect x="10" y="116.5" width="160" height="7" fill="#C9981A" fillOpacity="0.08" />
      <line x1="10" y1="120" x2="170" y2="120" stroke="#C9981A" strokeWidth="2" />
      {/* Frame joints — circles at intersections */}
      <circle cx="90" cy="120" r="4" fill="#C9981A" fillOpacity="0.5" />
      <circle cx="90" cy="10" r="2.5" fill="#C9981A" fillOpacity="0.4" />
      <circle cx="90" cy="230" r="2.5" fill="#C9981A" fillOpacity="0.4" />
      <circle cx="10" cy="120" r="2.5" fill="#C9981A" fillOpacity="0.4" />
      <circle cx="170" cy="120" r="2.5" fill="#C9981A" fillOpacity="0.4" />
      {/* Corner joints */}
      <rect x="8" y="8" width="6" height="6" fill="#C9981A" fillOpacity="0.25" />
      <rect x="166" y="8" width="6" height="6" fill="#C9981A" fillOpacity="0.25" />
      <rect x="8" y="226" width="6" height="6" fill="#C9981A" fillOpacity="0.25" />
      <rect x="166" y="226" width="6" height="6" fill="#C9981A" fillOpacity="0.25" />
      {/* Glass pane reflections — diagonal shimmer lines */}
      <line x1="16" y1="16" x2="42" y2="38" stroke="white" strokeWidth="0.75" strokeOpacity="0.06" />
      <line x1="16" y1="126" x2="42" y2="148" stroke="white" strokeWidth="0.75" strokeOpacity="0.06" />
      <line x1="97" y1="16" x2="123" y2="38" stroke="white" strokeWidth="0.75" strokeOpacity="0.06" />
      <line x1="97" y1="126" x2="123" y2="148" stroke="white" strokeWidth="0.75" strokeOpacity="0.06" />
    </svg>
  )
}

/** Single-pane window frame — simpler version for smaller uses */
export function SinglePaneSVG({ className = '', opacity = 1 }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ opacity }} aria-hidden>
      <rect x="1.5" y="1.5" width="77" height="97" rx="1" stroke="#C9981A" strokeWidth="2.5" />
      <rect x="7" y="7" width="66" height="86" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1="12" y1="16" x2="26" y2="28" stroke="white" strokeWidth="1" strokeOpacity="0.07" />
    </svg>
  )
}

/** Corner brackets — architectural drawing accents */
export function CornerBrackets({ children, className = '', size = 18, color = '#C9981A', opacity = 0.6 }) {
  return (
    <div className={`relative ${className}`}>
      {/* Top-left */}
      <svg className="absolute top-0 left-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden>
        <path d={`M 0 ${size} L 0 0 L ${size} 0`} stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeOpacity={opacity} />
      </svg>
      {/* Top-right */}
      <svg className="absolute top-0 right-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden>
        <path d={`M 0 0 L ${size} 0 L ${size} ${size}`} stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeOpacity={opacity} />
      </svg>
      {/* Bottom-left */}
      <svg className="absolute bottom-0 left-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden>
        <path d={`M 0 0 L 0 ${size} L ${size} ${size}`} stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeOpacity={opacity} />
      </svg>
      {/* Bottom-right */}
      <svg className="absolute bottom-0 right-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden>
        <path d={`M ${size} 0 L ${size} ${size} L 0 ${size}`} stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeOpacity={opacity} />
      </svg>
      {children}
    </div>
  )
}

/** Vertical ruler / measuring tape — for timelines */
export function VerticalRuler({ className = '', ticks = 16 }) {
  return (
    <div className={`flex flex-col ${className}`} aria-hidden>
      {Array.from({ length: ticks }, (_, i) => (
        <div key={i} className="flex items-center" style={{ height: '100%', flex: 1 }}>
          <div
            className="bg-gold/40"
            style={{
              width: i % 4 === 0 ? '10px' : i % 2 === 0 ? '7px' : '4px',
              height: '1px',
            }}
          />
        </div>
      ))}
    </div>
  )
}

/** Steel I-beam profile — horizontal divider */
export function IBeamDivider({ className = '' }) {
  return (
    <svg viewBox="0 0 400 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <line x1="0" y1="1" x2="400" y2="1" stroke="#C9981A" strokeWidth="1.5" strokeOpacity="0.35" />
      <line x1="0" y1="15" x2="400" y2="15" stroke="#C9981A" strokeWidth="1.5" strokeOpacity="0.35" />
      <line x1="200" y1="1" x2="200" y2="15" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.2" />
      <circle cx="0" cy="1" r="1.5" fill="#C9981A" fillOpacity="0.3" />
      <circle cx="400" cy="1" r="1.5" fill="#C9981A" fillOpacity="0.3" />
      <circle cx="0" cy="15" r="1.5" fill="#C9981A" fillOpacity="0.3" />
      <circle cx="400" cy="15" r="1.5" fill="#C9981A" fillOpacity="0.3" />
    </svg>
  )
}

/** Weld seam — decorative horizontal accent */
export function WeldSeam({ className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center gap-1.5">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="w-1.5 h-px bg-gold/20 rotate-45" />
        ))}
      </div>
    </div>
  )
}

/** Technical label badge — like a spec sheet label */
export function TechLabel({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border border-gold/25 text-gold/70 text-[10px] font-bold tracking-[0.2em] uppercase font-mono ${className}`}>
      <span className="w-1 h-1 bg-gold/60 rounded-full flex-shrink-0" />
      {children}
    </span>
  )
}

/** Cross-section profile of a metal frame profile */
export function MetalProfile({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* U-channel cross-section */}
      <rect x="4" y="4" width="24" height="4" fill="#C9981A" fillOpacity="0.25" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.5" />
      <rect x="4" y="8" width="4" height="20" fill="#C9981A" fillOpacity="0.15" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.5" />
      <rect x="24" y="8" width="4" height="20" fill="#C9981A" fillOpacity="0.15" stroke="#C9981A" strokeWidth="0.75" strokeOpacity="0.5" />
      {/* Center gap */}
      <rect x="8" y="8" width="16" height="20" fill="#C9981A" fillOpacity="0.03" />
    </svg>
  )
}
