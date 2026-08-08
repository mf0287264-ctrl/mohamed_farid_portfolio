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
  const headerRef = useRef<HTMLDivElement>(null);
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
      // 1. Header illumination
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      }

      // 2. SCRUB THE VERTICAL DIGIT STRIP (1 -> 2 -> 3 -> 4) FROM UP TO DOWN MATCHING SCROLL
      if (projectsTrackRef.current && digitStripRef.current) {
        gsap.to(digitStripRef.current, {
          yPercent: -75, // Moves strip down from 1 (0%) -> 2 (-25%) -> 3 (-50%) -> 4 (-75%)
          ease: "none",
          scrollTrigger: {
            trigger: projectsTrackRef.current,
            start: "top top+=120",
            end: "bottom bottom-=350",
            scrub: 0.3,
          },
        });
      }
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
        {/* SECTION HEADER */}
        <div ref={headerRef} className="mb-20">
          <span className="mb-3 block text-xs font-mono tracking-[0.3em] text-cyan-300 uppercase">
            ( PORTFOLIO )
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-outfit text-white">
            Selected <span className="text-cyan-300">Projects</span>
          </h2>
        </div>

        {/* PROJECTS TRACK GRID CONTAINER */}
        <div
          ref={projectsTrackRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative"
        >
          {/* LEFT COLUMN: ROCK-SOLID STICKY HUGE SINGLE NUMBER WITH UP-TO-DOWN ROLLING REEL */}
          <div
            ref={stickyNumberRef}
            className="lg:col-span-5 sticky top-28 self-start flex flex-col justify-center py-4 z-30 select-none"
          >
            <div className="relative inline-flex items-baseline font-outfit font-extrabold tracking-tighter text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.1)]">
              {/* FIXED "0" */}
              <span className="text-[9rem] sm:text-[13rem] md:text-[17rem] leading-none text-slate-100">
                0
              </span>

              {/* VERTICAL ROLLING DIGIT REEL STRIP ("1" -> "2" -> "3" -> "4") */}
              <div className="relative inline-block overflow-hidden h-[9rem] sm:h-[13rem] md:h-[17rem] w-[5rem] sm:w-[8rem] md:w-[10.5rem]">
                <div
                  ref={digitStripRef}
                  className="flex flex-col items-center w-full"
                >
                  <span className="text-[9rem] sm:text-[13rem] md:text-[17rem] leading-none text-slate-100 h-[9rem] sm:h-[13rem] md:h-[17rem] flex items-center justify-center">
                    1
                  </span>
                  <span className="text-[9rem] sm:text-[13rem] md:text-[17rem] leading-none text-slate-100 h-[9rem] sm:h-[13rem] md:h-[17rem] flex items-center justify-center">
                    2
                  </span>
                  <span className="text-[9rem] sm:text-[13rem] md:text-[17rem] leading-none text-slate-100 h-[9rem] sm:h-[13rem] md:h-[17rem] flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[9rem] sm:text-[13rem] md:text-[17rem] leading-none text-slate-100 h-[9rem] sm:h-[13rem] md:h-[17rem] flex items-center justify-center">
                    4
                  </span>
                </div>
              </div>

              {/* FIXED DOT "." WITH GLOWING CYAN ACCENT */}
              <span className="text-[9rem] sm:text-[13rem] md:text-[17rem] leading-none text-slate-100 relative">
                .{/* Glowing Accent Dot Inside Period */}
                <span className="absolute left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-cyan-400 shadow-[0_0_35px_rgba(34,211,238,1)] pointer-events-none animate-pulse" />
              </span>
            </div>

            {/* Project Indicator Label */}
            <div className="mt-2 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                SELECTED PROJECTS
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: 4 PROJECT CARDS STACK */}
          <div className="lg:col-span-7 flex flex-col gap-28 sm:gap-40">
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
