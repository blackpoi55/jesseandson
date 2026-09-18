import { PatternDraft } from "@/components/art/pattern-draft";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-svh items-center overflow-hidden bg-ink pt-32 pb-20 text-ivory">
      <PatternDraft className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto w-[120%] max-w-none -translate-y-1/2 text-champagne opacity-15" />
      <div className="container-narrow text-center">
        <p className="font-display text-sm tracking-[0.5em] text-champagne">404</p>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-light md:text-7xl">
          This page needs <em className="text-gold-gradient">a little alteration.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-ivory/70">
          The page you&apos;re looking for doesn&apos;t exist — or has a new address on our new website.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton href="/">Back to home</LinkButton>
          <LinkButton href="/blog" variant="light" arrow={false}>
            Browse the journal
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
