"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, PenLine } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DiamondIcon, FabricIcon, JacketIcon, ScissorsIcon } from "@/components/brand/icons";
import { MonogramSeal } from "@/components/brand/monogram";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Magnetic } from "@/components/motion/effects";
import { LinkButton } from "@/components/ui/button";
import { VideoButton } from "@/components/ui/video-modal";
import { mainNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { heroFonts } from "./hero-fonts";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 6500;
const GOLD = "var(--lux-gold)";
/** Start time of a CSS entrance ("enter-*" in globals.css). */
const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

// position: which part of the landscape photo to keep when the screen is portrait
const slides = [
  { src: "/media/094d8-how-to-choose-the-right-fabric-for-a-bespoke-suit-in-bangkok-a-tailor-s-perspective.webp", caption: "Cut by hand", position: "62% center" },
  { src: "/media/00d6b-1633604378074.webp", caption: "The fitting", position: "35% center" },
  { src: "/media/1bbe4-ee9f1-1633604348404.webp", caption: "The fabric library", position: "center 40%" },
  { src: "/media/785bf-custom-tailoring-for-tall-slim-builds-in-bangkok.webp", caption: "Chalk, tape and a second fitting", position: "45% center" },
  { src: "/media/a4e69-1633604348465.webp", caption: "The signature bar", position: "center" },
];

const features = [
  { Icon: ScissorsIcon, label: ["Premium", "Craftsmanship"] },
  { Icon: FabricIcon, label: ["Finest", "Fabrics"] },
  { Icon: JacketIcon, label: ["Perfect Fit", "For You"] },
  { Icon: DiamondIcon, label: ["Timeless", "Style"] },
];

const contents = [
  { no: "01", title: "The Collections", sub: "Suits, shirts & coats for him and her", href: "/products" },
  { no: "02", title: "The Fabric Library", sub: "Zegna, VBC, Loro Piana, Drago", href: "/products/fabrics" },
  { no: "03", title: "The Suit in the Round", sub: "Our 360° showroom", href: "/showroom" },
  { no: "04", title: "Three Days, One Suit", sub: "Our tailoring process", href: "/process" },
  { no: "05", title: "Made for Your Feet", sub: "Goodyear-welted shoes", href: "/products/shoes" },
  { no: "06", title: "Notes from the Cutting Table", sub: "The journal", href: "/blog" },
];

/** The shop's wordmark in black-and-champagne dress. */
function LuxWordmark() {
  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span className="font-lux-display text-[1.35rem] font-medium tracking-[0.04em]">
        J<span className="text-[0.82em]">ESSE</span>
        <span className="font-lux-serif mx-[0.28em] text-[0.95em] italic" style={{ color: GOLD }}>
          &amp;
        </span>
        S<span className="text-[0.82em]">ON</span>
      </span>
      <span className="mt-1.5 flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-[color:var(--lux-gold)]/50" />
        <span className="text-[0.5rem] font-medium tracking-[0.45em] uppercase" style={{ color: GOLD }}>
          Bespoke Tailor
        </span>
        <span className="h-px flex-1 bg-[color:var(--lux-gold)]/50" />
      </span>
    </span>
  );
}

/**
 * Navigation laid over the photographs. The site header takes over (solid, white) once the
 * visitor scrolls past the opener.
 */
