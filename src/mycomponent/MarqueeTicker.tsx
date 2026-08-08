"use client";

import React from "react";

export default function MarqueeTicker() {
  const items = [
    "AI Engineer",
    "Machine Learning Specialist",
    "AI Engineer",

    "Machine Learning Specialist",
  ];

  // 4-Pointed Star SVG matching your reference screenshot exactly
  const FourPointStar = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-7 h-7 sm:w-10 sm:h-10 fill-slate-200 shrink-0 transition-transform duration-300 hover:scale-125"
      aria-hidden="true"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 py-6 sm:py-8 bg-transparent z-20 select-none">
      {/* Infinite Scrolling Ticker Track */}
      <div className="flex w-max animate-marquee items-center whitespace-nowrap">
        {/* Track Copy 1 */}
        <div className="flex items-center gap-8 sm:gap-14 px-4">
          {items.map((text, idx) => (
            <React.Fragment key={`t1-${idx}`}>
              <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wider font-outfit text-slate-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                {text}
              </span>
              <FourPointStar />
            </React.Fragment>
          ))}
        </div>

        {/* Track Copy 2 (Enables 100% Seamless Infinite Looping) */}
        <div className="flex items-center gap-8 sm:gap-14 px-4">
          {items.map((text, idx) => (
            <React.Fragment key={`t2-${idx}`}>
              <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wider font-outfit text-slate-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                {text}
              </span>
              <FourPointStar />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
