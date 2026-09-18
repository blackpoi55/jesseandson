import type { Metadata } from "next";
import Image from "next/image";
import { ConstructionExplorer } from "@/components/construction-explorer";
import { CtaBand } from "@/components/cta-band";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { TextLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { constructionIntro, constructionQuote } from "@/content/construction";

export const metadata: Metadata = {
  title: "Details & Construction",
  description:
    "Horsehair canvas, hand-felled collars, horn and mother-of-pearl buttons, flat-felled seams and lined trousers — how a Jesse & Son garment is built.",
  alternates: { canonical: "/craftsmanship" },
};

export default function CraftsmanshipPage() {
  return (
    <>
      <PageHero
        image="/media/e51f1-1-horsehair-canvas.webp"
        eyebrow="Details & construction"
        title="What you *don't* see matters most."
        crumbs={[{ label: "How it works", href: "/process" }, { label: "Details & construction" }]}
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="font-serif text-3xl leading-snug font-light italic md:text-4xl">{constructionQuote}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-lg leading-relaxed text-muted">{constructionIntro}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <TextLink href="/blog/why-our-milanese-buttonholes-make-us-the-best-tailor-in-bangkok">
                Why our Milanese buttonholes matter
              </TextLink>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MaskReveal className="relative aspect-[3/4]">
              <Image src="/media/f3eba-3-soft-collar.webp" alt="Hand-felled collar" fill sizes="25vw" className="object-cover" />
            </MaskReveal>
            <MaskReveal delay={0.2} className="relative mt-14 aspect-[3/4]">
              <Image src="/media/bcf2f-5-buttons.webp" alt="Horn buttons on a jacket sleeve" fill sizes="25vw" className="object-cover" />
            </MaskReveal>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-28 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Inside the garment" title="Explore the *construction.*" align="center" />
          <div className="mt-12">
            <ConstructionExplorer />
          </div>
        </div>
      </section>

      <CtaBand image="/media/cdd09-10-interior.webp" title="Feel the *difference.*" lead="Come in and handle the canvas, the horn and the mother-of-pearl for yourself." />
    </>
  );
}
