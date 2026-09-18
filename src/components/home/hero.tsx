"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DiamondIcon, FabricIcon, JacketIcon, ScissorsIcon } from "@/components/brand/icons";
import { MonogramSeal } from "@/components/brand/monogram";
import { LinkButton } from "@/components/ui/button";
import { VideoButton } from "@/components/ui/video-modal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 6000;

const slides = [
  { src: "/media/d4da7-bangkok-bespoke-tailoring.webp", caption: "Hand-finished in Bangkok", position: "68% center" },
  { src: "/media/2e354-image1.webp", caption: "The fitting", position: "62% center" },
  { src: "/media/1bbe4-ee9f1-1633604348404.webp", caption: "The fabric library", position: "center 40%" },
  { src: "/media/e49f4-image12.webp", caption: "Ready for collection", position: "center" },
  { src: "/media/a4e69-1633604348465.webp", caption: "The signature bar", position: "center" },
];

const contents = [
  { no: "01", title: "The Collections", sub: "Suits, shirts & coats for him and her", href: "/products" },
  { no: "02", title: "The Fabric Library", sub: "Zegna, VBC, Loro Piana, Drago", href: "/products/fabrics" },
  { no: "03", title: "Three Days, One Suit", sub: "Our tailoring process", href: "/process" },
  { no: "04", title: "Made for Your Feet", sub: "Goodyear-welted shoes", href: "/products/shoes" },
  { no: "05", title: "Notes from the Cutting Table", sub: "The journal", href: "/blog" },
];

const features = [
  { Icon: ScissorsIcon, label: "Premium craftsmanship" },
  { Icon: FabricIcon, label: "Finest fabrics" },
  { Icon: JacketIcon, label: "Perfect fit for you" },
  { Icon: DiamondIcon, label: "Timeless style" },
];

/** Home page "cover": masthead headline, lead photograph and an "In this issue" index. */
export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((step: number) => setIndex((i) => (i + step + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const words = ["Crafted", "for", "your", "story."];

  return (
    <section className="border-b border-line">
      <div className="container-x">
        {/* Issue line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between gap-4 border-b border-fg py-3 font-sans text-[0.62rem] tracking-[0.24em] uppercase"
        >
          <span>The Tailoring Issue</span>
          <span className="hidden text-muted md:inline">Thirty years of bespoke — from Udonthani to Sukhumvit</span>
          <span className="text-accent">Bangkok</span>
        </motion.div>

        {/* Cover headline */}
        <h1 className="pt-8 pb-6 font-serif leading-[0.9] font-normal tracking-[-0.025em] text-[clamp(3.3rem,10.5vw,10.5rem)] md:pt-10">
          <span className="sr-only">Jesse &amp; Son — crafted for your story</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.22em]">
            {words.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={cn("inline-block", w === "your" && "text-accent italic")}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.09, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <div className="grid gap-10 border-t border-line pt-8 pb-12 lg:grid-cols-12 lg:gap-8">
          {/* Standfirst */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
            className="order-2 lg:order-1 lg:col-span-3"
          >
            <p className="eyebrow text-accent">Editor&apos;s letter</p>
            <p className="drop-cap mt-5 text-[1.12rem] leading-relaxed">
              For three decades, Jesse and his sons have cut suits, shirts and coats by hand on Sukhumvit Soi 10 —
              one pattern per client, drafted from more than twenty measurements, finished with horn buttons and
              Bemberg linings.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <LinkButton href="/contact#appointment">Book a fitting</LinkButton>
              <VideoButton youtubeId={site.social.youtubeId} label="Watch our workshop" />
            </div>
          </motion.div>

          {/* Lead photograph */}
          <div
            className="order-1 lg:order-2 lg:col-span-6"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
          >
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
              className="relative aspect-[4/5] overflow-hidden bg-bg-alt sm:aspect-[5/4] lg:aspect-[4/5]"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0" style={{ animation: `kenburns ${DURATION + 1500}ms ease-out forwards` }}>
                    <Image
                      src={slides[index].src}
                      alt={slides[index].caption}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: slides[index].position }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              <MonogramSeal className="absolute top-5 right-5 size-24 text-white/90 md:size-28" />
            </motion.div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="font-sans text-[0.62rem] tracking-[0.22em] text-muted uppercase"
                >
                  Fig. {String(index + 1).padStart(2, "0")} — {slides[index].caption}
                </motion.p>
              </AnimatePresence>
              <div className="flex items-center gap-3">
                <button onClick={() => go(-1)} aria-label="Previous photograph" className="p-1 transition hover:text-accent">
                  <ArrowLeft className="size-4" strokeWidth={1.5} />
                </button>
                <span className="font-sans text-[0.62rem] tracking-[0.2em] tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <button onClick={() => go(1)} aria-label="Next photograph" className="p-1 transition hover:text-accent">
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <div className="mt-2 h-px w-full bg-line">
              <motion.div
                key={`${index}-${paused}`}
                className="h-px bg-fg"
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{ duration: paused ? 0.2 : DURATION / 1000, ease: "linear" }}
              />
            </div>
          </div>

          {/* In this issue */}
          <motion.nav
            aria-label="In this issue"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
            className="order-3 lg:col-span-3"
          >
            <p className="eyebrow">In this issue</p>
            <ol className="mt-4 border-t border-fg">
              {contents.map((c) => (
                <motion.li
                  key={c.no}
                  variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
                  className="border-b border-line"
                >
                  <Link href={c.href} className="group grid grid-cols-[2.2rem_1fr] gap-2 py-4">
                    <span className="font-serif text-lg text-accent">{c.no}</span>
                    <span>
                      <span className="block font-serif text-[1.35rem] leading-tight transition-all group-hover:italic">{c.title}</span>
                      <span className="mt-1 block text-[0.92rem] text-muted">{c.sub}</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ol>
          </motion.nav>
        </div>
      </div>

      {/* Feature strip */}
      <motion.ul
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
        className="container-x grid grid-cols-2 border-t border-line md:grid-cols-4"
      >
        {features.map(({ Icon, label }, i) => (
          <motion.li
            key={label}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className={cn(
              "flex items-center gap-4 py-6",
              i % 2 === 1 && "border-l border-line pl-5 md:pl-8",
              i === 2 && "md:border-l md:pl-8",
            )}
          >
            <Icon className="size-9 shrink-0 text-accent" />
            <span className="font-sans text-[0.66rem] tracking-[0.22em] uppercase">{label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
