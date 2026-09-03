"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE & SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 600);
    camera.lookAt(0, 0, 0);

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x04040c, 1);
    container.appendChild(renderer.domElement);

    // --- STAR TEXTURE (Crisp White Dot) ---
    const createStarTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.9)");
        gradient.addColorStop(0.5, "rgba(200, 220, 255, 0.4)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    // --- DOWNWARD FALLING STARS ---
    const STAR_COUNT = isMobile ? 80 : 350;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(STAR_COUNT * 3);
    const speeds = new Float32Array(STAR_COUNT);
    const opacities = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      // Spread across screen
      positions[i * 3] = (Math.random() - 0.5) * 1600; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400; // Z

      // Individual downward speed (Very slow and gentle)
      speeds[i] = Math.random() * 0.35 + 0.15;
      opacities[i] = Math.random() * 0.8 + 0.2;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 5.5,
      map: createStarTexture(),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- ANIMATION LOOP (Stars Falling Downwards) ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const posAttr = starGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < STAR_COUNT; i++) {
        // Move stars DOWNWARDS along Y axis
        posArray[i * 3 + 1] -= speeds[i];

        // Reset stars that fall below screen bottom back to top
        if (posArray[i * 3 + 1] < -600) {
          posArray[i * 3 + 1] = 600;
          posArray[i * 3] = (Math.random() - 0.5) * 1600;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none select-none z-0 bg-[#04040d]">
      {/* Three.js Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Purple Glow at bottom center matching reference image */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.18)_0%,rgba(4,4,13,0)_70%)] pointer-events-none" />
    </div>
  );
}
