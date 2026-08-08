"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFan } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
}

export default function CareerExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const experiences: ExperienceItem[] = [
    {
      id: "exp-1",
      role: "Freelancer Frontend Developer",
      company: "Freelance",
      date: "May 2025 - Present",
      description:
        "Delivered 25+ end-to-end web projects, including AI platforms and e-commerce stores, using React, Next.js, and Odoo. Focused on high-performance design and scalable solutions.",
    },
    {
      id: "exp-2",
      role: "Frontend developer",
      company: "Codule",
      date: "Jan 2025 - Sep 2025",
      description:
        "Developed responsive web applications, booking systems, and internal dashboards. Created reusable component libraries and optimized performance through advanced state management.",
    },
    {
      id: "exp-3",
      role: "AI & Frontend Engineer",
      company: "Tech Innovation Lab",
      date: "Jun 2024 - Dec 2024",
      description:
        "Built interactive 3D WebGL user interfaces, AI model integrations, and optimized web performance across cross-functional engineering teams.",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header illumination on scroll
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
              end: "top 55%",
              scrub: true,
            },
          }
        );
      }

      // 2. Vertical Line Progress & Glowing Indicator Dot Animation Across Paragraphs
      if (
        timelineTrackRef.current &&
        lineProgressRef.current &&
        dotRef.current
      ) {
        gsap.fromTo(
          lineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          dotRef.current,
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
      }

      // 3. Sequential Item Illumination & Reveal on Scroll
      itemRefs.current.forEach((itemEl) => {
        if (!itemEl) return;

        gsap.fromTo(
          itemEl,
          { opacity: 0.25, y: 35, filter: "blur(3px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemEl,
              start: "top 80%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-20 w-full overflow-hidden border-t border-cyan-400/20 bg-transparent px-6 py-28 text-slate-100 md:px-20"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* SECTION HEADER WITH ANIMATED FAN ICON */}
        <div ref={headerRef} className="mb-20">
          <span className="mb-3 block text-xs font-mono tracking-[0.3em] text-cyan-300 uppercase">
            ( CAREER )
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-outfit text-white flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* ANIMATED FAN ICON */}
            <FaFan className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-300 animate-spin [animation-duration:3s] drop-shadow-[0_0_18px_rgba(34,211,238,0.8)] shrink-0 inline-block" />

            <span>
              Career <span className="text-cyan-300">Experience</span>
            </span>
          </h2>
        </div>

        {/* EXPERIENCE TIMELINE CONTAINER */}
        <div
          ref={timelineTrackRef}
          className="relative flex flex-col gap-24 sm:gap-32"
        >
          {/* SINGLE CONTINUOUS VERTICAL CONNECTING LINE WITH GLOWING DOT INDICATOR */}
          <div className="hidden md:block absolute left-[56%] top-6 bottom-6 w-[2px] -translate-x-1/2 z-20 pointer-events-none">
            <div className="relative h-full w-full bg-cyan-400/20">
              {/* Moving Animated Gradient Line Progress (Cyan -> Sky -> Indigo) */}
              <div
                ref={lineProgressRef}
                className="absolute top-0 left-0 h-full w-full origin-top scale-y-0 bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              />

              {/* Moving Glowing Cyan Indicator Dot */}
              <div
                ref={dotRef}
                className="pointer-events-none absolute -left-[7px] top-0 h-4 w-4 rounded-full border-2 border-white bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,1)] transition-transform duration-75 z-30"
              />
            </div>
          </div>

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-300 group relative"
            >
              {/* COLUMN 1 & 2: ROLE & DATE */}
              <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-baseline">
                {/* ROLE & COMPANY */}
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-outfit leading-tight transition-colors group-hover:text-cyan-300">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-mono text-slate-400 mt-2">
                    {exp.company}
                  </p>
                </div>

                {/* DATE RANGE */}
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-outfit tracking-tight block">
                    {exp.date}
                  </span>
                </div>
              </div>

              {/* COLUMN 3: SPACER FOR VERTICAL CONNECTING LINE */}
              <div className="hidden md:block md:col-span-1" />

              {/* COLUMN 4: DESCRIPTION */}
              <div className="md:col-span-5">
                <p className="text-sm sm:text-base md:text-lg text-slate-300/90 font-light leading-relaxed font-outfit">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
