"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { PiFanFill } from "react-icons/pi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 4000);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Full-Width Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0.2, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.5,
            },
          },
        );
      }

      // 2. Left side info reveal
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0.2, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          },
        );
      }

      // 3. Form card reveal
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0.2, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formCardRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-20 w-full border-t border-cyan-400/20 bg-transparent px-6 py-28 text-slate-100 md:px-20"
    >
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute bottom-10 right-10 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* TOP FULL-WIDTH SECTION HEADER */}
        <div ref={headerRef} className="mb-16">
          {/* SECTION TAG WITH ANIMATED FAN ICON */}
          <div className="mb-4 flex items-center gap-4">
            <PiFanFill className="h-8 w-8 shrink-0 animate-spin text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.8)] [animation-duration:3s] sm:h-10 sm:w-10" />
            <span className="font-mono text-3xl tracking-[0.2em] text-white uppercase sm:text-4xl md:text-5xl">
              GET IN <span className="text-cyan-300">TOUCH</span>
            </span>
          </div>
        </div>

        {/* 2-COLUMN GRID UNDER THE HEADER: LEFT PARAGRAPH & LINKS, RIGHT FORM CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: SUBTITLE PARAGRAPH & DIRECT CONTACT INFO */}
          <div
            ref={leftColRef}
            className="lg:col-span-6 flex flex-col justify-between h-full"
          >
            <h2 className="font-outfit text-4xl font-extrabold leading-[1.05] tracking-tight text-white uppercase sm:text-6xl md:text-7xl">
              LET&apos;S TALK{" "}
              <span className="text-cyan-300">ABOUT YOUR IDEA.</span>
            </h2>
            {/* SUBTITLE PARAGRAPH */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300/90 font-light leading-relaxed font-outfit mb-12 max-w-xl">
              Have a project in mind? Looking for a long-term partner? Or just
              want to say hi? Let's connect and create something amazing
              together.
            </p>

            {/* DIRECT CONTACT LINKS */}
            <div className="flex flex-col gap-6 pt-4">
              {/* EMAIL */}
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-slate-900/80 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-300">
                  <HiOutlineEnvelope className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                    EMAIL ME
                  </span>
                  <a
                    href="mailto:ragabahmed154@gmail.com"
                    className="text-base sm:text-lg font-semibold text-white font-outfit hover:text-cyan-300 transition-colors"
                  >
                    mohamadtareq954@gmail.com
                  </a>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-slate-900/80 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-300">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                    WHATSAPP
                  </span>
                  <a
                    href="https://wa.me/201229140830"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold text-white font-outfit hover:text-cyan-300 transition-colors"
                  >
                    +201152419789
                  </a>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-slate-900/80 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-300">
                  <HiOutlineMapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                    LOCATION
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-white font-outfit">
                    giza, Egypt
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TRANSPARENT CONTAINER CONTACT FORM WITH GLOWING CYAN SHADOW */}
          <div
            ref={formCardRef}
            className="lg:col-span-6 rounded-3xl border border-cyan-400/30 bg-transparent p-8 sm:p-10 relative shadow-[0_0_50px_rgba(34,211,238,0.25),inset_0_0_20px_rgba(34,211,238,0.05)] hover:shadow-[0_0_75px_rgba(34,211,238,0.4)] transition-all duration-500"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* FIELD 1: EMAIL ADDRESS */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono tracking-widest text-slate-300 uppercase">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/40 border border-slate-800 focus:border-cyan-400 text-white placeholder-slate-500 rounded-2xl px-5 py-4 text-sm font-outfit outline-none transition-all duration-300 shadow-inner backdrop-blur-sm"
                />
              </div>

              {/* FIELD 2: HOW CAN I HELP? */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono tracking-widest text-slate-300 uppercase">
                  HOW CAN I HELP?
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950/40 border border-slate-800 focus:border-cyan-400 text-white placeholder-slate-500 rounded-2xl px-5 py-4 text-sm font-outfit outline-none transition-all duration-300 resize-none shadow-inner backdrop-blur-sm"
                />
              </div>

              {/* BOTTOM ROW: GLOWING CYAN ORB + SEND MESSAGE BUTTON */}
              <div className="flex items-center justify-between pt-2">
                {/* GLOWING CYAN ACCENT ORB */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.85)] animate-pulse" />

                {/* SEND MESSAGE PILL BUTTON */}
                <button
                  type="submit"
                  className="px-8 sm:px-10 py-4 rounded-full border border-cyan-400/80 bg-slate-950 text-white hover:bg-cyan-400 hover:text-slate-950 font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
                >
                  {submitted ? "MESSAGE SENT!" : "SEND MESSAGE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
