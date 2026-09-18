import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";

/**
 * Eyebrow + serif headline (+ optional script flourish and lead).
 * Use *word* in the title for an italic gold accent.
 */
export function SectionHeading({
  eyebrow,
  title,
  script,
  lead,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow?: string;
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
          <p className={cn("eyebrow flex items-center gap-4", centered && "justify-center")}>
            <span className="h-px w-8 bg-gold/60" />
            {eyebrow}
            {centered && <span className="h-px w-8 bg-gold/60" />}
          </p>
        </Reveal>
      )}
      <SplitText
        as={as}
        text={title}
        className="mt-5 font-serif text-[2.4rem] leading-[1.05] font-normal text-fg sm:text-5xl lg:text-[4rem]"
      />
      {script && (
        <Reveal direction="fade" delay={0.5}>
          <p
            className={cn(
              "font-script -mt-1 text-4xl text-gold/90 md:text-5xl",
              centered ? "text-center" : "pl-[12%]",
            )}
          >
            {script}
          </p>
        </Reveal>
      )}
      {lead && (
        <Reveal delay={0.2}>
          <div className={cn("mt-6 max-w-2xl text-lg leading-relaxed text-muted", centered && "mx-auto")}>{lead}</div>
        </Reveal>
      )}
    </div>
  );
}
