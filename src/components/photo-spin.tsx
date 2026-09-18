"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Hand, Maximize2, Minus, Pause, Play, Plus, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { closeFrame, decodeFrame, frameHeight, frameWidth, type Frame } from "@/components/spin-viewer";
import { Lightbox } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

/** A turntable shoot prepared for the web (see scripts/spin360). */
export type PhotoSpinSet = {
  /** Folder under /public with 000.webp… for every frame and hq/<NNN>.webp for each photograph. */
  dir: string;
  count: number;
  /** Frame indices that are real photographs; the frames between them are interpolated. */
  keyframes: number[];
  /** 1 when a higher frame index turns the front of the garment towards the viewer's right. */
  direction: 1 | -1;
  /** Studio backdrop colour, shown while frames load. */
  backdrop: string;
  /**
   * Hotspots found by the build script: a close-up crop, the frame that shows the detail best,
   * and its position on every photograph where it can be seen (frame index → [x, y] as 0–1).
   */
  details?: Record<string, { image: string; best: number; at: Record<string, number[]> }>;
};

/** What a hotspot says about the garment. */
export type SpinDetail = {
  id: string;
  /** Short name for the marker tooltip and the details list. */
  label: string;
  title: string;
  body: string;
  facts?: { label: string; value: string }[];
};

const pad = (i: number) => String(i).padStart(3, "0");
const MAX_ZOOM = 3;

const mod = (p: number, count: number) => ((p % count) + count) % count;
/** Shortest signed distance around the loop. */
const around = (d: number, count: number) => mod(d + count / 2, count) - count / 2;
const nearestKey = (p: number, keys: number[], count: number) =>
  keys.reduce((best, k) => (Math.abs(around(k - p, count)) < Math.abs(around(best - p, count)) ? k : best), keys[0] ?? 0);

/**
 * 360° viewer for real turntable photography. Drag to turn it with inertia,
 * or let it spin slowly on its own. Motion runs through the full frame
 * sequence, blending neighbouring frames. When it stops, it always settles on
 * an actual photograph and swaps in the high-resolution original.
 */
