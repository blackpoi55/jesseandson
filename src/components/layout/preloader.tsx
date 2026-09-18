"use client";

import { useEffect, useState } from "react";

/**
 * Opening intro on every page load (first visit and reload): the masthead
 * sets, a pair of scissors snips along a dashed line through the middle of
 * the screen, and the two halves part at the cut to reveal the page.
 *
 * It runs entirely on CSS (globals.css, "intro"), timed from the first
 * paint, so it never waits for the page's scripts and never stalls half-drawn.
 * Moving between pages inside the site doesn't replay it.
 */
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const since = performance.now();
    // the halves have parted by ~2.9s (CSS); remove the intro from the page after that
    const t = setTimeout(() => setShow(false), Math.max(0, 3400 - since));
    // entrances on this first page wait for the cut (globals.css); later pages animate straight away
    const done = setTimeout(() => root.classList.add("intro-seen"), Math.max(0, 6000 - since));
    return () => {
      clearTimeout(t);
      clearTimeout(done);
    };
  }, []);

  if (!show) return null;
  const letters = "JESSE & SON".split("");

  return (
    <div aria-hidden className="intro fixed inset-0 z-[120] overflow-hidden text-fg">
      {/* top half carries the masthead */}
      <div className="intro-half intro-half-top absolute inset-x-0 top-0 flex h-1/2 items-end justify-center bg-bg pb-10 md:pb-14">
        <p className="flex font-display text-3xl tracking-[0.12em] md:text-5xl">
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
      </div>
      {/* bottom half carries the tagline */}
      <div className="intro-half intro-half-bottom absolute inset-x-0 bottom-0 flex h-1/2 items-start justify-center bg-bg pt-11 md:pt-14">
        <p className="intro-tagline text-[0.65rem] tracking-[0.5em] text-muted uppercase">Bespoke Tailor · Bangkok</p>
      </div>

      {/* the cut line and the scissors */}
      <div className="intro-guide absolute inset-x-0 top-1/2 border-t border-dashed border-accent/60" />
      <div className="intro-scissors absolute top-1/2 left-0 h-[52px] w-[104px] md:h-[76px] md:w-[152px]">
        {/* the cut trails from the pivot (64/120 of the width) */}
        <span className="intro-cut absolute top-1/2 right-[46.7%] h-px w-[100vw] bg-accent" />
        <svg viewBox="0 0 120 60" className="relative h-full w-full overflow-visible">
          <defs>
            <linearGradient id="intro-steel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e4e4e2" />
              <stop offset="0.5" stopColor="#a3a3a0" />
              <stop offset="1" stopColor="#5d5d5a" />
            </linearGradient>
          </defs>
          {/* lower handle + upper blade: one rigid half */}
          <g className="intro-blade-a">
            <path d="M64 27.6 C 82 24.4, 102 25.4, 119 29.7 L 119 30.3 C 100 30.6, 82 30.8, 64 31 Z" fill="url(#intro-steel)" stroke="#3a3a38" strokeWidth="0.5" />
            <path d="M64 30 C 55 33, 46 38, 38 41" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" className="text-accent" />
            <ellipse cx="26" cy="44.5" rx="12" ry="9" fill="none" stroke="currentColor" strokeWidth="3.2" className="text-accent" />
          </g>
          {/* upper handle + lower blade */}
          <g className="intro-blade-b">
            <path d="M64 32.4 C 82 35.6, 102 34.6, 119 30.3 L 119 29.7 C 100 29.4, 82 29.2, 64 29 Z" fill="url(#intro-steel)" stroke="#3a3a38" strokeWidth="0.5" />
            <path d="M64 30 C 55 27, 46 22, 38 19" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" className="text-accent" />
            <ellipse cx="26" cy="15.5" rx="12" ry="9" fill="none" stroke="currentColor" strokeWidth="3.2" className="text-accent" />
          </g>
          <circle cx="64" cy="30" r="2.6" className="fill-bg stroke-fg" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}
