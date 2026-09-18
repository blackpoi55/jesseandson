import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LineIcon,
  TripAdvisorIcon,
  WhatsAppIcon,
} from "@/components/brand/icons";
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

/** The "back cover": invitation, index columns, map and a full-width masthead. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-fg bg-bg-alt text-fg">
      {/* Invitation */}
      <div className="container-x grid items-end gap-10 border-b border-line py-16 md:py-24 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="eyebrow">Visit the house</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.04] md:text-6xl">
            Your perfect suit begins with a <em className="text-accent-italic">conversation.</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <LinkButton href="/contact#appointment" size="lg">
            Book a fitting
          </LinkButton>
          <LinkButton href={site.line.url} variant="outline" size="lg" arrow={false} icon={<LineIcon className="size-4" />}>
            Chat on LINE
          </LinkButton>
        </div>
      </div>

      <div className="container-x grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <p className="eyebrow">The house</p>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            A family-run bespoke tailor on Sukhumvit Soi 10, led by Jesse (Suthep) and his sons — over 30 years of
            craftsmanship, genuine fabrics and personal service for men and women.
          </p>
          <ul className="mt-7 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center border border-line text-fg transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
                >
                  <Icon className="size-[17px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Explore" links={footerNav.explore} />
        <FooterColumn title="Services" links={footerNav.services} />

        <div>
          <p className="eyebrow">Visit us</p>
          <address className="mt-5 space-y-4 leading-relaxed text-muted not-italic">
            <a href={site.social.googleMaps} target="_blank" rel="noopener noreferrer" className="block hover:text-fg">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </a>
            <p>
              Monday – Saturday, 10:00 – 20:00
              <span className="block text-subtle">Closed Sunday</span>
            </p>
            <p className="font-sans text-[0.8rem] tracking-[0.08em]">
              <a href={`tel:${site.phone}`} className="block hover:text-fg">
                T. {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="block hover:text-fg">
                E. {site.email}
              </a>
              <a href={site.line.url} target="_blank" rel="noopener noreferrer" className="block hover:text-fg">
                LINE. {site.line.id}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="container-x">
        <div className="relative h-60 overflow-hidden border border-line md:h-72">
          <iframe
            title="Jesse & Son on Google Maps"
            src={site.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale dark:[filter:grayscale(1)_invert(0.9)_contrast(0.9)]"
          />
        </div>
      </div>

      {/* Masthead */}
      <div className="container-x pt-14" aria-hidden>
        <p className="text-center font-display leading-[0.8] tracking-[0.02em] whitespace-nowrap text-[clamp(3rem,13.5vw,14rem)]">
          JESSE <span className="text-accent italic">&amp;</span> SON
        </p>
      </div>

      <div className="container-x mt-8 flex flex-col gap-4 border-t border-line py-7 font-sans text-[0.7rem] tracking-[0.12em] text-muted uppercase md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.legalName}
        </p>
        <ul className="flex flex-wrap gap-6">
          <li>
            <Link href="/cookie-policy" className="hover:text-fg">
              Cookies policy
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy" className="hover:text-fg">
              Privacy policy
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-fg">
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
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="font-serif text-lg transition-all duration-300 hover:text-accent hover:italic">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
