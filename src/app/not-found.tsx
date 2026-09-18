import { PatternDraft } from "@/components/art/pattern-draft";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-bg pt-24 pb-20 text-fg">
      <PatternDraft className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto w-[120%] max-w-none -translate-y-1/2 text-accent opacity-15" />
      <div className="container-narrow text-center">
        <p className="font-display text-sm tracking-[0.5em] text-accent">404</p>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-light md:text-7xl">
          This page needs <em className="text-accent-italic">a little alteration.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist — or has a new address on our new website.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton href="/">Back to home</LinkButton>
          <LinkButton href="/blog" variant="outline" arrow={false}>
            Browse the journal
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
