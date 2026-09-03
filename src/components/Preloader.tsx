"use client";

import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Lock scroll during initial 0.5s preloader
    document.body.style.overflow = "hidden";

    // Trigger smooth fade-out as soon as line completes expansion (450ms)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 450);

    // Unmount element and restore scroll after fade-out transition finishes
    const unmountTimer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 950);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ease-out select-none ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Sleek Minimalist Wide Progress Line (60fps GPU Compositor Animation) */}
      <div className="w-72 sm:w-96 md:w-[28rem] h-[2px] bg-white/10 rounded-full overflow-hidden relative">
        <div className="h-full w-full bg-cyan-400 origin-left transform-gpu animate-preloader-expand shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
      </div>
    </div>
  );
}
