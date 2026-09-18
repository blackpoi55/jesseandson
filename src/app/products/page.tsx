import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { ImageCard } from "@/components/ui/image-card";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { menAccessories, menGarments, womenGarments } from "@/content/products";

export const metadata: Metadata = {
  title: "Products — Men, Women, Fabrics & Shoes",
  description:
    "Bespoke suits, blazers, shirts, overcoats, tuxedos, dresses and custom shoes — tailored in Bangkok from genuine fabrics by Jesse & Son.",
  alternates: { canonical: "/products" },
};

const categories = [
  {
    href: "/products/men",
    title: "Men",
    subtitle: `${menGarments.length} garments · ${menAccessories.length} accessories`,
    image: "/media/9e9e3-the-definitive-2026-guide-to-bespoke-tailoring-from-first-fitting-to-final-stitch.webp",
  },
  {
    href: "/products/women",
    title: "Women",
    subtitle: `${womenGarments.length} garments, cut for your figure`,
    image: "/media/82271-image11.webp",
  },
  {
    href: "/products/fabrics",
    title: "Fabrics",
    subtitle: "Handpicked from the world's mills",
    image: "/media/1bbe4-ee9f1-1633604348404.webp",
  },
  {
    href: "/products/shoes",
    title: "Shoes",
    subtitle: "Goodyear-welted, made for your feet",
    image: "/media/aa72d-image15.webp",
  },
];

export default function ProductsPage() {
  const all = [...menGarments, ...womenGarments].map((g) => g.name);
  return (
    <>
      <PageHero
        image="/media/e49f4-image12.webp"
        eyebrow="Our products"
        title="Everything, *made* to measure."
        lead="Suits, shirts, overcoats, dresses and shoes for men and women — each one drafted from your own pattern."
        crumbs={[{ label: "Products" }]}
      />

      <section className="py-28 md:py-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="Four collections"
            title="Choose where to *begin.*"
            lead="Quality and fit are what set us apart — clothing crafted to serve you for many years, at fixed and fair prices."
          />
          <RevealGroup className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2" stagger={0.1}>
            {categories.map((c, i) => (
              <RevealItem key={c.href} className={i % 2 ? "md:mt-24" : undefined}>
                <ImageCard
                  {...c}
                  eyebrow={`No. 0${i + 1}`}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-y border-line py-10" aria-label="Garments we make">
        <Reveal direction="fade">
          <Marquee items={[...new Set(all)]} className="font-serif text-4xl italic md:text-6xl" speed={50} />
        </Reveal>
      </section>

      <CtaBand title="Not sure where to *start?*" lead="Tell us about the occasion and we'll guide you through fabrics, cuts and details — in store or over LINE." />
    </>
  );
}
