import { MonogramSeal } from "@/components/brand/monogram";
import { ParallaxImage } from "@/components/motion/effects";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { LinkButton } from "@/components/ui/button";
import { site } from "@/lib/site";

/** Closing call-to-action over a parallax photograph. */
export function CtaBand({
  title = "Ready for your *perfect* suit?",
  lead = "Book a consultation with Bangkok's most trusted family tailors. Walk-ins are welcome — appointments are given priority.",
  image = "/media/a4e69-1633604348465.webp",
}: {
  title?: string;
  lead?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory">
      <ParallaxImage src={image} alt="" className="absolute inset-0 -z-20" strength={14} />
      <div className="absolute inset-0 -z-10 bg-black/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_75%)]" />
      <div className="container-x relative flex flex-col items-center py-28 text-center md:py-40">
        <MonogramSeal className="mb-10 size-28 text-champagne md:size-32" />
        <SplitText text={title} className="max-w-4xl font-serif text-5xl leading-[1.02] font-light md:text-7xl" />
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ivory/75">{lead}</p>
        </Reveal>
        <Reveal delay={0.45} className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton href="/contact#appointment" size="lg">
            Schedule your fitting
          </LinkButton>
          <LinkButton href={`tel:${site.phone}`} variant="light" size="lg" arrow={false}>
            Call {site.phoneDisplay}
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}
