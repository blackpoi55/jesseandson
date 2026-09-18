import { MonogramSeal } from "@/components/brand/monogram";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { LinkButton } from "@/components/ui/button";
import { site } from "@/lib/site";
import Image from "next/image";

/** Closing spread: photograph on one page, the invitation on the other. */
export function CtaBand({
  title = "Ready for your *perfect* suit?",
  lead = "Book a consultation with Bangkok's family tailors. Walk-ins are welcome — appointments are given priority.",
  image = "/media/a4e69-1633604348465.webp",
}: {
  title?: string;
  lead?: string;
  image?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="container-x grid items-stretch gap-10 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
        <MaskReveal className="relative aspect-[4/3] bg-bg-alt lg:aspect-auto lg:min-h-[520px]">
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </MaskReveal>
        <div className="flex flex-col justify-between gap-10 border-t border-fg pt-6">
          <div className="flex items-start justify-between gap-6">
            <p className="eyebrow">The invitation</p>
            <MonogramSeal className="size-20 shrink-0" />
          </div>
          <div>
            <SplitText text={title} className="font-serif text-5xl leading-[1] font-normal md:text-[4.6rem]" />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-[1.2rem] leading-relaxed text-muted">{lead}</p>
            </Reveal>
            <Reveal delay={0.35} className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/contact#appointment" size="lg">
                Schedule your fitting
              </LinkButton>
              <LinkButton href={`tel:${site.phone}`} variant="outline" size="lg" arrow={false}>
                Call {site.phoneDisplay}
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
