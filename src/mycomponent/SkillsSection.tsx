"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiLinux,
  SiDocker,
  SiGithubactions,
  SiCplusplus,
  SiPython,
  SiGit,
  SiGithub,
} from "react-icons/si";
import {
  FaServer,
  FaShieldHalved,
  FaLock,
  FaTerminal,
  FaUserSecret,
  FaEnvelope,
  FaNetworkWired,
  FaCloud,
  FaDesktop,
  FaJava,
  FaFan,
} from "react-icons/fa6";

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
      title: "FRONTEND",
      skills: [
        { name: "HTML", icon: <SiHtml5 className="w-6 h-6 text-[#E34F26]" /> },
        { name: "CSS", icon: <SiCss className="w-6 h-6 text-[#1572B6]" /> },
        { name: "JavaScript", icon: <SiJavascript className="w-6 h-6 text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" /> },
        { name: "React", icon: <SiReact className="w-6 h-6 text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="w-6 h-6 text-white" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" /> },
      ],
    },
    {
      title: "BACKEND & DATABASES",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" /> },
        { name: "Express.js", icon: <SiExpress className="w-6 h-6 text-slate-200" /> },
        { name: "REST APIs", icon: <FaServer className="w-6 h-6 text-[#22D3EE]" /> },
        { name: "SQL", icon: <SiPostgresql className="w-6 h-6 text-[#4169E1]" /> },
        { name: "MongoDB", icon: <SiMongodb className="w-6 h-6 text-[#47A248]" /> },
        { name: "Supabase", icon: <SiSupabase className="w-6 h-6 text-[#3ECF8E]" /> },
      ],
    },
    {
      title: "CYBERSECURITY & NETWORKING",
      skills: [
        { name: "Linux", icon: <SiLinux className="w-6 h-6 text-[#FCC624]" /> },
        { name: "Network Security", icon: <FaShieldHalved className="w-6 h-6 text-[#22D3EE]" /> },
        { name: "Firewalls", icon: <FaLock className="w-6 h-6 text-[#EF4444]" /> },
        { name: "IDS/IPS", icon: <FaShieldHalved className="w-6 h-6 text-[#F59E0B]" /> },
        { name: "Ethical Hacking", icon: <FaTerminal className="w-6 h-6 text-[#10B981]" /> },
        { name: "Vulnerability Testing", icon: <FaUserSecret className="w-6 h-6 text-[#A855F7]" /> },
        { name: "Email Security", icon: <FaEnvelope className="w-6 h-6 text-[#3B82F6]" /> },
        { name: "Phishing Awareness", icon: <FaUserSecret className="w-6 h-6 text-[#EC4899]" /> },
        { name: "Networking Fundamentals", icon: <FaNetworkWired className="w-6 h-6 text-[#06B6D4]" /> },
      ],
    },
    {
      title: "DEVOPS",
      skills: [
        { name: "Docker", icon: <SiDocker className="w-6 h-6 text-[#2496ED]" /> },
        { name: "Containerization", icon: <SiDocker className="w-6 h-6 text-[#38BDF8]" /> },
        { name: "CI/CD", icon: <SiGithubactions className="w-6 h-6 text-[#2088FF]" /> },
        { name: "GitHub Actions", icon: <SiGithubactions className="w-6 h-6 text-[#2088FF]" /> },
        { name: "Cloud Concepts", icon: <FaCloud className="w-6 h-6 text-[#38BDF8]" /> },
        { name: "System Administration", icon: <FaServer className="w-6 h-6 text-[#A855F7]" /> },
        { name: "Monitoring Fundamentals", icon: <FaDesktop className="w-6 h-6 text-[#10B981]" /> },
      ],
    },
    {
      title: "LANGUAGES & TOOLS",
      skills: [
        { name: "C++", icon: <SiCplusplus className="w-6 h-6 text-[#00599C]" /> },
        { name: "Java", icon: <FaJava className="w-6 h-6 text-[#ED8B00]" /> },
        { name: "Python", icon: <SiPython className="w-6 h-6 text-[#3776AB]" /> },
        { name: "Git", icon: <SiGit className="w-6 h-6 text-[#F05032]" /> },
        { name: "GitHub", icon: <SiGithub className="w-6 h-6 text-white" /> },
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
              ( SKILLS &amp; TECH STACK )
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
