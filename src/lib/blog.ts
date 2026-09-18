import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import index from "../../content/blog/_index.json";

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  readingMinutes: number;
};

export type Post = PostSummary & {
  headings: { id: string; text: string }[];
  html: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Newest first, in the order of the original journal. */
export const posts: PostSummary[] = index as PostSummary[];

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!posts.some((p) => p.slug === slug)) return null;
  const raw = await readFile(path.join(BLOG_DIR, `${slug}.json`), "utf8");
  return JSON.parse(raw) as Post;
});

export function relatedPosts(slug: string, count = 3): PostSummary[] {
  const i = posts.findIndex((p) => p.slug === slug);
  const others = posts.filter((p) => p.slug !== slug);
  // Neighbouring articles in the archive tend to share a theme.
  const start = Math.max(0, Math.min(i, others.length - count));
  return others.slice(start, start + count);
}
