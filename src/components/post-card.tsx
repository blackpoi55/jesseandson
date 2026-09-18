import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { PostSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function PostCard({ post, className, large = false }: { post: PostSummary; className?: string; large?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group flex flex-col", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-[4px] bg-bg-alt",
          large ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
        data-cursor="view"
      >
        {post.image && (
          <Image
            src={post.image}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.07]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <div className="mt-6 flex items-center gap-3 text-[0.68rem] tracking-[0.22em] text-gold uppercase">
        <span>Journal</span>
        <span className="h-px w-6 bg-gold/50" />
        <span className="flex items-center gap-1.5 text-subtle">
          <Clock className="size-3" strokeWidth={1.5} />
          {post.readingMinutes} min read
        </span>
      </div>
      <h3
        className={cn(
          "mt-3 font-serif leading-[1.15] transition-colors duration-300 group-hover:text-gold",
          large ? "text-3xl md:text-[2.6rem]" : "text-[1.65rem]",
        )}
      >
        {post.title}
      </h3>
      <p className={cn("mt-3 leading-relaxed text-muted", large ? "line-clamp-3 text-lg" : "line-clamp-2")}>
        {post.description}
      </p>
    </Link>
  );
}
