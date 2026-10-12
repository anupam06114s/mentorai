"use client";

import React, { useEffect, useRef } from "react";
import { SignUpButton, SignInButton } from "@clerk/react";
import {
  Sparkles,
  ArrowRight,
  LogIn
} from "lucide-react";
import { GradientWave } from "@/components/ui/gradient-wave";
import { BeamBorder } from "@/components/ui/border-beam";

// Floating ambient particles for atmosphere
const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.4 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(165, 180, 252, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export const Component: React.FC = () => {
  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center p-3 sm:p-4 py-8 relative overflow-hidden">
      {/* Animated WebGL Gradient Wave Background */}
      <GradientWave
        colors={["#030712", "#1e1b4b", "#1d4ed8", "#4f46e5", "#0f172a", "#020617"]}
        noiseSpeed={0.000008}
        noiseFrequency={[0.00012, 0.0006]}
        deform={{ incline: 0.35, noiseAmp: 200, noiseFlow: 3.5 }}
        className="opacity-95"
      />
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px] pointer-events-none" />
      <FloatingParticles />

      <div className="relative z-10 w-full max-w-[440px] my-auto">
        <BeamBorder
          size="md"
          colorVariant="colorful"
          theme="dark"
          active={true}
          strength={1.5}
          duration={3.5}
          beamWidth={2}
          borderRadius={24}
          className="w-full rounded-3xl"
        >
          <div className="bg-slate-950/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/60 text-center relative z-[1]">
          
            {/* Top Mentor AI Logo & Branding */}
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30 border border-white/25">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-slate-900 border border-white/20 rounded-md text-[10px] font-black tracking-wider text-blue-400 shadow-sm">
                  AI
                </div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
              Mentor AI <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Aura</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 mb-6 max-w-sm mx-auto leading-relaxed">
              AI-Powered Career Guidance & Exam Preparation Platform
            </p>

            {/* Action Area: Get Started (Sign Up) & Sign In (Login) with Clerk Modal */}
            <div className="space-y-3">
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="w-full relative group py-4 px-6 rounded-2xl font-bold text-base text-white transition-all duration-200 ease-in-out cursor-pointer overflow-hidden shadow-2xl shadow-blue-600/40 hover:shadow-blue-500/60 hover:scale-[1.01] active:scale-[0.99] border border-white/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500"
                >
                  <span className="flex items-center justify-center gap-2.5 tracking-wide">
                    <span>Get Started</span>
                    <ArrowRight size={19} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                </button>
              </SignUpButton>

              <SignInButton mode="modal">
                <button
                  type="button"
                  className="w-full py-3.5 px-4 rounded-xl font-medium text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogIn size={15} className="text-blue-400" />
                  <span>Already have an account? <span className="text-blue-400 font-semibold underline underline-offset-4 ml-0.5">Sign In</span></span>
                </button>
              </SignInButton>
            </div>

          </div>
        </BeamBorder>
      </div>
    </div>
  );
};
