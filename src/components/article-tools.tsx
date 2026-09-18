"use client";

import { motion, useScroll } from "motion/react";
import { Check, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FacebookIcon, LineIcon, WhatsAppIcon } from "@/components/brand/icons";
import { useLocationHref } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Sticky table of contents that highlights the section being read. */
export function TableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav aria-label="In this article" className="relative">
      <p className="eyebrow">In this article</p>
      <div className="relative mt-6 pl-5">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-line">
          <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-gold" />
        </div>
        <ol className="space-y-3">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "block text-[0.92rem] leading-snug transition-colors duration-300",
                  active === h.id ? "text-gold" : "text-muted hover:text-fg",
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export function ShareButtons({ title }: { title: string }) {
  const url = useLocationHref();
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const links = [
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, Icon: FacebookIcon },
    { label: "Share on LINE", href: `https://social-plugins.line.me/lineit/share?url=${enc(url)}`, Icon: LineIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, Icon: WhatsAppIcon },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="mr-2 text-[0.65rem] tracking-[0.25em] text-subtle uppercase">Share</span>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-gold hover:text-gold"
        >
          <Icon className="size-4" />
        </a>
      ))}
      <button
        type="button"
        aria-label="Copy link"
        onClick={() => {
          navigator.clipboard?.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
        className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-gold hover:text-gold"
      >
        {copied ? <Check className="size-4 text-gold" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
