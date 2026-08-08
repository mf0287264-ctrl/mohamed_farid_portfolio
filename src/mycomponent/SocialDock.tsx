"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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
      url: "https://github.com",
      icon: <FaGithub className="w-5 h-5 text-white" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: <FaLinkedin className="w-5 h-5 text-white" />,
    },
    {
      name: "Email",
      url: "mailto:contact@example.com",
      icon: <FaEnvelope className="w-4 h-4 text-white" />,
    },
  ];

  // Calculate dynamic transform (scale + upward Y translation) based on hover distance
  const getItemTransform = (index: number) => {
    if (hoveredIndex === null) {
      return { scale: 1.0, translateY: 0, opacity: 1.0 };
    }
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) {
      // Hovered item: Moves UPWARDS + scales MUCH BIGGER
      return { scale: 1.75, translateY: -18, opacity: 1.0 };
    }
    if (distance === 1) {
      // Immediate neighbor: Moves UP slightly + scales medium-large
      return { scale: 1.3, translateY: -6, opacity: 0.92 };
    }
    // Distant 3rd item: Base level + smaller scale
    return { scale: 0.85, translateY: 0, opacity: 0.6 };
  };

  // Dynamic container padding & gap based on which item is hovered
  const getContainerLayoutClass = () => {
    if (hoveredIndex === null) {
      return "gap-5 px-5 py-3.5";
    }
    if (hoveredIndex === 1) {
      // Middle item hovered: Maximum wide container width
      return "gap-9 px-10 py-4";
    }
    // Outer items (0 or 2) hovered: Wide container width
    return "gap-7 px-8 py-4";
  };

  return (
    <div
      onMouseLeave={() => setHoveredIndex(null)}
      className={`inline-flex items-center rounded-3xl bg-[#12121a]/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-950/40 pointer-events-auto relative z-30 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${getContainerLayoutClass()}`}
    >
      {socialLinks.map((link, index) => {
        const { scale, translateY, opacity } = getItemTransform(index);
        const isHovered = hoveredIndex === index;

        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            style={{
              transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
              opacity: opacity,
            }}
            className={`group relative w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-lg z-10 will-change-transform ${
              isHovered
                ? "bg-white/25 border-white/40 shadow-[0_0_35px_rgba(255,255,255,0.45)]"
                : "bg-white/10 hover:bg-white/20 border-white/15"
            }`}
            title={link.name}
          >
            {/* Soft ambient glow bubble behind hovered item */}
            {isHovered && (
              <span className="absolute inset-0 rounded-full bg-[#89B7FB] blur-md animate-pulse pointer-events-none" />
            )}

            {/* Icon */}
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
              {link.icon}
            </div>

            {/* Tooltip on hover */}
            <span className="absolute -top-10 px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/15 text-[10px] font-mono tracking-widest text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
              {link.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}
