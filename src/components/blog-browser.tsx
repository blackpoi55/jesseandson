"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import type { PostSummary } from "@/lib/blog";

const PAGE = 9;

export function BlogBrowser({ posts }: { posts: PostSummary[] }) {
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(term));
  }, [q, posts]);

  const shown = results.slice(0, limit);

  return (
    <div>
      <div className="relative mx-auto max-w-2xl">
        <Search className="pointer-events-none absolute top-1/2 left-0 size-5 -translate-y-1/2 text-gold" strokeWidth={1.5} />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setLimit(PAGE);
          }}
          placeholder="Search the journal — fabrics, weddings, shirts…"
          aria-label="Search articles"
          className="w-full border-0 border-b border-line bg-transparent py-5 pr-10 pl-9 font-serif text-2xl text-fg outline-none placeholder:text-subtle focus:border-gold"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear search" className="absolute top-1/2 right-0 -translate-y-1/2 text-muted hover:text-gold">
            <X className="size-5" />
          </button>
        )}
        <p className="mt-3 text-center text-[0.7rem] tracking-[0.25em] text-subtle uppercase">
          {results.length} article{results.length === 1 ? "" : "s"}
        </p>
      </div>

      {shown.length ? (
        <motion.div layout className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div
                layout
                key={p.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: (i % PAGE) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <PostCard post={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="py-20 text-center font-serif text-2xl text-muted italic">No articles matched “{q}”.</p>
      )}

      {limit < results.length && (
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => setLimit((l) => l + PAGE)}
            className="group inline-flex h-14 items-center gap-3 rounded-full border border-gold/70 px-10 font-serif text-xl italic transition-all duration-500 hover:bg-gold hover:text-ink"
          >
            Load more articles
            <span className="text-sm text-gold transition-colors group-hover:text-ink">
              ({results.length - limit} more)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
