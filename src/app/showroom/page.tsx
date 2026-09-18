import type { Metadata } from "next";
import Link from "next/link";
import { Hand, Search, Shirt } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Showroom } from "@/components/showroom";

export const metadata: Metadata = {
  title: "360° Showroom — Turn the Suit Around",
  description:
    "Drag to turn our suits through 360°: a navy two-piece, a chalk-stripe peak lapel and a midnight tuxedo — each cut to measure at Jesse & Son, Bangkok.",
  alternates: { canonical: "/showroom" },
};

const how = [
  { Icon: Hand, title: "Drag to turn", body: "Grab the suit and spin it — let go and it keeps turning." },
  { Icon: Search, title: "Zoom in", body: "Double-click or use + to inspect lapels, pockets and buttons." },
  { Icon: Shirt, title: "Compare looks", body: "Switch looks and the angle stays put, so you can compare side by side." },
];

export default function ShowroomPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-x pt-8 md:pt-10">
          <div className="flex items-center gap-4 border-b border-fg pb-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 font-sans text-[0.62rem] tracking-[0.22em] text-muted uppercase">
                <li>
                  <Link href="/" className="hover:text-fg">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/products" className="hover:text-fg">
                    Products
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-fg" aria-current="page">
                  Showroom
                </li>
              </ol>
            </nav>
            <span className="flex-1" />
            <p className="eyebrow hidden text-accent sm:block">In the round</p>
          </div>

          <div className="grid gap-8 pt-12 pb-12 md:pt-16 lg:grid-cols-12 lg:items-end">
            <SplitText
              as="h1"
              animateOnMount
              delay={0.1}
              text="The 360° *Showroom.*"
              className="font-serif text-[3rem] leading-[0.98] tracking-[-0.015em] sm:text-6xl md:text-7xl lg:col-span-8 lg:text-[6.2rem]"
            />
            <Reveal delay={0.4} className="lg:col-span-4">
              <p className="text-[1.2rem] leading-relaxed text-muted">
                Walk all the way around the suit — lapels, pockets, shoulders and vent — before you ever step into the
                shop.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-x">
          <Showroom />
        </div>
      </section>

      <section className="border-t border-line bg-bg-alt py-16 md:py-20">
        <RevealGroup className="container-x grid gap-px bg-line md:grid-cols-3" stagger={0.1}>
          {how.map(({ Icon, title, body }, i) => (
            <RevealItem key={title} className="bg-bg-alt p-8 md:p-10">
              <div className="flex items-center justify-between">
                <Icon className="size-7 text-accent" strokeWidth={1.2} />
                <span className="font-serif text-3xl text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 font-serif text-3xl">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CtaBand
        image="/media/1bbe4-ee9f1-1633604348404.webp"
        title="Any look, in *your* cloth."
        lead="Every suit in the showroom can be cut from any fabric in our library — and fitted to you alone."
      />
    </>
  );
}
