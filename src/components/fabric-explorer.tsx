"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FilterChips } from "@/components/ui/filter-chips";
import { LinkButton } from "@/components/ui/button";
import { useMounted } from "@/lib/hooks";
import { fabricGroups, fabrics, type Fabric, type FabricGroup } from "@/content/fabrics";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FabricExplorer() {
  const [group, setGroup] = useState<FabricGroup | "all">("all");
  const [selected, setSelected] = useState<Fabric | null>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const list = group === "all" ? fabrics : fabrics.filter((f) => f.group === group);

  return (
    <>
      <FilterChips
        value={group}
        onChange={setGroup}
        options={[
          { id: "all" as const, label: "All cloth", count: fabrics.length },
          ...fabricGroups.map((g) => ({ id: g.id, label: g.label, count: fabrics.filter((f) => f.group === g.id).length })),
        ]}
      />

      <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((f, i) => (
            <motion.li
              layout
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: EASE }}
            >
              <button
                type="button"
                onClick={() => setSelected(f)}
                data-cursor="view"
                className="group relative block aspect-[3/4] w-full overflow-hidden bg-ink text-left text-ivory"
              >
                <motion.div layoutId={`fabric-img-${f.id}`} className="absolute inset-0">
                  <Image
                    src={f.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-110 group-hover:rotate-1"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[0.62rem] tracking-[0.28em] text-champagne uppercase">
                    {fabricGroups.find((g) => g.id === f.group)?.label}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.75rem] leading-tight">{f.name}</h3>
                  <p className="mt-1 text-sm text-ivory/70">{f.composition}</p>
                </div>
                <span className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:rotate-90 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink">
                  <Plus className="size-4" strokeWidth={1.5} />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <motion.div
                className="fixed inset-0 z-[80] flex items-end justify-center bg-black/80 backdrop-blur-sm md:items-center md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={selected.name}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 60, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative grid max-h-[92svh] w-full max-w-5xl overflow-y-auto bg-elevated text-fg md:grid-cols-2"
                >
                  <motion.div layoutId={`fabric-img-${selected.id}`} className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
                    <Image src={selected.image} alt={selected.name} fill sizes="50vw" className="object-cover" />
                  </motion.div>
                  <div className="flex flex-col p-8 md:p-12">
                    <p className="eyebrow">{fabricGroups.find((g) => g.id === selected.group)?.label}</p>
                    <h3 className="mt-4 font-serif text-5xl leading-none">{selected.name}</h3>
                    <p className="mt-3 font-serif text-xl text-accent italic">{selected.composition}</p>
                    <p className="mt-7 text-lg leading-relaxed text-muted">{selected.description}</p>
                    {selected.note && (
                      <p className="mt-6 border-l border-accent pl-5 text-[0.95rem] leading-relaxed text-muted">{selected.note}</p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-3 pt-10">
                      <LinkButton href="/contact#appointment" size="sm">
                        Enquire about this cloth
                      </LinkButton>
                      <LinkButton href="/pricing" variant="outline" size="sm" arrow={false}>
                        Price guide
                      </LinkButton>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-black/50 text-ivory backdrop-blur transition hover:bg-champagne hover:text-ink"
                  >
                    <X className="size-5" strokeWidth={1.5} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
