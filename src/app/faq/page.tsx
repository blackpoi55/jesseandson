import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { LineIcon } from "@/components/brand/icons";
import { CtaBand } from "@/components/cta-band";
import { FaqBrowser } from "@/components/faq-browser";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/content/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — Tailoring in Bangkok, Answered",
  description:
    "How long a suit takes, what it costs, payment, shipping, measurements on file, mother-of-pearl buttons and garment care — Jesse & Son's most asked questions.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        image="/media/6707c-unnamed-1-medium.webp"
        eyebrow="Frequently asked"
        title="Questions, *answered.*"
        lead="A short list of what clients ask us most — from timelines and prices to caring for your garments."
        crumbs={[{ label: "FAQ" }]}
        size="md"
      />

      <section className="py-24 md:py-32">
        <div className="container-narrow">
          <FaqBrowser />
        </div>
      </section>

      <section className="bg-bg-alt py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Can't find it here?" title="Ask us *directly.*" align="center" />
          <RevealGroup className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              { href: `mailto:${site.email}`, Icon: Mail, title: "Email us", value: site.email },
              { href: `tel:${site.phone}`, Icon: Phone, title: "Call us", value: `${site.landlineDisplay} · ${site.phoneDisplay}` },
              { href: site.line.url, Icon: LineIcon, title: "LINE", value: `ID: ${site.line.id}` },
            ].map(({ href, Icon, title, value }) => (
              <RevealItem key={title}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col items-center border border-line bg-elevated p-10 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent"
                >
                  <span className="flex size-14 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors group-hover:bg-accent group-hover:text-ink">
                    <Icon className="size-6" strokeWidth={1.4} />
                  </span>
                  <span className="mt-6 font-serif text-2xl">{title}</span>
                  <span className="mt-2 text-sm text-muted">{value}</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10 text-center text-muted">We would love to help you with the answers you are looking for.</Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
