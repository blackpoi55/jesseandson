import Image from "next/image";
import { ButtonIcon, HangerIcon, NeedleIcon, TapeIcon } from "@/components/brand/icons";
import { MonogramSeal } from "@/components/brand/monogram";
import { CtaBand } from "@/components/cta-band";
import { CollectionPanels } from "@/components/home/collection-panels";
import { HomeHero } from "@/components/home/hero";
import { ReasonsScroller } from "@/components/home/reasons-scroller";
import { CountUp, ParallaxImage, Tilt } from "@/components/motion/effects";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PostCard } from "@/components/post-card";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { LinkButton, TextLink } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/image-card";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutQuote, stats } from "@/content/about";
import { looks } from "@/content/lookbook";
import { mills } from "@/content/pricing";
import { processSteps } from "@/content/process";
import { posts } from "@/lib/blog";

const specialities = [
  { Icon: HangerIcon, text: "Custom-made business suits" },
  { Icon: NeedleIcon, text: "Wedding suits & formal wear" },
  { Icon: ButtonIcon, text: "Bespoke shirts with mother-of-pearl buttons" },
  { Icon: TapeIcon, text: "Luxury overcoats, jackets & alterations" },
];

export default function HomePage() {
  const latest = posts.slice(0, 3);
  const strip = looks.slice(0, 12);

  return (
    <>
      <HomeHero />

      {/* Three doors — overlaps the hero like the house's entrance */}
      <section className="relative z-10 -mt-24 md:-mt-20">
        <RevealGroup className="container-x grid gap-4 md:grid-cols-3" stagger={0.12}>
          {[
            { href: "/about", image: "/media/7c1b3-6-interior.webp", title: "About Us", subtitle: "Our heritage, your style" },
            { href: "/products", image: "/media/2f289-custom-suits-for-executives-why-top-ceos-choose-jesse-son.webp", title: "Our Products", subtitle: "Suits, shirts and more" },
            { href: "/process", image: "/media/830f3-nzy3m2rjzwitmzqwns00ownhlwzlodytmtq5nduzotm5nguy-1-1.webp", title: "How It Works", subtitle: "From measurement to masterpiece" },
          ].map((c, i) => (
            <RevealItem key={c.href}>
              <Tilt max={5}>
                <ImageCard {...c} eyebrow={`0${i + 1}`} className="h-[230px] sm:h-[300px] md:h-[340px]" />
              </Tilt>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Introduction */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="container-x grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Premier Bangkok tailor"
              title="Expert tailoring in the *heart* of Bangkok."
              script="on Sukhumvit Soi 10"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                For 30 years Jesse &amp; Son has been a destination for bespoke suits and custom tailoring. On
                Sukhumvit Soi 10, our master tailors combine traditional craftsmanship with modern technique to create
                garments that fit perfectly and reflect your personal style — for locals and international clients
                alike.
              </p>
            </Reveal>
            <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {specialities.map(({ Icon, text }) => (
                <RevealItem as="li" key={text} className="flex items-center gap-4 border-t border-line pt-4">
                  <Icon className="size-9 shrink-0 text-gold" />
                  <span className="text-[0.98rem]">{text}</span>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-4">
              <LinkButton href="/about">Discover our story</LinkButton>
              <LinkButton href="/pricing" variant="outline" arrow={false}>
                View price guide
              </LinkButton>
            </Reveal>
          </div>

          <div className="relative">
            <MaskReveal className="relative aspect-[4/5] w-[82%] rounded-[4px]">
              <Image
                src="/media/2e354-image1.webp"
                alt="A tailor checking the shoulder of a tweed jacket"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover"
                style={{ objectPosition: "62% center" }}
              />
            </MaskReveal>
            <Reveal direction="left" delay={0.4} className="absolute right-0 -bottom-12 w-[52%]">
              <div className="relative aspect-square overflow-hidden rounded-[4px] border-[6px] border-bg shadow-card">
                <Image src="/media/37ee7-8-inexterior.webp" alt="Chalk lines on navy cloth" fill sizes="25vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.6} className="absolute top-10 -right-4 hidden md:block">
              <MonogramSeal className="size-28 text-gold" />
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="container-x mt-32">
          <RevealGroup className="grid grid-cols-2 gap-y-12 border-y border-line py-12 md:grid-cols-4">
            {stats.map((s, i) => (
              <RevealItem key={s.label} className={i > 0 ? "md:border-l md:border-line md:pl-10" : ""}>
                <CountUp value={s.value} className="font-display text-5xl text-gold md:text-6xl" />
                <p className="mt-3 text-[0.72rem] tracking-[0.25em] text-muted uppercase">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Collections */}
      <section className="pb-28 md:pb-40">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="The collections" title="Cut for *you* alone." />
            <Reveal>
              <TextLink href="/products">All products</TextLink>
            </Reveal>
          </div>
          <CollectionPanels />
        </div>
      </section>

      {/* Heritage */}
      <section className="grain relative isolate overflow-hidden bg-ink py-28 text-ivory md:py-40">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative mx-auto w-full max-w-md lg:order-2">
            <MaskReveal from="left" className="relative aspect-[3/4] rounded-[4px]">
              <Image
                src="/media/72382-jesseandson-portrait.webp"
                alt="The family behind Jesse & Son"
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover"
              />
            </MaskReveal>
            <div className="absolute -inset-4 -z-10 translate-x-6 translate-y-6 rounded-[4px] border border-champagne/30" />
            <p className="font-script absolute -bottom-10 -left-6 text-5xl text-champagne md:-left-16 md:text-6xl">Jesse &amp; Son</p>
          </div>
          <div>
            <p className="eyebrow text-champagne">Our heritage</p>
            <Reveal>
              <blockquote className="mt-6 font-serif text-4xl leading-[1.1] font-light md:text-6xl">
                “{aboutQuote.text}”
                <footer className="mt-5 text-base tracking-[0.3em] text-champagne not-italic uppercase">
                  — {aboutQuote.author}
                </footer>
              </blockquote>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-ivory/70">
                From early roots in Udonthani serving American GIs, to three decades in Bangkok, Jesse (Suthep) opened
                his own flagship on Sukhumvit Road. Today, Jesse and his sons bring intimate knowledge of bespoke
                tailoring to every client who walks through the door — with a welcome drink from our signature bar.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <LinkButton href="/about" variant="light">
                The Jesse &amp; Son story
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </section>

      <ReasonsScroller />

      {/* Process */}
      <section className="py-28 md:py-40">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <SectionHeading eyebrow="How it works" title="From first visit to *final* stitch." />
            <Reveal>
              <p className="max-w-xl text-lg leading-relaxed text-muted lg:justify-self-end">
                Six unhurried steps — even on a three-day trip. Every garment gets its own pattern, drafted from more
                than 20 of your measurements and cut by hand by our master tailor.
              </p>
            </Reveal>
          </div>
          <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {processSteps.map((s, i) => (
              <RevealItem key={s.id} className="group relative isolate overflow-hidden bg-bg">
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <Image src={s.image} alt="" fill sizes="33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="flex h-full min-h-[17rem] flex-col p-8 transition-colors duration-500 group-hover:text-ivory md:p-10">
                  <span className="font-display text-5xl text-gold/70 transition-colors group-hover:text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-serif text-3xl">{s.title}</h3>
                  <p className="mt-3 line-clamp-3 text-muted transition-colors group-hover:text-ivory/75">{s.body[0]}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <LinkButton href="/process">See the full process</LinkButton>
            <LinkButton href="/craftsmanship" variant="outline" arrow={false}>
              Details &amp; construction
            </LinkButton>
          </Reveal>
        </div>
      </section>

      {/* Mills marquee */}
      <section className="border-y border-line bg-bg-alt py-10" aria-label="Mills we work with">
        <Marquee items={mills} className="font-serif text-3xl text-fg/80 italic md:text-5xl" speed={45} />
      </section>

      {/* Testimonials */}
      <section className="py-28 md:py-40">
        <div className="container-x">
          <SectionHeading eyebrow="Client stories" title="What our clients are *saying.*" align="center" />
          <div className="mt-6">
            <TestimonialCarousel />
          </div>
          <Reveal className="mt-12 flex justify-center">
            <TextLink href="/testimonials">Read all testimonials</TextLink>
          </Reveal>
        </div>
      </section>

      {/* Look book strip */}
      <section className="overflow-hidden bg-ink py-24 text-ivory md:py-32">
        <div className="container-x mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-champagne">Look book</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.02] md:text-6xl">
              Worn by <em className="text-gold-gradient">real clients.</em>
            </h2>
          </div>
          <LinkButton href="/lookbook" variant="light">
            Open the look book
          </LinkButton>
        </div>
        <Marquee
          speed={70}
          separator=""
          items={strip.map((l) => (
            <span key={l.src} className="relative -mx-6 block h-80 w-60 overflow-hidden rounded-[3px] md:-mx-9 md:h-[26rem] md:w-80">
              <Image src={l.src} alt={l.alt} fill sizes="320px" className="object-cover transition-transform duration-1000 hover:scale-110" />
            </span>
          ))}
        />
      </section>

      {/* Journal */}
      <section className="py-28 md:py-40">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="The journal" title="Notes from the *cutting* table." />
            <Reveal>
              <TextLink href="/blog">View all articles</TextLink>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-12 md:grid-cols-3 md:gap-8" stagger={0.12}>
            {latest.map((p) => (
              <RevealItem key={p.slug}>
                <PostCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* The bar */}
      <section className="relative isolate">
        <div className="grid lg:grid-cols-2">
          <ParallaxImage src="/media/a4e69-1633604348465.webp" alt="The signature bar at Jesse & Son" className="h-[60svh] lg:h-auto lg:min-h-[640px]" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="flex items-center bg-bg-alt px-6 py-20 md:px-16 lg:px-20">
            <div className="max-w-lg">
              <SectionHeading
                eyebrow="The experience"
                title="A drink is *poured* before a single measurement."
                lead="Every visit begins at our signature bar — espresso, tea, a cold Singha or a glass of single malt — while we talk about the occasion, your lifestyle and the fabrics you love."
              />
              <Reveal delay={0.2} className="mt-10">
                <LinkButton href="/contact#appointment">Reserve your visit</LinkButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