function HeroNav() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<string | null>(null);

  return (
    <div className="absolute inset-x-0 top-0 z-30 border-b border-[color:var(--lux-fg)]/10" onMouseLeave={() => setMenu(null)}>
      <div className="container-x flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
        <Link href="/" aria-label="Jesse & Son — home" className="shrink-0">
          <LuxWordmark />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-4 2xl:gap-7">
            {mainNav.map((item) => {
              const on = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.label} className="relative" onMouseEnter={() => setMenu(item.children ? item.label : null)}>
                  <Link
                    href={item.href}
                    aria-current={on ? "page" : undefined}
                    onFocus={() => setMenu(item.children ? item.label : null)}
                    className={cn(
                      "group relative flex items-center gap-1 py-3 text-[0.66rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-colors duration-300",
                      on ? "text-[color:var(--lux-gold)]" : "hover:text-[color:var(--lux-gold)]",
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn("size-3 transition-transform duration-300", menu === item.label && "rotate-180")}
                        strokeWidth={1.5}
                      />
                    )}
                    <span
                      className={cn(
                        "absolute right-0 bottom-1 left-0 h-px origin-left bg-[color:var(--lux-gold)] transition-transform duration-500 ease-[var(--ease-luxe)]",
                        on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                  <AnimatePresence>
                    {item.children && menu === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="absolute top-full left-1/2 w-64 -translate-x-1/2 border border-[color:var(--lux-fg)]/10 bg-[color:var(--lux-panel)] py-3 backdrop-blur-md"
                      >
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block px-5 py-2.5 transition-colors hover:bg-[color:var(--lux-fg)]/5">
                              <span className="font-lux-serif block text-[1.15rem] italic">{c.label}</span>
                              {c.description && <span className="block text-[0.78rem] text-[color:var(--lux-fg)]/55">{c.description}</span>}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="size-11 rounded-full border-[color:var(--lux-fg)]/30! hover:border-[color:var(--lux-gold)]!" />
          <Link
            href="/contact#appointment"
            className="group font-lux-serif hidden h-11 items-center gap-2.5 rounded-full border border-[color:var(--lux-gold)]/70 pr-5 pl-4 text-[1.08rem] whitespace-nowrap italic transition-all duration-500 hover:border-[color:var(--lux-gold)] hover:bg-[color:var(--lux-gold)] hover:text-[color:var(--lux-on-gold)] sm:inline-flex"
          >
            <PenLine className="size-4 text-[color:var(--lux-gold)] transition-colors group-hover:text-[color:var(--lux-on-gold)]" strokeWidth={1.4} />
            Design Your Own
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("jesse:open-menu"))}
            aria-label="Open menu"
            className="flex size-11 flex-col items-center justify-center gap-[6px] rounded-full border border-[color:var(--lux-fg)]/25 xl:hidden"
          >
            <span className="h-px w-5 bg-current" />
            <span className="h-px w-3.5 translate-x-[3px] bg-current" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Home page opener: full-screen photographs of the shop, then the "cover" with the editor's letter and contents. */
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
    <>
      <section
        ref={ref}
        className={cn(heroFonts, "lux grain relative isolate flex min-h-[100svh] overflow-hidden")}
        aria-roledescription="carousel"
        aria-label="Jesse & Son"
      >
        <HeroNav />

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
                  preload={index === 0}
                  sizes="100vw"
                  quality={85}
                  className="object-cover"
                  style={{ objectPosition: slides[index].position }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="lux-veil-x absolute inset-0 -z-10" />
        <div className="lux-veil-y absolute inset-0 -z-10" />

        {/* Seal + script flourish. Entrances are CSS (globals.css "enter-*") so they play from the first paint. */}
        <div className="enter-seal absolute top-32 right-6 hidden md:block lg:right-16" style={delay(0.8)}>
          <MonogramSeal className="size-32 text-[color:var(--lux-fg)]/80! lg:size-40" />
        </div>
        <p
          aria-hidden
          className="font-lux-script absolute top-[44%] right-6 hidden -rotate-6 text-6xl leading-[0.8] lg:right-28 lg:block xl:text-7xl"
          style={{ color: GOLD }}
        >
          <span className="enter-wipe block" style={delay(1.4)}>
            Made
            <br />
            <span className="pl-14">to Measure</span>
          </span>
        </p>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="container-x flex w-full flex-col justify-center pt-32 pb-44 md:pb-40"
        >
          <p
            className="enter-track font-sans text-[0.72rem] font-medium tracking-[0.62em] uppercase md:text-sm"
            style={{ color: GOLD, ...delay(0.3) }}
          >
            Bespoke Tailor · Bangkok
          </p>

          <h1 className="font-lux-display mt-5 text-[3.4rem] leading-[0.95] font-normal sm:text-7xl md:text-8xl lg:text-[8.5rem]">
            <span className="sr-only">Jesse &amp; Son — crafted for your story</span>
            <span aria-hidden className="flex flex-wrap items-baseline">
              {["J", "esse", "&", "S", "on"].map((part, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
                  <span
                    className={cn(
                      "enter-rise inline-block",
                      part === "&" && "font-lux-serif mx-[0.18em] italic",
                      (part === "esse" || part === "on") && "text-[0.84em]",
                    )}
                    style={{ ...(part === "&" ? { color: GOLD } : {}), ...delay(0.5 + i * 0.08) }}
                  >
                    {part.toUpperCase()}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <p aria-hidden className="enter-up font-lux-serif mt-2 text-3xl md:ml-[0.4em] md:text-5xl" style={delay(1)}>
            Crafted for <em className="text-gold-gradient pr-1">Your Story</em>
          </p>

          <p
            className="enter-up mt-6 max-w-xl font-sans text-lg leading-relaxed text-[color:var(--lux-fg)]/75 md:ml-[0.6em] md:text-xl"
            style={delay(1.2)}
          >
            Premium bespoke tailoring on Sukhumvit Soi 10 — over 30 years of craftsmanship, timeless design and a
            perfect fit for every occasion.
          </p>

          <div className="enter-up mt-10 flex flex-wrap items-center gap-4 md:ml-[0.6em]" style={delay(1.4)}>
            <Magnetic>
              <Link
                href="/contact#appointment"
                className="btn-gold group/btn font-lux-serif inline-flex h-14 items-center gap-3 rounded-[3px] px-10 text-[1.3rem] whitespace-nowrap italic transition-all duration-500"
              >
                Design Your Own
                <ArrowRight className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" strokeWidth={1.5} />
              </Link>
            </Magnetic>
            <VideoButton youtubeId={site.social.youtubeId} label="Our Workshop" tone="lux" />
          </div>

          <ul className="mt-14 hidden max-w-3xl grid-cols-4 md:ml-[0.6em] md:grid">
            {features.map(({ Icon, label }, i) => (
              <li
                key={label.join()}
                className={cn("enter-up flex items-center gap-4 pr-4", i > 0 && "border-l border-[color:var(--lux-fg)]/15 pl-6")}
                style={delay(1.7 + i * 0.1)}
              >
                <Icon className="size-10 shrink-0" style={{ color: GOLD }} />
                <span className="font-sans text-[0.85rem] leading-snug text-[color:var(--lux-fg)]/80">
                  {label[0]}
                  <br />
                  {label[1]}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Slider controls (kept clear of the floating contact button) */}
        <div className="absolute right-0 bottom-24 left-0 md:bottom-10">
          <div className="container-x flex items-center justify-center gap-6 sm:justify-between md:justify-end md:pr-24">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-lux-serif hidden text-lg text-[color:var(--lux-fg)]/70 italic sm:block md:mr-6"
              >
                {slides[index].caption}
              </motion.p>
            </AnimatePresence>
            <div className="flex items-center gap-3 md:gap-5">
              <button
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="flex size-11 items-center justify-center rounded-full border border-[color:var(--lux-fg)]/40 transition hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)] md:size-12"
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
                        "font-lux-display relative pb-2 text-xs tracking-[0.1em] transition-colors",
                        i === index ? "text-[color:var(--lux-fg)]" : "text-[color:var(--lux-fg)]/45 hover:text-[color:var(--lux-fg)]/80",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                      <span className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--lux-fg)]/20" />
                      {i === index && (
                        <motion.span
                          key={`${index}-${paused}`}
                          className="absolute bottom-0 left-0 h-px bg-[color:var(--lux-gold)]"
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
                className="flex size-11 items-center justify-center rounded-full border border-[color:var(--lux-gold)] text-[color:var(--lux-gold)] transition hover:bg-[color:var(--lux-gold)] hover:text-[color:var(--lux-on-gold)] md:size-12"
              >
                <ChevronRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The cover: editor's letter and contents */}
      <section className="border-b border-line">
        <div className="container-x">
          <div className="flex items-center justify-between gap-4 border-b border-fg py-3 font-sans text-[0.62rem] tracking-[0.24em] uppercase">
            <span>The Tailoring Issue</span>
            <span className="hidden text-muted md:inline">Thirty years of bespoke — from Udonthani to Sukhumvit</span>
            <span className="text-accent">Bangkok</span>
          </div>

          <div className="grid gap-12 pt-10 pb-14 lg:grid-cols-12 lg:gap-10 lg:pt-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE }}
              className="lg:col-span-5"
            >
              <p className="eyebrow text-accent">Editor&apos;s letter</p>
              <p className="drop-cap mt-5 text-[1.15rem] leading-relaxed">
                For three decades, Jesse and his sons have cut suits, shirts and coats by hand on Sukhumvit Soi 10 —
                one pattern per client, drafted from more than twenty measurements, finished with horn buttons and
                Bemberg linings.
              </p>
              <div className="mt-8">
                <LinkButton href="/about" variant="outline">
                  Our story
                </LinkButton>
              </div>
            </motion.div>

            <motion.nav
              aria-label="In this issue"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
              className="lg:col-span-7"
            >
              <p className="eyebrow">In this issue</p>
              <ol className="mt-4 grid border-t border-fg sm:grid-cols-2 sm:gap-x-8">
                {contents.map((c) => (
                  <motion.li
                    key={c.no}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                    className="border-b border-line"
                  >
                    <Link href={c.href} className="group grid grid-cols-[2.2rem_1fr] gap-2 py-4">
                      <span className="font-serif text-lg text-accent">{c.no}</span>
                      <span>
                        <span className="block font-serif text-[1.35rem] leading-tight transition-all group-hover:italic">
                          {c.title}
                        </span>
                        <span className="mt-1 block text-[0.92rem] text-muted">{c.sub}</span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ol>
            </motion.nav>
          </div>
        </div>
      </section>
    </>
  );
}
