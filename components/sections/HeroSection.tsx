"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { personal } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";

const TECH_LOGOS = [
  {
    name: "React",
    x: 6,
    y: 18,
    size: 72,
    color: "#61dafb",
    baseOpacity: 0.07,
    rotate: -15,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="0.8" width="100%" height="100%">
        <ellipse cx="12" cy="12" rx="10.5" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill={c} stroke="none" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    x: 83,
    y: 8,
    size: 64,
    color: "#3178c6",
    baseOpacity: 0.08,
    rotate: 12,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <rect x="2" y="2" width="20" height="20" rx="3" fill={c} opacity="0.9" />
        <text x="4.5" y="17.5" fontFamily="monospace" fontWeight="bold" fontSize="10" fill="white">TS</text>
      </svg>
    ),
  },
  {
    name: "Next.js",
    x: 75,
    y: 68,
    size: 80,
    color: "currentColor",
    baseOpacity: 0.07,
    rotate: 6,
    svg: (_c: string) => (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M8.5 8L15.5 16M13 8h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    x: 20,
    y: 72,
    size: 60,
    color: "#f7df1e",
    baseOpacity: 0.08,
    rotate: -8,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <rect x="2" y="2" width="20" height="20" rx="3" fill={c} opacity="0.9" />
        <text x="4.5" y="17.5" fontFamily="monospace" fontWeight="bold" fontSize="10" fill="#000">JS</text>
      </svg>
    ),
  },
  {
    name: "Tailwind",
    x: 50,
    y: 82,
    size: 68,
    color: "#38bdf8",
    baseOpacity: 0.07,
    rotate: 0,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill={c} width="100%" height="100%">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Git",
    x: 88,
    y: 42,
    size: 56,
    color: "#f05032",
    baseOpacity: 0.07,
    rotate: 20,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill={c} width="100%" height="100%">
        <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.101 1.101l-2.48-2.48v6.508a1.84 1.84 0 1 1-1.512-.036V9.0a1.84 1.84 0 0 1-.998-2.417L7.604 3.826 0.45 10.93a1.55 1.55 0 0 0 0 2.187l10.48 10.478a1.55 1.55 0 0 0 2.186 0l10.43-10.428a1.55 1.55 0 0 0 0-2.187z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    x: 3,
    y: 55,
    size: 52,
    color: "#f24e1e",
    baseOpacity: 0.07,
    rotate: -20,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill={c} width="100%" height="100%">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-20H4C1.792 4 0 5.792 0 8s1.792 4 4 4h4V4zm4 0v8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4zm4 10h-4v4c0 2.208 1.792 4 4 4s4-1.792 4-4-1.792-4-4-4zM8 4H4C1.792 4 0 5.792 0 8s1.792 4 4 4h4V4z" />
      </svg>
    ),
  },
  {
    name: "Redux",
    x: 42,
    y: 5,
    size: 58,
    color: "#764abc",
    baseOpacity: 0.07,
    rotate: 10,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill={c} width="100%" height="100%">
        <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.047-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 0 0-1.648 1.769c.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.005 4.795-1.603.838-3.296 1.154-4.944.93-1.378-.195-2.456-.81-3.116-1.799-.988-1.499-1.078-3.116-.255-4.734.6-1.17 1.499-2.023 2.099-2.443a9.046 9.046 0 0 1-.27-1.662c-4.55 3.313-4.07 7.787-2.712 9.899 1.027 1.559 3.116 2.548 5.409 2.548.63 0 1.26-.075 1.89-.21 4.069-.81 7.157-3.236 8.328-6.844zm2.113-2.443c-2.397-.27-4.306.479-6.001 1.963-.226-.346-.704-.54-1.108-.54-.66 0-1.185.527-1.185 1.185 0 .66.526 1.185 1.185 1.185.646 0 1.154-.509 1.184-1.154 1.41-1.289 3.161-2.038 5.291-1.874 1.544.12 2.818.705 3.627 1.665.63.749.869 1.574.718 2.533-.255 1.574-1.049 2.697-2.382 3.387-1.079.57-2.187.72-3.132.57-.914-.15-1.688-.57-2.187-1.17-.585-.704-.885-1.484-.855-2.277.015-.345-.24-.69-.585-.72-.345-.015-.69.24-.72.585-.045.96.3 2.023 1.005 2.893.705.869 1.739 1.484 2.938 1.679.27.045.54.06.81.06 1.05 0 2.143-.315 3.162-.93 1.574-.975 2.592-2.487 2.907-4.32.33-1.934-.255-3.733-1.72-5.217z" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    x: 62,
    y: 20,
    size: 54,
    color: "#ffca28",
    baseOpacity: 0.08,
    rotate: -10,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill={c} width="100%" height="100%">
        <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.473-14.5a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z" />
      </svg>
    ),
  },
  {
    name: "CSS",
    x: 28,
    y: 10,
    size: 60,
    color: "#264de4",
    baseOpacity: 0.07,
    rotate: 5,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill={c} width="100%" height="100%">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
      </svg>
    ),
  },
  {
    name: "Node",
    x: 10,
    y: 88,
    size: 62,
    color: "#339933",
    baseOpacity: 0.07,
    rotate: 15,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill={c} width="100%" height="100%">
        <path d="M11.998 24a1.36 1.36 0 0 1-.681-.18l-2.164-1.28c-.323-.18-.165-.244-.059-.281.431-.15.518-.184.977-.446.048-.027.112-.017.162.011l1.664 1.004c.061.033.147.033.203 0l6.487-3.747c.061-.036.1-.109.1-.184V8.075c0-.077-.039-.148-.103-.187l-6.483-3.743a.187.187 0 0 0-.202 0L5.417 7.888c-.065.039-.106.112-.106.188v7.491c0 .075.04.148.106.183l1.777 1.027c.964.482 1.555-.085 1.555-.654V8.993c0-.105.084-.186.188-.186h.82c.101 0 .184.082.184.186v7.13c0 1.279-.697 2.015-1.909 2.015-.373 0-.667 0-1.485-.405l-1.703-.979a1.374 1.374 0 0 1-.681-1.188V8.075c0-.49.26-.944.681-1.191l6.487-3.749a1.42 1.42 0 0 1 1.364 0l6.487 3.749c.421.247.682.702.682 1.191v7.491c0 .49-.261.942-.682 1.188l-6.487 3.749a1.37 1.37 0 0 1-.683.181" />
      </svg>
    ),
  },
  {
    name: "Vite",
    x: 78,
    y: 85,
    size: 58,
    color: "#646cff",
    baseOpacity: 0.07,
    rotate: -12,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill={c} width="100%" height="100%">
        <path d="M21.44.904l-9.46 16.95-1.95-5.08 6.04-10.16L21.44.904zM13.59 4.574l-3.79 6.38-1.95-5.07 5.74-1.31zm-5.99 8.3L.56.904l5.1 2.29 3.57 9.32-1.64.36zm-.74 2.65l2.26 5.88-1.55.88-4.93-2.8 4.22-3.96z" />
      </svg>
    ),
  },
];

