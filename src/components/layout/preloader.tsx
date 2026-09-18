"use client";

import { useEffect, useState } from "react";

/**
 * First-visit intro: a needle stitches a line, the masthead appears,
 * then the curtain lifts. Shown once per browser session.
 *
 * It runs entirely on CSS (globals.css, "intro"), timed from the first
 * paint, so it never waits for the page's scripts and never stalls half-drawn.
 * The inline script in the root layout decides before paint whether this
 * session has seen it (<html class="intro-seen">), so a reload skips it.
 */
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const seen = root.classList.contains("intro-seen");
    const since = performance.now();
    // gone from view after ~3.3s (CSS); remove it from the page once it has lifted
    const t = setTimeout(() => setShow(false), seen ? 0 : Math.max(0, 3600 - since));
    // entrances on this first page wait for the curtain (globals.css); later pages animate straight away
    const done = setTimeout(() => root.classList.add("intro-seen"), seen ? 0 : Math.max(0, 6000 - since));
    return () => {
      clearTimeout(t);
      clearTimeout(done);
    };
  }, []);

  if (!show) return null;
  const letters = "JESSE & SON".split("");

  return (
    <div
      aria-hidden
      className="intro fixed inset-0 z-[120] flex flex-col items-center justify-center bg-bg text-fg"
    >
      <div className="relative h-10 w-64 text-accent md:w-80">
        <svg viewBox="0 0 300 40" preserveAspectRatio="none" className="intro-stitch absolute inset-0 h-full w-full">
          <path d="M5 20 H295" stroke="currentColor" strokeWidth="1" strokeDasharray="6 5" fill="none" />
        </svg>
        <div className="intro-needle absolute inset-0">
          <svg viewBox="-16 0 16 40" className="absolute top-0 left-0 h-full w-[14px] md:w-[17px]">
            <path d="M0 20 L-14 17.5 L-14 22.5 Z" fill="currentColor" />
            <circle cx="-11" cy="20" r="1" fill="var(--bg)" />
          </svg>
        </div>
      </div>
      <p className="mt-8 flex font-display text-3xl tracking-[0.12em] md:text-5xl">
        {letters.map((l, i) => (
          <span
            key={i}
            className={l === "&" ? "intro-letter mx-2 font-serif text-accent italic" : "intro-letter"}
            style={{ "--i": i } as React.CSSProperties}
          >
            {l === " " ? " " : l}
          </span>
        ))}
      </p>
      <p className="intro-tagline mt-4 text-[0.65rem] tracking-[0.5em] text-muted uppercase">Bespoke Tailor · Bangkok</p>
    </div>
  );
}
