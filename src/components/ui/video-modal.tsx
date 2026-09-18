"use client";

import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Button that opens a YouTube film in a cinematic overlay. */
export function VideoButton({
  youtubeId,
  label,
  tone = "default",
  className,
}: {
  youtubeId: string;
  label: string;
  /** "lux" for the black-and-champagne home opener. */
  tone?: "default" | "lux";
  className?: string;
}) {
  const lux = tone === "lux";
  const [open, setOpen] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group/video inline-flex items-center justify-center border transition-colors duration-300",
          lux
            ? "font-lux-serif h-14 gap-4 rounded-[3px] border-[color:var(--lux-fg)]/40 pr-7 pl-2 text-[1.3rem] text-[color:var(--lux-fg)] italic duration-500 hover:border-[color:var(--lux-gold)]"
            : "h-12 gap-3 border-fg pr-6 pl-2 font-sans text-[0.7rem] font-medium tracking-[0.22em] text-fg uppercase hover:bg-fg hover:text-bg",
          className,
        )}
      >
        <span
          className={cn(
            "relative flex items-center justify-center rounded-full border",
            lux
              ? "size-10 border-[color:var(--lux-fg)]/60 transition-colors duration-500 group-hover/video:border-[color:var(--lux-gold)] group-hover/video:bg-[color:var(--lux-gold)] group-hover/video:text-[color:var(--lux-on-gold)]"
              : "size-8 border-current",
          )}
        >
          <span
            className={cn(
              "absolute inset-0 animate-ping rounded-full border [animation-duration:2.4s]",
              lux ? "border-[color:var(--lux-gold)]/50" : "border-accent/50",
            )}
          />
          <Play className={cn("ml-0.5 fill-current", lux ? "size-4" : "size-3")} strokeWidth={1} />
        </span>
        {label}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={label}
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md md:p-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close video"
                  className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition hover:border-champagne hover:text-champagne"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
                <motion.div
                  className="aspect-video w-full max-w-6xl overflow-hidden border border-champagne/20 bg-black shadow-2xl"
                  initial={{ scale: 0.9, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                    title={label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
