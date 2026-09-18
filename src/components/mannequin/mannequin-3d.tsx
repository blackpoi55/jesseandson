"use client";

import { AnimatePresence, motion } from "motion/react";
import { Hand, Maximize2, Minus, Pause, Play, Plus, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SpinViewer } from "@/components/spin-viewer";
import { spinFrames } from "@/lib/spin";
import { cn } from "@/lib/utils";
import type { LookId } from "./model";
import type { Stage } from "./stage";

const TAU = Math.PI * 2;
const CRUISE = TAU / 20; // one full turn every 20 seconds
const MIN_ZOOM = 1;
const MAX_ZOOM = 2.6;

/**
 * Live 3D dress form rendered with Three.js: drag to turn (with inertia),
 * drag vertically to tilt, zoom in on details. Rendering is continuous and
 * frame-rate independent, so the idle spin is perfectly smooth. Falls back to
 * the pre-rendered 360° image sequence when WebGL isn't available.
 */
export function Mannequin3D({
  look,
  alt,
  preload = [],
  compact = false,
  className,
}: {
  look: LookId;
  alt: string;
  /** Other looks to build in the background so switching is instant. */
  preload?: LookId[];
  compact?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<Stage | null>(null);
  const baseElevation = useRef(0.036);

  // motion state lives in refs so the render loop never waits on React
  const angle = useRef(0);
  const velocity = useRef(0);
  const autoSpeed = useRef(0);
  const elevation = useRef(0.036);
  const elevationTarget = useRef(0.036);
  const zoom = useRef(1);
  const zoomTarget = useRef(1);
  const drag = useRef<{ x: number; y: number; angle: number; elev: number; lastX: number; t: number; touch: boolean } | null>(null);
  const idleSince = useRef(0);
  const inView = useRef(false);
  const playingRef = useRef(true);
  const dirty = useRef(true);
  const lookRef = useRef(look);

  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [playing, setPlaying] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [degrees, setDegrees] = useState(0);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  /* ---------- boot: load Three.js lazily, build the stage ---------- */
  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    (async () => {
      try {
        const { createStage, BASE_ELEVATION } = await import("./stage");
        if (cancelled || !canvas.current || !wrap.current) return;
        const s = createStage(canvas.current, { lowPower });
        stage.current = s;
        baseElevation.current = BASE_ELEVATION;
        elevation.current = elevationTarget.current = BASE_ELEVATION;
        s.setLook(lookRef.current);
        const r = wrap.current.getBoundingClientRect();
        s.resize(r.width, r.height);
        s.setView(angle.current, elevation.current, zoom.current);
        s.render();
        setStatus("ready");

        ro = new ResizeObserver(([e]) => {
          s.resize(e.contentRect.width, e.contentRect.height);
          dirty.current = true;
        });
        ro.observe(wrap.current);
        io = new IntersectionObserver(([e]) => {
          inView.current = e.isIntersecting;
          dirty.current = true;
        }, { threshold: 0.1 });
        io.observe(wrap.current);

        let last = performance.now();
        let shownDeg = -1;
        const tick = (now: number) => {
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          if (inView.current) {
            const before = angle.current + elevation.current * 7 + zoom.current * 13;
            if (drag.current) {
              autoSpeed.current = 0;
            } else {
              const wantSpin =
                playingRef.current && !reduced && zoomTarget.current === 1 && now - idleSince.current > 1500;
              autoSpeed.current += ((wantSpin ? CRUISE : 0) - autoSpeed.current) * Math.min(1, dt * 1.8);
              angle.current += (autoSpeed.current + velocity.current) * dt;
              velocity.current *= Math.pow(0.06, dt);
              if (Math.abs(velocity.current) < 0.005) velocity.current = 0;
              if (wantSpin) elevationTarget.current += (baseElevation.current - elevationTarget.current) * Math.min(1, dt * 1.5);
            }
            elevation.current += (elevationTarget.current - elevation.current) * Math.min(1, dt * 10);
            zoom.current += (zoomTarget.current - zoom.current) * Math.min(1, dt * 7);
            const after = angle.current + elevation.current * 7 + zoom.current * 13;
            if (dirty.current || Math.abs(after - before) > 1e-6) {
              s.setView(angle.current, elevation.current, zoom.current);
              s.render();
              dirty.current = false;
              const deg = Math.round(((((angle.current % TAU) + TAU) % TAU) / TAU) * 360) % 360;
              if (deg !== shownDeg) {
                shownDeg = deg;
                setDegrees(deg);
              }
            }
          }
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      stage.current?.dispose();
      stage.current = null;
    };
  }, []);

  /* ---------- switch looks, keeping the current angle ---------- */
  useEffect(() => {
    lookRef.current = look;
    const s = stage.current;
    if (!s) return;
    s.setLook(look);
    dirty.current = true;
  }, [look, status]);

  /* ---------- build the other looks while idle ---------- */
  const preloadKey = preload.join(",");
  useEffect(() => {
    if (status !== "ready" || !preloadKey) return;
    const ids = preloadKey.split(",") as LookId[];
    let i = 0;
    let handle = 0;
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = (cb: () => void) => (hasIdle ? window.requestIdleCallback(cb, { timeout: 2500 }) : window.setTimeout(cb, 400));
    const next = () => {
      const s = stage.current;
      if (!s || i >= ids.length) return;
      s.prepare(ids[i++]);
      handle = idle(next);
    };
    handle = idle(next);
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [status, preloadKey]);

  /* ---------- input ---------- */
  const markInteraction = () => {
    setInteracted(true);
    idleSince.current = performance.now();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      angle: angle.current,
      elev: elevationTarget.current,
      lastX: e.clientX,
      t: performance.now(),
      touch: e.pointerType !== "mouse",
    };
    velocity.current = 0;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* capture is a nicety */
    }
    setGrabbing(true);
    markInteraction();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = wrap.current;
    if (!d || !el) return;
    const perPx = TAU / (el.clientWidth * 1.15);
    angle.current = d.angle + (e.clientX - d.x) * perPx;
    // mouse can tilt the view a little; touch keeps vertical swipes for scrolling
    if (!d.touch) {
      elevationTarget.current = Math.max(-0.06, Math.min(0.32, d.elev + (e.clientY - d.y) * 0.0025));
    }
    const now = performance.now();
    const v = ((e.clientX - d.lastX) * perPx) / Math.max(0.001, (now - d.t) / 1000);
    velocity.current = Math.max(-5, Math.min(5, v));
    d.lastX = e.clientX;
    d.t = now;
    dirty.current = true;
  };

  const endDrag = () => {
    if (!drag.current) return;
    // a pause before release means no fling
    if (performance.now() - drag.current.t > 80) velocity.current = 0;
    drag.current = null;
    setGrabbing(false);
    idleSince.current = performance.now();
  };

  const setZoom = (z: number) => {
    zoomTarget.current = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z));
    setZoomed(zoomTarget.current > 1);
    markInteraction();
  };

  const reset = () => {
    const turns = Math.round(angle.current / TAU);
    velocity.current = 0;
    // glide back to the front
    const from = angle.current;
    const to = turns * TAU;
    const start = performance.now();
    const glide = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const e = 1 - Math.pow(1 - t, 3);
      angle.current = from + (to - from) * e;
      dirty.current = true;
      if (t < 1) requestAnimationFrame(glide);
    };
    requestAnimationFrame(glide);
    elevationTarget.current = baseElevation.current;
    setZoom(1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      velocity.current = 0;
      angle.current += (e.key === "ArrowRight" ? 1 : -1) * (TAU / 36);
      dirty.current = true;
      markInteraction();
    }
    if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
    if (e.key === "+" || e.key === "=") setZoom(zoomTarget.current + 0.5);
    if (e.key === "-") setZoom(zoomTarget.current - 0.5);
  };

  if (status === "fallback") {
    return <SpinViewer frames={spinFrames(look)} alt={alt} compact={compact} className={className} />;
  }

  return (
    <div className={cn("relative select-none", className)}>
      <div
        ref={wrap}
        role="img"
        tabIndex={0}
        aria-label={`${alt} — interactive 3D view, turned ${degrees} degrees. Drag or use the arrow keys to rotate, plus and minus to zoom.`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => setZoom(zoomTarget.current > 1 ? 1 : 2)}
        className={cn(
          "relative aspect-[4/5] touch-pan-y overflow-hidden outline-none",
          grabbing ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ backgroundColor: "#f1eee8" }}
      >
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />

        {/* First-paint poster while Three.js loads */}
        <AnimatePresence>
          {status === "loading" && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(/media/360/${look}/01.webp)` }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!interacted && status === "ready" && (
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
                Drag to rotate · 3D
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
          Live 3D
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
          {compact ? "Drag · double-click to zoom" : "Drag to turn & tilt · double-click to zoom"}
        </span>
        <button
          type="button"
          onClick={() => setZoom(zoomTarget.current - 0.5)}
          aria-label="Zoom out"
          disabled={!zoomed}
          className="flex size-9 shrink-0 items-center justify-center border border-line transition hover:border-fg disabled:opacity-30"
        >
          <Minus className="size-3.5" strokeWidth={1.6} />
        </button>
        <button
          type="button"
          onClick={() => setZoom(zoomTarget.current + 0.5)}
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
    </div>
  );
}