const ROLES = [
  "Frontend Developer",
  "React Engineer",
  "TypeScript Specialist",
  "UI Performance Nerd",
];

function GlassRevealBg({ theme }: { theme: "dark" | "light" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealLogoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filterId = useId().replace(/:/g, "");

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf: number;
    let hasMoused = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      hasMoused = true;
    };

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.075);
      currentY = lerp(currentY, targetY, 0.075);

      if (revealRef.current && glassRef.current) {
        const revealMask = hasMoused
          ? `radial-gradient(circle 180px at ${currentX}px ${currentY}px, rgba(0,0,0,1) 0, rgba(0,0,0,1) 58%, rgba(0,0,0,0.7) 72%, rgba(0,0,0,0) 84%)`
          : "radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,0) 0, rgba(0,0,0,0) 100%)";
        const glassMask = hasMoused
          ? `radial-gradient(circle 180px at ${currentX}px ${currentY}px, rgba(0,0,0,0) 0, rgba(0,0,0,0) 58%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,1) 84%)`
          : "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))";

        revealRef.current.style.maskImage = revealMask;
        revealRef.current.style.webkitMaskImage = revealMask;
        glassRef.current.style.maskImage = glassMask;
        glassRef.current.style.webkitMaskImage = glassMask;
        revealRef.current.style.opacity = hasMoused ? "1" : "0";
      }

      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        TECH_LOGOS.forEach((logo, index) => {
          const el = revealLogoRefs.current[index];
          if (!el) return;

          const logoX = (logo.x / 100) * rect.width + logo.size / 2;
          const logoY = (logo.y / 100) * rect.height + logo.size / 2;
          const dx = currentX - logoX;
          const dy = currentY - logoY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 180;
          const intensity = hasMoused ? Math.max(0, 1 - dist / radius) : 0;
          const rotateX = (dy / radius) * -6 * intensity;
          const rotateY = (dx / radius) * 6 * intensity;
          const scale = 1 + intensity * 0.06;
          const lift = intensity * -8;

          el.style.transform = [
            `rotate(${logo.rotate}deg)`,
            "perspective(700px)",
            `translate3d(0, ${lift}px, 0)`,
            `rotateX(${rotateX}deg)`,
            `rotateY(${rotateY}deg)`,
            `scale(${scale})`,
          ].join(" ");
        });
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.03"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="14s"
                repeatCount="indefinite"
                values="0.012 0.03;0.01 0.025;0.012 0.03"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0">
        {TECH_LOGOS.map((logo) => (
          <div
            key={logo.name}
            className="absolute"
            style={{
              left: `${logo.x}%`,
              top: `${logo.y}%`,
              width: logo.size,
              height: logo.size,
              opacity: 0.35,
              color: theme === "dark" ? "#fff" : "#000",
              transform: `rotate(${logo.rotate}deg)`,
              filter: `url(#${filterId}) blur(0.6px)`,
            }}
          >
            {logo.svg(logo.color)}
          </div>
        ))}
      </div>

      <div
        ref={revealRef}
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: 0,
        }}
      >
        {TECH_LOGOS.map((logo) => (
          <div
            key={`${logo.name}-clear`}
            ref={(el) => {
              revealLogoRefs.current[TECH_LOGOS.findIndex((item) => item.name === logo.name)] = el;
            }}
            className="absolute"
            style={{
              left: `${logo.x}%`,
              top: `${logo.y}%`,
              width: logo.size,
              height: logo.size,
              opacity: 1,
              color: theme === "dark" ? "#fff" : "#000",
              transform: `rotate(${logo.rotate}deg)`,
              transition: "transform 120ms ease-out",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {logo.svg(logo.color)}
          </div>
        ))}
      </div>

      <div
        ref={glassRef}
        className="absolute inset-0 border"
        style={{
          borderColor: theme === "dark" ? "rgba(255,255,255,0.14)" : "rgba(26,23,20,0.08)",
          background:
            theme === "dark"
              ? "rgba(255,255,255,0.035)"
              : "rgba(255,255,255,0.22)",
          backdropFilter: "blur(8px) saturate(118%)",
          WebkitBackdropFilter: "blur(8px) saturate(118%)",
          boxShadow:
            theme === "dark"
              ? "inset 0 1px 0 rgba(255,255,255,0.10)"
              : "inset 0 1px 0 rgba(255,255,255,0.65)",
          maskImage: "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))",
          WebkitMaskImage: "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 18%, rgba(255,255,255,0.02) 100%)",
          }}
        />
      </div>
    </div>
  );
}

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];
    if (!deleting && displayed === current) {
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
      className="font-mono text-[var(--accent)]"
      aria-label={`Role: ${ROLES[roleIndex]}`}
      aria-live="polite"
    >
      {displayed}
      <span
        className="inline-block w-0.5 h-[1em] bg-[var(--accent)] ml-0.5 align-middle"
        style={{ animation: "blink 1s step-end infinite" }}
        aria-hidden="true"
      />
    </span>
  );
}

