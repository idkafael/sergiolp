/**
 * Niche-themed number badge — styled as a window frame joint / metalwork marker.
 * Replaces the generic spinning conic-gradient badge.
 *
 * Visual: a small square frame with corner bolts and the number inside,
 * referencing the joints and corner pieces of window/door frames (esquadrias).
 */
export function AnimatedNumberBadge({ number }) {
  return (
    <span className="relative flex-shrink-0 w-9 h-9 flex items-center justify-center" aria-hidden>
      {/* Outer square frame */}
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {/* Frame border */}
        <rect x="1.5" y="1.5" width="33" height="33" stroke="#C9981A" strokeWidth="1.25" strokeOpacity="0.5" />
        {/* Inner frame bevel */}
        <rect x="5" y="5" width="26" height="26" stroke="#C9981A" strokeWidth="0.5" strokeOpacity="0.2" />
        {/* Corner bolt/rivet dots — like frame joining hardware */}
        <circle cx="4" cy="4" r="1.5" fill="#C9981A" fillOpacity="0.55" />
        <circle cx="32" cy="4" r="1.5" fill="#C9981A" fillOpacity="0.55" />
        <circle cx="4" cy="32" r="1.5" fill="#C9981A" fillOpacity="0.55" />
        <circle cx="32" cy="32" r="1.5" fill="#C9981A" fillOpacity="0.55" />
      </svg>

      {/* Number */}
      <span className="relative z-10 text-gold text-sm font-bold font-mono leading-none">
        {number}
      </span>
    </span>
  )
}
