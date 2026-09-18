"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = { title: string; subtitle?: string; body: string[]; image: string };

/** Numbered step selector with a cross-fading image and copy panel. */
export function StepTabs({ steps, imageFit = "cover" }: { steps: Step[]; imageFit?: "cover" | "contain" }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-bg-alt">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08, clipPath: "inset(0 0 0 100%)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={imageFit === "contain" ? "object-contain p-6" : "object-cover"}
            />
          </motion.div>
        </AnimatePresence>
        <span className="absolute bottom-5 left-5 rounded-full bg-black/60 px-4 py-1.5 font-display text-xs tracking-[0.2em] text-champagne backdrop-blur">
          Step {String(active + 1).padStart(2, "0")}
        </span>
      </div>

      <div>
        <ol role="tablist" className="flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-center gap-2.5 rounded-full border px-4 py-2 text-[0.72rem] tracking-[0.18em] uppercase transition-all duration-300",
                  i === active ? "border-gold bg-gold text-ink" : "border-line text-muted hover:border-gold/60 hover:text-fg",
                )}
              >
                <span className="font-display">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </button>
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-10"
          >
            <span className="font-display text-7xl text-gold/25">{String(active + 1).padStart(2, "0")}</span>
            <h3 className="-mt-3 font-serif text-5xl">{step.title}</h3>
            {step.subtitle && <p className="mt-2 font-serif text-xl text-gold italic">{step.subtitle}</p>}
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              {step.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex gap-2">
              {steps.map((_, i) => (
                <span key={i} className={cn("h-0.5 flex-1 rounded-full transition-colors duration-500", i <= active ? "bg-gold" : "bg-line")} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
