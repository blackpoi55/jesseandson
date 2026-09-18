"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { FilterChips } from "@/components/ui/filter-chips";
import { faqCategories, faqs, type FaqCategory } from "@/content/faq";

const strip = (html: string) => html.replace(/<[^>]+>/g, " ");

export function FaqBrowser() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<FaqCategory | "all">("all");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        (cat === "all" || f.category === cat) &&
        (!term || f.q.toLowerCase().includes(term) || strip(f.a).toLowerCase().includes(term)),
    );
  }, [q, cat]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-0 size-5 -translate-y-1/2 text-gold" strokeWidth={1.5} />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search questions — e.g. “3 days”, “buttons”, “shipping”"
          aria-label="Search frequently asked questions"
          className="w-full border-0 border-b border-line bg-transparent py-5 pr-10 pl-9 font-serif text-2xl text-fg outline-none placeholder:text-subtle focus:border-gold md:text-3xl"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear search" className="absolute top-1/2 right-0 -translate-y-1/2 text-muted hover:text-gold">
            <X className="size-5" />
          </button>
        )}
      </div>

      <FilterChips
        className="mt-8"
        value={cat}
        onChange={setCat}
        options={[
          { id: "all" as const, label: "All", count: faqs.length },
          ...faqCategories.map((c) => ({ id: c.id, label: c.label, count: faqs.filter((f) => f.category === c.id).length })),
        ]}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${cat}-${q}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-10"
        >
          {results.length ? (
            <Accordion
              items={results.map((f) => ({
                id: f.q,
                title: f.q,
                content: <div dangerouslySetInnerHTML={{ __html: f.a }} />,
              }))}
              defaultOpen={q ? results[0]?.q : null}
            />
          ) : (
            <p className="py-16 text-center font-serif text-2xl text-muted italic">
              Nothing matched — try another word, or ask us directly below.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
