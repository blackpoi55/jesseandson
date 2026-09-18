import type { Metadata, Viewport } from "next";
import { CustomCursor } from "@/components/layout/cursor";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Preloader } from "@/components/layout/preloader";
import { ScrollProgress } from "@/components/motion/effects";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

const description =
  "Family-run bespoke tailor on Sukhumvit Soi 10, Bangkok. Over 30 years crafting custom suits, shirts, overcoats and shoes for men and women — genuine fabrics, Bemberg linings and multiple fittings.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jesse & Son — Best Bespoke Tailor in Bangkok | Custom Suits",
    template: "%s | Jesse & Son Bangkok",
  },
  description,
  keywords: [
    "tailor Bangkok",
    "bespoke tailor Bangkok",
    "custom suits Bangkok",
    "Sukhumvit tailor",
    "wedding suit Bangkok",
    "custom shirts Bangkok",
  ],
  openGraph: {
    type: "website",
    siteName: "Jesse & Son",
    locale: "en_US",
    url: site.url,
    title: "Jesse & Son — Bespoke Tailor in Bangkok",
    description,
    images: [{ url: "/media/d4da7-bangkok-bespoke-tailoring.webp", width: 1200, height: 628, alt: "Jesse & Son bespoke tailoring" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ClothingStore"],
  "@id": `${site.url}/#store`,
  name: "Jesse and Son Custom Tailors",
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.email,
  priceRange: "$$",
  image: `${site.url}/media/d4da7-bangkok-bespoke-tailoring.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  sameAs: [site.social.facebook, site.social.instagram, site.social.tripadvisor],
  knowsAbout: ["bespoke suits", "custom tailoring", "wedding suits", "shirt tailoring", "overcoats", "alterations"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={fontVariables}>
      <body className="min-h-svh">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <a
            href="#main"
            className="btn-primary fixed top-3 left-3 z-[130] -translate-y-24 px-5 py-3 font-serif italic focus:translate-y-0"
          >
            Skip to content
          </a>
          <Preloader />
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingContact />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
