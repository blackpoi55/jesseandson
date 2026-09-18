import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-display font-medium tracking-[0.04em]",
          compact ? "text-[1.35rem]" : "text-[1.55rem] md:text-[1.75rem]",
        )}
      >
        J<span className="text-[0.82em]">ESSE</span>
        <span className="mx-[0.28em] font-serif text-[0.95em] italic text-gold">&amp;</span>S
        <span className="text-[0.82em]">ON</span>
      </span>
      <span className="mt-1.5 flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-gold/50" />
        <span className="text-[0.5rem] font-medium tracking-[0.45em] text-gold uppercase">Bespoke Tailor</span>
        <span className="h-px flex-1 bg-gold/50" />
      </span>
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
