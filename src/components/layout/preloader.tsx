"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;
const KEY = "js-intro-seen";

/**
 * First-visit intro: a gold needle stitches a line, the name appears,
 * then the curtain lifts. Shown once per browser session.
 */
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable — just play the intro */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skip = seen || reduced;
    // Returning visitors just see the curtain lift; first visits get the full intro.
    if (!skip) document.documentElement.style.overflow = "hidden";
    const t = setTimeout(
      () => {
        setShow(false);
        document.documentElement.style.overflow = "";
      },
      skip ? 0 : 2300,
    );
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const letters = "JESSE & SON".split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink text-ivory"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <svg viewBox="0 0 300 40" className="w-64 text-champagne md:w-80">
            <motion.path
              d="M5 20 H295"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6 5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.g
              initial={{ x: 0 }}
              animate={{ x: 290 }}
              transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
            >
              <path d="M0 20 L-14 17.5 L-14 22.5 Z" fill="currentColor" />
              <circle cx="-11" cy="20" r="1" fill="#0d0c0b" />
            </motion.g>
          </svg>
          <p className="mt-8 flex font-display text-3xl tracking-[0.12em] md:text-5xl">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={l === "&" ? "mx-2 font-serif text-champagne italic" : undefined}
              >
                {l === " " ? " " : l}
              </motion.span>
            ))}
          </p>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-4 text-[0.65rem] text-champagne uppercase"
          >
            Bespoke Tailor · Bangkok
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
