import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { ButtonIcon, JacketIcon, ScissorsIcon } from "@/components/brand/icons";
import { ContactForm } from "@/components/contact-form";
import { Tilt } from "@/components/motion/effects";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { TierBadge } from "@/components/tier";
import { Accordion } from "@/components/ui/accordion";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  millFabrics,
  mills,
  millsIncluded,
  millsIntro,
  pricingFaq,
  pricingIntro,
  shirtStandards,
  shirtTiers,
  suitCollections,
  suitStandards,
} from "@/content/pricing";

export const metadata: Metadata = {
  title: "Bangkok Tailor Prices — Suits from THB 11,500",
  description:
    "Transparent pricing for custom suits, shirts, trousers and overcoats at Jesse & Son Bangkok — by fabric category, from Superfine blends to Zegna and Vitale Barberis Canonico.",
  alternates: { canonical: "/pricing" },
};

const shirtImages: Record<string, string> = {
  "Superfine Cotton Blend": "/media/8fd89-1-superfine-cotton-blend.webp",
  "Superior Cotton": "/media/a0136-2.webp",
  "Premium Cotton": "/media/a091d-cotton-shirt.webp",
  "Luxury Cotton": "/media/37324-4-luxury-cotton.webp",
  SÖKTAŞ: "/media/sokfabrics.webp",
  Linen: "/media/linen.webp",
};

const collectionImages = [
  "/media/56f46-1-superfine-blend1900-1.webp",
  "/media/cb77c-pure-wool.webp",
  "/media/22085-angora-wool.webp",
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        image="/media/08b29-bangkok-tailor-pricing.webp"
        eyebrow="Price guide"
        title="Honest pricing, *tailored* craft."
        lead={pricingIntro[1]}
        crumbs={[{ label: "Pricing" }]}
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="font-serif text-3xl leading-snug font-light md:text-[2.5rem]">{pricingIntro[0]}</p>
          </Reveal>
          <Reveal delay={0.2} className="rounded-[4px] border border-line bg-bg-alt p-8">
            <p className="eyebrow">How to read the guide</p>
            <ul className="mt-6 space-y-3">
              {([1, 2, 3, 4] as const).map((t) => (
                <li key={t}>
                  <TierBadge tier={t} showName className="text-xl" />
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Exact prices are quoted per garment once we know your fabric and details.</p>
          </Reveal>
        </div>
      </section>

      {/* Shirts */}
      <section className="bg-bg-alt py-28 md:py-36">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Custom shirts" title="Shirting, by the *thread count.*" />
            <Reveal>
              <ul className="space-y-3">
                {shirtStandards.map((s) => (
                  <li key={s} className="flex items-center gap-3">
                    <Check className="size-4 text-gold" strokeWidth={2} /> {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {shirtTiers.map((s) => (
              <RevealItem key={s.name}>
                <Tilt max={5} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line-soft bg-elevated shadow-card">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={shirtImages[s.name]}
                        alt={`${s.name} shirting`}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif text-[1.7rem] leading-tight">{s.name}</h3>
                        <TierBadge tier={s.tier} className="mt-1.5 text-lg" />
                      </div>
                      <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </article>
                </Tilt>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Suits */}
      <section className="py-28 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Custom suits" title="Suiting for every *season.*" />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.1}>
            {suitStandards.map((s, i) => {
              const Icon = i === 0 ? ScissorsIcon : ButtonIcon;
              return (
                <RevealItem key={s.title} className="flex gap-6 rounded-[4px] border border-gold/30 bg-gold-soft p-8">
                  <Icon className="size-12 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-serif text-2xl">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <div className="mt-24 space-y-24">
            {suitCollections.map((c, ci) => (
              <div key={c.title} className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <MaskReveal className="relative aspect-[4/3] rounded-[4px]">
                    <Image src={collectionImages[ci]} alt="" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
                  </MaskReveal>
                  <Reveal>
                    <p className="mt-8 font-display text-sm tracking-[0.2em] text-gold">{String(ci + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-serif text-4xl">{c.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{c.intro}</p>
                  </Reveal>
                </div>
                <RevealGroup as="ul" className="border-t border-line" stagger={0.06}>
                  {c.items.map((f) => (
                    <RevealItem as="li" key={f.name} className="group border-b border-line py-7">
                      <div className="flex items-start justify-between gap-6">
                        <h4 className="font-serif text-2xl transition-colors group-hover:text-gold md:text-[1.7rem]">{f.name}</h4>
                        <span className="shrink-0 text-right">
                          <span className="block text-[0.6rem] tracking-[0.22em] text-subtle uppercase">From</span>
                          <TierBadge tier={f.tier} className="text-lg" />
                        </span>
                      </div>
                      {f.body && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.body}</p>}
                      {f.variants && (
                        <ul className="mt-4 flex flex-wrap gap-3">
                          {f.variants.map((v) => (
                            <li key={v.name} className="rounded-full border border-line px-4 py-1.5 text-sm text-muted">
                              {v.name}
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-4 text-[0.7rem] tracking-[0.22em] text-subtle uppercase">Jacket · Pants · Vest (add-on)</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World-class mills */}
      <section className="grain relative isolate overflow-hidden bg-ink py-28 text-ivory md:py-36">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-champagne">World-class Italian &amp; English mills</p>
              <h2 className="mt-5 font-serif text-5xl leading-[1.05] md:text-6xl">
                The <em className="text-gold-gradient">ultimate</em> in cloth.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ivory/70">{millsIntro}</p>
              <div className="mt-8 flex gap-4 rounded-[4px] border border-champagne/25 p-6">
                <JacketIcon className="size-10 shrink-0 text-champagne" />
                <p className="text-ivory/75">{millsIncluded}</p>
              </div>
            </div>
            <RevealGroup as="ul" className="self-start border-t border-ivory/10" stagger={0.04}>
              {millFabrics.map((m) => (
                <RevealItem as="li" key={m.name} className="flex items-center justify-between gap-6 border-b border-ivory/10 py-4">
                  <span className="text-ivory/85">{m.name}</span>
                  <span className="shrink-0 font-display tracking-[0.12em]">
                    <span className="text-champagne">{"$".repeat(m.tier)}</span>
                    <span className="text-ivory/20">{"$".repeat(4 - m.tier)}</span>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
        <div className="mt-20">
          <Marquee items={mills} className="font-serif text-4xl text-ivory/70 italic md:text-6xl" speed={50} />
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="scroll-mt-24 py-28 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Ready to define your style?"
              title="Request an *exact* quote."
              lead="Tell us the garment, your preferred fabric type and any details — we'll reply with exact pricing."
            />
          </div>
          <Reveal className="rounded-[4px] border border-line-soft bg-elevated p-8 shadow-card md:p-12">
            <ContactForm defaultMode="appointment" showTabs={false} submitLabel="Request my quote" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-bg-alt py-24 md:py-32">
        <div className="container-narrow">
          <SectionHeading eyebrow="Pricing FAQ" title="Questions about *price.*" align="center" />
          <Reveal className="mt-12">
            <Accordion items={pricingFaq.map((f, i) => ({ id: String(i), title: f.q, content: <p>{f.a}</p> }))} defaultOpen="0" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
