import type { Tier } from "@/content/pricing";
import { cn } from "@/lib/utils";

const names: Record<Tier, string> = { 1: "Entry", 2: "Premium", 3: "Luxury", 4: "Signature" };

/** $ – $$$$ price tier, the unfilled symbols shown faintly. */
export function TierBadge({ tier, className, showName = false }: { tier: Tier; className?: string; showName?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label={`Price tier ${tier} of 4 (${names[tier]})`}>
      <span className="font-display tracking-[0.12em]" aria-hidden>
        <span className="text-accent">{"$".repeat(tier)}</span>
        <span className="text-line">{"$".repeat(4 - tier)}</span>
      </span>
      {showName && <span className="text-[0.62rem] tracking-[0.22em] text-subtle uppercase">{names[tier]}</span>}
    </span>
  );
}
