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
  className,
}: {
  youtubeId: string;
  label: string;
  className?: string;
}) {
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
          "group/video inline-flex h-14 items-center gap-4 rounded-[3px] border border-ivory/40 pr-7 pl-2 font-serif text-[1.3rem] text-ivory italic transition-all duration-500 hover:border-champagne",
          className,
        )}
      >
        <span className="relative flex size-10 items-center justify-center rounded-full border border-ivory/60 transition-colors duration-500 group-hover/video:border-champagne group-hover/video:bg-champagne group-hover/video:text-ink">
          <span className="absolute inset-0 animate-ping rounded-full border border-champagne/50 [animation-duration:2.4s]" />
          <Play className="ml-0.5 size-4 fill-current" strokeWidth={1} />
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
                  className="aspect-video w-full max-w-6xl overflow-hidden rounded-[4px] border border-champagne/20 bg-black shadow-2xl"
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
