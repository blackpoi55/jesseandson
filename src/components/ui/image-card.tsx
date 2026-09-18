import Image from "next/image";
import Link from "next/link";
import { ArrowCircle } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Dark photographic card with title, subtitle and a round arrow — hovering zooms the photo. */
export function ImageCard({
  href,
  image,
  title,
  subtitle,
  eyebrow,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
}: {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      data-cursor="view"
      className={cn(
        "group relative isolate flex overflow-hidden rounded-[4px] border border-ivory/10 bg-ink text-ivory",
        className,
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="-z-10 object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/35 to-black/5 transition-opacity duration-700 group-hover:from-black/80" />
      <div className="absolute inset-3 -z-10 border border-ivory/0 transition-colors duration-700 group-hover:border-champagne/40" />
      <div className="mt-auto flex w-full items-end justify-between gap-6 p-7 md:p-9">
        <div>
          {eyebrow && <p className="eyebrow mb-3 text-champagne">{eyebrow}</p>}
          <h3 className="font-serif text-3xl leading-tight md:text-[2.4rem]">{title}</h3>
          {subtitle && <p className="mt-2 font-serif text-lg text-ivory/75 italic">{subtitle}</p>}
        </div>
        <ArrowCircle className="shrink-0 border-ivory/60 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink" />
      </div>
    </Link>
  );
}
