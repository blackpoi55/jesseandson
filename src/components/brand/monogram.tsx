import { cn } from "@/lib/utils";

/**
 * Circular "J&S" seal. The lettered ring can spin slowly while the
 * centre monogram stays upright.
 */
export function MonogramSeal({ className, spin = true }: { className?: string; spin?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("text-accent", className)} aria-hidden="true">
      <defs>
        <path id="seal-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <g
        style={spin ? { animation: "spin-slow 40s linear infinite", transformOrigin: "100px 100px" } : undefined}
      >
        <text
          fill="currentColor"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: 13, letterSpacing: 5.2 }}
        >
          <textPath href="#seal-ring" startOffset="0">
            JESSE &amp; SON · BESPOKE TAILOR · BANGKOK ·
          </textPath>
        </text>
      </g>
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: "var(--font-cormorant)", fontSize: 54, fontStyle: "italic", fontWeight: 500 }}
      >
        J&amp;S
      </text>
      <line x1="80" y1="132" x2="120" y2="132" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

/** Compact square monogram used for the favicon-like brand mark. */
export function MonogramMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="1" y="1" width="62" height="62" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: "var(--font-cormorant)", fontSize: 30, fontStyle: "italic", fontWeight: 500 }}
      >
        J&amp;S
      </text>
    </svg>
  );
}
