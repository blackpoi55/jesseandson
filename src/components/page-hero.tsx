"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed cinematic page header: slow zoom + parallax photo,
 * breadcrumb, eyebrow, split-text title and an optional script flourish.
 */
export function PageHero({
  image,
  eyebrow,
  title,
  script,
  lead,
  crumbs = [],
  align = "left",
  size = "lg",
  imagePosition = "center",
  children,
}: {
  image: string;
  eyebrow: string;
  title: string;
  script?: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
  align?: "left" | "center";
  size?: "md" | "lg";
  imagePosition?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className={cn(
        "grain relative isolate flex overflow-hidden bg-ink text-ivory",
        size === "lg" ? "min-h-[82svh] md:min-h-[88svh]" : "min-h-[60svh] md:min-h-[66svh]",
      )}
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

      <motion.div
        style={{ opacity: fade }}
        className={cn(
          "container-x flex w-full flex-col justify-end pt-36 pb-16 md:pb-24",
          align === "center" && "items-center text-center",
        )}
      >
        {crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mb-8"
          >
            <ol className="flex flex-wrap items-center gap-2 text-[0.68rem] tracking-[0.22em] text-ivory/60 uppercase">
              <li>
                <Link href="/" className="hover:text-champagne">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <ChevronRight className="size-3" strokeWidth={1.5} />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-champagne">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-champagne" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.42em" }}
          transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
          className="eyebrow text-champagne"
        >
          {eyebrow}
        </motion.p>
        <SplitText
          as="h1"
          animateOnMount
          delay={0.45}
          text={title}
          className="mt-5 max-w-5xl font-serif text-[3rem] leading-[0.98] font-light sm:text-6xl md:text-7xl lg:text-[6.2rem]"
        />
        {script && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
            className={cn("font-script -mt-1 text-4xl text-champagne md:text-6xl", align === "left" && "md:pl-[8%]")}
          >
            {script}
          </motion.p>
        )}
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-ivory/75 md:text-xl"
          >
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] tracking-[0.4em] text-ivory/50 uppercase md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-champagne"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
