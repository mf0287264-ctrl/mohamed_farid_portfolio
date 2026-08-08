"use client";

import React, { useState, useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

export default function MenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Dynamic High-Intensity Mouse Magnet & Shake Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // High intensity outer circle displacement + strong rotational shake
    setPosition({ x: deltaX * 0.75, y: deltaY * 0.75 });
    // Inner 2 lines move significantly towards the cursor
    setInnerPosition({ x: deltaX * 1.15, y: deltaY * 1.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setInnerPosition({ x: 0, y: 0 });
  };

  return (
    <div className="fixed top-6 right-8 z-50">
      {/* HIGH INTENSITY MAGNETIC CIRCULAR MENU BUTTON */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${position.x * 0.48}deg) scale(1.08)`,
        }}
        className="group relative w-16 h-16 rounded-full bg-slate-300/90 hover:bg-white text-slate-900 border border-white/40 shadow-2xl shadow-purple-950/40 flex items-center justify-center cursor-pointer backdrop-blur-xl transition-transform duration-150 ease-out will-change-transform"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <HiOutlineX className="w-8 h-8 text-slate-900 transition-transform group-hover:scale-110" />
        ) : (
          /* 2 Parallel Horizontal Lines */
          <div
            style={{
              transform: `translate3d(${innerPosition.x}px, ${innerPosition.y}px, 0)`,
            }}
            className="flex flex-col gap-2 items-center justify-center transition-transform duration-100 ease-out pointer-events-none"
          >
            <span className="w-7 h-[3px] bg-slate-950 rounded-full transition-all group-hover:w-8" />
            <span className="w-7 h-[3px] bg-slate-950 rounded-full transition-all group-hover:w-8" />
          </div>
        )}
      </button>

      {/* DROPDOWN MENU PANEL */}
      {isOpen && (
        <div className="absolute top-20 right-0 w-64 rounded-3xl bg-[#0d0d16]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-5 flex flex-col gap-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          {[
            { label: "PROJECTS", href: "#projects" },
            { label: "EXPERIENCE", href: "#experience" },
            { label: "TESTIMONIALS", href: "#testimonials" },
            { label: "CONTACT", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-2xl text-xs font-bold tracking-widest text-slate-200 hover:text-white hover:bg-white/15 transition-all font-outfit uppercase"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
