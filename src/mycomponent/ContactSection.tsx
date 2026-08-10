"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { PiFanFill } from "react-icons/pi";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { submitContactForm } from "../actions/contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Zod Schema with custom error messages
const contactSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please enter a valid email address (e.g. name@domain.com)." }),
  message: z
    .string()
    .min(1, { message: "Message is required." })
    .min(10, { message: "Your message must be at least 10 characters long." })
    .max(1000, { message: "Your message cannot exceed 1000 characters." }),
});

type FormErrors = {
  email?: string;
  message?: string;
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate using Zod schema
    const validationResult = contactSchema.safeParse({ email, message });

    if (!validationResult.success) {
      const fieldErrors: FormErrors = {};
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error(validationResult.error.issues[0]?.message || "Please fix form errors.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const startTime = Date.now();
      const result = await submitContactForm(email.trim(), message.trim());

      // Ensure minimum spinner visible time (800ms) for smooth UX
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 800) {
        await new Promise((res) => setTimeout(res, 800 - elapsedTime));
      }

      if (!result.success) {
        console.error("Error submitting form:", result.error);
        const errorMsg = "Failed to send your message. Please verify database connection or try again later.";
        setServerError(errorMsg);
        toast.error("Failed to send message. Please try again!");
      } else {
        setSubmitted(true);
        toast.success("🚀 Message sent successfully! I'll reach out soon.");
        setTimeout(() => {
          setEmail("");
          setMessage("");
          setSubmitted(false);
        }, 4000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      const errorMsg = "An unexpected error occurred. Please try again later.";
      setServerError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
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
                    href="mailto:mohamadtareq954@gmail.com"
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
                    href="https://wa.me/201152419789"
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
                    Cairo, Egypt
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
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              {/* SERVER ERROR ALERT */}
              {serverError && (
                <div className="p-4 rounded-xl border border-rose-500/50 bg-rose-950/40 text-rose-300 font-outfit text-xs sm:text-sm shadow-lg">
                  {serverError}
                </div>
              )}

              {/* FIELD 1: EMAIL ADDRESS */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest text-slate-300 uppercase">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full bg-slate-950/40 border text-white placeholder-slate-500 rounded-2xl px-5 py-4 text-sm font-outfit outline-none transition-all duration-300 shadow-inner backdrop-blur-sm ${
                    errors.email
                      ? "border-rose-500/80 focus:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "border-slate-800 focus:border-cyan-400"
                  }`}
                />
                {errors.email && (
                  <span className="text-xs font-mono text-rose-400 tracking-wide pl-1">
                    ⚠️ {errors.email}
                  </span>
                )}
              </div>

              {/* FIELD 2: HOW CAN I HELP? */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest text-slate-300 uppercase">
                  HOW CAN I HELP?
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={handleMessageChange}
                  className={`w-full bg-slate-950/40 border text-white placeholder-slate-500 rounded-2xl px-5 py-4 text-sm font-outfit outline-none transition-all duration-300 resize-none shadow-inner backdrop-blur-sm ${
                    errors.message
                      ? "border-rose-500/80 focus:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "border-slate-800 focus:border-cyan-400"
                  }`}
                />
                {errors.message && (
                  <span className="text-xs font-mono text-rose-400 tracking-wide pl-1">
                    ⚠️ {errors.message}
                  </span>
                )}
              </div>

              {/* BOTTOM ROW: GLOWING CYAN ORB + SEND MESSAGE BUTTON */}
              <div className="flex items-center justify-between pt-2">
                {/* GLOWING CYAN ACCENT ORB */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.85)] animate-pulse" />

                {/* SEND MESSAGE PILL BUTTON WITH REACT-ICONS SPINNER */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="px-8 sm:px-10 py-4 rounded-full border border-cyan-400/80 bg-slate-950 text-white hover:bg-cyan-400 hover:text-slate-950 font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[210px]"
                >
                  {isSubmitting ? (
                    <>
                      <ImSpinner2 className="animate-spin h-4 w-4 text-cyan-300" />
                      <span>SENDING...</span>
                    </>
                  ) : submitted ? (
                    "MESSAGE SENT!"
                  ) : (
                    "SEND MESSAGE"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
