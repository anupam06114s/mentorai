"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, Sparkles, Send, Check, ArrowRight, RotateCcw, Copy } from "lucide-react";

/* ───────────────────────────── copy ───────────────────────────── */
export const COPY = {
  placeholder: "Ask anything…",
  labels: ["Thinking", "Searching", "Analyzing", "Composing"],
  done: "Done",
  answerTitle: "Answer",
  answerBody: "The answer goes here",
  reset: "New question",
  send: "Send",
  search: "Search",
};

export type Phase = "idle" | "launch" | "assemble" | "think" | "resolve" | "condense" | "unfold" | "answered" | "reset";

export interface MorphOrbProps {
  onSubmit?: (text: string) => Promise<string | void> | string | void;
  minThinkMs?: number;
  speed?: number;
  placeholder?: string;
  className?: string;
  isProcessing?: boolean;
}

/* ─────────────────────────── geometry ─────────────────────────── */
const PILL_H = 60, BALL_SMALL = 60, ORB_D = 132, ORB_R = 66, CANVAS = 220;

/* ───────────────────────── math + easing ───────────────────────── */
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ───────────────────────────── dotted orb ───────────────────────────── */
const RINGS = 16;
const DOT_LIST = (() => {
  const rand = mulberry32(7);
  const out: { x: number; y: number; z: number; u: number; seed: number }[] = [];
  for (let k = 0; k < RINGS; k++) {
    const y = 1 - ((k + 0.5) / RINGS) * 2;
    const r = Math.sqrt(1 - y * y);
    const m = Math.max(4, Math.round(30 * r));
    for (let j = 0; j < m; j++) {
      const a = (j / m) * TAU + k * 0.35;
      out.push({ x: Math.cos(a) * r, y, z: Math.sin(a) * r, u: (1 - y) / 2, seed: rand() * 6.283 });
    }
  }
  return out;
})();

const N = DOT_LIST.length;
const DX = Float32Array.from(DOT_LIST, (d) => d.x);
const DY = Float32Array.from(DOT_LIST, (d) => d.y);
const DZ = Float32Array.from(DOT_LIST, (d) => d.z);
const DU = Float32Array.from(DOT_LIST, (d) => d.u);
const DS = Float32Array.from(DOT_LIST, (d) => d.seed);

const G_STEPS = 24, A_STEPS = 48;
const COLORS: string[] = (() => {
  const out: string[] = [];
  for (let gi = 0; gi <= G_STEPS; gi++) {
    const g = gi / G_STEPS;
    // Radiant palette: Cyan, Sky Blue, to Purple/Gold
    const r = Math.round(lerp(56, 175, g));
    const gg = Math.round(lerp(189, 109, g));
    const b = Math.round(lerp(248, 255, g));
    for (let ai = 0; ai <= A_STEPS; ai++) {
      out.push(`rgba(${r},${gg},${b},${(ai / A_STEPS).toFixed(3)})`);
    }
  }
  return out;
})();

/* ───────────────────────────── Standalone 3D Orb Component ───────────────────────────── */
export const ThinkingOrbCanvas: React.FC<{
  size?: number;
  speed?: number;
  className?: string;
}> = ({ size = CANVAS, speed = 1, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let dead = false;
    let isVisible = true;
    let time = 0;
    let rot = 0;
    let last = performance.now();
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const SX = new Float32Array(N);
    const SY = new Float32Array(N);
    const SR = new Float32Array(N);
    const SD = new Float32Array(N);
    const SC = new Int16Array(N);

    const C0 = size / 2;
    const CP = Math.cos(0.35);
    const SP = Math.sin(0.35);
    const currentRadius = (size / CANVAS) * ORB_R;

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, size, size);
      time += dt;
      rot += 1.35 * dt * speed;

      const cyw = Math.cos(rot);
      const syw = Math.sin(rot);

      for (let n = 0; n < N; n++) {
        const dx = DX[n];
        const dy = DY[n];
        const dz = DZ[n];

        // 3D Rotation
        const x1 = dx * cyw + dz * syw;
        const z1 = -dx * syw + dz * cyw;
        const y2 = dy * CP - z1 * SP;
        const z2 = dy * SP + z1 * CP;

        const f = 2.8 / (2.8 - z2);
        const depth = (z2 + 1) / 2;
        const ox = x1 * currentRadius * f;
        const oy = -y2 * currentRadius * f;

        const pulse = 0.5 + 0.5 * Math.sin(DS[n] + time * 3.4);
        let a = 0.16 + 0.58 * depth * depth + 0.26 * pulse;
        if (a > 1) a = 1;

        SX[n] = C0 + ox;
        SY[n] = C0 + oy;
        SD[n] = depth;
        SR[n] = 1.35 * (0.45 + 0.75 * depth) * f * (size / CANVAS);

        const ai = Math.round(a * A_STEPS);
        const gi = Math.round(clamp01(depth) * G_STEPS);
        SC[n] = ai <= 0 ? -1 : gi * (A_STEPS + 1) + ai;
      }

      // Back half first, then front half
      for (let pass = 0; pass < 2; pass++) {
        for (let n = 0; n < N; n++) {
          const c = SC[n];
          if (c < 0) continue;
          if ((SD[n] >= 0.5) !== (pass === 1)) continue;
          ctx.fillStyle = COLORS[c];
          ctx.beginPath();
          ctx.arc(SX[n], SY[n], SR[n], 0, TAU);
          ctx.fill();
        }
      }
    };

    const frame = (now: number) => {
      if (dead || !isVisible) return;
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      draw(dt);
      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(frame);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !raf && !dead && !prefersReducedMotion) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!isVisible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "50px" }
    );
    observer.observe(canvas);

    draw(0.016);
    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      dead = true;
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [size, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={`block pointer-events-none ${className}`}
    />
  );
};

