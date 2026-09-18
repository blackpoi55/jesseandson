import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { ShareButtons, TableOfContents } from "@/components/article-tools";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PostCard } from "@/components/post-card";
import { LinkButton } from "@/components/ui/button";
import { getPost, posts, relatedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? `${site.url}${post.image}` : undefined,
    author: { "@type": "Organization", name: "Jesse & Son" },
    publisher: { "@type": "Organization", name: "Jesse & Son" },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="grain relative isolate overflow-hidden bg-ink pt-36 pb-16 text-ivory md:pt-44 md:pb-24">
        {post.image && (
          <Image src={post.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-35 blur-[2px]" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/70 to-ink" />
        <div className="container-narrow">
          <Reveal direction="fade">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.25em] text-champagne uppercase hover:underline">
              <ArrowLeft className="size-3.5" /> The journal
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-serif text-4xl leading-[1.05] font-light md:text-6xl">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/70">{post.description}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex items-center gap-6 text-[0.7rem] tracking-[0.22em] text-ivory/60 uppercase">
            <span>By Jesse &amp; Son</span>
            <span className="flex items-center gap-2">
              <Clock className="size-3.5" strokeWidth={1.5} /> {post.readingMinutes} min read
            </span>
          </Reveal>
        </div>
      </header>

      {post.image && (
        <div className="container-x -mt-2 md:-mt-4">
          <Reveal direction="scale" className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden rounded-[4px] shadow-card">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover" priority />
          </Reveal>
        </div>
      )}

      <div className="container-x grid gap-16 py-20 lg:grid-cols-[16rem_1fr] lg:gap-20 xl:grid-cols-[18rem_1fr_6rem]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>
        <article className="min-w-0">
          <div className="prose-article mx-auto max-w-[42rem]" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="mx-auto mt-16 flex max-w-[42rem] flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <ShareButtons title={post.title} />
            <LinkButton href="/contact#appointment" size="sm">
              Book a fitting
            </LinkButton>
          </div>
        </article>
      </div>

      <section className="border-t border-line bg-bg-alt py-24 md:py-28">
        <div className="container-x">
          <p className="eyebrow">Keep reading</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">More from the journal</h2>
          <RevealGroup className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8" stagger={0.1}>
            {related.map((p) => (
              <RevealItem key={p.slug}>
                <PostCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
