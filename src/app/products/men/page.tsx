import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { GarmentGrid, GarmentIndex, GarmentShowcase } from "@/components/garment-showcase";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { menAccessories, menGarments, menIntro } from "@/content/products";

export const metadata: Metadata = {
  title: "Men's Bespoke Tailoring — Suits, Shirts & Tuxedos",
  description:
    "Custom suits, blazers, shirts, pants, waistcoats, overcoats and tuxedos for men, tailored in Bangkok. Plus neckties, bow ties, pocket squares and cufflinks.",
  alternates: { canonical: "/products/men" },
};

export default function MenPage() {
  return (
    <>
      <PageHero
        image="/media/c837d-image4.webp"
        eyebrow="Men's products"
        title="The gentleman's *wardrobe.*"
        script="made for him"
        crumbs={[{ label: "Products", href: "/products" }, { label: "Men" }]}
      />
      <GarmentIndex garments={menGarments} />

      <section className="py-24 md:py-32">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="font-serif text-3xl leading-snug font-light md:text-[2.6rem]">{menIntro}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="container-x">
          <GarmentShowcase garments={menGarments} />
        </div>
      </section>

      <section className="bg-bg-alt py-28 md:py-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="Men's accessories"
            title="The finishing *touches.*"
            lead="Silk, satin, linen and cotton — from ties and bow ties to monogrammed pocket squares."
          />
          <div className="mt-16">
            <GarmentGrid garments={menAccessories} />
          </div>
        </div>
      </section>

      <CtaBand image="/media/6935d-best-tailor.webp" title="Your suit, your *rules.*" />
    </>
  );
}
