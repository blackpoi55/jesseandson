import { cn } from "@/lib/utils";

/** Infinite horizontal ticker (pure CSS). Pauses on hover. */
export function Marquee({
  items,
  className,
  speed = 40,
  separator = "✦",
}: {
  items: React.ReactNode[];
  className?: string;
  speed?: number;
  separator?: React.ReactNode;
}) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 md:px-12">{item}</span>
          <span className="text-[0.6em] text-gold">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}>
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
