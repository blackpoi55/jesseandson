import type { Metadata } from "next";
import { BlogBrowser } from "@/components/blog-browser";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "The Journal — Bespoke Tailoring Guides",
  description:
    "Guides from Jesse & Son on bespoke suits in Bangkok: fabrics for humid weather, fittings, pricing, weddings, shirts, shoes and caring for your garments.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        image="/media/d4da7-bangkok-bespoke-tailoring.webp"
        imagePosition="70% center"
        eyebrow="The journal"
        title="Notes from the *cutting* table."
        lead={`${posts.length} guides on fabrics, fittings, weddings and dressing well in Bangkok's climate.`}
        crumbs={[{ label: "Journal" }]}
        size="md"
      />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-8">Latest article</p>
            <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <PostCard post={featured} large />
              <div className="hidden border-l border-line pl-10 lg:block">
                <p className="font-serif text-3xl leading-snug font-light italic">
                  Practical, honest advice from a family that has been cutting cloth for more than 30 years.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-bg-alt py-24 md:py-32">
        <div className="container-x">
          <BlogBrowser posts={rest} />
        </div>
      </section>
    </>
  );
}
