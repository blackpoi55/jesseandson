"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const pieces = [
  // Front panel
  "M120 60 L212 82 C200 120 205 165 238 192 L226 432 L72 446 L58 132 Z",
  // Back panel
  "M300 58 L392 72 C386 110 392 150 414 178 L404 430 L296 438 Z",
  // Sleeve
  "M470 150 C500 88 590 88 620 150 L602 440 L490 440 Z",
  // Collar
  "M660 92 C700 70 760 70 782 94 L772 122 C750 104 700 104 668 120 Z",
  // Pocket flap
  "M664 200 H776 V236 H664 Z",
  // Under collar / facing
  "M664 280 C700 300 740 300 776 280 L770 420 L672 420 Z",
];

const labels = [
  { x: 118, y: 300, text: "Front Panel ×2" },
  { x: 318, y: 300, text: "Back Panel" },
  { x: 506, y: 310, text: "Sleeve ×2" },
  { x: 690, y: 146, text: "Collar" },
  { x: 684, y: 262, text: "Flap ×2" },
  { x: 684, y: 360, text: "Facing" },
];

const grainlines = [
  [150, 170, 150, 400],
  [350, 140, 350, 400],
  [546, 180, 546, 410],
  [720, 300, 720, 400],
];

/**
 * Hand-drafted jacket pattern, drawn line-by-line when it enters the view.
 * Used as artwork where photography isn't available.
 */
export function PatternDraft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 840 500" className={cn("text-gold", className)} aria-hidden="true">
      <motion.g initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        {pieces.map((d, i) => (
          <g key={i}>
            <motion.path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                show: { pathLength: 1, opacity: 1, transition: { duration: 2.2, delay: i * 0.25, ease: "easeInOut" } },
              }}
            />
            <motion.path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="4 5"
              transform="translate(6 6)"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 0.45, transition: { duration: 1, delay: 1.6 + i * 0.2 } },
              }}
            />
          </g>
        ))}
        {grainlines.map(([x1, y1, x2, y2], i) => (
          <motion.g
            key={i}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 0.7, transition: { delay: 2 + i * 0.15 } } }}
          >
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.8" />
            <path d={`M${x1 - 5} ${y1 + 10} L${x1} ${y1} L${x1 + 5} ${y1 + 10}`} fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d={`M${x2 - 5} ${y2 - 10} L${x2} ${y2} L${x2 + 5} ${y2 - 10}`} fill="none" stroke="currentColor" strokeWidth="0.8" />
          </motion.g>
        ))}
        {labels.map((l, i) => (
          <motion.text
            key={l.text}
            x={l.x}
            y={l.y}
            fill="currentColor"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 19 }}
            variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { delay: 2.2 + i * 0.12 } } }}
          >
            {l.text}
          </motion.text>
        ))}
        <motion.text
          x="60"
          y="486"
          fill="currentColor"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: 11, letterSpacing: 4 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 0.6, transition: { delay: 3 } } }}
        >
          JESSE &amp; SON · DRAFTED &amp; CUT BY HAND · SUKHUMVIT SOI 10
        </motion.text>
      </motion.g>
    </svg>
  );
}

/** Woven cloth rendered in CSS — pinstripe, herringbone, check or twill. */
export function Swatch({
  weave = "herringbone",
  className,
  tone = "#1d2433",
}: {
  weave?: "pinstripe" | "herringbone" | "check" | "twill";
  className?: string;
  tone?: string;
}) {
  const patterns: Record<string, string> = {
    pinstripe: `repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 14px), linear-gradient(${tone}, ${tone})`,
    herringbone: `repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 2px, transparent 2px 6px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.25) 0 2px, transparent 2px 6px), linear-gradient(${tone}, ${tone})`,
    check: `repeating-linear-gradient(0deg, rgba(214,180,124,0.22) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(214,180,124,0.22) 0 1px, transparent 1px 22px), linear-gradient(${tone}, ${tone})`,
    twill: `repeating-linear-gradient(60deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 4px), linear-gradient(${tone}, ${tone})`,
  };
  return <div className={cn("h-full w-full", className)} style={{ background: patterns[weave] }} aria-hidden />;
}
