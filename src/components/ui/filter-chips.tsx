"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";

/** Pill filter with a sliding gold indicator. */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { id: T; label: string; count?: number }[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  const layoutId = useId();
  return (
    <div role="tablist" className={cn("no-scrollbar flex gap-2 overflow-x-auto pb-1", className)}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.id)}
            className={cn(
              "relative shrink-0 rounded-full border px-5 py-2.5 text-[0.72rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300",
              active ? "border-transparent text-ink" : "border-line text-muted hover:border-gold/60 hover:text-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="btn-gold absolute inset-0 -z-0 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">
              {o.label}
              {o.count !== undefined && <span className="ml-2 opacity-60">{o.count}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
