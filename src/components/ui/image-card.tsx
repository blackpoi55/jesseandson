import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Editorial feature card: photograph, then folio, headline and standfirst beneath it. */
export function ImageCard({
  href,
  image,
  title,
  subtitle,
  eyebrow,
  className,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
}: {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden bg-bg-alt", aspect)} data-cursor="view">
        <Image
          src={image}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 border-t border-fg pt-3">
        <div>
          {eyebrow && <p className="font-sans text-[0.62rem] tracking-[0.24em] text-accent uppercase">{eyebrow}</p>}
          <h3 className="mt-1 font-serif text-[1.9rem] leading-tight transition-all duration-300 group-hover:italic md:text-[2.2rem]">
            {title}
          </h3>
          {subtitle && <p className="mt-1 text-[1rem] text-muted">{subtitle}</p>}
        </div>
        <ArrowUpRight
          className="mt-2 size-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          strokeWidth={1.3}
        />
      </div>
    </Link>
  );
}
