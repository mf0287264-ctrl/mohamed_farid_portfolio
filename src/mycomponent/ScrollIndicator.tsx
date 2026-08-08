"use client";

import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-1.5 text-slate-300/80 hover:text-white transition-colors cursor-pointer select-none group pointer-events-auto">
      <span className="text-[11px] font-mono tracking-[0.25em] uppercase font-bold text-slate-300 group-hover:text-cyan-300 transition-colors">
        Scroll
      </span>
      <div className="animate-bounce">
        <HiOutlineChevronDown className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      </div>
    </div>
  );
}
