"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionEntry = { id: string; title: React.ReactNode; content: React.ReactNode };

/** Hairline accordion — one panel open at a time, animated height. */
export function Accordion({
  items,
  defaultOpen,
  className,
}: {
  items: AccordionEntry[];
  defaultOpen?: string | null;
  className?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const uid = useId();

  return (
    <div className={cn("border-t border-fg", className)}>
      {items.map((item, i) => {
        const isOpen = open === item.id;
        const panelId = `${uid}-panel-${i}`;
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
              >
                <span
                  className={cn(
                    "font-serif text-xl leading-snug transition-colors duration-300 md:text-2xl",
                    isOpen ? "text-accent" : "text-fg group-hover:text-accent",
                  )}
                >
                  {item.title}
                </span>
                <span
                  className={cn(
                    "mt-1 flex size-9 shrink-0 items-center justify-center border transition-all duration-500",
                    isOpen ? "rotate-45 border-fg bg-fg text-bg" : "border-line text-fg group-hover:border-fg",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl pb-8 text-[1.02rem] leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-4 [&_strong]:font-medium [&_strong]:text-fg">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
