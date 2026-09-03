"use client";

import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter over ~500ms - 600ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 12;
      });
    }, 40);

    // Fade out and remove preloader after 600ms
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading && progress >= 100) {
    // Allow smooth fade out transition before hiding DOM element
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020208] text-white transition-all duration-500 ease-out select-none ${
        loading
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Brand Name */}
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.9)] animate-ping" />
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-[0.25em] text-white uppercase font-outfit drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            MOHAMED <span className="text-cyan-300">FARID</span>
          </h2>
        </div>

        {/* Progress Bar Track */}
        <div className="w-56 h-[3px] bg-slate-900 rounded-full overflow-hidden border border-cyan-400/20 relative shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 transition-all duration-150 ease-out rounded-full shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Subtitle / Percentage */}
        <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-slate-400 uppercase">
          <span>INITIALIZING</span>
          <span className="text-cyan-300 font-bold">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
}
