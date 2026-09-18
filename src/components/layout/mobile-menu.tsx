"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Mail, Phone, X } from "lucide-react";
import { useEffect } from "react";
import { Wordmark } from "@/components/brand/logo";
import { LineIcon, WhatsAppIcon } from "@/components/brand/icons";
import { MonogramSeal } from "@/components/brand/monogram";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { mainNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

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
          className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-ivory"
          initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <MonogramSeal className="pointer-events-none absolute -right-24 bottom-10 size-80 opacity-10" />
          <div className="container-x flex h-[76px] items-center justify-between">
            <Wordmark compact />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-full border border-ivory/25 transition hover:border-champagne hover:text-champagne"
              >
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </div>
          </div>

          <nav aria-label="Mobile" className="container-x relative pt-6 pb-10">
            <ul>
              {mainNav.map((item, i) => {
                const on = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.045, ease: EASE }}
                    className="border-b border-ivory/10"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-baseline gap-4 py-3.5 font-serif text-[2rem] leading-none transition-colors",
                        on ? "text-champagne italic" : "hover:text-champagne",
                      )}
                    >
                      <span className="font-sans text-[0.65rem] tracking-[0.2em] text-champagne/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="flex flex-wrap gap-x-5 gap-y-2 pb-4 pl-9">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={onClose}
                            className="text-[0.7rem] tracking-[0.2em] text-ivory/60 uppercase hover:text-champagne"
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
              transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
              className="mt-10 grid grid-cols-2 gap-3"
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
                  className="flex items-center gap-3 rounded-[3px] border border-ivory/15 px-4 py-3.5 text-sm tracking-wide transition hover:border-champagne hover:text-champagne"
                >
                  <span className="text-champagne">{a.icon}</span>
                  {a.label}
                </a>
              ))}
            </motion.div>
            <Link
              href="/contact#appointment"
              onClick={onClose}
              className="btn-gold mt-4 flex h-14 items-center justify-center rounded-[3px] font-serif text-xl italic"
            >
              Design Your Own →
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
