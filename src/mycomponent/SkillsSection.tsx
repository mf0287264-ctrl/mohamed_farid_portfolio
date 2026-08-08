"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiFramer,
  SiSass,
  SiBootstrap,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiDocker,
  SiPytorch,
  SiTensorflow,
} from "react-icons/si";
import { FaAws, FaBrain, FaFan } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  const skillCategories: SkillCategory[] = [
    {
      title: "AI & MACHINE LEARNING",
      skills: [
        { name: "Python", icon: <SiPython className="w-6 h-6 text-[#3776AB]" /> },
        { name: "PyTorch", icon: <SiPytorch className="w-6 h-6 text-[#EE4C2C]" /> },
        { name: "TensorFlow", icon: <SiTensorflow className="w-6 h-6 text-[#FF6F00]" /> },
        { name: "OpenAI API", icon: <FaBrain className="w-6 h-6 text-[#10A37F]" /> },
        { name: "FastAPI", icon: <SiFastapi className="w-6 h-6 text-[#009688]" /> },
      ],
    },
    {
      title: "FRONTEND",
      skills: [
        { name: "JavaScript", icon: <SiJavascript className="w-6 h-6 text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" /> },
        { name: "React", icon: <SiReact className="w-6 h-6 text-[#61DAFB]" /> },
        { name: "Next.Js", icon: <SiNextdotjs className="w-6 h-6 text-white" /> },
        { name: "Redux", icon: <SiRedux className="w-6 h-6 text-[#764ABC]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" /> },
        { name: "Framer Motion", icon: <SiFramer className="w-6 h-6 text-[#0055FF]" /> },
        { name: "Sass", icon: <SiSass className="w-6 h-6 text-[#CC6699]" /> },
        { name: "Bootstrap", icon: <SiBootstrap className="w-6 h-6 text-[#7952B3]" /> },
      ],
    },
    {
      title: "BACKEND",
      skills: [
        { name: "Node.Js", icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" /> },
        { name: "NestJS", icon: <SiNestjs className="w-6 h-6 text-[#E0234E]" /> },
        { name: "Express.Js", icon: <SiExpress className="w-6 h-6 text-white" /> },
      ],
    },
    {
      title: "DATABASE",
      skills: [
        { name: "MySQL", icon: <SiMysql className="w-6 h-6 text-[#4479A1]" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="w-6 h-6 text-[#4169E1]" /> },
        { name: "MongoDB", icon: <SiMongodb className="w-6 h-6 text-[#47A248]" /> },
        { name: "Prisma", icon: <SiPrisma className="w-6 h-6 text-white" /> },
      ],
    },
    {
      title: "TOOLS",
      skills: [
        { name: "Git", icon: <SiGit className="w-6 h-6 text-[#F05032]" /> },
        { name: "Docker", icon: <SiDocker className="w-6 h-6 text-[#2496ED]" /> },
        { name: "AWS", icon: <FaAws className="w-6 h-6 text-[#FF9900]" /> },
      ],
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0.2, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.5,
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
      id="skills"
      className="relative z-20 w-full border-t border-cyan-400/20 bg-transparent px-6 py-28 text-slate-100 md:px-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* SECTION HEADER */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <FaFan className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-300 animate-spin [animation-duration:6s] drop-shadow-[0_0_16px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-mono tracking-[0.3em] text-cyan-300 uppercase">
              ( SKILLS & TECH STACK )
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-outfit text-white">
            TECHNICAL <span className="text-cyan-300">PROFICIENCY.</span>
          </h2>
        </div>

        {/* CATEGORY ROWS WITH LARGER TYPOGRAPHY */}
        <div className="flex flex-col gap-12">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              ref={(el) => {
                rowsRef.current[idx] = el;
              }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center border-b border-slate-800/80 pb-10"
            >
              {/* LEFT CATEGORY TITLE (LARGER FONT SIZE) */}
              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wider font-outfit text-white drop-shadow-md">
                  {category.title}
                </h3>
              </div>

              {/* RIGHT FLEX SKILLS BADGES (LARGER BADGES & ICONS) */}
              <div className="md:col-span-8 lg:col-span-9 flex flex-wrap items-center gap-4 sm:gap-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_22px_rgba(34,211,238,0.3)] hover:-translate-y-1"
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {skill.icon}
                    </div>
                    <span className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors font-outfit">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
