"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Mail, Phone, X } from "lucide-react";
import { useEffect } from "react";
import { Wordmark } from "@/components/brand/logo";
import { LineIcon, WhatsAppIcon } from "@/components/brand/icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { mainNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-screen "table of contents" menu. */
export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] overflow-y-auto bg-bg text-fg"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="container-x flex h-[68px] items-center justify-between border-b border-line">
            <Wordmark compact />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center border border-line transition hover:border-fg"
              >
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </div>
          </div>

          <nav aria-label="Mobile" className="container-x relative pt-8 pb-10">
            <p className="eyebrow">Contents</p>
            <ul className="mt-4 border-t border-fg">
              {mainNav.map((item, i) => {
                const on = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.04, ease: EASE }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-baseline justify-between gap-4 py-3.5 font-serif text-[1.9rem] leading-none transition-colors",
                        on ? "text-accent italic" : "hover:italic",
                      )}
                    >
                      {item.label}
                      <span className="font-sans text-[0.62rem] tracking-[0.2em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                    {item.children && (
                      <div className="flex flex-wrap gap-x-5 gap-y-2 pb-4">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={onClose}
                            className="text-[0.66rem] tracking-[0.2em] text-muted uppercase hover:text-fg"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              className="mt-10 grid grid-cols-2 gap-px border border-line bg-line"
            >
              {[
                { href: site.line.url, label: "LINE", icon: <LineIcon className="size-5" /> },
                { href: site.whatsapp, label: "WhatsApp", icon: <WhatsAppIcon className="size-5" /> },
                { href: `tel:${site.phone}`, label: "Call", icon: <Phone className="size-5" strokeWidth={1.4} /> },
                { href: `mailto:${site.email}`, label: "Email", icon: <Mail className="size-5" strokeWidth={1.4} /> },
              ].map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  target={a.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-bg px-4 py-4 font-sans text-[0.7rem] tracking-[0.2em] uppercase transition hover:text-accent"
                >
                  {a.icon}
                  {a.label}
                </a>
              ))}
            </motion.div>
            <Link
              href="/contact#appointment"
              onClick={onClose}
              className="btn-primary mt-4 flex h-14 items-center justify-center font-sans text-[0.72rem] font-medium tracking-[0.24em] uppercase"
            >
              Book a fitting →
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
