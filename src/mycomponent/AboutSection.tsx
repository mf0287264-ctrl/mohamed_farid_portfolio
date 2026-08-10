"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tareqPic from "@/asstest/tareq.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Portrait Image reveal on scroll
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0.2, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Main Title reveal animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0.2, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Main Subtitle Paragraph reveal animation
      if (p1Ref.current) {
        gsap.fromTo(
          p1Ref.current,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p1Ref.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.5,
            },
          }
        );
      }

      // 4. About Details Section reveal animation
      if (detailsRef.current) {
        gsap.fromTo(
          detailsRef.current,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detailsRef.current,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full overflow-hidden border-t border-cyan-400/20 bg-transparent px-6 py-28 text-slate-100 md:px-20"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/3 left-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: USER PORTRAIT IMAGE (TAREQ.PNG FROM ASSTEST - ORIGINAL VIBRANT FULL COLOR) */}
          <div
            ref={imageRef}
            className="lg:col-span-5 relative w-full aspect-[4/5] sm:h-[580px] rounded-3xl overflow-hidden border border-cyan-400/25 shadow-2xl bg-slate-950/85 backdrop-blur-md group"
          >
            <Image
              src={tareqPic}
              alt="AI Engineer & Developer Portrait"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Subtle Ambient Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-cyan-400/30 rounded-3xl pointer-events-none group-hover:border-cyan-400/60 transition-colors" />
          </div>

          {/* RIGHT COLUMN: ABOUT CONTENT MATCHING REFERENCE SCREENSHOT EXACTLY */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* MAIN HEADER TITLE WITH CYAN HIGHLIGHT */}
            <h2
              ref={titleRef}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-outfit text-white leading-[1.05] mb-8"
            >
              PROGRAMMER, DEVELOPER,{" "}
              <span className="text-cyan-300">AI-ENGINEER/</span>
            </h2>

            {/* HIGH-IMPACT SUBTITLE PARAGRAPH */}
            <p
              ref={p1Ref}
              className="text-lg sm:text-xl md:text-2xl font-medium text-slate-200 leading-relaxed font-outfit mb-12 max-w-2xl"
            >
              Last-year Artificial Intelligence student with hands-on experience in machine learning, deep learning, and end-to-end model deployment. Built and deployed production-ready ML systems. Strong in Python, data analysis, and applied ML, with experience teaching and mentoring peers.
            </p>

            {/* LOWER SECTION: ( ABOUT ME ) LABEL + GLOWING ORB ON LEFT, PARAGRAPHS ON RIGHT */}
            <div
              ref={detailsRef}
              className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start pt-2"
            >
              {/* LEFT MINI-COLUMN: ( ABOUT ME ) LABEL & GLOWING CYAN ORB */}
              <div className="sm:col-span-4 flex flex-col items-start gap-6">
                <span className="text-xs font-mono tracking-[0.3em] text-cyan-300 uppercase">
                  ( ABOUT ME )
                </span>

                {/* GLOWING CYAN ACCENT ORB DIRECTLY UNDER THE LABEL */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.85)] animate-pulse" />
              </div>

              {/* RIGHT MINI-COLUMN: DETAILED NARRATIVE PARAGRAPHS */}
              <div className="sm:col-span-8 flex flex-col gap-6">
                <p className="text-sm sm:text-base md:text-lg text-slate-300/90 font-light leading-relaxed font-outfit">
                  Building intelligent, user-centric AI solutions is my primary
                  focus. I ensure each model and application leaves users with a
                  feel-good sensation through meticulous attention to detail and
                  robust engineering principles.
                </p>

                <p className="text-sm sm:text-base md:text-lg text-slate-300/90 font-light leading-relaxed font-outfit">
                  When I'm not immersed in machine learning models and web
                  architecture, you can find me sharing insights about modern AI
                  engineering, exploring 3D interactive graphics, and building
                  scalable full-stack products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
