import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LineIcon,
  TripAdvisorIcon,
  WhatsAppIcon,
} from "@/components/brand/icons";
import { Wordmark } from "@/components/brand/logo";
import { MonogramSeal } from "@/components/brand/monogram";
import { LinkButton } from "@/components/ui/button";
import { footerNav } from "@/lib/nav";
import { site } from "@/lib/site";

const socials = [
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.line.url, label: "LINE", Icon: LineIcon },
  { href: site.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: site.social.tripadvisor, label: "Tripadvisor", Icon: TripAdvisorIcon },
];

export function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-ink text-ivory">
      <MonogramSeal className="pointer-events-none absolute -top-32 -right-32 -z-10 size-[34rem] opacity-[0.06]" />

      {/* Invitation */}
      <div className="container-x border-b border-ivory/10 py-20 md:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow text-champagne">Visit the house</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] md:text-6xl">
              Your perfect suit begins
              <br />
              with a <em className="text-gold-gradient">conversation.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <LinkButton href="/contact#appointment" size="lg">
              Book a fitting
            </LinkButton>
            <LinkButton href={site.line.url} variant="light" size="lg" arrow={false} icon={<LineIcon className="size-5" />}>
              Chat on LINE
            </LinkButton>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
        <div>
          <Wordmark />
          <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed text-ivory/60">
            A family-run bespoke tailor on Sukhumvit Soi 10, led by Jesse (Suthep) and his sons — over 30 years of
            craftsmanship, genuine fabrics and personal service for men and women.
          </p>
          <ul className="mt-8 flex gap-2.5">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Explore" links={footerNav.explore} />
        <FooterColumn title="Services" links={footerNav.services} />

        <div>
          <h3 className="eyebrow text-champagne">Visit us</h3>
          <ul className="mt-6 space-y-4 text-[0.95rem] text-ivory/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-champagne" strokeWidth={1.4} />
              <a href={site.social.googleMaps} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-champagne" strokeWidth={1.4} />
              <span>
                Mon – Sat, 10:00 – 20:00
                <span className="block text-ivory/45">Closed Sunday</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-champagne" strokeWidth={1.4} />
              <a href={`tel:${site.phone}`} className="hover:text-champagne">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-champagne" strokeWidth={1.4} />
              <a href={`mailto:${site.email}`} className="hover:text-champagne">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <LineIcon className="mt-0.5 size-4 shrink-0 text-champagne" />
              <a href={site.line.url} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">
                LINE ID: {site.line.id}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x">
        <div className="relative h-64 overflow-hidden rounded-[4px] border border-ivory/10 md:h-80">
          <iframe
            title="Jesse & Son on Google Maps"
            src={site.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)_sepia(0.25)]"
          />
        </div>
      </div>

      <div className="container-x flex flex-col gap-4 py-10 text-[0.8rem] text-ivory/45 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-6">
          <li>
            <Link href="/cookie-policy" className="hover:text-champagne">
              Cookies policy
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy" className="hover:text-champagne">
              Privacy policy
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-champagne">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow text-champagne">{title}</h3>
      <ul className="mt-6 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-2 text-[0.95rem] text-ivory/70 transition-colors hover:text-champagne"
            >
              <span className="h-px w-0 bg-champagne transition-all duration-500 group-hover:w-4" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
