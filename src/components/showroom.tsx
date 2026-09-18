"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import type { LookId } from "@/components/mannequin/model";
import { Mannequin3D } from "@/components/mannequin/mannequin-3d";
import { PhotoSpin } from "@/components/photo-spin";
import { LinkButton } from "@/components/ui/button";
import { showroomLooks } from "@/content/showroom";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const liveLooks = showroomLooks.flatMap((l) => (l.kind === "3d" ? [l.id] : [])) as LookId[];

/**
 * Look picker + 360° viewer + spec sheet. The rotation angle is kept when switching between
 * live 3D looks. Photographed looks have detail hotspots, also listed beside the viewer.
 */
export function Showroom() {
  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useState<string | null>(null);
  const figure = useRef<HTMLElement>(null);
  const look = showroomLooks[index];

  const showDetail = (id: string) => {
    setDetail(id);
    // on small screens the list sits below the viewer: bring the viewer into view
    const r = figure.current?.getBoundingClientRect();
    if (r && (r.top < 0 || r.bottom > window.innerHeight)) figure.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <figure ref={figure} className="scroll-mt-28 lg:col-span-7">
        {look.kind === "photo" ? (
          <PhotoSpin
            key={look.id}
            set={look.spin}
            alt={look.name}
            details={look.hotspots}
            detail={detail}
            onDetailChange={setDetail}
          />
        ) : (
          <Mannequin3D
            look={look.id}
            alt={look.name}
            aspect="aspect-[3/4]"
            preload={liveLooks.filter((id) => id !== look.id)}
          />
        )}
        <figcaption className="mt-3 font-sans text-[0.62rem] tracking-[0.2em] text-muted uppercase">
          Fig. {String(index + 1).padStart(2, "0")} — {look.name} · {look.note}
        </figcaption>
      </figure>

      <div className="lg:col-span-5">
        {/* Look picker */}
        <p className="eyebrow">Choose a look</p>
        <ul role="tablist" className="mt-4 grid grid-cols-4 gap-3">
          {showroomLooks.map((l, i) => (
            <li key={l.id}>
              <button
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => {
                  setIndex(i);
                  setDetail(null);
                }}
                className="group block w-full text-left"
              >
                <span
                  className={cn(
                    "relative block aspect-[4/5] overflow-hidden border bg-[#f1eee8] transition-colors",
                    i === index ? "border-fg" : "border-line group-hover:border-fg/50",
                  )}
                >
                  <Image
                    src={l.thumb}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span
                  className={cn(
                    "mt-2 block font-sans text-[0.6rem] tracking-[0.18em] uppercase",
                    i === index ? "text-fg" : "text-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} · {l.name.replace("The ", "")}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <AnimatePresence mode="wait">
          <motion.div
            key={look.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-10 border-t border-fg pt-6"
          >
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">{look.name}</h2>
            <p className="mt-2 font-serif text-xl text-muted italic">{look.tagline}</p>

            <dl className="mt-8 border-t border-line">
              {look.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-line py-3">
                  <dt className="font-sans text-[0.62rem] tracking-[0.2em] text-muted uppercase">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            {look.kind === "photo" ? (
              <div className="mt-8">
                <p className="eyebrow">Explore the details</p>
                <ol className="mt-3 border-t border-line">
                  {look.hotspots.map((d, i) => (
                    <li key={d.id} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => (detail === d.id ? setDetail(null) : showDetail(d.id))}
                        aria-pressed={detail === d.id}
                        className={cn(
                          "group flex w-full items-center gap-4 py-3 text-left transition-colors",
                          detail === d.id ? "text-accent" : "hover:text-accent",
                        )}
                      >
                        <span className="font-sans text-[0.6rem] tracking-[0.2em] text-muted tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-serif text-lg">{d.label}</span>
                        <span
                          className={cn(
                            "flex size-6 items-center justify-center rounded-full border transition",
                            detail === d.id ? "rotate-45 border-accent" : "border-line group-hover:border-accent",
                          )}
                          aria-hidden
                        >
                          <Plus className="size-3" strokeWidth={1.8} />
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <ul className="mt-6 flex flex-wrap gap-2">
                {look.details.map((d) => (
                  <li key={d} className="border border-line px-3 py-1.5 font-sans text-[0.62rem] tracking-[0.16em] uppercase">
                    {d}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact#appointment">Book this look</LinkButton>
              <LinkButton href="/products/fabrics" variant="outline" arrow={false}>
                Choose your cloth
              </LinkButton>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {look.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-[0.62rem] tracking-[0.2em] text-accent uppercase hover:underline">
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
