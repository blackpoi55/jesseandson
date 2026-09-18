"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp, Mail, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { InstagramIcon, LineIcon, WhatsAppIcon } from "@/components/brand/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const channels = [
  { label: "LINE", href: site.line.url, Icon: LineIcon, color: "#06C755" },
  { label: "WhatsApp", href: site.whatsapp, Icon: WhatsAppIcon, color: "#25D366" },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon, color: "#E1306C" },
  { label: "Call", href: `tel:${site.phone}`, Icon: Phone, color: "#d6b47c" },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail, color: "#d6b47c" },
];

/** Bottom-right concierge button that fans out messaging channels, plus back-to-top. */
export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > 900));

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.ul
            className="flex flex-col items-end gap-2.5"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{ show: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }, hidden: {} }}
          >
            {channels.map(({ label, href, Icon, color }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.8 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 420, damping: 26 } },
                }}
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <span className="rounded-full bg-ink/90 px-3 py-1.5 text-xs tracking-wide text-ivory shadow-lg backdrop-blur">
                    {label}
                  </span>
                  <span
                    className="flex size-12 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {showTop && !open && (
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="glass flex size-12 items-center justify-center rounded-full border border-line text-fg shadow-lg transition hover:border-gold hover:text-gold"
            >
              <ArrowUp className="size-4" strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-label={open ? "Close contact options" : "Message us"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn("btn-gold relative flex size-14 items-center justify-center rounded-full shadow-xl")}
        >
          {!open && <span className="absolute inset-0 animate-ping rounded-full bg-champagne/40 [animation-duration:3s]" />}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "chat"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {open ? <X className="size-5" strokeWidth={1.6} /> : <MessageCircle className="size-5" strokeWidth={1.6} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
