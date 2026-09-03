"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export default function SocialDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/mf0287264-ctrl/",
      icon: <FaGithub className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mohamed-farid-6587ba298/",
      icon: <FaLinkedin className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors" />,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/201066834266",
      icon: <FaWhatsapp className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors" />,
    },
    {
      name: "Email",
      url: "mailto:mohamedfarid.dev@gmail.com",
      icon: <FaEnvelope className="w-4.5 h-4.5 text-white group-hover:text-cyan-300 transition-colors" />,
    },
  ];

  // Calculate dynamic transform (scale + upward Y translation) based on hover distance
  const getItemStyle = (index: number) => {
    if (hoveredIndex === null) {
      return {
        transform: "translate3d(0, 0, 0) scale(1)",
        opacity: 1,
        zIndex: 1,
      };
    }
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) {
      // Hovered item: Moves UPWARDS + scales 1.55x smoothly
      return {
        transform: "translate3d(0, -14px, 0) scale(1.55)",
        opacity: 1,
        zIndex: 30,
      };
    }
    if (distance === 1) {
      // Immediate neighbor: Moves UP slightly + scales 1.25x
      return {
        transform: "translate3d(0, -6px, 0) scale(1.25)",
        opacity: 0.9,
        zIndex: 20,
      };
    }
    // Distant items
    return {
      transform: "translate3d(0, 0, 0) scale(0.9)",
      opacity: 0.6,
      zIndex: 1,
    };
  };

  return (
    <div
      onMouseLeave={() => setHoveredIndex(null)}
      className="inline-flex items-center gap-4 sm:gap-5 px-5 py-3 rounded-full bg-transparent border border-cyan-400/30 shadow-[0_0_25px_rgba(34,211,238,0.15)] pointer-events-auto relative z-30 transition-all duration-300 ease-out"
    >
      {socialLinks.map((link, index) => {
        const isHovered = hoveredIndex === index;
        const itemStyle = getItemStyle(index);

        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            style={itemStyle}
            className={`group relative w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-lg will-change-transform ${
              isHovered
                ? "bg-slate-900 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.7)]"
                : "bg-slate-950/70 hover:bg-slate-900 border-cyan-400/20"
            }`}
            title={link.name}
          >
            {/* Glowing cyan pulse halo behind hovered item */}
            {isHovered && (
              <span className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md animate-pulse pointer-events-none" />
            )}

            {/* Icon */}
            <div className="relative z-10 transition-transform duration-200">
              {link.icon}
            </div>

            {/* Floating Tooltip above icon on hover */}
            <span
              className={`absolute -top-11 px-2.5 py-1 rounded-md bg-slate-950 border border-cyan-400/30 text-[10px] font-mono tracking-widest text-cyan-300 whitespace-nowrap shadow-xl pointer-events-none transition-all duration-200 ${
                isHovered
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-2 scale-90"
              }`}
            >
              {link.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}
