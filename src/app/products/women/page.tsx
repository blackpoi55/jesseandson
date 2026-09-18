import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { GarmentIndex, GarmentShowcase } from "@/components/garment-showcase";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { TextLink } from "@/components/ui/button";
import { womenGarments, womenIntro } from "@/content/products";

export const metadata: Metadata = {
  title: "Women's Bespoke Tailoring — Suits, Blazers & Dresses",
  description:
    "Tailored suits, blazers, shirts, dresses, pants, skirts and overcoats for women — cut to your figure in Bangkok by Jesse & Son.",
  alternates: { canonical: "/products/women" },
};

export default function WomenPage() {
  return (
    <>
      <PageHero
        image="/media/5e54d-image5.webp"
        eyebrow="Women's products"
        title="Tailored to *her* silhouette."
        script="made for her"
        crumbs={[{ label: "Products", href: "/products" }, { label: "Women" }]}
      />
      <GarmentIndex garments={womenGarments} />

      <section className="py-24 md:py-32">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="font-serif text-3xl leading-snug font-light md:text-[2.6rem]">{womenIntro}</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <TextLink href="/blog/womens-bespoke-tailoring-curved-body-shapes-bangkok">
              Tailoring for curved body shapes
            </TextLink>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="container-x">
          <GarmentShowcase garments={womenGarments} />
        </div>
      </section>

      <CtaBand image="/media/3404f-bespoke-womenswear-fabrics.webp" title="Power, *perfectly* fitted." />
    </>
  );
}
