import type { Metadata } from "next";
import { PatternDraft } from "@/components/art/pattern-draft";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { ProcessTimeline } from "@/components/process-timeline";
import { LinkButton, TextLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { processIntro, processQuote, processSteps, visitTips } from "@/content/process";

export const metadata: Metadata = {
  title: "Our Custom Tailoring Process",
  description:
    "First visit, drawing, cutting, stitching, fitting and delivery — how Jesse & Son makes a bespoke suit in Bangkok, with free hotel delivery.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        image="/media/830f3-nzy3m2rjzwitmzqwns00ownhlwzlodytmtq5nduzotm5nguy-1-1.webp"
        eyebrow="How it works"
        title="Our custom *tailoring* process."
        script="from first visit to final fitting"
        crumbs={[{ label: "How it works" }]}
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <p className="font-serif text-3xl leading-snug font-light italic md:text-4xl">{processQuote}</p>
            </Reveal>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {processIntro.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3} className="mt-10">
              <TextLink href="/blog/first-time-getting-a-suit-in-bangkok-start-here">First-time guide to a suit in Bangkok</TextLink>
            </Reveal>
          </div>
          <div className="border border-line bg-bg-alt p-6 md:p-10">
            <PatternDraft className="w-full" />
          </div>
        </div>
      </section>

      <section className="border-t border-line pb-16">
        <div className="container-x">
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <section className="bg-bg-alt py-28 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading eyebrow="Before you visit" title="Tips for a *perfect* first fitting." />
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <LinkButton href="/contact#appointment">Book an appointment</LinkButton>
              <LinkButton href="/craftsmanship" variant="outline" arrow={false}>
                Details &amp; construction
              </LinkButton>
            </Reveal>
          </div>
          <RevealGroup as="ol" className="divide-y divide-line border-y border-line" stagger={0.08}>
            {visitTips.map((tip, i) => (
              <RevealItem as="li" key={tip} className="flex items-baseline gap-6 py-6">
                <span className="font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl leading-snug">{tip}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand image="/media/00d6b-1633604378074.webp" title="Three days. One *perfect* suit." lead="Tell us when you land in Bangkok and we'll plan your fittings around your trip." />
    </>
  );
}
