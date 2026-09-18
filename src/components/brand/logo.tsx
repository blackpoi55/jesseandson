import Link from "next/link";
import { cn } from "@/lib/utils";

/** Masthead-style wordmark in Didone capitals. */
export function Wordmark({
  className,
  compact = false,
  size,
}: {
  className?: string;
  compact?: boolean;
  /** Override the font size (e.g. "text-6xl") for masthead use. */
  size?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-display font-normal tracking-[0.06em] whitespace-nowrap",
          size ?? (compact ? "text-[1.3rem]" : "text-[1.7rem] md:text-[2.1rem]"),
        )}
      >
        JESSE <span className="text-accent italic">&amp;</span> SON
      </span>
      {!compact && (
        <span className="mt-1.5 font-sans text-[0.5rem] font-medium tracking-[0.55em] text-muted uppercase">
          Bespoke Tailor · Bangkok
        </span>
      )}
    </span>
  );
}

export function LogoLink({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" aria-label="Jesse & Son — home" className={cn("inline-flex", className)}>
      <Wordmark compact={compact} />
    </Link>
  );
}
