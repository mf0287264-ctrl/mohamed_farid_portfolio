"use client";

import React from "react";

export default function Navbar() {
  return (
    <nav className="relative z-50 mx-auto mt-6 w-fit max-w-4xl">
      <div className="bg-[#05050b]/80 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-3.5 shadow-2xl shadow-purple-950/20 flex items-center gap-8 md:gap-12 transition-all">
        {/* LOGO */}
        <a
          href="#"
          className="text-2xl font-black font-logo text-white tracking-wider hover:opacity-80 transition-opacity"
        >
          AR
        </a>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 md:gap-10">
          {["PROJECTS", "EXPERIENCE", "TESTIMONIALS", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs md:text-sm font-bold tracking-widest text-slate-300 hover:text-white transition-colors uppercase font-outfit"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
