import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap font-sans text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "border border-fg text-fg hover:bg-fg hover:text-bg",
  ghost: "text-fg hover:text-accent",
  light: "btn-on-image",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
  lg: "h-14 px-9",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      className="size-3.5 shrink-0 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/btn:translate-x-1"
      strokeWidth={1.5}
      aria-hidden
    />
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
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
        "inline-flex size-11 items-center justify-center rounded-full border border-current transition-all duration-500 ease-[var(--ease-luxe)]",
        className,
      )}
      aria-hidden
    >
      <ArrowRight className={cn("size-4", direction === "left" && "rotate-180")} strokeWidth={1.5} />
    </span>
  );
}

/** Understated "continue reading" link with an animated underline. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 font-sans text-[0.7rem] font-medium tracking-[0.24em] text-fg uppercase",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-500 group-hover/link:scale-x-0" />
      </span>
      <ArrowRight className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-1" strokeWidth={1.5} />
    </Link>
  );
}
