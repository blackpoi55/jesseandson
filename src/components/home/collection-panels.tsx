"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowCircle } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const panels = [
  {
    href: "/products/men",
    title: "Men",
    subtitle: "Suits · Blazers · Shirts · Tuxedos",
    image: "/media/c837d-image4.webp",
    position: "center",
  },
  {
    href: "/products/women",
    title: "Women",
    subtitle: "Suits · Blazers · Dresses · Coats",
    image: "/media/82271-image11.webp",
    position: "40% center",
  },
  {
    href: "/products/fabrics",
    title: "Fabrics",
    subtitle: "Zegna · VBC · Loro Piana · Drago",
    image: "/media/72715-1633604348417.webp",
    position: "center",
  },
  {
    href: "/products/shoes",
    title: "Shoes",
    subtitle: "Goodyear-welted · 20+ designs",
    image: "/media/eeeb0-custom-leather-shoes.webp",
    position: "center",
  },
];

/** Four collection panels; the hovered panel widens like an opening wardrobe. */
export function CollectionPanels() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:h-[78svh] lg:min-h-[560px] lg:flex-row">
      {panels.map((p, i) => {
        const on = active === i;
        return (
          <motion.div
            key={p.href}
            layout
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            transition={{ layout: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
            className={cn("relative h-[62svh] min-h-[380px] min-w-0 lg:h-auto", on ? "lg:flex-[3.2]" : "lg:flex-1")}
          >
            <Link
              href={p.href}
              data-cursor="view"
              className="group relative isolate flex h-full overflow-hidden rounded-[4px] bg-ink text-ivory"
            >
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={cn(
                  "-z-10 object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)]",
                  on ? "scale-105" : "scale-100 lg:grayscale-[35%]",
                )}
                style={{ objectPosition: p.position }}
              />
              <div
                className={cn(
                  "absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/20 transition-opacity duration-700",
                  !on && "lg:from-black/95 lg:via-black/60",
                )}
              />
              <span className="absolute top-6 left-6 font-display text-sm tracking-[0.2em] text-champagne">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-auto flex w-full items-end justify-between gap-4 p-7 md:p-9">
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "font-serif leading-none transition-all duration-700",
                      on ? "text-5xl md:text-6xl" : "text-5xl lg:origin-bottom-left lg:text-4xl",
                    )}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-[0.72rem] tracking-[0.22em] whitespace-nowrap text-ivory/70 uppercase transition-all duration-700",
                      on ? "opacity-100" : "lg:opacity-0",
                    )}
                  >
                    {p.subtitle}
                  </p>
                </div>
                <ArrowCircle
                  className={cn(
                    "shrink-0 border-ivory/60 transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink",
                    !on && "lg:opacity-0",
                  )}
                />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
