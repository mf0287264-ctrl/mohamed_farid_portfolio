"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaShieldHalved, FaServer } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhatIDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Title Character/Word Illumination ("WHAT I DO /")
      if (titleRef.current) {
        const titleSpans = titleRef.current.querySelectorAll(".title-span");
        if (titleSpans.length > 0) {
          gsap.fromTo(
            titleSpans,
            { color: "rgba(255, 255, 255, 0.15)", opacity: 0.2 },
            {
              color: "#ffffff",
              opacity: 1,
              stagger: 0.1,
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 95%",
                end: "top 55%",
                scrub: true,
              },
            }
          );
        }
      }

      // 2. Narrative Paragraph Word-by-Word Illumination (Lights up down, dims up)
      if (textRef.current) {
        const words = textRef.current.querySelectorAll(".word-span");
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { color: "rgba(255, 255, 255, 0.15)", opacity: 0.2 },
            {
              color: "#ffffff",
              opacity: 1,
              stagger: 0.08,
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 90%",
                end: "bottom 45%",
                scrub: true,
              },
            }
          );
        }
      }

      // 3. GSAP SCROLLTRIGGER PINNED ARCHIVE TIMELINE ANIMATION (Desktop only)
      if (
        stackContainerRef.current &&
        section1Ref.current &&
        section2Ref.current &&
        section3Ref.current
      ) {
        const isMobile = window.innerWidth < 768;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stackContainerRef.current,
            start: isMobile ? "top 85%" : "top top+=100",
            end: isMobile ? "+=100%" : "+=160%",
            pin: !isMobile,
            pinSpacing: !isMobile,
            scrub: 0.5,
          },
        });

        // Step 1: Section 2 animates moving up from down to up over Section 1 body
        tl.fromTo(
          section2Ref.current,
          { yPercent: 100 },
          { yPercent: 0, duration: 1, ease: "none" }
        );

        // Step 2: Section 3 animates moving up from down to up over Section 2 body
        tl.fromTo(
          section3Ref.current,
          { yPercent: 100 },
          { yPercent: 0, duration: 1, ease: "none" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraphText =
    "High-performance applications don't happen by chance, they are engineered with precision. I build scalable full-stack web applications, secure system environments, and automated DevOps workflows that combine clean architecture with effortless user experiences.";
  const wordsArray = paragraphText.split(" ");
  const titleWords = ["WHAT", "I", "DO", "/"];

  return (
    <div
      ref={sectionRef}
      id="services"
      className="mt-10 border-none relative w-full text-slate-100 overflow-x-hidden bg-transparent pb-16"
    >
      {/* 1. TOP HEADER SECTION ("WHAT I DO /") WITH SCROLL ILLUMINATION */}
      <section className="relative w-full min-h-[50vh] bg-transparent border-t border-white/10 pt-20 pb-12 px-6 md:px-20 z-10 flex flex-col justify-center overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full">
          {/* TITLE WITH GSAP SCROLL ILLUMINATION */}
          <h2
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-outfit text-white mb-8 flex flex-wrap gap-4"
          >
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="title-span inline-block transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                {word === "DO" ? (
                  <span className="text-cyan-300">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h2>

          <div className="grid md:grid-cols-12 gap-8 items-start pb-8 border-b border-white/10">
            <div className="md:col-span-4 text-xs font-mono tracking-[0.25em] text-slate-400 uppercase">
              ( SERVICES )
            </div>

            <div className="md:col-span-8">
              <p
                ref={textRef}
                className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed font-outfit"
              >
                {wordsArray.map((word, index) => (
                  <span
                    key={index}
                    className="word-span inline-block transition-colors"
                    style={{
                      marginRight: "0.3em",
                      color: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GSAP SCROLLTRIGGER PINNED ARCHIVE TIMELINE ANIMATION CONTAINER */}
      <div
        ref={stackContainerRef}
        className="relative w-full h-[85vh] overflow-hidden"
      >
        {/* SECTION 1: Full-Stack Web Development */}
        <div
          ref={section1Ref}
          className="absolute inset-x-0 top-0 z-10 w-full h-full bg-slate-950/85 border-t border-b border-cyan-400/25 shadow-2xl backdrop-blur-md px-6 md:px-20 py-6 sm:py-8 flex flex-col justify-start pt-8"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
            {/* TITLE TAB HEADER ROW */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-400/20">
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-3xl sm:text-5xl md:text-6xl font-bold font-outfit text-white">
                  ( 01 )
                </span>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight">
                  Full-Stack Development
                </h3>
              </div>
              <FaCode className="w-7 h-7 sm:w-9 sm:h-9 text-cyan-300 animate-icon-float" />
            </div>

            {/* SECTION BODY CONTENT */}
            <div className="grid md:grid-cols-12 gap-6 items-start pt-1">
              <div className="md:col-span-8 flex flex-col gap-4">
                <p className="text-xs sm:text-sm md:text-base text-slate-300/90 font-light leading-relaxed font-outfit max-w-3xl">
                  I build responsive, high-performance web applications using React, Next.js, Node.js, Express.js, TypeScript, SQL, and MongoDB. From dynamic frontend components to scalable REST API architectures.
                </p>

                {/* FEATURES LIST WITH CYAN NUMBERS */}
                <div className="flex flex-col gap-3 pt-3 border-t border-cyan-400/20 max-w-xl">
                  {[
                    { num: "01", name: "React & Next.js Applications" },
                    { num: "02", name: "Node.js & Express REST APIs" },
                    { num: "03", name: "SQL & MongoDB Databases" },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="flex items-center gap-3 pb-2 border-b border-cyan-400/20"
                    >
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        {item.num}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-white font-outfit">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GLOWING CYAN ACCENT CIRCLE */}
              <div className="md:col-span-4 flex items-center justify-end h-full pt-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.7)] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Cybersecurity & Networking */}
        <div
          ref={section2Ref}
          className="absolute inset-x-0 top-16 md:top-20 z-20 w-full h-full bg-slate-950/85 border-t border-b border-cyan-400/25 shadow-2xl backdrop-blur-md px-6 md:px-20 py-6 sm:py-8 flex flex-col justify-start pt-8"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
            {/* TITLE TAB HEADER ROW */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-400/20">
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-3xl sm:text-5xl md:text-6xl font-bold font-outfit text-white">
                  ( 02 )
                </span>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight">
                  Cybersecurity &amp; Networking
                </h3>
              </div>
              <FaShieldHalved className="w-7 h-7 sm:w-9 sm:h-9 text-cyan-300 animate-icon-spin" />
            </div>

            {/* SECTION BODY CONTENT */}
            <div className="grid md:grid-cols-12 gap-6 items-start pt-1">
              <div className="md:col-span-8 flex flex-col gap-4">
                <p className="text-xs sm:text-sm md:text-base text-slate-300/90 font-light leading-relaxed font-outfit max-w-3xl">
                  I design and analyze security solutions including phishing simulation platforms, vulnerability assessments, network security controls, firewalls, IDS/IPS, and Linux system administration.
                </p>

                {/* FEATURES LIST WITH CYAN NUMBERS */}
                <div className="flex flex-col gap-3 pt-3 border-t border-cyan-400/20 max-w-xl">
                  {[
                    { num: "01", name: "Phishing Simulation & Awareness" },
                    { num: "02", name: "Vulnerability & Security Testing" },
                    { num: "03", name: "Network Security & Firewalls" },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="flex items-center gap-3 pb-2 border-b border-cyan-400/20"
                    >
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        {item.num}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-white font-outfit">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GLOWING CYAN ACCENT CIRCLE */}
              <div className="md:col-span-4 flex items-center justify-end h-full pt-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.7)] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: DevOps & Cloud */}
        <div
          ref={section3Ref}
          className="absolute inset-x-0 top-32 md:top-36 z-30 w-full h-full bg-slate-950/85 border-t border-b border-cyan-400/25 shadow-2xl backdrop-blur-md px-6 md:px-20 py-6 sm:py-8 flex flex-col justify-start pt-8"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
            {/* TITLE TAB HEADER ROW */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-400/20">
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-3xl sm:text-5xl md:text-6xl font-bold font-outfit text-white">
                  ( 03 )
                </span>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight">
                  DevOps &amp; Infrastructure
                </h3>
              </div>
              <FaServer className="w-7 h-7 sm:w-9 sm:h-9 text-cyan-300 animate-icon-orbit" />
            </div>

            {/* SECTION BODY CONTENT */}
            <div className="grid md:grid-cols-12 gap-6 items-start pt-1">
              <div className="md:col-span-8 flex flex-col gap-4">
                <p className="text-xs sm:text-sm md:text-base text-slate-300/90 font-light leading-relaxed font-outfit max-w-3xl">
                  I set up continuous integration and delivery pipelines, containerize applications with Docker, manage GitHub Actions workflows, and apply cloud computing concepts and Linux system administration.
                </p>

                {/* FEATURES LIST WITH CYAN NUMBERS */}
                <div className="flex flex-col gap-3 pt-3 border-t border-cyan-400/20 max-w-xl">
                  {[
                    { num: "01", name: "Docker & Containerization" },
                    { num: "02", name: "CI/CD & GitHub Actions" },
                    { num: "03", name: "Cloud Concepts & Linux SysAdmin" },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="flex items-center gap-3 pb-2 border-b border-cyan-400/20"
                    >
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        {item.num}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-white font-outfit">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GLOWING CYAN ACCENT CIRCLE */}
              <div className="md:col-span-4 flex items-center justify-end h-full pt-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.7)] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