export function PhotoSpin({
  set,
  alt,
  details = [],
  detail = null,
  onDetailChange,
  compact = false,
  className,
}: {
  set: PhotoSpinSet;
  alt: string;
  /** Hotspots to show on the garment when the spin is at rest. */
  details?: SpinDetail[];
  /** The open detail. Setting it from outside turns the garment to where the detail shows. */
  detail?: string | null;
  onDetailChange?: (id: string | null) => void;
  compact?: boolean;
  className?: string;
}) {
  const { dir, count, keyframes, direction, backdrop } = set;
  const spots = set.details;
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(Frame | null)[]>([]);
  const allLoaded = useRef(false);

  // motion state lives in refs so the render loop never waits on React
  const pos = useRef(keyframes[0] ?? 0); // fractional frame position
  const velocity = useRef(0); // frames per second, from a fling
  const autoSpeed = useRef(0); // eased idle spin, frames per second
  const target = useRef<number | null>(null); // keyframe to glide to (arrow keys, reset)
  const drag = useRef<{ x: number; pos: number; lastX: number; t: number } | null>(null);
  const idleSince = useRef(0);
  const inView = useRef(false);
  const playingRef = useRef(true);
  const zoomRef = useRef(1);
  const dirty = useRef(true);
  const detailOpen = useRef(false);

  const [loaded, setLoaded] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [zoom, setZoomState] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [degrees, setDegrees] = useState(0);
  // the photograph under the canvas right now, and whether the view is at rest on it
  const [rest, setRest] = useState({ key: keyframes[0] ?? 0, still: true });
  const [stillLoaded, setStillLoaded] = useState<number | null>(null);
  const [enlarged, setEnlarged] = useState<number | null>(null);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  /* ---------- open detail: stop, and turn to the nearest photo that shows it ---------- */
  useEffect(() => {
    detailOpen.current = detail !== null;
    const at = detail ? spots?.[detail]?.at : undefined;
    if (!at) return;
    const visible = Object.keys(at).map(Number);
    target.current = nearestKey(pos.current, visible, count);
    velocity.current = 0;
    autoSpeed.current = 0;
    idleSince.current = performance.now();
  }, [detail, spots, count]);

  /* ---------- frames: photographs first, then the in-betweens ---------- */
  useEffect(() => {
    frames.current = new Array(count).fill(null);
    allLoaded.current = false;
    let cancelled = false;
    const order = [...keyframes];
    for (const stride of [2, 1]) for (let i = 0; i < count; i += stride) if (!order.includes(i)) order.push(i);
    let n = 0;
    order.forEach((i) => {
      decodeFrame(`${dir}/${pad(i)}.webp`)
        .then((f) => {
          if (cancelled) return closeFrame(f);
          frames.current[i] = f;
          n += 1;
          if (n === count) allLoaded.current = true;
          dirty.current = true;
          setLoaded(n);
        })
        .catch(() => {});
    });
    return () => {
      cancelled = true;
      frames.current.forEach((f) => f && closeFrame(f));
    };
  }, [dir, count, keyframes]);

  /* ---------- render loop ---------- */
  useEffect(() => {
    const el = wrap.current;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!el || !c || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cruise = count / 22; // one full turn every ~22 seconds

    const draw = (p: number) => {
      const base = Math.floor(p);
      const mix = p - base;
      let a = frames.current[mod(base, count)];
      let b = frames.current[mod(base + 1, count)];
      if (!a || !b) {
        // still loading: show the nearest decoded frame
        b = null;
        a = null;
        const r = Math.round(p);
        for (let d = 0; d < count && !a; d++) a = frames.current[mod(r + d, count)] ?? frames.current[mod(r - d, count)];
        if (!a) return;
      }
      if (c.width !== frameWidth(a)) {
        c.width = frameWidth(a);
        c.height = frameHeight(a);
      }
      ctx.globalAlpha = 1;
      ctx.drawImage(a, 0, 0, c.width, c.height);
      if (b && mix > 0.004) {
        ctx.globalAlpha = mix;
        ctx.drawImage(b, 0, 0, c.width, c.height);
        ctx.globalAlpha = 1;
      }
    };

    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
      dirty.current = true;
    }, { threshold: 0.1 });
    io.observe(el);

    let raf = 0;
    let last = performance.now();
    let drawn = -1;
    let shownDeg = -1;
    let shownRest = "";
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (inView.current || drag.current) {
        if (!drag.current) {
          const wantSpin =
            playingRef.current &&
            allLoaded.current &&
            !reduced &&
            !detailOpen.current &&
            zoomRef.current === 1 &&
            target.current === null &&
            now - idleSince.current > 2500;
          autoSpeed.current += ((wantSpin ? cruise : 0) - autoSpeed.current) * Math.min(1, dt * 1.6);
          if (!wantSpin && Math.abs(autoSpeed.current) < 0.08) autoSpeed.current = 0;
          velocity.current *= Math.pow(0.05, dt);
          if (Math.abs(velocity.current) < 0.4) velocity.current = 0;
          let delta = (autoSpeed.current + velocity.current) * dt;
          if (delta === 0) {
            // settle onto a real photograph so the still frame is never an in-between
            const key = target.current ?? nearestKey(pos.current, keyframes, count);
            const off = around(key - pos.current, count);
            // ease in, but never faster than half a turn per second on a long glide
            const cap = count * 0.5 * dt;
            if (Math.abs(off) > 0.004) delta = Math.max(-cap, Math.min(cap, off * Math.min(1, dt * 7)));
            else if (off !== 0) delta = off;
            else target.current = null;
          }
          if (delta !== 0) pos.current = mod(pos.current + delta, count);
        }
        // dragging moves pos outside this loop, so compare with what was last drawn
        if (dirty.current || pos.current !== drawn) {
          draw(pos.current);
          drawn = pos.current;
          dirty.current = false;
          const deg = Math.round((pos.current / count) * 360) % 360;
          if (deg !== shownDeg) {
            shownDeg = deg;
            setDegrees(deg);
          }
        }
        const key = nearestKey(pos.current, keyframes, count);
        const still =
          !drag.current && autoSpeed.current === 0 && velocity.current === 0 && Math.abs(around(key - pos.current, count)) < 0.004;
        // only swap the photograph while at rest, so a spin never fetches stills
        const state = still ? String(key) : "moving";
        if (state !== shownRest) {
          shownRest = state;
          setRest((r) => (still ? { key, still } : { key: r.key, still }));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [count, keyframes]);

  /* ---------- input ---------- */
  const markInteraction = () => {
    setInteracted(true);
    idleSince.current = performance.now();
  };

  const setZoom = (z: number) => {
    const next = Math.max(1, Math.min(MAX_ZOOM, z));
    zoomRef.current = next;
    if (next > 1) velocity.current = 0;
    setZoomState(next);
    markInteraction();
  };

  const framesPerPx = () => count / ((wrap.current?.clientWidth ?? 600) * 1.15);

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoomRef.current > 1) return;
    drag.current = { x: e.clientX, pos: pos.current, lastX: e.clientX, t: performance.now() };
    velocity.current = 0;
    autoSpeed.current = 0;
    target.current = null;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* capture is a nicety; dragging still works without it */
    }
    setGrabbing(true);
    markInteraction();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (zoomRef.current > 1 && wrap.current) {
      const r = wrap.current.getBoundingClientRect();
      setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      return;
    }
    const d = drag.current;
    if (!d) return;
    const k = framesPerPx() * direction;
    pos.current = mod(d.pos + (e.clientX - d.x) * k, count);
    const now = performance.now();
    const v = ((e.clientX - d.lastX) * k) / Math.max(0.001, (now - d.t) / 1000);
    // cap the fling at ~0.8 turns per second so a fast flick still feels weighty
    velocity.current = Math.max(-count * 0.8, Math.min(count * 0.8, v));
    d.lastX = e.clientX;
    d.t = now;
  };

  const endDrag = () => {
    if (!drag.current) return;
    // a pause before release means no fling
    if (performance.now() - drag.current.t > 80) velocity.current = 0;
    drag.current = null;
    setGrabbing(false);
    idleSince.current = performance.now();
  };

  const stepKey = (dirn: 1 | -1) => {
    const from = target.current ?? nearestKey(pos.current, keyframes, count);
    const i = Math.max(0, keyframes.indexOf(from));
    target.current = keyframes[mod(i + dirn * direction, keyframes.length)];
    velocity.current = 0;
    autoSpeed.current = 0;
    markInteraction();
  };

  const reset = () => {
    target.current = keyframes[0] ?? 0;
    velocity.current = 0;
    autoSpeed.current = 0;
    setZoom(1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && detail) onDetailChange?.(null);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      stepKey(e.key === "ArrowRight" ? 1 : -1);
    }
    if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
    if (e.key === "+" || e.key === "=") setZoom(zoomRef.current + 0.6);
    if (e.key === "-") setZoom(zoomRef.current - 0.6);
  };

  const progress = Math.round((loaded / count) * 100);
  const showStill = rest.still && stillLoaded === rest.key;

  // hotspots on the photograph the view is resting on
  const marks =
    rest.still && zoom === 1
      ? details.flatMap((d) => {
          const p = spots?.[d.id]?.at[String(rest.key)];
          return p ? [{ ...d, x: p[0], y: p[1] }] : [];
        })
      : [];
  const withImages = details.filter((d) => spots?.[d.id]);
  const openIndex = withImages.findIndex((d) => d.id === detail);
  const open = openIndex >= 0 ? withImages[openIndex] : null;
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div className={cn("relative select-none", className)}>
      <div
        ref={wrap}
        role="img"
        tabIndex={0}
        aria-label={`${alt}: studio photographs in 360°, turned ${degrees} degrees. Drag or use the arrow keys to rotate, plus and minus to zoom.`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => setZoom(zoomRef.current > 1 ? 1 : 2.2)}
        className={cn(
          "relative aspect-[3/4] touch-pan-y overflow-hidden outline-none",
          zoom > 1 ? "cursor-zoom-out" : grabbing ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ backgroundColor: backdrop }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: zoom }}
          style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 26 }}
          onClick={() => zoom > 1 && setZoom(1)}
        >
          <canvas ref={canvas} className="absolute inset-0 h-full w-full object-contain" />
          {/* the original photograph, sharper than the motion frames, whenever the view is at rest */}
          <Image
            key={rest.key}
            src={`${dir}/hq/${pad(rest.key)}.webp`}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={85}
            preload={rest.key === keyframes[0]}
            onLoad={() => setStillLoaded(rest.key)}
            className={cn(
              "pointer-events-none object-contain",
              // appear gently, disappear at once so it never lags behind a spin
              showStill || loaded === 0 ? "opacity-100 transition-opacity duration-300" : "opacity-0",
            )}
            draggable={false}
          />
        </motion.div>

        {/* Detail hotspots */}
        <AnimatePresence>
          {marks.map((m, i) => (
            <motion.button
              key={`${rest.key}-${m.id}`}
              type="button"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.12 } }}
              transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 320, damping: 22 }}
              onPointerDown={stop}
              onDoubleClick={stop}
              onClick={() => onDetailChange?.(detail === m.id ? null : m.id)}
              aria-label={`${m.label}: ${detail === m.id ? "close" : "show"} detail`}
              aria-expanded={detail === m.id}
              className="group/spot absolute z-10 -mt-4 -ml-4 flex size-8 items-center justify-center"
              style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%` }}
            >
              {detail !== m.id && (
                <span className="absolute inset-0 animate-ping rounded-full bg-white/50 [animation-duration:2.6s]" />
              )}
              <span
                className={cn(
                  "relative flex size-6 items-center justify-center rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.25)] transition duration-300 group-hover/spot:scale-110 md:size-7",
                  detail === m.id ? "bg-[#7d1f2c] text-white" : "bg-white text-[#121212]",
                )}
              >
                <Plus className={cn("size-3 transition-transform duration-300 md:size-3.5", detail === m.id && "rotate-45")} strokeWidth={2} />
              </span>
              <span
                className={cn(
                  "pointer-events-none absolute top-1/2 hidden -translate-y-1/2 bg-white/95 px-2.5 py-1.5 font-sans text-[0.58rem] tracking-[0.18em] whitespace-nowrap text-[#121212] uppercase opacity-0 shadow-sm transition-opacity group-hover/spot:opacity-100 md:block",
                  m.x > 0.6 ? "right-full mr-1.5" : "left-full ml-1.5",
                )}
              >
                {m.label}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          {open && spots?.[open.id] && (
            <motion.div
              key={open.id}
              role="dialog"
              aria-label={open.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onPointerDown={stop}
              onDoubleClick={stop}
              className="absolute inset-x-3 bottom-3 z-20 cursor-auto border border-line bg-bg p-3 text-fg shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)] md:inset-x-auto md:right-4 md:bottom-4 md:w-[21rem] md:p-4"
            >
              <div className="flex gap-3 md:block">
                <button
                  type="button"
                  onClick={() => setEnlarged(openIndex)}
                  aria-label={`Enlarge: ${open.title}`}
                  className="group/zoom relative aspect-square w-24 shrink-0 overflow-hidden md:aspect-[16/10] md:w-full"
                  style={{ backgroundColor: backdrop }}
                >
                  <Image
                    src={spots[open.id].image}
                    alt={`${alt}: ${open.title}, close up`}
                    fill
                    sizes="(min-width: 768px) 21rem, 6rem"
                    quality={85}
                    className="object-cover transition-transform duration-700 group-hover/zoom:scale-105"
                  />
                  <span className="absolute right-2 bottom-2 hidden size-7 items-center justify-center bg-white/90 text-[#121212] md:flex">
                    <Expand className="size-3.5" strokeWidth={1.6} />
                  </span>
                </button>
                <div className="min-w-0 md:mt-4">
                  <p className="font-sans text-[0.56rem] tracking-[0.22em] text-muted uppercase">
                    Detail {String(openIndex + 1).padStart(2, "0")} / {String(withImages.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-serif text-xl leading-tight md:text-2xl">{open.title}</h3>
                  <p className="mt-1.5 line-clamp-3 text-[0.92rem] leading-snug text-muted md:mt-2 md:line-clamp-none">
                    {open.body}
                  </p>
                </div>
              </div>
              {open.facts && (
                <dl className="mt-3 hidden grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-3 sm:grid">
                  {open.facts.map((f) => (
                    <div key={f.label}>
                      <dt className="font-sans text-[0.54rem] tracking-[0.2em] text-muted uppercase">{f.label}</dt>
                      <dd className="text-[0.92rem]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-3 flex items-center gap-1 border-t border-line pt-2.5">
                <button
                  type="button"
                  onClick={() => onDetailChange?.(withImages[(openIndex - 1 + withImages.length) % withImages.length].id)}
                  aria-label="Previous detail"
                  className="flex size-8 items-center justify-center transition hover:text-accent"
                >
                  <ChevronLeft className="size-4" strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  onClick={() => onDetailChange?.(withImages[(openIndex + 1) % withImages.length].id)}
                  aria-label="Next detail"
                  className="flex size-8 items-center justify-center transition hover:text-accent"
                >
                  <ChevronRight className="size-4" strokeWidth={1.6} />
                </button>
                <span className="flex-1" />
                <button
                  type="button"
                  onClick={() => onDetailChange?.(null)}
                  className="flex h-8 items-center gap-1.5 px-1 font-sans text-[0.58rem] tracking-[0.2em] uppercase transition hover:text-accent"
                >
                  Close <X className="size-3.5" strokeWidth={1.6} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!interacted && loaded > 0 && !detail && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
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
            <circle
              cx={18 + 15 * Math.sin((degrees * Math.PI) / 180)}
              cy={18 - 15 * Math.cos((degrees * Math.PI) / 180)}
              r="2.2"
              fill="#7d1f2c"
            />
          </svg>
          <span className="tabular-nums">{String(degrees).padStart(3, "0")}°</span>
        </div>
        <span className="pointer-events-none absolute top-5 right-4 border border-[#121212]/20 px-2 py-1 font-sans text-[0.55rem] tracking-[0.2em] text-[#121212]/60 uppercase">
          {progress < 100 ? `Loading ${progress}%` : "Studio photographs"}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
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
        <button
          type="button"
          onClick={reset}
          aria-label="Face the front"
          className="flex size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg"
        >
          <RotateCcw className="size-3.5" strokeWidth={1.6} />
        </button>
        <span className="flex-1 font-sans text-[0.6rem] tracking-[0.2em] text-muted uppercase">
          {compact ? "Drag · double-click to zoom" : "Drag to turn · double-click to zoom"}
        </span>
        <button
          type="button"
          onClick={() => setZoom(zoomRef.current - 0.6)}
          aria-label="Zoom out"
          disabled={zoom <= 1}
          className="flex size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg disabled:opacity-30"
        >
          <Minus className="size-3.5" strokeWidth={1.6} />
        </button>
        <button
          type="button"
          onClick={() => setZoom(zoomRef.current + 0.6)}
          aria-label="Zoom in"
          className="flex size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg"
        >
          <Plus className="size-3.5" strokeWidth={1.6} />
        </button>
        {!compact && (
          <button
            type="button"
            onClick={() => wrap.current?.requestFullscreen?.()}
            aria-label="Full screen"
            className="hidden size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg sm:flex"
          >
            <Maximize2 className="size-3.5" strokeWidth={1.6} />
          </button>
        )}
      </div>

      {spots && withImages.length > 0 && (
        <Lightbox
          images={withImages.map((d) => ({ src: spots[d.id].image, alt: `${alt}: ${d.title}, close up`, caption: d.title }))}
          index={enlarged}
          onClose={() => setEnlarged(null)}
          onIndex={setEnlarged}
        />
      )}
    </div>
  );
}
