import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap font-serif italic transition-all duration-500 ease-[var(--ease-luxe)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "btn-gold rounded-[3px]",
  outline:
    "rounded-full border border-gold/70 text-fg hover:border-gold hover:bg-gold hover:text-ink dark:text-ivory",
  ghost: "text-fg hover:text-gold",
  light: "rounded-full border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[1rem]",
  md: "h-12 px-7 text-[1.15rem]",
  lg: "h-14 px-9 text-[1.3rem]",
};

export function buttonClass(variant: Variant = "gold", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      className="size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/btn:translate-x-1"
      strokeWidth={1.5}
      aria-hidden
    />
  );
}

export function LinkButton({
  href,
  children,
  variant = "gold",
  size = "md",
  arrow = true,
  icon,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={buttonClass(variant, size, className)}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {content}
    </Link>
  );
}

/** Round outlined arrow used on image cards and sliders. */
export function ArrowCircle({ className, direction = "right" }: { className?: string; direction?: "right" | "left" }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-full border border-current transition-all duration-500 ease-[var(--ease-luxe)]",
        className,
      )}
      aria-hidden
    >
      <ArrowRight className={cn("size-4", direction === "left" && "rotate-180")} strokeWidth={1.5} />
    </span>
  );
}

/** Understated text link with an animated underline. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.28em] text-gold uppercase",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover/link:scale-x-100" />
      </span>
      <ArrowRight className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-1" strokeWidth={1.5} />
    </Link>
  );
}
