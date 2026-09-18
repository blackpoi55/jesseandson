import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";

/**
 * Magazine section opener: ruled kicker line, Didone headline, optional
 * italic standfirst. Use *word* in the title for an italic accent.
 */
export function SectionHeading({
  eyebrow,
  number,
  title,
  script,
  lead,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  /** Optional folio shown opposite the kicker, e.g. "No. 03". */
  number?: string;
  title: string;
  script?: string;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={cn("relative", centered && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <Reveal direction="fade">
          <div className={cn("flex items-center gap-4", centered && "justify-center")}>
            <p className="eyebrow">{eyebrow}</p>
            {!centered && <span className="rule min-w-8 flex-1" />}
            {number && <p className="eyebrow text-accent">{number}</p>}
          </div>
        </Reveal>
      )}
      <SplitText
        as={as}
        text={title}
        className="mt-6 font-serif text-[2.6rem] leading-[1.02] font-normal tracking-[-0.01em] text-fg sm:text-5xl lg:text-[4.4rem]"
      />
      {script && (
        <Reveal direction="fade" delay={0.4}>
          <p className={cn("mt-3 font-serif text-2xl text-muted italic md:text-3xl", centered && "text-center")}>{script}</p>
        </Reveal>
      )}
      {lead && (
        <Reveal delay={0.2}>
          <div className={cn("mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-muted", centered && "mx-auto")}>{lead}</div>
        </Reveal>
      )}
    </div>
  );
}
