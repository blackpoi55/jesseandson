"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

type Mode = "default" | "link" | "view";

/**
 * Gold ring cursor for fine pointers. Grows over links and shows "View"
 * over elements marked data-cursor="view". Hidden on touch devices.
 */
export function CustomCursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement | null;
      if (el?.closest("[data-cursor='view']")) setMode("view");
      else if (el?.closest("a, button, [role='button'], input, select, textarea, label")) setMode("link");
      else setMode("default");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 92 : mode === "link" ? 46 : 28;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full border border-champagne mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: mode === "view" ? "rgba(214,180,124,1)" : "rgba(214,180,124,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <AnimatePresence>
          {mode === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-serif text-base text-ink italic"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] size-1.5 rounded-full bg-champagne"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && mode !== "view" ? 1 : 0 }}
      />
    </>
  );
}
