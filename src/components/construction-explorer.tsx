"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterChips } from "@/components/ui/filter-chips";
import { construction, type ConstructionPart } from "@/content/construction";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Jacket / shirt / pants explorer. Hovering (or tapping) a detail brings its
 * close-up into a round "loupe" beside the floating garment.
 */
export function ConstructionExplorer() {
  const [tab, setTab] = useState<ConstructionPart["id"]>("jacket");
  const [detail, setDetail] = useState(0);
  const part = construction.find((c) => c.id === tab)!;

  const select = (id: ConstructionPart["id"]) => {
    setTab(id);
    setDetail(0);
  };

  // Sync with #jacket / #shirt / #pants deep links from product pages.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (construction.some((c) => c.id === id)) {
        setTab(id as ConstructionPart["id"]);
        setDetail(0);
      }
    };
    const t = setTimeout(fromHash, 0);
    window.addEventListener("hashchange", fromHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  return (
    <div>
      <div id={tab} className="flex justify-center">
        <FilterChips
          value={tab}
          onChange={(id) => {
            select(id);
            history.replaceState(null, "", `#${id}`);
          }}
          options={construction.map((c) => ({ id: c.id, label: c.label }))}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-16 grid items-start gap-14 lg:grid-cols-[1fr_1.05fr]"
        >
          {/* Garment + loupe */}
          <div className="relative lg:sticky lg:top-28">
            <div className="relative mx-auto aspect-square w-full max-w-xl">
              <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,var(--gold-soft)_0%,transparent_70%)] blur-2xl" />
              <motion.div
                className="absolute inset-0"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src={part.image} alt={part.label} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-contain drop-shadow-2xl" priority />
              </motion.div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${tab}-${detail}`}
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="absolute -right-2 -bottom-4 size-40 overflow-hidden rounded-full border-4 border-bg shadow-card ring-1 ring-gold/60 md:size-52"
                >
                  <Image src={part.details[detail].image} alt={part.details[detail].title} fill sizes="208px" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <span className="absolute -right-2 -bottom-4 flex size-10 translate-x-2 translate-y-2 items-center justify-center rounded-full bg-gold font-display text-sm text-ink md:size-12">
                {String(detail + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="eyebrow">{part.label} details</p>
            <h3 className="mt-4 font-serif text-5xl leading-[1.05] md:text-6xl">{part.title}</h3>
            <ol className="mt-10 border-t border-line">
              {part.details.map((d, i) => (
                <li key={d.title} className="border-b border-line">
                  <button
                    type="button"
                    onMouseEnter={() => setDetail(i)}
                    onFocus={() => setDetail(i)}
                    onClick={() => setDetail(i)}
                    className="group grid w-full grid-cols-[3rem_1fr] gap-4 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-lg transition-colors duration-300",
                        i === detail ? "text-gold" : "text-subtle",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-serif text-2xl transition-colors duration-300 md:text-[1.7rem]",
                          i === detail ? "text-gold" : "group-hover:text-gold",
                        )}
                      >
                        {d.title}
                      </span>
                      <span className="mt-2 block leading-relaxed text-muted">{d.body}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="mt-12 rounded-[4px] border border-line bg-bg-alt p-8">
              <p className="eyebrow">Customisable options</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {part.options.map((o) => (
                  <li key={o} className="flex items-center gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                      <Check className="size-3.5" strokeWidth={2} />
                    </span>
                    {o}
                  </li>
                ))}
                <li className="flex items-center gap-3 font-serif text-lg text-gold italic sm:col-span-2">
                  …plus many more choices in store.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
