"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { reasons } from "@/content/about";
import { ArrowCircle } from "@/components/ui/button";

/**
 * Six reasons presented as a pinned horizontal gallery on large screens:
 * scrolling down moves the cards sideways. Falls back to a swipeable row.
 */
export function ReasonsScroller() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      // Only pin-and-slide on large screens; smaller screens swipe natively.
      if (window.innerWidth < 1024) return setDistance(0);
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section ref={ref} className="relative bg-bg-alt lg:h-[320vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="container-x flex flex-col gap-6 pt-24 pb-12 md:flex-row md:items-end md:justify-between lg:pt-10">
          <div>
            <p className="eyebrow flex items-center gap-4">
              <span className="h-px w-8 bg-accent/60" />
              Why Jesse &amp; Son
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
              Six simple <em className="text-accent">reasons.</em>
            </h2>
          </div>
          <div className="hidden w-64 lg:block">
            <div className="h-px w-full bg-line">
              <motion.div style={{ width: progress }} className="h-px bg-accent" />
            </div>
            <p className="mt-3 text-xs tracking-[0.3em] text-subtle uppercase">Scroll to explore</p>
          </div>
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-24 md:px-10 lg:snap-none lg:overflow-visible lg:px-16 lg:pb-0"
        >
          {reasons.map((r, i) => (
            <article
              key={r.title}
              className="group relative flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden border border-line-soft bg-elevated sm:w-[26rem] lg:w-[30rem]"
            >
              <div className="relative aspect-[4/3] overflow-hidden" data-cursor="view">
                <Image
                  src={r.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30rem, 82vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-110"
                />
                <span className="absolute top-5 left-5 font-display text-6xl text-ivory/90 drop-shadow-lg">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-serif text-3xl">{r.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">{r.body}</p>
                <Link href={r.link.href} className="mt-8 flex items-center justify-between text-accent">
                  <span className="text-[0.7rem] font-medium tracking-[0.28em] uppercase">{r.link.label}</span>
                  <ArrowCircle className="size-10 border-accent/50 group-hover:bg-accent group-hover:text-ink" />
                </Link>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
