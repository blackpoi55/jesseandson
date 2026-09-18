import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { FabricExplorer } from "@/components/fabric-explorer";
import { ParallaxImage } from "@/components/motion/effects";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { TextLink } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { fabricsIntro, fabricsSelection } from "@/content/fabrics";
import { mills } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Fabrics — Wool, Cotton, Linen & Italian Mills",
  description:
    "Handpicked suiting and shirting from Zegna, Vitale Barberis Canonico, Loro Piana, Drago, Reda and SÖKTAŞ — plus Bemberg linings on every suit.",
  alternates: { canonical: "/products/fabrics" },
};

export default function FabricsPage() {
  return (
    <>
      <PageHero
        image="/media/72715-1633604348417.webp"
        eyebrow="About our fabrics"
        title="Cloth with a *provenance.*"
        lead={fabricsIntro}
        crumbs={[{ label: "Products", href: "/products" }, { label: "Fabrics" }]}
      />

      <section className="py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Find your fabric" title="Chosen by *hand*, one bolt at a time." lead={fabricsSelection} />
            <Reveal delay={0.3} className="mt-10">
              <TextLink href="/blog/how-to-choose-the-right-fabric-for-a-bespoke-suit-in-bangkok">
                How to choose the right fabric
              </TextLink>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MaskReveal className="relative aspect-[3/4]">
              <Image src="/media/1f5f7-6-fabrics.webp" alt="Fabric books and swatches" fill sizes="25vw" className="object-cover" />
            </MaskReveal>
            <MaskReveal delay={0.2} className="relative mt-16 aspect-[3/4]">
              <Image src="/media/86af7-03.webp" alt="Mill labels from Drago, SÖKTAŞ, Reda and more" fill sizes="25vw" className="object-cover" />
            </MaskReveal>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-28 md:py-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="The collection"
            title="Explore the *library.*"
            lead="Tap any cloth to see its composition, character and what it's best made into."
          />
          <div className="mt-14">
            <FabricExplorer />
          </div>
        </div>
      </section>

      <section className="py-16" aria-label="Mills">
        <Marquee items={mills} className="font-display text-2xl tracking-[0.2em] text-muted md:text-4xl" speed={40} />
      </section>

      <section className="relative isolate overflow-hidden bg-bg-alt text-fg">
        <div className="grid lg:grid-cols-2">
          <ParallaxImage src="/media/7a96b-bemberg-lining1000.webp" alt="Bemberg lining" className="h-[55svh] lg:h-auto lg:min-h-[600px]" sizes="50vw" />
          <div className="flex items-center px-6 py-20 md:px-16">
            <div className="max-w-lg">
              <p className="eyebrow text-accent">Standard on every suit</p>
              <h2 className="mt-5 font-serif text-5xl leading-[1.05] md:text-6xl">
                The lining <em className="text-accent-italic">you feel.</em>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Japanese Bemberg breathes cool air, absorbs moisture quickly and never clings — the same lining used by
                Hugo Boss, Zegna and Giorgio Armani. It comes standard in every Jesse &amp; Son suit, in deep, silky
                colors of your choosing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand image="/media/1bbe4-ee9f1-1633604348404.webp" title="Come *touch* the cloth." lead="Walls of cloth are waiting on Sukhumvit Soi 10. Book a visit and we'll pull the ones made for you." />
    </>
  );
}
