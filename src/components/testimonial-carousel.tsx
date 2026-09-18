"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GoogleIcon } from "@/components/brand/icons";
import { testimonials } from "@/content/testimonials";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Large pull-quote carousel with drag, autoplay and avatar strip. */
export function TestimonialCarousel() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const t = testimonials[index];

  const go = useCallback(
    (step: number) => setState(([i]) => [(i + step + testimonials.length) % testimonials.length, step]),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), 7000);
    return () => clearTimeout(id);
  }, [index, paused, go]);

  const excerpt = t.paragraphs.join(" ");
  const short = excerpt.length > 320 ? `${excerpt.slice(0, 320).replace(/\s+\S*$/, "")}…` : excerpt;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={site.social.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-2.5 transition hover:border-accent"
        >
          <GoogleIcon className="size-5" />
          <span className="flex gap-0.5 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" strokeWidth={0} />
            ))}
          </span>
          <span className="text-sm text-muted">Verified Google reviews</span>
        </a>
      </div>

      <div className="relative mx-auto mt-14 min-h-[22rem] max-w-4xl text-center md:min-h-[19rem]">
        <span aria-hidden className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 font-serif text-[12rem] leading-none text-accent/15">
          “
        </span>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: dir * -60, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
            className="relative cursor-grab active:cursor-grabbing"
          >
            <blockquote>
              <p className="font-serif text-3xl leading-tight text-fg italic md:text-[2.6rem]">“{t.title ?? t.quote}”</p>
              <p className="mx-auto mt-7 max-w-3xl text-[1.02rem] leading-relaxed text-muted">{short}</p>
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              {t.avatar && (
                <span className="relative size-12 overflow-hidden rounded-full border border-accent/40">
                  <Image src={t.avatar} alt="" fill sizes="48px" className="object-cover" />
                </span>
              )}
              <span className="text-left">
                <span className="block font-display text-sm tracking-[0.15em]">{t.name}</span>
                <span className="block text-xs tracking-[0.2em] text-accent uppercase">Google review</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-5">
        <button
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="flex size-12 items-center justify-center rounded-full border border-line transition hover:border-accent hover:text-accent"
        >
          <ChevronLeft className="size-4" strokeWidth={1.5} />
        </button>
        <div className="flex max-w-[60vw] items-center gap-1.5 overflow-hidden">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Review by ${item.name}`}
              className="group p-1"
            >
              <span
                className={cn(
                  "block h-1 rounded-full transition-all duration-500",
                  i === index ? "w-8 bg-accent" : "w-2 bg-line group-hover:bg-accent/50",
                )}
              />
            </button>
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next review"
          className="flex size-12 items-center justify-center rounded-full border border-accent text-accent transition hover:bg-accent hover:text-ink"
        >
          <ChevronRight className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
