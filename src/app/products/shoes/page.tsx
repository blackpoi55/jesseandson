import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { ShoeGallery } from "@/components/shoe-gallery";
import { StepTabs } from "@/components/step-tabs";
import { SectionHeading } from "@/components/ui/section-heading";
import { shoeDetails, shoesIntro, shoesQuote, shoeSteps } from "@/content/shoes";

export const metadata: Metadata = {
  title: "Custom Shoes — Goodyear-Welted, Made to Measure",
  description:
    "Bespoke Oxfords, Derbies, monk straps, loafers and boots — Goodyear-welted with memory-foam insoles and handpicked leather, made to your feet in Bangkok.",
  alternates: { canonical: "/products/shoes" },
};

export default function ShoesPage() {
  return (
    <>
      <PageHero
        image="/media/aa72d-image15.webp"
        eyebrow="Shoe products"
        title="Made for *your* feet alone."
        script="step by step"
        lead={shoesIntro}
        crumbs={[{ label: "Products", href: "/products" }, { label: "Shoes" }]}
      />

      <section className="py-24 md:py-32">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="font-serif text-4xl leading-tight font-light italic md:text-5xl">{shoesQuote}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-36">
        <div className="container-x">
          <SectionHeading eyebrow="The making" title="Five steps to a *lifetime* pair." />
          <div className="mt-14">
            <StepTabs steps={shoeSteps} />
          </div>
        </div>
      </section>

      <section className="grain relative isolate bg-ink py-28 text-ivory md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal direction="scale" className="relative mx-auto aspect-square w-full max-w-lg">
            <Image src="/media/9b35c-shoes.webp" alt="Anatomy of a Jesse & Son shoe" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-contain" />
          </Reveal>
          <div>
            <p className="eyebrow text-champagne">Shoe details</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] md:text-6xl">
              Built to be <em className="text-gold-gradient">resoled.</em>
            </h2>
            <RevealGroup as="ol" className="mt-12 space-y-7" stagger={0.1}>
              {shoeDetails.map((d, i) => (
                <RevealItem as="li" key={d.title} className="group grid grid-cols-[4.5rem_1fr] gap-5 border-t border-ivory/10 pt-7">
                  <div className="relative size-[4.5rem] overflow-hidden rounded-full border border-champagne/30">
                    <Image src={d.image} alt="" fill sizes="72px" className="object-cover transition-transform duration-700 group-hover:scale-125" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl">
                      <span className="mr-3 font-display text-sm text-champagne">{String(i + 1).padStart(2, "0")}</span>
                      {d.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ivory/65">{d.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="The designs"
            title="Twenty ways to *walk* in."
            lead="Every model can be made in your choice of leather, color, stitching and sole."
          />
          <div className="mt-14">
            <ShoeGallery />
          </div>
        </div>
      </section>

      <CtaBand image="/media/276e7-4-custom-shoes-champ.webp" title="Complete the *look.*" lead="Pair your suit with shoes built on your own last — measured in the same visit." />
    </>
  );
}
