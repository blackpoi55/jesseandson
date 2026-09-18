"use client";

import { AnimatePresence, motion } from "motion/react";
import { Hand, Maximize2, Minus, Pause, Play, Plus, RotateCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Frame = ImageBitmap | HTMLImageElement;

const frameWidth = (f: Frame) => ("naturalWidth" in f ? f.naturalWidth : f.width);
const frameHeight = (f: Frame) => ("naturalHeight" in f ? f.naturalHeight : f.height);
const closeFrame = (f: Frame) => {
  if ("close" in f) f.close();
};

/** Download and fully decode a frame up front so drawing it never stalls. */
async function decodeFrame(src: string): Promise<Frame> {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(img);
    } catch {
      /* fall back to the decoded <img> */
    }
  }
  return img;
}

/**
 * 360° product spin: grab the image and drag to turn it, like a 3D model.
 * Works from an image sequence (one photo every few degrees), so real
 * turntable photography can replace the renders without code changes.
 *
 * - drag / swipe with inertia, arrow keys, scrub slider
 * - progressive loading (coarse frames first, then the rest)
 * - auto-rotate while idle and in view
 * - zoom to inspect details, following the pointer
 */
export function SpinViewer({
  frames,
  alt,
  className,
  autoRotate = true,
  compact = false,
}: {
  frames: string[];
  alt: string;
  className?: string;
  autoRotate?: boolean;
  compact?: boolean;
}) {
  const count = frames.length;
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const bitmaps = useRef<(Frame | null)[]>([]);
  const pos = useRef(0); // fractional frame position
  const velocity = useRef(0); // frames per second from a fling
  const autoSpeed = useRef(0); // eased idle-spin speed, frames per second
  const shownFrame = useRef(-1);
  const drag = useRef<{ x: number; pos: number; t: number; lastX: number } | null>(null);
  const raf = useRef(0);
  const idleSince = useRef(0);

  const [frame, setFrame] = useState(0);
  // loading progress belongs to one set of frames; switching looks starts from zero
  const setKey = frames[0];
  const [progressState, setProgressState] = useState({ key: setKey, n: 0 });
  const loaded = progressState.key === setKey ? progressState.n : 0;
  const [playing, setPlaying] = useState(autoRotate);
  const [interacted, setInteracted] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [inView, setInView] = useState(false);

  /* ---------- drawing ---------- */
  // Blends the two frames either side of the current angle, so motion stays
  // fluid at 60fps even though the photographs are 5° apart.
  const draw = useCallback(
    (p: number) => {
      const c = canvas.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx) return;
      const base = Math.floor(p);
      const mix = p - base;
      const i0 = ((base % count) + count) % count;
      let a = bitmaps.current[i0];
      let b = bitmaps.current[(i0 + 1) % count];
      if (!a || !b) {
        // still loading: show the nearest decoded frame
        const target = Math.round(p);
        a = null;
        b = null;
        for (let d = 0; d < count && !a; d++) {
          a = bitmaps.current[(((target + d) % count) + count) % count] ?? bitmaps.current[(((target - d) % count) + count) % count];
        }
        if (!a) return;
      }
      const w = frameWidth(a);
      if (c.width !== w) {
        c.width = w;
        c.height = frameHeight(a);
      }
      ctx.globalAlpha = 1;
      ctx.drawImage(a, 0, 0);
      if (b && mix > 0.004) {
        ctx.globalAlpha = mix;
        ctx.drawImage(b, 0, 0);
        ctx.globalAlpha = 1;
      }
    },
    [count],
  );

  const show = useCallback(
    (p: number) => {
      pos.current = ((p % count) + count) % count;
      draw(pos.current);
      // only re-render React when the displayed degree changes
      const i = Math.round(pos.current) % count;
      if (i !== shownFrame.current) {
        shownFrame.current = i;
        setFrame(i);
      }
    },
    [count, draw],
  );

  /* ---------- progressive, pre-decoded loading ---------- */
  useEffect(() => {
    bitmaps.current = new Array(count).fill(null);
    let cancelled = false;
    // coarse pass first (every 6th frame), then fill in the gaps
    const order: number[] = [];
    for (const stride of [6, 3, 1]) for (let i = 0; i < count; i += stride) if (!order.includes(i)) order.push(i);
    let n = 0;
    order.forEach((i, k) => {
      decodeFrame(frames[i])
        .then((f) => {
          if (cancelled) return closeFrame(f);
          bitmaps.current[i] = f;
          n += 1;
          setProgressState({ key: setKey, n });
          if (k === 0 || Math.abs(i - pos.current) <= 1) draw(pos.current);
        })
        .catch(() => {});
    });
    return () => {
      cancelled = true;
      bitmaps.current.forEach((f) => f && closeFrame(f));
    };
  }, [frames, count, draw, setKey]);

  /* ---------- visibility ---------- */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---------- animation loop: eased idle spin + fling inertia ---------- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cruise = count / 18; // one full turn every ~18s
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (drag.current) {
        autoSpeed.current = 0;
      } else {
        const wantSpin = playing && inView && !reduced && zoom === 1 && now - idleSince.current > 1500;
        // ease in and out instead of starting/stopping abruptly
        autoSpeed.current += ((wantSpin ? cruise : 0) - autoSpeed.current) * Math.min(1, dt * 2.2);
        if (!wantSpin && autoSpeed.current < 0.25) autoSpeed.current = 0;
        if (Math.abs(velocity.current) < 0.25) velocity.current = 0;
        const delta = (autoSpeed.current + velocity.current) * dt;
        velocity.current *= Math.pow(0.05, dt); // friction
        if (delta !== 0) {
          show(pos.current + delta);
        } else {
          // at rest: glide onto the nearest photograph so the still image is crisp
          const off = Math.round(pos.current) - pos.current;
          if (Math.abs(off) > 0.002) show(pos.current + off * Math.min(1, dt * 9));
          else if (off !== 0) show(Math.round(pos.current));
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, inView, zoom, count, show]);

  /* ---------- pointer ---------- */
  const pxPerFrame = () => Math.max(3, (wrap.current?.clientWidth ?? 600) / (count * 0.9));

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom > 1) return;
    drag.current = { x: e.clientX, pos: pos.current, t: performance.now(), lastX: e.clientX };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* capture is a nicety; dragging still works without it */
    }
    velocity.current = 0;
    setGrabbing(true);
    setInteracted(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (zoom > 1 && wrap.current) {
      const r = wrap.current.getBoundingClientRect();
      setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      return;
    }
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const dx = e.clientX - d.x;
    show(d.pos + dx / pxPerFrame());
    const dtt = Math.max(1, now - d.t);
    const v = ((e.clientX - d.lastX) / pxPerFrame() / dtt) * 1000;
    // cap the fling at ~0.8 turns per second so a fast flick still feels weighty
    velocity.current = Math.max(-count * 0.8, Math.min(count * 0.8, v));
    d.t = now;
    d.lastX = e.clientX;
  };
  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setGrabbing(false);
    idleSince.current = performance.now();
  };

  const step = (n: number) => {
    setInteracted(true);
    idleSince.current = performance.now();
    velocity.current = 0;
    show(pos.current + n);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
    if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  };

  const degrees = Math.round((frame / count) * 360);
  const progress = Math.round((loaded / count) * 100);

  return (
    <div className={cn("relative select-none", className)}>
      <div
        ref={wrap}
        role="img"
        aria-label={`${alt} — rotated ${degrees} degrees. Drag or use the arrow keys to turn.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => zoom === 1 && endDrag()}
        onDoubleClick={() => setZoom((z) => (z > 1 ? 1 : 2.2))}
        className={cn(
          "relative aspect-[4/5] touch-pan-y overflow-hidden bg-[#f1eee8] outline-none",
          zoom > 1 ? "cursor-zoom-out" : grabbing ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: zoom }}
          style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 26 }}
          onClick={() => zoom > 1 && setZoom(1)}
        >
          <canvas ref={canvas} className="h-full w-full object-contain" />
        </motion.div>

        {/* Loading veil */}
        <AnimatePresence>
          {loaded === 0 && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-[#f1eee8]"
            >
              <RotateCw className="size-6 animate-spin text-[#121212]/40" strokeWidth={1.3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag hint */}
        <AnimatePresence>
          {!interacted && loaded > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
            >
              <span className="flex items-center gap-3 bg-white/90 px-4 py-2.5 font-sans text-[0.62rem] tracking-[0.22em] text-[#121212] uppercase shadow-sm backdrop-blur">
                <motion.span animate={{ x: [-6, 6, -6] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                  <Hand className="size-4" strokeWidth={1.4} />
                </motion.span>
                Drag to rotate 360°
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Degree dial */}
        <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.2em] text-[#121212]/70 uppercase">
          <svg viewBox="0 0 36 36" className="size-9">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#7d1f2c"
              strokeWidth="1.5"
              strokeDasharray={`${(degrees / 360) * 94.2} 94.2`}
              transform="rotate(-90 18 18)"
            />
            <circle cx={18 + 15 * Math.sin((degrees * Math.PI) / 180)} cy={18 - 15 * Math.cos((degrees * Math.PI) / 180)} r="2.2" fill="#7d1f2c" />
          </svg>
          <span className="tabular-nums">{String(degrees).padStart(3, "0")}°</span>
        </div>
        {progress < 100 && loaded > 0 && (
          <span className="pointer-events-none absolute top-5 right-4 font-sans text-[0.6rem] tracking-[0.2em] text-[#121212]/50 uppercase">
            Loading {progress}%
          </span>
        )}
      </div>

      {/* Controls */}
      <div className={cn("mt-3 flex items-center gap-3", compact && "mt-2")}>
        <button
          type="button"
          onClick={() => {
            setPlaying((p) => !p);
            idleSince.current = 0;
          }}
          aria-label={playing ? "Pause rotation" : "Play rotation"}
          className="flex size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg"
        >
          {playing ? <Pause className="size-3.5" strokeWidth={1.6} /> : <Play className="size-3.5" strokeWidth={1.6} />}
        </button>
        <input
          type="range"
          min={0}
          max={count - 1}
          value={frame}
          onChange={(e) => {
            setInteracted(true);
            idleSince.current = performance.now();
            velocity.current = 0;
            show(Number(e.target.value));
          }}
          aria-label="Rotation"
          className="h-px flex-1 cursor-pointer appearance-none bg-line accent-[#7d1f2c] [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fg"
        />
        {!compact && (
          <>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, z - 0.6))}
              aria-label="Zoom out"
              disabled={zoom <= 1}
              className="flex size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg disabled:opacity-30"
            >
              <Minus className="size-3.5" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, z + 0.6))}
              aria-label="Zoom in"
              className="flex size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg"
            >
              <Plus className="size-3.5" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => wrap.current?.requestFullscreen?.()}
              aria-label="Full screen"
              className="hidden size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg sm:flex"
            >
              <Maximize2 className="size-3.5" strokeWidth={1.6} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
