import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, LineIcon, WhatsAppIcon } from "@/components/brand/icons";
import { ContactForm } from "@/components/contact-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { TextLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { visitTips } from "@/content/process";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Appointments",
  description:
    "Book a fitting at Jesse & Son, 1/15 Sukhumvit Soi 10, Bangkok. Call +66 81 443 7747, LINE jesseandson, WhatsApp or email info@jesseandson.com.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { href: `tel:${site.phone}`, Icon: Phone, label: "Call", value: site.phoneDisplay },
  { href: site.line.url, Icon: LineIcon, label: "LINE", value: site.line.id },
  { href: site.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp", value: site.phoneDisplay },
  { href: `mailto:${site.email}`, Icon: Mail, label: "Email", value: site.email },
  { href: site.social.instagram, Icon: InstagramIcon, label: "Instagram", value: "@jesseandson" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/media/955ad-jesseandson.webp"
        eyebrow="Get in touch"
        title="Let's begin *your* commission."
        lead="Send us your enquiry and Jesse or Manop will reply during opening hours. As a small family workshop, appointments are highly recommended — and given priority."
        crumbs={[{ label: "Contact" }]}
        size="md"
      />

      <section id="appointment" className="scroll-mt-24 py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <Reveal className="border border-line-soft bg-elevated p-7 md:p-12">
            <ContactForm />
          </Reveal>

          <div className="space-y-10">
            <div>
              <p className="eyebrow">Locate our store</p>
              <h2 className="mt-4 font-serif text-4xl">{site.legalName}</h2>
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 flex gap-3 text-lg text-muted hover:text-accent"
              >
                <MapPin className="mt-1 size-5 shrink-0 text-accent" strokeWidth={1.4} />
                <span>
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <span className="mt-2 block text-[0.7rem] tracking-[0.25em] text-accent uppercase group-hover:underline">
                    Open in Google Maps →
                  </span>
                </span>
              </a>
              <p className="mt-5 flex gap-3 text-lg text-muted">
                <Clock className="mt-1 size-5 shrink-0 text-accent" strokeWidth={1.4} />
                <span>
                  Monday – Saturday, 10:00 – 20:00
                  <span className="block text-subtle">Closed Sunday</span>
                </span>
              </p>
            </div>

            <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" stagger={0.06}>
              {channels.map(({ href, Icon, label, value }) => (
                <RevealItem as="li" key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 border border-line p-4 transition-all duration-300 hover:border-accent hover:bg-accent-soft"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors group-hover:bg-accent group-hover:text-ink">
                      <Icon className="size-5" strokeWidth={1.4} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] tracking-[0.22em] text-subtle uppercase">{label}</span>
                      <span className="block truncate">{value}</span>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="border border-accent/30 bg-accent-soft p-7">
              <p className="eyebrow">Tips before visiting us</p>
              <ul className="mt-5 space-y-3">
                {visitTips.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.98rem] leading-relaxed">
                    <span className="text-accent">✦</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <TextLink href="/faq">Read the FAQ</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <SectionHeading eyebrow="Find us" title="On Sukhumvit *Soi 10.*" lead="Just off Sukhumvit Road on Soi 10, in Khlong Toei. Open the map in Google Maps for directions from your hotel." />
          <Reveal className="mt-12">
            <div className="relative h-[60svh] min-h-[420px] overflow-hidden border border-line">
              <iframe
                title="Map to Jesse & Son"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full dark:[filter:grayscale(1)_invert(0.92)_contrast(0.9)_sepia(0.25)]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