export function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const letters = "AJ".split("");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[var(--bg)]"
      aria-label="Hero"
    >
      <GlassRevealBg theme={theme} />

      <div className="container-grid relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">
          <div className="max-w-2xl h-full">
            <p
              className="mb-4 text-xs font-mono uppercase tracking-[0.28em] text-[var(--text-muted)]"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.45s ease 520ms, transform 0.45s ease 520ms",
              }}
            >
              Hi, I&apos;m
            </p>
            <h1 className="font-display font-extrabold tracking-tight leading-[0.98] mb-5">
              <div className="flex" style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}>
                {letters.map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block text-[var(--text-primary)]"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(60%)",
                      transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </h1>

            <div
              className="font-medium mb-8 min-h-[2.4em] flex items-center text-[var(--text-secondary)]"
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease 700ms, transform 0.5s ease 700ms",
              }}
            >
              <TypewriterRole />
            </div>

            <p
              className="max-w-[38rem] mb-16 text-base leading-[1.75] text-[var(--text-muted)] md:text-lg"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease 850ms, transform 0.5s ease 850ms",
              }}
            >
              Solving product problems with thoughtful frontend systems and clean execution,
              turning ideas into experiences people can actually use, trust, and grow
              with.
            </p>

            <div
              className="mt-0"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease 1000ms, transform 0.5s ease 1000ms",
              }}
            >
              <div className="mt-2 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/work"
                  id="hero-cta-work"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-ember-glow"
                >
                  View My Work
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a
                  href={`mailto:${personal.email}`}
                  id="hero-cta-contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--surface)]"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  Get In Touch
                </a>
              </div>

              <div className="mt-10 flex items-center gap-5">
                <span className="text-xs font-mono text-[var(--text-muted)]">Find me at</span>
                <div className="w-8 h-px bg-[var(--border)]" aria-hidden="true" />
                {[
                  {
                    href: personal.github, label: "GitHub",
                    icon: <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" />,
                  },
                  {
                    href: personal.linkedin, label: "LinkedIn",
                    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="hidden lg:flex flex-col items-center gap-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 600ms, transform 0.7s ease 600ms",
            }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full border border-dashed border-[var(--accent)]/20"
                style={{ animation: "spin 20s linear infinite", margin: "-16px" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-full shadow-ember-glow"
                style={{ margin: "-4px" }}
                aria-hidden="true"
              />
              <div
                className="relative w-64 h-64 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--bg-subtle)]"
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                <Image
                  src="/images/anjy-avatar.png"
                  alt="Anjolaoluwa Onifade avatar"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="256px"
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-[240px]">
              {[
                { value: "4+", label: "Years Exp." },
                { value: "40%", label: "Perf. Gains" },
                { value: "99.9%", label: "Uptime" },
                { value: "INF", label: "Curiosity" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="card p-4 text-center"
                >
                  <div className="font-display font-bold text-2xl text-[var(--accent)]">{value}</div>
                  <div className="text-[0.625rem] font-mono mt-0.5 text-[var(--text-muted)]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 1400ms" }}
        aria-hidden="true"
      >
        <span className="text-[0.625rem] font-mono">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--text-muted)]/40 to-transparent" />
      </div>
    </section>
  );
}
