import type { Metadata } from "next";
import { Star } from "lucide-react";
import { GoogleIcon, InstagramIcon, TripAdvisorIcon } from "@/components/brand/icons";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { TestimonialWall } from "@/components/testimonial-wall";
import { LinkButton } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { testimonials } from "@/content/testimonials";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials — What Our Clients Say",
  description:
    "Verified Google reviews from Jesse & Son clients — travellers, grooms and executives on the fit, fabrics and service of Bangkok's family tailor.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        image="/media/5abe0-jesseandson-vs-competitors.webp"
        eyebrow="Testimonials"
        title="In our *clients'* words."
        lead="Honest reviews from travellers, grooms, executives and regulars who return year after year."
        crumbs={[{ label: "Testimonials" }]}
        size="md"
      />

      <section className="border-b border-line py-10">
        <Marquee
          speed={60}
          className="font-serif text-2xl italic md:text-4xl"
          items={testimonials.map((t) => `“${t.quote}”`)}
        />
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mb-16 flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-4">
              <GoogleIcon className="size-8" />
              <span className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-6 fill-current" strokeWidth={0} />
                ))}
              </span>
            </div>
            <p className="max-w-xl text-muted">
              Every review below is a real Google review, shown in the client&apos;s own words.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <LinkButton href={site.social.googleReviews} variant="outline" size="sm" arrow={false} icon={<GoogleIcon className="size-4" />}>
                More reviews on Google
              </LinkButton>
              <LinkButton href={site.social.tripadvisor} variant="outline" size="sm" arrow={false} icon={<TripAdvisorIcon className="size-4" />}>
                Tripadvisor
              </LinkButton>
              <LinkButton href={site.social.instagram} variant="outline" size="sm" arrow={false} icon={<InstagramIcon className="size-4" />}>
                Instagram
              </LinkButton>
            </div>
          </Reveal>
          <TestimonialWall items={testimonials} />
        </div>
      </section>

      <CtaBand title="Write your own *story.*" lead="Join the travellers, grooms and executives who make Jesse & Son their tailor in Bangkok." />
    </>
  );
}
