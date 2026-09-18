"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 60 },
  right: { x: -60 },
  fade: {},
  scale: { scale: 0.92 },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  amount?: number;
  as?: "div" | "section" | "li" | "span" | "article" | "p" | "h2";
};

/** Fades and slides its children in once they scroll into view. */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.9,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** Staggers any <RevealItem> children as the group enters the viewport. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  amount = 0.15,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}

/** Image wrapper that uncovers its content with a clip-path wipe. */
export function MaskReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right" | "top";
  delay?: number;
}) {
  const start = {
    bottom: "inset(100% 0% 0% 0%)",
    top: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[from];
  // The in-view trigger lives on an unclipped wrapper: browsers treat an
  // element's own clip-path as "not visible" for IntersectionObserver.
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[inherit]"
        variants={{
          hidden: { clipPath: start },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, delay, ease: EASE } },
        }}
      >
        <motion.div
          className="relative h-full w-full"
          variants={{
            hidden: { scale: 1.25 },
            show: { scale: 1, transition: { duration: 1.6, delay, ease: EASE } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
