"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { personal } from "@/data/portfolio";

const ROLES = [
  "Frontend Developer",
  "React Engineer",
  "TypeScript Specialist",
  "UI Performance Nerd",
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!deleting && displayed === current) {
      // Pause before deleting
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
      return;
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const speed = deleting ? 40 : 75;
    timeoutRef.current = setTimeout(() => {
      setDisplayed((prev) =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, roleIndex]);

  return (
    <span
      className="text-ember-500 font-mono"
      aria-label={`Role: ${ROLES[roleIndex]}`}
      aria-live="polite"
    >
      {displayed}
      <span className="inline-block w-0.5 h-[1em] bg-ember-500 ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" aria-hidden="true" />
    </span>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const letters = "Anjolaoluwa".split("");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Warm glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-ember-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="container-grid relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">
          {/* Left — Content */}
          <div>
            {/* Status badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-jade-500/30 bg-jade-500/10 text-jade-500 text-xs font-mono mb-8 ${
                mounted ? "animate-fade-up" : "opacity-0"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-jade-500 animate-pulse" aria-hidden="true" />
              Available for new projects
            </div>

            {/* Name — letter reveal */}
            <h1 className="font-display font-extrabold tracking-tight leading-[1.05] mb-2">
              <div className="overflow-hidden">
                <div className="flex text-[clamp(2.5rem,8vw,5.5rem)]">
                  {letters.map((letter, i) => (
                    <span
                      key={i}
                      className="inline-block text-[var(--text-primary)]"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(100%)",
                        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="text-[clamp(2.5rem,8vw,5.5rem)] text-gradient"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(100%)",
                    transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) 500ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) 500ms`,
                  }}
                >
                  Onifade.
                </div>
              </div>
            </h1>

            {/* Role typewriter */}
            <div
              className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-[var(--text-secondary)] mb-6 min-h-[2em] flex items-center"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease 700ms, transform 0.5s ease 700ms",
              }}
            >
              <TypewriterRole />
            </div>

            {/* Positioning statement */}
            <p
              className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-xl mb-10"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease 850ms, transform 0.5s ease 850ms",
              }}
            >
              I build fast, accessible, production-grade web experiences — bridging the gap
              between complex requirements and interfaces people actually want to use.
              Based in <span className="text-[var(--text-primary)] font-medium">Lagos, Nigeria</span>.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease 1000ms, transform 0.5s ease 1000ms",
              }}
            >
              <Link
                href="/work"
                id="hero-cta-work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ember-500 hover:bg-ember-400 text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-ember-glow text-sm"
              >
                View My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <a
                href={`mailto:${personal.email}`}
                id="hero-cta-contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 text-sm"
              >
                Get In Touch
              </a>
              {/* TODO: uncomment when resume PDF is added to /public/resume.pdf */}
              {/* <a href="/resume.pdf" download className="...">Download CV</a> */}
            </div>

            {/* Social quick-links */}
            <div
              className="flex items-center gap-4 mt-10"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.5s ease 1100ms",
              }}
            >
              <span className="text-xs text-[var(--text-muted)] font-mono">Find me at</span>
              <div className="w-8 h-px bg-[var(--border)]" aria-hidden="true" />
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-[var(--text-muted)] hover:text-ember-500 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" />
                </svg>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-[var(--text-muted)] hover:text-ember-500 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — Avatar */}
          <div
            className="hidden lg:flex flex-col items-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 600ms, transform 0.7s ease 600ms",
            }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-ember-500/20 animate-[spin_20s_linear_infinite]" aria-hidden="true" />
              {/* Avatar container */}
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-subtle)] animate-[float_6s_ease-in-out_infinite]">
                <Image
                  src="/images/anjy-avatar.png"
                  alt="Anjolaoluwa Onifade — bitmoji avatar"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="256px"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-full text-xs font-mono text-[var(--text-secondary)] shadow-md">
                🇳🇬 Lagos, Nigeria
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-[240px]">
              {[
                { value: "4+", label: "Years Experience" },
                { value: "40%", label: "Perf. Gains" },
                { value: "99.9%", label: "Uptime Target" },
                { value: "∞", label: "Curiosity" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="card p-4 text-center"
                >
                  <div className="font-display font-bold text-2xl text-ember-500">{value}</div>
                  <div className="text-2xs text-[var(--text-muted)] mt-0.5 font-mono leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.5s ease 1400ms",
        }}
        aria-hidden="true"
      >
        <span className="text-2xs font-mono">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--border)] to-transparent" />
      </div>
    </section>
  );
}
