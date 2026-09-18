"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";
import type { Testimonial } from "@/content/testimonials";

function Card({ t, index }: { t: Testimonial; index: number }) {
  const [open, setOpen] = useState(false);
  const full = t.paragraphs;
  const long = full.join(" ").length > 360;
  const preview = long ? [`${full.join(" ").slice(0, 340).replace(/\s+\S*$/, "")}…`] : full;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mb-6 break-inside-avoid border border-line-soft bg-elevated p-8 transition-colors duration-500 hover:border-accent/40 md:p-10"
    >
      <span aria-hidden className="absolute top-4 right-6 font-serif text-7xl leading-none text-accent/15 transition-colors group-hover:text-accent/30">
        ”
      </span>
      <div className="flex gap-0.5 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-5 font-serif text-2xl leading-snug italic">“{t.title ?? t.quote}”</p>
      <blockquote className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-muted">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={open ? "full" : "short"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {(open ? full : preview).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </AnimatePresence>
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 text-[0.7rem] font-medium tracking-[0.25em] text-accent uppercase hover:underline"
        >
          {open ? "Show less" : "Read full review"}
        </button>
      )}
      <figcaption className="mt-8 flex items-center gap-4 border-t border-line-soft pt-6">
        {t.avatar && (
          <span className="relative size-11 overflow-hidden rounded-full border border-accent/30">
            <Image src={t.avatar} alt="" fill sizes="44px" className="object-cover" />
          </span>
        )}
        <span>
          <span className="block font-display text-sm tracking-[0.12em]">{t.name}</span>
          <span className="block text-[0.65rem] tracking-[0.22em] text-accent uppercase">Google review</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function TestimonialWall({ items }: { items: Testimonial[] }) {
  return (
    <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
      {items.map((t, i) => (
        <Card key={t.name} t={t} index={i} />
      ))}
    </div>
  );
}
