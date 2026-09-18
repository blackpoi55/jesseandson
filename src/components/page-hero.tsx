"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial article opener: folio line with breadcrumb, a very large
 * Didone headline, standfirst beside it, then a wide photograph with
 * a caption rule — like the first spread of a magazine feature.
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
  caption,
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
  caption?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const centered = align === "center";

  return (
    <section className="border-b border-line">
      <div className="container-x pt-8 md:pt-10">
        {/* Folio line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-4 border-b border-fg pb-3"
        >
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-2 font-sans text-[0.62rem] tracking-[0.22em] text-muted uppercase">
              <li>
                <Link href="/" className="hover:text-fg">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {c.href ? (
                    <Link href={c.href} className="hover:text-fg">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-fg" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <span className="flex-1" />
          <p className="eyebrow hidden text-accent sm:block">{eyebrow}</p>
        </motion.div>

        <div className={cn("pt-12 pb-10 md:pt-16 md:pb-14", centered && "text-center")}>
          <p className="eyebrow text-accent sm:hidden">{eyebrow}</p>
          <SplitText
            as="h1"
            animateOnMount
            delay={0.15}
            text={title}
            className={cn(
              "mt-4 font-serif text-[3rem] leading-[0.98] font-normal tracking-[-0.015em] sm:mt-0 sm:text-6xl md:text-7xl lg:text-[6.4rem]",
              centered ? "mx-auto max-w-5xl" : "max-w-6xl",
            )}
          />
          {(script || lead || children) && (
            <div className={cn("mt-10 grid gap-8 md:grid-cols-12", centered && "justify-items-center")}>
              {script && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: EASE }}
                  className="font-serif text-2xl text-muted italic md:col-span-5 md:text-3xl"
                >
                  {script}
                </motion.p>
              )}
              {(lead || children) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: EASE }}
                  className={cn(script ? "md:col-span-6 md:col-start-7" : "md:col-span-7 md:col-start-6")}
                >
                  {lead && <p className="text-[1.2rem] leading-relaxed text-muted md:text-[1.3rem]">{lead}</p>}
                  {children && <div className="mt-8">{children}</div>}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lead photograph */}
      <div className="container-x pb-10">
        <motion.div
          ref={ref}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
          className={cn(
            "relative overflow-hidden bg-bg-alt",
            size === "lg" ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[16/9] md:aspect-[5/2]",
          )}
        >
          <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
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
        <div className="mt-3 flex items-baseline justify-between gap-6 font-sans text-[0.62rem] tracking-[0.2em] text-muted uppercase">
          <span>{caption ?? eyebrow}</span>
          <span className="hidden sm:inline">Jesse &amp; Son · Sukhumvit Soi 10, Bangkok</span>
        </div>
      </div>
    </section>
  );
}
