"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FilterChips } from "@/components/ui/filter-chips";
import { Lightbox, type LightboxImage } from "@/components/ui/lightbox";
import { cn, mediaSize } from "@/lib/utils";

type Item = LightboxImage & { category?: string };

/** Masonry photo gallery with optional category filter and a lightbox. */
export function Gallery({
  items,
  categories,
  columns = "columns-1 sm:columns-2 lg:columns-3",
  className,
}: {
  items: Item[];
  categories?: { id: string; label: string }[];
  columns?: string;
  className?: string;
}) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [filter, items],
  );

  return (
    <div className={className}>
      {categories && (
        <FilterChips
          className="mb-12 justify-start md:justify-center"
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: "All", count: items.length },
            ...categories.map((c) => ({ ...c, count: items.filter((i) => i.category === c.id).length })),
          ]}
        />
      )}
      <motion.div layout className={cn("gap-5 [column-fill:_balance]", columns)}>
        <AnimatePresence mode="popLayout">
          {visible.map((img, i) => (
            <motion.button
              layout
              key={img.src}
              type="button"
              data-cursor="view"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[4px] bg-bg-alt"
              aria-label={`Open image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                {...mediaSize(img.src)}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-5 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="font-serif text-lg text-ivory italic">{img.alt}</span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <Lightbox images={visible} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
