import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Journal teaser in magazine style: photo, kicker line, headline, standfirst. */
export function PostCard({ post, className, large = false }: { post: PostSummary; className?: string; large?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group flex flex-col", className)}>
      <div className={cn("relative overflow-hidden bg-bg-alt", large ? "aspect-[16/10]" : "aspect-[4/3]")} data-cursor="view">
        {post.image && (
          <Image
            src={post.image}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.05]"
          />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-fg pt-3 font-sans text-[0.62rem] tracking-[0.22em] uppercase">
        <span className="text-accent">Journal</span>
        <span className="text-muted">{post.readingMinutes} min read</span>
      </div>
      <h3
        className={cn(
          "mt-3 font-serif leading-[1.12] transition-all duration-300 group-hover:italic",
          large ? "text-3xl md:text-[2.7rem]" : "text-[1.6rem]",
        )}
      >
        {post.title}
      </h3>
      <p className={cn("mt-3 leading-relaxed text-muted", large ? "line-clamp-3 text-[1.15rem]" : "line-clamp-2")}>
        {post.description}
      </p>
    </Link>
  );
}
