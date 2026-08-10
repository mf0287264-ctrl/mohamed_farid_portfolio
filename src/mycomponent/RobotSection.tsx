"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SocialDock from "@/mycomponent/SocialDock";
import ScrollIndicator from "@/mycomponent/ScrollIndicator";

// Dynamically import Spline with SSR disabled for smooth WebGL rendering
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function RobotSection() {
  const [isIntro, setIsIntro] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  // Transition intro pose and reveal scroll indicator after 4 seconds
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setIsIntro(false);
    }, 1200);

    const scrollTimer = setTimeout(() => {
      setShowScroll(true);
    }, 4000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-between px-8 md:px-20 pt-28 pb-20 overflow-hidden z-10 select-none">
      {/* LEFT CONTENT: Full Stack Developer Hero Text */}
      <div
        className={`relative z-20 flex flex-col items-start justify-center max-w-xl pointer-events-none transition-all duration-1000 ease-out ${
          isIntro
            ? "opacity-0 -translate-x-10"
            : "opacity-100 translate-x-0 delay-100"
        }`}
      >
        {/* Customer name */}
        <p className="mb-4 flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.28em] text-slate-300 uppercase font-outfit">
          <span className="h-px w-8 bg-gradient-to-r from-violet-400 to-cyan-300" />
          Mohamad Tareq
        </p>

        {/* Primary discipline */}
        <h2 className="mb-1 text-6xl font-black leading-[0.8] tracking-[-0.07em] text-cyan-300 uppercase font-outfit drop-shadow-[0_0_26px_rgba(34,211,238,0.35)] sm:text-7xl md:text-8xl">
          AI
        </h2>

        {/* Primary title */}
        <h1 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.055em] text-gradient font-outfit drop-shadow-[0_12px_30px_rgba(56,189,248,0.18)] sm:text-7xl md:text-8xl">
          Engineer
        </h1>

        {/* CV & Social Icons Row */}
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href="/cv/MohamadTareq-AiEngineer.pdf"
            download="MohamadTareq-AiEngineer.pdf"
            className="group pointer-events-auto inline-flex items-center gap-3 rounded-full border border-cyan-300/50 bg-cyan-300/10 px-6 py-3 text-sm font-bold tracking-[0.16em] text-cyan-100 uppercase font-outfit shadow-[0_0_24px_rgba(34,211,238,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-300 hover:text-slate-950 hover:shadow-[0_0_30px_rgba(34,211,238,0.42)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
          >
            Download CV
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v12m0 0 4-4m-4 4-4-4m-3 8h14"
              />
            </svg>
          </a>

          {/* Social Magnification Dock Container */}
          <SocialDock />
        </div>
      </div>

      {/* FULL-SECTION SPLINE 3D CANVAS */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-10 overflow-hidden bg-transparent">
        <div
          className="w-full h-full flex items-center justify-center bg-transparent transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
          style={{
            transform: isIntro
              ? "translate3d(-18vw, 0, 0)"
              : "translate3d(15vw, 0, 0)",
          }}
        >
          <Spline
            scene="https://prod.spline.design/ocvmdotHwhUPI7kE/scene.splinecode"
            className="w-full h-full bg-transparent scale-100"
          />
        </div>
      </div>

      {/* SCROLL INDICATOR (Reveals 4s after page load) */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ease-out ${
          showScroll
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ScrollIndicator />
      </div>
    </section>
  );
}
