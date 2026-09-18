"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { FilterChips } from "@/components/ui/filter-chips";
import { Lightbox } from "@/components/ui/lightbox";
import { shoeModels, shoeTypes, type ShoeType } from "@/content/shoes";

export function ShoeGallery() {
  const [type, setType] = useState<ShoeType | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = type === "all" ? shoeModels : shoeModels.filter((s) => s.type === type);

  return (
    <>
      <FilterChips
        value={type}
        onChange={setType}
        options={[
          { id: "all" as const, label: "All designs", count: shoeModels.length },
          ...shoeTypes.map((t) => ({ id: t.id, label: t.label, count: shoeModels.filter((s) => s.type === t.id).length })),
        ]}
      />
      <motion.ul layout className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        <AnimatePresence mode="popLayout">
          {list.map((s, i) => (
            <motion.li
              layout
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.55, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            >
              <button type="button" onClick={() => setOpen(i)} data-cursor="view" className="group block w-full text-left">
                <div className="relative aspect-square overflow-hidden bg-[#111]">
                  <Image
                    src={s.image}
                    alt={`${s.name} — ${s.description}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[0.6rem] tracking-[0.2em] text-champagne uppercase backdrop-blur">
                    {shoeTypes.find((t) => t.id === s.type)?.label}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl transition-colors group-hover:text-accent">{s.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.description}</p>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <Lightbox
        images={list.map((s) => ({ src: s.image, alt: s.name, caption: `${s.name} — ${s.description}` }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </>
  );
}
