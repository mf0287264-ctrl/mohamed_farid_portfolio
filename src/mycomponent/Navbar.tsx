"use client";

import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Navbar() {
  const navItems = [
    { label: "SERVICES", href: "#services" },
    { label: "SKILLS", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    if (!targetId) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: 0 },
        ease: "power3.inOut",
      });
      return;
    }
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetEl, offsetY: 80 },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-[#020208]/90 backdrop-blur-2xl border-b border-cyan-400/20 px-6 md:px-20 py-5 shadow-2xl shadow-cyan-950/50 transition-all">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-8">
        {/* BRAND LOGO IN LARGER CURSIVE SCRIPT FONT */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="group relative inline-block overflow-hidden font-script italic text-3xl sm:text-4xl font-bold tracking-widest uppercase shrink-0 drop-shadow-[0_0_14px_rgba(34,211,238,0.7)] py-1.5 px-2"
        >
          <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-[125%] text-white pr-2">
            MOHAMED TAREQ
          </span>
          <span className="block absolute top-1.5 left-0 transition-transform duration-300 ease-out translate-y-[125%] group-hover:translate-y-0 text-cyan-300 pr-2">
            MOHAMED TAREQ
          </span>
        </a>

        {/* NAV LINKS IN LARGER CURSIVE SCRIPT FONT */}
        <div className="hidden sm:flex items-center gap-6 lg:gap-10 shrink-0">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="group relative inline-block overflow-hidden font-script italic text-xl sm:text-2xl md:text-3xl font-bold tracking-wider uppercase whitespace-nowrap py-1.5 px-2"
            >
              {/* INITIAL TEXT (SLIDES UP AND OUT ON HOVER) */}
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-[125%] text-slate-200 pr-2">
                {item.label}
              </span>

              {/* REVEAL TEXT (SLIDES UP FROM BELOW IN GLOWING CYAN ON HOVER) */}
              <span className="block absolute top-1.5 left-0 transition-transform duration-300 ease-out translate-y-[125%] group-hover:translate-y-0 text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.85)] pr-2">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
