import type { Metadata } from "next";
import Image from "next/image";
import { MonogramSeal } from "@/components/brand/monogram";
import { CtaBand } from "@/components/cta-band";
import { Gallery } from "@/components/gallery";
import { CountUp } from "@/components/motion/effects";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { TextLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutQuote, reasons, stats, storeGallery, story } from "@/content/about";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us — Our Story",
  description:
    "Jesse (Suthep) has been tailoring for over 30 years — from Udonthani to Sukhumvit Road. Discover the family behind Jesse & Son and six reasons clients return.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/media/095eb-1633604348449.webp"
        eyebrow="Our story"
        title="A family house of *bespoke* tailoring."
        script="Jesse & his sons"
        crumbs={[{ label: "About" }]}
      />

      {/* Quote */}
      <section className="py-28 md:py-36">
        <div className="container-narrow text-center">
          <Reveal>
            <MonogramSeal className="mx-auto size-24" />
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-10 font-serif text-4xl leading-[1.15] font-light italic md:text-6xl">
              “{aboutQuote.text}”
            </blockquote>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-sm tracking-[0.35em] text-accent uppercase">— {aboutQuote.author}</p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="pb-28 md:pb-40">
        <div className="container-x grid items-start gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div className="relative isolate lg:sticky lg:top-32">
            <MaskReveal className="relative aspect-[3/4] w-full max-w-md">
              <Image
                src="/media/72382-jesseandson-portrait.webp"
                alt="The family behind Jesse & Son"
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover"
              />
            </MaskReveal>
            <div className="absolute top-8 left-8 -z-10 aspect-[3/4] w-full max-w-md border border-accent/40" />
            <p className="font-script mt-6 text-5xl text-accent">Jesse &amp; Son</p>
            <p className="text-xs tracking-[0.3em] text-muted uppercase">The family behind the house</p>
          </div>
          <div>
            <SectionHeading eyebrow="Three decades" title="From Udonthani to *Sukhumvit.*" />
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted">
              {story.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className={cn(i === 0 && "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-accent")}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
            <RevealGroup className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10">
              {stats.map((s) => (
                <RevealItem key={s.label}>
                  <CountUp value={s.value} className="font-display text-5xl text-accent" />
                  <p className="mt-2 text-[0.7rem] tracking-[0.25em] text-muted uppercase">{s.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-12">
              <TextLink href="/blog/the-jesse-and-son-story">Read the full Jesse &amp; Son story</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Six reasons */}
      <section className="bg-bg-alt py-28 md:py-40">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why us?"
            title="We give you six *simple* reasons."
            align="center"
          />
          <div className="mt-20 space-y-24 md:space-y-36">
            {reasons.map((r, i) => (
              <div key={r.title} className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
                <MaskReveal
                  from={i % 2 ? "right" : "left"}
                  className={cn("relative aspect-[4/3]", i % 2 && "md:order-2")}
                >
                  <Image src={r.image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                </MaskReveal>
                <div>
                  <Reveal>
                    <span className="font-display text-7xl text-accent/30 md:text-8xl">{String(i + 1).padStart(2, "0")}</span>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h3 className="-mt-4 font-serif text-4xl md:text-5xl">{r.title}</h3>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-6 text-lg leading-relaxed text-muted">{r.body}</p>
                  </Reveal>
                  <Reveal delay={0.3} className="mt-8">
                    <TextLink href={r.link.href}>{r.link.label}</TextLink>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store */}
      <section className="py-28 md:py-40">
        <div className="container-x">
          <SectionHeading
            eyebrow="Visit the house"
            title="Store interior & *exterior.*"
            lead="Black lacquer, brass light and walls of cloth — with a bar under the stairs. Tap any photo to step inside."
          />
          <Gallery className="mt-16" items={storeGallery} />
        </div>
      </section>

      <section className="border-t border-line py-28 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="In their words" title="What clients are *saying.*" align="center" />
          <div className="mt-6">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
