"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Headline whose words rise out of a mask one after another.
 * Wrap a word in *asterisks* to render it as an italic gold accent.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  as = "h2",
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animateOnMount?: boolean;
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={className} aria-label={text.replaceAll("*", "")} {...trigger}>
      {words.map((word, i) => {
        const accent = word.startsWith("*") && word.endsWith("*");
        const clean = word.replaceAll("*", "");
        return (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn("inline-block", accent && "font-serif italic text-gold")}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 1, delay: delay + i * stagger, ease: EASE },
                },
              }}
            >
              {clean}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </Tag>
  );
}
