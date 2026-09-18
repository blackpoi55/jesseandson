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

      <header className="container-x pt-8 md:pt-10">
        <Reveal direction="fade" className="flex items-center justify-between gap-4 border-b border-fg pb-3">
          <Link href="/blog" className="inline-flex items-center gap-2 font-sans text-[0.62rem] tracking-[0.24em] uppercase hover:text-accent">
            <ArrowLeft className="size-3.5" /> The journal
          </Link>
          <span className="flex items-center gap-2 font-sans text-[0.62rem] tracking-[0.24em] text-muted uppercase">
            <Clock className="size-3.5" strokeWidth={1.5} /> {post.readingMinutes} min read
          </span>
        </Reveal>
        <div className="mx-auto max-w-5xl py-14 text-center md:py-20">
          <Reveal direction="fade">
            <p className="eyebrow text-accent">Journal · By Jesse &amp; Son</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.02] font-normal tracking-[-0.01em] md:text-7xl">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-3xl font-serif text-xl leading-relaxed text-muted italic md:text-2xl">{post.description}</p>
          </Reveal>
        </div>
      </header>

      {post.image && (
        <figure className="container-x">
          <Reveal direction="fade" className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden bg-bg-alt">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover" priority />
          </Reveal>
          <figcaption className="mx-auto mt-3 max-w-6xl font-sans text-[0.62rem] tracking-[0.22em] text-muted uppercase">
            {post.title}
          </figcaption>
        </figure>
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
