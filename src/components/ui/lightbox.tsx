"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "@/lib/hooks";
import { cn, mediaSize } from "@/lib/utils";

export type LightboxImage = { src: string; alt: string; caption?: string };

/** Full-screen image viewer with keyboard, swipe and thumbnail navigation. */
export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const mounted = useMounted();
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      setDir(step);
      onIndex((index + step + images.length) % images.length);
    },
    [index, images.length, onIndex],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, go, onClose]);

  if (!mounted) return null;
  const current = index !== null ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[90] flex flex-col bg-black/95 text-ivory backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <span className="font-display text-sm tracking-[0.3em] text-champagne">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex size-11 items-center justify-center rounded-full border border-ivory/30 transition hover:border-champagne hover:text-champagne"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 md:px-24">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={current.src}
                custom={dir}
                className="relative flex h-full w-full items-center justify-center"
                initial={{ opacity: 0, x: dir * 80, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -80, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  {...mediaSize(current.src)}
                  sizes="100vw"
                  className="max-h-[calc(100svh-12rem)] w-auto max-w-full object-contain select-none"
                  draggable={false}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 hidden size-12 items-center justify-center rounded-full border border-ivory/30 transition hover:border-champagne hover:text-champagne md:flex"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 hidden size-12 items-center justify-center rounded-full border border-ivory/30 transition hover:border-champagne hover:text-champagne md:flex"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <p className="px-6 pt-3 text-center font-serif text-lg text-ivory/80 italic">{current.caption ?? current.alt}</p>

          <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 py-4">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  onIndex(i);
                }}
                aria-label={`Show image ${i + 1}`}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-[2px] border transition",
                  i === index ? "border-champagne opacity-100" : "border-transparent opacity-40 hover:opacity-80",
                )}
              >
                <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
