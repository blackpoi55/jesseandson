import Image from "next/image";
import { ButtonIcon, HangerIcon, NeedleIcon, TapeIcon } from "@/components/brand/icons";
import { CtaBand } from "@/components/cta-band";
import { CollectionPanels } from "@/components/home/collection-panels";
import { HomeHero } from "@/components/home/hero";
import { ReasonsScroller } from "@/components/home/reasons-scroller";
import { CountUp, ParallaxImage } from "@/components/motion/effects";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PostCard } from "@/components/post-card";
import { SpinViewer } from "@/components/spin-viewer";
import { spinFrames } from "@/lib/spin";
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
  { Icon: TapeIcon, text: "Overcoats, jackets & alterations" },
];

export default function HomePage() {
  const [lead, ...more] = posts.slice(0, 3);
  const strip = looks.slice(0, 12);

  return (
    <>
      <HomeHero />

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Features" number="p. 02" title="Inside the *house.*" />
          <RevealGroup className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6" stagger={0.12}>
            {[
              { href: "/about", image: "/media/095eb-1633604348449.webp", title: "About Us", subtitle: "Our heritage, your style" },
              { href: "/products", image: "/media/2f289-custom-suits-for-executives-why-top-ceos-choose-jesse-son.webp", title: "Our Products", subtitle: "Suits, shirts and more" },
              { href: "/process", image: "/media/830f3-nzy3m2rjzwitmzqwns00ownhlwzlodytmtq5nduzotm5nguy-1-1.webp", title: "How It Works", subtitle: "From measurement to masterpiece" },
            ].map((c, i) => (
              <RevealItem key={c.href}>
                <ImageCard {...c} eyebrow={`No. 0${i + 1}`} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Introduction — a two-column feature */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="The house" number="p. 06" title="Expert tailoring in the *heart* of Bangkok." />
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="gap-10 text-[1.12rem] leading-relaxed md:columns-2 [&>p+p]:mt-5">
                  <p className="drop-cap">
                    For thirty years Jesse &amp; Son has been a destination for bespoke suits and custom tailoring. On
                    Sukhumvit Soi 10, our master tailors combine traditional craftsmanship with modern technique to
                    create garments that fit perfectly and reflect your personal style.
                  </p>
                  <p>
                    Every client has an individual pattern, drafted from more than twenty measurements and cut by hand.
                    Fabrics come from certified agents and famous mills; every suit carries a Bemberg lining and real
                    horn buttons, every shirt mother-of-pearl.
                  </p>
                  <p>
                    Locals and international visitors alike return year after year — and on a short trip, a suit can be
                    made in as little as three days, with fittings planned around your schedule.
                  </p>
                </div>
              </Reveal>
              <RevealGroup as="ul" className="mt-10 grid border-t border-fg sm:grid-cols-2" stagger={0.08}>
                {specialities.map(({ Icon, text }, i) => (
                  <RevealItem
                    as="li"
                    key={text}
                    className={`flex items-center gap-4 border-b border-line py-4 ${i % 2 ? "sm:border-l sm:pl-6" : "sm:pr-6"}`}
                  >
                    <Icon className="size-8 shrink-0 text-accent" />
                    <span className="font-sans text-[0.7rem] tracking-[0.18em] uppercase">{text}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
              <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
                <LinkButton href="/about">Discover our story</LinkButton>
                <LinkButton href="/pricing" variant="outline" arrow={false}>
                  View price guide
                </LinkButton>
              </Reveal>
            </div>
            <figure className="lg:col-span-5">
              <MaskReveal className="relative aspect-[4/5] bg-bg-alt">
                <Image
                  src="/media/2e354-image1.webp"
                  alt="A tailor checking the shoulder of a tweed jacket"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "62% center" }}
                />
              </MaskReveal>
              <figcaption className="mt-3 font-sans text-[0.62rem] tracking-[0.22em] text-muted uppercase">
                Fig. — Checking the shoulder line at the first fitting
              </figcaption>
            </figure>
          </div>

          {/* Stats */}
          <RevealGroup className="mt-20 grid grid-cols-2 border-y border-fg md:grid-cols-4">
            {stats.map((s, i) => (
              <RevealItem key={s.label} className={`py-8 ${i % 2 ? "border-l border-line pl-6" : ""} ${i === 2 ? "md:border-l md:pl-6" : ""}`}>
                <CountUp value={s.value} className="font-serif text-5xl md:text-7xl" />
                <p className="mt-3 font-sans text-[0.62rem] tracking-[0.22em] text-muted uppercase">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Collections */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="The collections" number="p. 12" title="Cut for *you* alone." className="flex-1" />
          </div>
          <CollectionPanels />
          <Reveal className="mt-8 flex justify-end">
            <TextLink href="/products">All products</TextLink>
          </Reveal>
        </div>
      </section>

      {/* 360° showroom teaser */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="New · The showroom"
              number="p. 18"
              title="The suit, in the *round.*"
              lead="Grab the jacket and turn it — lapels, pockets, shoulders and vent, from every angle. Three looks to explore, each cut to measure in any cloth from our library."
            />
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <LinkButton href="/showroom">Enter the showroom</LinkButton>
              <LinkButton href="/contact#appointment" variant="outline" arrow={false}>
                Book a fitting
              </LinkButton>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <SpinViewer frames={spinFrames("navy")} alt="The Navy Two-Piece on a tailor's dress form" compact />
            <p className="mt-2 font-sans text-[0.62rem] tracking-[0.2em] text-muted uppercase">
              Fig. — The Navy Two-Piece · rendered preview
            </p>
          </Reveal>
        </div>
      </section>

      {/* Heritage — interview spread */}
      <section className="border-y border-line bg-bg-alt py-20 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <figure className="lg:col-span-5">
            <MaskReveal from="left" className="relative aspect-[3/4] bg-bg">
              <Image
                src="/media/72382-jesseandson-portrait.webp"
                alt="The family behind Jesse & Son"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </MaskReveal>
            <figcaption className="mt-3 font-sans text-[0.62rem] tracking-[0.22em] text-muted uppercase">
              Portrait — the family behind Jesse &amp; Son
            </figcaption>
          </figure>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-accent">Our heritage</p>
            <Reveal>
              <blockquote className="mt-8 font-serif text-4xl leading-[1.1] italic md:text-6xl">
                <span className="text-accent">“</span>
                {aboutQuote.text}
                <span className="text-accent">”</span>
              </blockquote>
              <p className="mt-6 font-sans text-[0.66rem] tracking-[0.28em] text-muted uppercase">— {aboutQuote.author}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-xl text-[1.12rem] leading-relaxed text-muted">
                From early roots in Udonthani serving American GIs, to three decades in Bangkok, Jesse (Suthep) opened
                his own flagship on Sukhumvit Road. Today, Jesse and his sons bring intimate knowledge of bespoke
                tailoring to every client who walks through the door — with a welcome drink from the signature bar.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <LinkButton href="/about" variant="outline">
                The Jesse &amp; Son story
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </section>

      <ReasonsScroller />

      {/* Process */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading eyebrow="How it works" number="p. 24" title="From first visit to *final* stitch." className="lg:col-span-7" />
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <p className="text-[1.12rem] leading-relaxed text-muted">
                Six unhurried steps — even on a three-day trip. Every garment gets its own pattern, drafted from more
                than twenty of your measurements and cut by hand.
              </p>
            </Reveal>
          </div>
          <RevealGroup className="mt-14 grid border-t border-fg sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {processSteps.map((s, i) => (
              <RevealItem
                key={s.id}
                className="group relative isolate overflow-hidden border-b border-line sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <Image src={s.image} alt="" fill sizes="33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-black/65" />
                </div>
                <div className="flex h-full min-h-[16rem] flex-col p-7 transition-colors duration-500 group-hover:text-white md:p-9">
                  <span className="font-serif text-5xl text-accent transition-colors group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-serif text-3xl">{s.title}</h3>
                  <p className="mt-3 line-clamp-3 text-muted transition-colors group-hover:text-white/80">{s.body[0]}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="/process">See the full process</LinkButton>
            <LinkButton href="/craftsmanship" variant="outline" arrow={false}>
              Details &amp; construction
            </LinkButton>
          </Reveal>
        </div>
      </section>

      {/* Mills marquee */}
      <section className="border-y border-fg py-8" aria-label="Mills we work with">
        <Marquee items={mills} className="font-serif text-3xl italic md:text-5xl" speed={45} />
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Letters" number="p. 30" title="What our clients are *saying.*" align="center" />
          <div className="mt-6">
            <TestimonialCarousel />
          </div>
          <Reveal className="mt-12 flex justify-center">
            <TextLink href="/testimonials">Read all testimonials</TextLink>
          </Reveal>
        </div>
      </section>

      {/* Look book strip */}
      <section className="overflow-hidden border-t border-line py-20 md:py-28">
        <div className="container-x mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Look book" number="p. 36" title="Worn by *real* clients." className="flex-1" />
          <LinkButton href="/lookbook" variant="outline">
            Open the look book
          </LinkButton>
        </div>
        <Marquee
          speed={70}
          separator=""
          items={strip.map((l) => (
            <span key={l.src} className="-mx-6 block md:-mx-8">
              <span className="relative block h-80 w-60 overflow-hidden bg-bg-alt md:h-[26rem] md:w-80">
                <Image src={l.src} alt={l.alt} fill sizes="320px" className="object-cover transition-transform duration-1000 hover:scale-105" />
              </span>
              <span className="mt-2 block max-w-60 truncate font-sans text-[0.6rem] tracking-[0.2em] text-muted uppercase md:max-w-80">
                {l.alt}
              </span>
            </span>
          ))}
        />
      </section>

      {/* Journal */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="The journal" number="p. 42" title="Notes from the *cutting* table." className="flex-1" />
          </div>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-7">
              <PostCard post={lead} large />
            </Reveal>
            <RevealGroup className="grid gap-12 lg:col-span-5 lg:border-l lg:border-line lg:pl-8" stagger={0.12}>
              {more.map((p) => (
                <RevealItem key={p.slug}>
                  <PostCard post={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal className="mt-12 flex justify-end">
            <TextLink href="/blog">View all articles</TextLink>
          </Reveal>
        </div>
      </section>

      {/* The bar */}
      <section className="border-t border-line bg-bg-alt">
        <div className="grid lg:grid-cols-2">
          <ParallaxImage
            src="/media/a4e69-1633604348465.webp"
            alt="The signature bar at Jesse & Son"
            className="h-[60svh] lg:h-auto lg:min-h-[620px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="flex items-center px-6 py-20 md:px-16 lg:px-20">
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

      <CtaBand image="/media/1bbe4-ee9f1-1633604348404.webp" />
    </>
  );
}
