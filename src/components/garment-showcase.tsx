import Image from "next/image";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import type { Garment } from "@/content/products";
import { cn } from "@/lib/utils";

/** Editorial alternating rows: large masked image + numbered copy. */
export function GarmentShowcase({ garments }: { garments: Garment[] }) {
  return (
    <div className="space-y-28 md:space-y-40">
      {garments.map((g, i) => (
        <article key={g.id} id={g.id} className="grid scroll-mt-32 items-center gap-10 md:grid-cols-12 md:gap-8">
          <div className={cn("relative md:col-span-6", i % 2 ? "md:order-2 md:col-start-7" : "md:col-start-1")}>
            <MaskReveal from={i % 2 ? "right" : "left"} className="relative aspect-[4/5] rounded-[4px] bg-bg-alt">
              <Image src={g.image} alt={g.name} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </MaskReveal>
            <span
              className={cn(
                "pointer-events-none absolute -bottom-10 font-display text-[7rem] leading-none text-gold/15 md:text-[10rem]",
                i % 2 ? "-left-4 md:-left-16" : "-right-4 md:-right-16",
              )}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className={cn("md:col-span-5", i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-8")}>
            <Reveal>
              <p className="eyebrow">
                {String(i + 1).padStart(2, "0")} / {String(garments.length).padStart(2, "0")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-5 font-serif text-5xl leading-none md:text-6xl">{g.name}</h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 text-lg leading-relaxed text-muted">{g.description}</p>
            </Reveal>
            {g.construction && (
              <Reveal delay={0.3} className="mt-9">
                <TextLink href={`/craftsmanship#${g.construction}`}>Details &amp; construction</TextLink>
              </Reveal>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

/** Compact card grid (accessories). */
export function GarmentGrid({ garments }: { garments: Garment[] }) {
  return (
    <RevealGroup className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
      {garments.map((g) => (
        <RevealItem key={g.id} className="group">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-bg-alt">
            <Image
              src={g.image}
              alt={g.name}
              fill
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-110"
            />
          </div>
          <h3 className="mt-5 font-serif text-2xl">{g.name}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{g.description}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Sticky jump-links to each garment on the page. */
export function GarmentIndex({ garments }: { garments: Garment[] }) {
  return (
    <nav aria-label="On this page" className="glass sticky top-0 z-30 border-y border-line-soft">
      <ul className="container-x no-scrollbar flex gap-8 overflow-x-auto py-4">
        {garments.map((g) => (
          <li key={g.id}>
            <a
              href={`#${g.id}`}
              className="text-[0.7rem] font-medium tracking-[0.22em] whitespace-nowrap text-muted uppercase transition-colors hover:text-gold"
            >
              {g.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
