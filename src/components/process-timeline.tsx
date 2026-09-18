"use client";

import { AnimatePresence, motion, useInView, useScroll } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProcessStep } from "@/content/process";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function StepBlock({ step, index, onActive }: { step: ProcessStep; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <motion.div
      ref={ref}
      id={step.id}
      initial={{ opacity: 0.25 }}
      animate={{ opacity: inView ? 1 : 0.35 }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-32 py-16 lg:min-h-[70svh] lg:py-24"
    >
      {/* Mobile image */}
      <div className="relative mb-8 aspect-[4/3] overflow-hidden lg:hidden">
        <Image src={step.image} alt={step.title} fill sizes="100vw" className="object-cover" />
      </div>
      <span className="font-display text-7xl text-accent/30 md:text-8xl">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="-mt-3 font-serif text-5xl md:text-6xl">{step.title}</h3>
      {step.subtitle && <p className="mt-3 font-serif text-xl text-accent italic">{step.subtitle}</p>}
      <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
        {step.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {step.note && (
        <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent-soft px-5 py-2.5 text-sm text-fg">
          <span className="text-accent">✦</span>
          {step.note}
        </p>
      )}
    </motion.div>
  );
}

/** Sticky photo on the left swaps as each step scrolls through the centre of the screen. */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-2 lg:gap-24">
      <div className="hidden lg:block">
        <div className="sticky top-28 h-[calc(100svh-9rem)]">
          <div className="relative h-full overflow-hidden bg-ink">
            <AnimatePresence initial={false}>
              <motion.div
                key={steps[active].image}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <Image src={steps[active].image} alt={steps[active].title} fill sizes="50vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute right-8 bottom-8 left-8 flex items-end justify-between text-ivory">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="font-serif text-3xl italic"
                >
                  {steps[active].title}
                </motion.p>
              </AnimatePresence>
              <p className="font-display text-sm tracking-[0.2em] text-champagne">
                {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
            </div>
            {/* progress rail */}
            <div className="absolute top-8 bottom-24 left-8 w-px bg-ivory/20">
              <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-champagne" />
            </div>
          </div>
        </div>
      </div>

      <div>
        {steps.map((s, i) => (
          <StepBlock key={s.id} step={s} index={i} onActive={setActive} />
        ))}
      </div>

      <nav aria-label="Steps" className="pointer-events-none fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {steps.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.title}
            className={cn(
              "pointer-events-auto block size-2.5 rounded-full border border-accent transition-all duration-500",
              i === active ? "scale-125 bg-accent" : "bg-transparent",
            )}
          />
        ))}
      </nav>
    </div>
  );
}