/* ───────────────────────────── AIThinkingOrbAndInput ───────────────────────────── */
export const AIThinkingOrbAndInput: React.FC<MorphOrbProps> = ({
  onSubmit,
  isProcessing = false,
  placeholder = COPY.placeholder,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [internalThinking, setInternalThinking] = useState(false);
  const [labelIdx, setLabelIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeThinking = isProcessing || internalThinking;

  // Cycle thinking phase labels
  useEffect(() => {
    if (!activeThinking) {
      setLabelIdx(0);
      return;
    }
    const iv = setInterval(() => {
      setLabelIdx((prev) => (prev + 1) % COPY.labels.length);
    }, 650);
    return () => clearInterval(iv);
  }, [activeThinking]);

  // Focus input when returning back to search state
  useEffect(() => {
    if (!activeThinking) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [activeThinking]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = query.trim();
    if (!text || activeThinking) return;

    setInternalThinking(true);
    setQuery("");

    try {
      if (onSubmit) {
        await onSubmit(text);
      }
    } finally {
      // Wapas search button same bna dena (automatically revert to initial search bar state)
      setInternalThinking(false);
    }
  };

  return (
    <div className={`relative w-full max-w-[700px] mx-auto ${className}`}>
      {/* Outer Glow Halo */}
      <div
        className={`absolute -inset-1 rounded-full transition-opacity duration-700 pointer-events-none blur-xl ${
          activeThinking
            ? "opacity-90 bg-gradient-to-r from-cyan-500/40 via-blue-600/30 to-purple-600/40"
            : "opacity-0"
        }`}
      />

      {/* Morphing Capsule Container */}
      <div
        className={`relative w-full transition-all duration-500 ease-out rounded-full overflow-hidden border ${
          activeThinking
            ? "bg-slate-950/95 border-cyan-400/60 shadow-[0_0_35px_rgba(56,189,248,0.35)] backdrop-blur-2xl"
            : "bg-slate-900/85 hover:bg-slate-900/95 border-white/20 hover:border-cyan-400/50 focus-within:border-cyan-400 shadow-2xl backdrop-blur-2xl"
        }`}
      >
        {activeThinking ? (
          /* ─── Thinking Orb State ─── */
          <div className="flex items-center justify-between px-5 py-2.5 min-h-[64px]">
            <div className="flex items-center gap-3.5">
              {/* 3D Dotted Canvas Orb */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <ThinkingOrbCanvas size={48} speed={1.8} />
              </div>

              {/* Status Text & Phased Labels */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    Aura AI
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-slate-100 tracking-tight transition-all duration-300">
                    {COPY.labels[labelIdx]}
                  </span>
                  <span className="text-cyan-400 animate-pulse font-bold text-xs">...</span>
                </div>
              </div>
            </div>

            {/* Synthesizing Indicator Badge */}
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Synthesizing</span>
            </div>
          </div>
        ) : (
          /* ─── Search Bar State with Search Button ─── */
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 px-4 py-2 min-h-[64px]"
          >
            {/* Search Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-cyan-400 shrink-0">
              <Search size={18} />
            </div>

            {/* Search Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-slate-400 font-sans tracking-tight"
            />

            {/* Search Button */}
            <button
              type="submit"
              disabled={!query.trim()}
              className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:hover:from-cyan-500 disabled:hover:to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <span>{COPY.search}</span>
              <Search size={14} className="stroke-[2.5]" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const MorphOrb = AIThinkingOrbAndInput;
export default AIThinkingOrbAndInput;
