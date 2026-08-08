"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window)
    ) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop for organic floating movement
    const loop = () => {
      const ease = 0.22;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      setPosition({ x: currentX, y: currentY });
      animFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform mix-blend-difference"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {/* 
        Custom Glowing Circle Pointer Disc:
        - No center dot
        - Constant size (does not grow on hover)
        - Blends with underlying text/elements using mix-blend-difference
      */}
      <div
        className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.9)]"
        style={{
          backgroundColor: "#22d3ee",
        }}
      />
    </div>
  );
}
