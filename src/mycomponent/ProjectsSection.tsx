"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowUpRight } from "react-icons/hi2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectData {
  id: string;
  num: string; // "01", "02", "03", "04"
  title: string;
  subtitleTechString: string;
  tags: string[];
  description: string;
  image: string;
  link: string;
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyNumberRef = useRef<HTMLDivElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const digitStripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects: ProjectData[] = [
    {
      id: "project-1",
      num: "01",
      title: "AJMARKETING WEBSITE WITH AI & WHATSAPP AUTOMATION",
      subtitleTechString:
        "Next.js & TypeScript & Tailwind CSS & OpenAI & Twilio WhatsApp API & Framer Motion & Matter.js & EmailJS",
      tags: ["Next.js", "TypeScript", "2025"],
      description:
        "Full-stack AI marketing application featuring automated customer lead scoring, conversational AI bots, and real-time WhatsApp API campaign automation.",
      image: "/images/project1.jpg",
      link: "https://github.com",
    },
    {
      id: "project-2",
      num: "02",
      title: "INTERACTIVE 3D WEBGL PORTFOLIO & ROBOT GRAPHICS",
      subtitleTechString:
        "Three.js & WebGL & GSAP & React Three Fiber & Tailwind CSS & Spline 3D & WebAudio",
      tags: ["Three.js", "WebGL", "2025"],
      description:
        "Luxury 3D interactive portfolio featuring high-performance Spline WebGL robot graphics, particle starfields, and physics-driven micro-interactions.",
      image: "/images/project2.jpg",
      link: "https://github.com",
    },
    {
      id: "project-3",
      num: "03",
      title: "PREDICTIVE ANALYTICS & MACHINE LEARNING DASHBOARD",
      subtitleTechString:
        "Python & TensorFlow & React & Recharts & FastAPI & Scikit-learn & Docker & Tailwind CSS",
      tags: ["Python", "React", "2025"],
      description:
        "Real-time machine learning analytics suite monitoring predictive data streams, model confidence metrics, and interactive automated visualization charts.",
      image: "/images/project3.jpg",
      link: "https://github.com",
    },
    {
      id: "project-4",
      num: "04",
      title: "AUTONOMOUS LLM WORKFLOW AGENT ORCHESTRATOR",
      subtitleTechString:
        "LangChain & OpenAI API & Vector DB & Next.js & Python & Redis & Tailwind CSS & Pinecone",
      tags: ["LangChain", "Next.js", "2025"],
      description:
        "Autonomous multi-agent AI orchestration platform enabling business workflow automation, document RAG search, and human-in-the-loop task execution.",
      image: "/images/project4.jpg",
      link: "https://github.com",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Bi-Directional Digit Roll for 01 -> 02 -> 03 -> 04
      const updateDigitStrip = (idx: number) => {
        if (!digitStripRef.current) return;
        gsap.to(digitStripRef.current, {
          yPercent: -25 * idx, // 0 -> 0%, 1 -> -25%, 2 -> -50%, 3 -> -75%
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        ScrollTrigger.create({
          trigger: cardEl,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => updateDigitStrip(idx),
          onEnterBack: () => updateDigitStrip(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-20 w-full border-t border-cyan-400/20 bg-transparent px-6 py-28 text-slate-100 md:px-20"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/4 right-10 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* PROJECTS TRACK GRID CONTAINER */}
        <div
          ref={projectsTrackRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start"
        >
          {/* LEFT COLUMN: INTEGRATED STICKY HEADER & ROCK-SOLID NUMBER REEL */}
          <div
            ref={stickyNumberRef}
            className="lg:col-span-5 sticky top-28 self-start flex flex-col py-4 z-30 select-none"
          >
            {/* SECTION HEADER INTEGRATED INSIDE STICKY COLUMN */}
            <div className="mb-6">
              <span className="mb-2 block text-xs font-mono tracking-[0.3em] text-cyan-300 uppercase">
                ( PORTFOLIO )
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight font-outfit text-white">
                Selected <span className="text-cyan-300">Projects</span>
              </h2>
            </div>

            {/* HUGE NUMBER WITH VERTICAL DIGIT REEL */}
            <div className="relative inline-flex items-baseline font-outfit font-extrabold tracking-tighter text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.1)]">
              {/* FIXED "0" */}
              <span className="text-[7rem] sm:text-[10rem] md:text-[13rem] leading-none text-slate-100">
                0
              </span>

              {/* VERTICAL ROLLING DIGIT REEL STRIP ("1" -> "2" -> "3" -> "4") */}
              <div className="relative inline-block overflow-hidden h-[7rem] sm:h-[10rem] md:h-[13rem] w-[4.5rem] sm:w-[6.5rem] md:w-[8.5rem]">
                <div
                  ref={digitStripRef}
                  className="flex flex-col items-center w-full will-change-transform"
                >
                  <span className="text-[7rem] sm:text-[10rem] md:text-[13rem] leading-none text-slate-100 h-[7rem] sm:h-[10rem] md:h-[13rem] flex items-center justify-center">
                    1
                  </span>
                  <span className="text-[7rem] sm:text-[10rem] md:text-[13rem] leading-none text-slate-100 h-[7rem] sm:h-[10rem] md:h-[13rem] flex items-center justify-center">
                    2
                  </span>
                  <span className="text-[7rem] sm:text-[10rem] md:text-[13rem] leading-none text-slate-100 h-[7rem] sm:h-[10rem] md:h-[13rem] flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[7rem] sm:text-[10rem] md:text-[13rem] leading-none text-slate-100 h-[7rem] sm:h-[10rem] md:h-[13rem] flex items-center justify-center">
                    4
                  </span>
                </div>
              </div>

              {/* FIXED DOT "." WITH GLOWING CYAN ACCENT */}
              <span className="text-[7rem] sm:text-[10rem] md:text-[13rem] leading-none text-slate-100 relative">
                .
                {/* Glowing Accent Dot Inside Period */}
                <span className="absolute left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-cyan-400 shadow-[0_0_35px_rgba(34,211,238,1)] pointer-events-none animate-pulse" />
              </span>
            </div>

            {/* Project Indicator Bar */}
            <div className="mt-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                SCROLL TO EXPLORE
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: 4 PROJECT CARDS STACK */}
          <div className="lg:col-span-7 flex flex-col gap-28 sm:gap-40 pt-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="flex flex-col gap-6 w-full pb-16 border-b border-cyan-400/15"
              >
                {/* FULL-WIDTH MOCKUP IMAGE PREVIEW */}
                <div className="group relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden border border-cyan-400/20 bg-slate-950 shadow-2xl backdrop-blur-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Right Live Preview Button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-slate-950/90 border border-cyan-400/40 text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-110 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300 z-10"
                    aria-label={`View ${project.title}`}
                  >
                    <HiArrowUpRight className="w-6 h-6" />
                  </a>
                </div>

                {/* DETAILS DIRECTLY UNDER THE IMAGE */}
                <div className="flex flex-col gap-4 pt-2">
                  {/* LINE 1: TECH STACK TEXT STRING */}
                  <p className="text-xs sm:text-sm font-mono text-slate-400 leading-relaxed tracking-wide">
                    {project.subtitleTechString}
                  </p>

                  {/* LINE 2 & PILL BADGES: TITLE ON LEFT, PILL BADGES ON RIGHT */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    {/* HUGE BOLD TITLE */}
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white font-outfit tracking-tight leading-tight max-w-xl">
                      {project.title}
                    </h3>

                    {/* PILL BADGES STACKED ON RIGHT */}
                    <div className="flex flex-wrap sm:flex-col gap-2 shrink-0 items-start sm:items-end">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 rounded-full text-xs font-mono bg-slate-900/90 border border-slate-700 text-slate-200 backdrop-blur-md shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm sm:text-base text-slate-300/90 font-light leading-relaxed font-outfit pt-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
