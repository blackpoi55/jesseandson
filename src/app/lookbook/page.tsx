import type { Metadata } from "next";
import { InstagramIcon } from "@/components/brand/icons";
import { CtaBand } from "@/components/cta-band";
import { Gallery } from "@/components/gallery";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { LinkButton, TextLink } from "@/components/ui/button";
import { lookbookIntro, lookbookQuote, lookCategories, looks } from "@/content/lookbook";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Look Book — Inspiration & Client Looks",
  description:
    "Real Jesse & Son clients and style inspiration — wedding suits, tuxedos, business tailoring, smart casual and womenswear made in Bangkok.",
  alternates: { canonical: "/lookbook" },
};

export default function LookbookPage() {
  return (
    <>
      <PageHero
        image="/media/4d38a-2025-08-29.webp"
        imagePosition="center 30%"
        eyebrow="Look book"
        title="Inspiration, *made* real."
        script="make it worth their while"
        crumbs={[{ label: "Look book" }]}
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <blockquote className="font-serif text-4xl leading-tight font-light italic md:text-5xl">
              “{lookbookQuote.text}”
              <footer className="mt-4 text-sm tracking-[0.3em] text-gold not-italic uppercase">— {lookbookQuote.author}</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-muted">{lookbookIntro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <LinkButton href={site.social.instagram} variant="outline" arrow={false} icon={<InstagramIcon className="size-4" />}>
                @jesseandson
              </LinkButton>
              <TextLink href="/blog/jesseandson-client-looks">Real client looks 2026</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-36">
        <div className="container-x">
          <Gallery items={looks} categories={lookCategories} />
        </div>
      </section>

      <CtaBand image="/media/adabb-2025-08-11.webp" title="Seen something you *love?*" lead="Send us any reference picture and we'll construct it to your measurements." />
    </>
  );
}
