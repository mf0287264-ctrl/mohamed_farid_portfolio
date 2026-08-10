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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const experiences: ExperienceItem[] = [
    {
      id: "exp-1",
      role: "Instructor – Digital Egypt Marvels Initiative",
      company: "iSchool",
      date: "June 2026 – Present",
      description:
        "Taught Programming, AI, and Game Development through hands-on sessions. Guided students in projects, activities, and teamwork. Mentored young learners and supported their technical growth.",
    },
    {
      id: "exp-2",
      role: "Generative & Agentic AI Trainee",
      company: "DEPI round 4",
      date: "December 2025 – June 2026",
      description:
        "Trained in Generative AI, Transformers, Diffusion Models, and RAG systems. Worked on fine-tuning models and building autonomous AI agents.",
    },
    {
      id: "exp-3",
      role: "IBM Data Science Trainee",
      company: "DEPI round 2",
      date: "October 2024 – June 2025",
      description:
        "Completed intensive training in Machine Learning, Deep Learning, and NLP. Built hands-on projects using Scikit-learn and TensorFlow. Applied data preprocessing, feature engineering, and model evaluation techniques.",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header illumination on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 75%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Continuous Line Growth from Item 1 to Item 3
      if (timelineTrackRef.current && lineProgressRef.current) {
        gsap.fromTo(
          lineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Synchronized Item Node Dots & Text Illumination
      itemRefs.current.forEach((itemEl, idx) => {
        if (!itemEl) return;

        const dotEl = dotRefs.current[idx];
        const titleEl = itemEl.querySelector(".exp-title");
        const companyEl = itemEl.querySelector(".exp-company");
        const dateEl = itemEl.querySelector(".exp-date");
        const descEl = itemEl.querySelector(".exp-desc");

        // Timeline Node Dot illuminates into glowing cyan when scrolled into view
        if (dotEl) {
          gsap.fromTo(
            dotEl,
            {
              scale: 0.8,
              backgroundColor: "#1e293b", // slate-800
              borderColor: "#475569", // slate-600
              boxShadow: "0 0 0px rgba(34, 211, 238, 0)",
            },
            {
              scale: 1.3,
              backgroundColor: "#22d3ee", // Glowing Cyan
              borderColor: "#ffffff",
              boxShadow: "0 0 25px rgba(34, 211, 238, 1)",
              scrollTrigger: {
                trigger: itemEl,
                start: "top 65%",
                end: "top 45%",
                scrub: 0.3,
              },
            }
          );
        }

        // Role title illuminates in cyan glow
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { opacity: 0.25, color: "rgba(255, 255, 255, 0.3)" },
            {
              opacity: 1,
              color: "#22d3ee",
              textShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
              scrollTrigger: {
                trigger: itemEl,
                start: "top 65%",
                end: "top 45%",
                scrub: 0.3,
              },
            }
          );
        }

        // Date lights up in crisp white
        if (dateEl) {
          gsap.fromTo(
            dateEl,
            { opacity: 0.25, color: "rgba(255, 255, 255, 0.3)" },
            {
              opacity: 1,
              color: "#ffffff",
              scrollTrigger: {
                trigger: itemEl,
                start: "top 65%",
                end: "top 45%",
                scrub: 0.3,
              },
            }
          );
        }

        // Company & Description light up smoothly
        if (companyEl && descEl) {
          gsap.fromTo(
            [companyEl, descEl],
            { opacity: 0.25, color: "rgba(203, 213, 225, 0.3)" },
            {
              opacity: 1,
              color: "rgba(248, 250, 252, 0.95)",
              scrollTrigger: {
                trigger: itemEl,
                start: "top 65%",
                end: "top 45%",
                scrub: 0.3,
              },
            }
          );
        }
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
          {/* SINGLE CONTINUOUS VERTICAL CONNECTING LINE AT EXACT 54.16% CENTER COLUMN GRID */}
          <div className="hidden md:block absolute left-[54.166%] top-6 bottom-6 w-[2px] -translate-x-1/2 z-10 pointer-events-none">
            <div className="relative h-full w-full bg-slate-800/80">
              {/* Moving Animated Gradient Line Progress (Cyan -> Sky -> Indigo) */}
              <div
                ref={lineProgressRef}
                className="absolute top-0 left-0 h-full w-full origin-top scale-y-0 bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-400 shadow-[0_0_18px_rgba(34,211,238,0.9)] will-change-transform"
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
                  <h3 className="exp-title text-2xl sm:text-3xl md:text-4xl font-extrabold font-outfit leading-tight transition-colors">
                    {exp.role}
                  </h3>
                  <p className="exp-company text-sm font-mono mt-2 transition-colors">
                    {exp.company}
                  </p>
                </div>

                {/* DATE RANGE */}
                <div>
                  <span className="exp-date text-2xl sm:text-3xl md:text-4xl font-extrabold font-outfit tracking-tight block transition-colors">
                    {exp.date}
                  </span>
                </div>
              </div>

              {/* COLUMN 3: SPACER FOR VERTICAL CONNECTING LINE WITH NODE DOT */}
              <div className="hidden md:flex md:col-span-1 items-center justify-center relative z-20">
                <div
                  ref={(el) => {
                    dotRefs.current[index] = el;
                  }}
                  className="w-4 h-4 rounded-full border-2 border-slate-600 bg-slate-800 transition-all duration-300 will-change-transform"
                />
              </div>

              {/* COLUMN 4: DESCRIPTION */}
              <div className="md:col-span-5">
                <p className="exp-desc text-sm sm:text-base md:text-lg font-light leading-relaxed font-outfit transition-colors">
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
