"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DiamondIcon, FabricIcon, JacketIcon, ScissorsIcon } from "@/components/brand/icons";
import { MonogramSeal } from "@/components/brand/monogram";
import { Magnetic } from "@/components/motion/effects";
import { LinkButton } from "@/components/ui/button";
import { VideoButton } from "@/components/ui/video-modal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 6500;

const slides = [
  { src: "/media/d4da7-bangkok-bespoke-tailoring.webp", caption: "Hand-finished in Bangkok", position: "70% center" },
  { src: "/media/1bbe4-ee9f1-1633604348404.webp", caption: "The fabric library", position: "center 40%" },
  { src: "/media/2e354-image1.webp", caption: "The fitting", position: "65% center" },
  { src: "/media/094d8-how-to-choose-the-right-fabric-for-a-bespoke-suit-in-bangkok-a-tailor-s-perspective.webp", caption: "Cut by hand", position: "center" },
  { src: "/media/a4e69-1633604348465.webp", caption: "The signature bar", position: "center" },
];

const features = [
  { Icon: ScissorsIcon, label: ["Premium", "Craftsmanship"] },
  { Icon: FabricIcon, label: ["Finest", "Fabrics"] },
  { Icon: JacketIcon, label: ["Perfect Fit", "For You"] },
  { Icon: DiamondIcon, label: ["Timeless", "Style"] },
];

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const go = useCallback((step: number) => setIndex((i) => (i + step + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      ref={ref}
      className="grain relative isolate flex min-h-[100svh] overflow-hidden bg-ink text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <div className="absolute inset-0" style={{ animation: `kenburns ${DURATION + 2000}ms ease-out forwards` }}>
              <Image
                src={slides[index].src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slides[index].position }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-transparent to-black/60" />

      {/* Seal + script flourish */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.6, delay: 0.8, ease: EASE }}
        className="absolute top-32 right-6 hidden md:block lg:right-16"
      >
        <MonogramSeal className="size-32 text-ivory/80 lg:size-40" />
      </motion.div>
      <motion.p
        aria-hidden
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 2, delay: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="font-script absolute top-[44%] right-6 hidden -rotate-6 text-6xl leading-[0.8] text-champagne/90 lg:right-28 lg:block xl:text-7xl"
      >
        Made
        <br />
        <span className="pl-14">to Measure</span>
      </motion.p>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x flex w-full flex-col justify-center pt-32 pb-44 md:pb-40"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.62em" }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          className="text-[0.72rem] font-medium text-champagne uppercase md:text-sm"
        >
          Bespoke Tailor · Bangkok
        </motion.p>

        <h1 className="mt-5 font-display text-[3.4rem] leading-[0.95] font-normal sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <span className="sr-only">Jesse &amp; Son — crafted for your story</span>
          <span aria-hidden className="flex flex-wrap items-baseline">
            {["J", "esse", "&", "S", "on"].map((part, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={cn(
                    "inline-block",
                    part === "&" && "mx-[0.18em] font-serif text-champagne italic",
                    (part === "esse" || part === "on") && "text-[0.84em]",
                  )}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.08, ease: EASE }}
                >
                  {part.toUpperCase()}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>
        <motion.p
          aria-hidden
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: EASE }}
          className="mt-2 font-serif text-3xl md:ml-[0.4em] md:text-5xl"
        >
          Crafted for <em className="text-gold-gradient pr-1">Your Story</em>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/75 md:ml-[0.6em] md:text-xl"
        >
          Premium bespoke tailoring on Sukhumvit Soi 10 — over 30 years of craftsmanship, timeless design and a
          perfect fit for every occasion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4 md:ml-[0.6em]"
        >
          <Magnetic>
            <LinkButton href="/contact#appointment" size="lg" className="px-10">
              Design Your Own
            </LinkButton>
          </Magnetic>
          <VideoButton youtubeId={site.social.youtubeId} label="Our Workshop" />
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.7 } } }}
          className="mt-14 hidden max-w-3xl grid-cols-4 md:ml-[0.6em] md:grid"
        >
          {features.map(({ Icon, label }, i) => (
            <motion.li
              key={label.join()}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              className={cn("flex items-center gap-4 pr-4", i > 0 && "border-l border-ivory/15 pl-6")}
            >
              <Icon className="size-10 shrink-0 text-champagne" />
              <span className="text-[0.85rem] leading-snug text-ivory/80">
                {label[0]}
                <br />
                {label[1]}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Slider controls */}
      <div className="absolute right-0 bottom-28 left-0 md:bottom-12">
        <div className="container-x flex items-center justify-center gap-6 sm:justify-between md:justify-end">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="hidden font-serif text-lg text-ivory/70 italic sm:block md:mr-6"
            >
              {slides[index].caption}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-full border border-ivory/40 transition hover:border-champagne hover:text-champagne md:size-12"
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} />
            </button>
            <ol className="flex items-center gap-3 md:gap-4">
              {slides.map((s, i) => (
                <li key={s.src}>
                  <button
                    onClick={() => setIndex(i)}
                    aria-label={`Slide ${i + 1}: ${s.caption}`}
                    aria-current={i === index}
                    className={cn(
                      "relative pb-2 font-display text-xs tracking-[0.1em] transition-colors",
                      i === index ? "text-ivory" : "text-ivory/45 hover:text-ivory/80",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                    <span className="absolute inset-x-0 bottom-0 h-px bg-ivory/20" />
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="absolute bottom-0 left-0 h-px bg-champagne"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: paused ? 0.3 : DURATION / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ol>
            <button
              onClick={() => go(1)}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-full border border-champagne text-champagne transition hover:bg-champagne hover:text-ink md:size-12"
            >
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
