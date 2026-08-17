"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTheme } from "../ThemeProvider";

/* ═══════════════════════════════════════════════════════════════
   TECH LOGO DATA & BRAND IDENTITIES
   ═══════════════════════════════════════════════════════════════ */

type TechItem = {
  id: string;
  name: string;
  tooltip: string;
  brandColor: string;
  glowColor: string;
  size: number;
  position: { top: string; left: string };
  floatX: number;
  floatY: number;
  floatDuration: number;
  floatDelay: number;
  mobileHidden?: boolean;
};

const techs: TechItem[] = [
  {
    id: "react",
    name: "React",
    tooltip: "Frontend architecture & UI",
    brandColor: "#61DAFB",
    glowColor: "rgba(97, 218, 251, 0.4)",
    size: 46,
    position: { top: "18%", left: "12%" },
    floatX: 6,
    floatY: 8,
    floatDuration: 6.5,
    floatDelay: 0,
  },
  {
    id: "typescript",
    name: "TypeScript",
    tooltip: "Type-safe application logic",
    brandColor: "#3178C6",
    glowColor: "rgba(49, 120, 198, 0.4)",
    size: 40,
    position: { top: "16%", left: "84%" },
    floatX: -5,
    floatY: 7,
    floatDuration: 7.2,
    floatDelay: 1.2,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    tooltip: "Responsive UI & styling",
    brandColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    size: 44,
    position: { top: "48%", left: "8%" },
    floatX: 5,
    floatY: -6,
    floatDuration: 6.8,
    floatDelay: 0.8,
  },
  {
    id: "nextjs",
    name: "Next.js",
    tooltip: "React framework & production apps",
    brandColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.35)",
    size: 42,
    position: { top: "45%", left: "88%" },
    floatX: -6,
    floatY: 8,
    floatDuration: 7.8,
    floatDelay: 1.6,
  },
  {
    id: "gsap",
    name: "GSAP",
    tooltip: "Scroll interactions & animation",
    brandColor: "#0AE448",
    glowColor: "rgba(10, 228, 72, 0.4)",
    size: 42,
    position: { top: "78%", left: "14%" },
    floatX: 7,
    floatY: -8,
    floatDuration: 6.2,
    floatDelay: 0.4,
  },
  {
    id: "react-query",
    name: "React Query",
    tooltip: "Server state & API data",
    brandColor: "#FF4154",
    glowColor: "rgba(255, 65, 84, 0.4)",
    size: 40,
    position: { top: "80%", left: "82%" },
    floatX: -6,
    floatY: -7,
    floatDuration: 7.4,
    floatDelay: 2.1,
  },
  {
    id: "recharts",
    name: "Recharts",
    tooltip: "Dashboard data visualization",
    brandColor: "#22C55E",
    glowColor: "rgba(34, 197, 94, 0.4)",
    size: 38,
    position: { top: "14%", left: "50%" },
    floatX: 4,
    floatY: 6,
    floatDuration: 8.0,
    floatDelay: 1.0,
    mobileHidden: true,
  },
  {
    id: "chakra",
    name: "Chakra UI",
    tooltip: "Component systems & UI",
    brandColor: "#319795",
    glowColor: "rgba(49, 151, 149, 0.4)",
    size: 38,
    position: { top: "84%", left: "50%" },
    floatX: -5,
    floatY: 7,
    floatDuration: 7.0,
    floatDelay: 1.8,
    mobileHidden: true,
  },
  {
    id: "git",
    name: "Git",
    tooltip: "Version control & workflows",
    brandColor: "#F05032",
    glowColor: "rgba(240, 80, 50, 0.4)",
    size: 38,
    position: { top: "64%", left: "92%" },
    floatX: -4,
    floatY: -6,
    floatDuration: 6.6,
    floatDelay: 2.4,
    mobileHidden: true,
  },
];

/* ═══════════════════════════════════════════════════════════════
   AUTHENTIC BRAND SVG ICONS
   ═══════════════════════════════════════════════════════════════ */

function BrandLogoIcon({ id, size }: { id: string; size: number }) {
  switch (id) {
    case "react":
      return (
        <svg width={size} height={size} viewBox="-11.5 -11.5 23 23" fill="none">
          <circle r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1.1" fill="none">
            <ellipse rx="10.5" ry="4.3" />
            <ellipse rx="10.5" ry="4.3" transform="rotate(60)" />
            <ellipse rx="10.5" ry="4.3" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "typescript":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4.5" fill="#3178C6" />
          <path
            d="M5 9h6v2.2H8.8V19H6.8V11.2H5V9zm7.2 4.9c.7-.6 1.7-1 2.8-1 1.2 0 2 .5 2 1.4 0 .9-.7 1.4-1.9 1.8l-.8.3c-1.6.5-2.5 1.4-2.5 2.7 0 1.9 1.5 3.1 3.7 3.1 1.4 0 2.5-.4 3.2-1l-.6-1.7c-.6.5-1.5.9-2.5.9-1.2 0-1.8-.5-1.8-1.3 0-.8.6-1.3 1.8-1.7l.8-.3c1.8-.6 2.6-1.5 2.6-2.8 0-1.9-1.4-3-3.5-3-1.3 0-2.3.4-3 .9l.7 1.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "tailwind":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.046 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.955 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.557 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.955 12 6.001 12z"
            fill="#38BDF8"
          />
        </svg>
      );

    case "nextjs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#000000" stroke="#444444" strokeWidth="1" />
          <path
            d="M15.4 16.5L9 8.2V16h1.8v-5.4l5.3 6.8c.4-.3.7-.6 1-.9h-.7z"
            fill="#FFFFFF"
          />
          <rect x="14.8" y="8" width="1.8" height="5.5" fill="#FFFFFF" />
        </svg>
      );

    case "gsap":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="5" fill="#111827" stroke="#0AE448" strokeWidth="1.2" />
          <path
            d="M10 8H6a2 2 0 00-2 2v4a2 2 0 002 2h4v-3H7.5v-2H10V8zm8 2.5c0-.8-.7-1.5-1.5-1.5h-3v3h2.5v1H13.5v2H17a1.5 1.5 0 001.5-1.5v-3z"
            fill="#0AE448"
          />
        </svg>
      );

    case "react-query":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#1C1917" stroke="#FF4154" strokeWidth="1" />
          <circle cx="12" cy="6" r="2.8" fill="#FF4154" />
          <circle cx="17.2" cy="9" r="2.8" fill="#FFB020" />
          <circle cx="17.2" cy="15" r="2.8" fill="#00D8FF" />
          <circle cx="12" cy="18" r="2.8" fill="#FF4154" />
          <circle cx="6.8" cy="15" r="2.8" fill="#FFB020" />
          <circle cx="6.8" cy="9" r="2.8" fill="#00D8FF" />
          <circle cx="12" cy="12" r="1.8" fill="#FFFFFF" />
        </svg>
      );

    case "recharts":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0F172A" />
          <rect x="4" y="14" width="3.5" height="6" rx="1" fill="#38BDF8" />
          <rect x="9.5" y="9" width="3.5" height="11" rx="1" fill="#22C55E" />
          <rect x="15" y="4" width="3.5" height="16" rx="1" fill="#F59E0B" />
          <path d="M4 12L10.5 7L16 3" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "chakra":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#1D283A" stroke="#319795" strokeWidth="1" />
          <path
            d="M12 5.5l5.2 9.2h-3.4l-1.8-3.4-1.8 3.4H7L12 5.5z"
            fill="#319795"
          />
          <circle cx="12" cy="16.8" r="1.4" fill="#4FD1C5" />
        </svg>
      );

    case "git":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.6 2.6c.6-.2 1.4-.1 1.9.4.5.5.7 1.3.4 1.9l2.5 2.5c.6-.2 1.4-.1 1.9.4.7.7.7 1.9 0 2.6s-1.9.7-2.6 0c-.6-.6-.7-1.4-.3-2.1L12.7 10v4.8c.2.1.4.3.6.5.7.7.7 1.9 0 2.6s-1.9.7-2.6 0-1.9-.7 0-2.6c.2-.2.5-.4.8-.5V9.7c-.3-.1-.6-.3-.8-.5-.6-.6-.7-1.4-.3-2.1L7.8 4.5 2.4 9.9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.5.6-1.4 0-2z"
            fill="#F05032"
          />
        </svg>
      );

    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════════════════
   SUSPENDED LIQUID-GLASS FLOATING LOGO
   ═══════════════════════════════════════════════════════════════ */

function SuspendedLogo({
  tech,
  isActive,
  onActivate,
  onDeactivate,
  reducedMotion,
  isDark,
}: {
  tech: TechItem;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  reducedMotion: boolean;
  isDark: boolean;
}) {
  return (
    <div
      className={`absolute z-20 select-none ${
        tech.mobileHidden ? "hidden sm:block" : ""
      }`}
      style={{
        top: tech.position.top,
        left: tech.position.left,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Organic Suspended Floating Movement */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, tech.floatX, 0, -tech.floatX, 0],
                y: [0, -tech.floatY, 0, tech.floatY, 0],
              }
        }
        transition={{
          duration: tech.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: tech.floatDelay,
        }}
      >
        {/* Interactive Surface & Hover Target */}
        <div
          className="relative cursor-pointer p-3 outline-none"
          onMouseEnter={onActivate}
          onMouseLeave={onDeactivate}
          onFocus={onActivate}
          onBlur={onDeactivate}
          onClick={(e) => {
            e.stopPropagation();
            isActive ? onDeactivate() : onActivate();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              isActive ? onDeactivate() : onActivate();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`${tech.name}: ${tech.tooltip}`}
        >
          {/* Subtle Refractive Glass Glow around logo when active */}
          <div
            className="pointer-events-none absolute inset-0 -m-2 rounded-full transition-all duration-500 ease-out"
            style={{
              background: isActive
                ? `radial-gradient(circle, ${tech.glowColor} 0%, rgba(255,255,255,0.06) 45%, transparent 70%)`
                : "transparent",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1.4)" : "scale(0.8)",
              filter: "blur(6px)",
            }}
          />

          {/* Logo element — suspended in clean glass, emerging forward on hover */}
          <div
            className="relative flex items-center justify-center transition-all duration-500 ease-out"
            style={{
              transform: isActive
                ? "translateY(-6px) scale(1.18)"
                : "translateY(0) scale(1)",
              filter: isActive
                ? `blur(0px) brightness(1.2) drop-shadow(0 8px 16px ${tech.glowColor})`
                : "blur(0.8px) brightness(0.92) drop-shadow(0 4px 10px rgba(0,0,0,0.35))",
              opacity: isActive ? 1 : 0.72,
            }}
          >
            <BrandLogoIcon id={tech.id} size={tech.size} />
          </div>

          {/* Technical annotation tooltip */}
          <div
            className="pointer-events-none absolute left-1/2 z-30 whitespace-nowrap"
            style={{
              top: "100%",
              marginTop: "6px",
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "translateX(-50%) translateY(0px)"
                : "translateX(-50%) translateY(-6px)",
              transition: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              className="flex flex-col items-center rounded-xl px-3.5 py-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
              style={{
                backgroundColor: isDark
                  ? "rgba(20,17,14,0.85)"
                  : "rgba(250,248,244,0.92)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.12)"
                  : "1px solid rgba(26,23,20,0.10)",
                backdropFilter: "blur(20px) saturate(170%)",
                WebkitBackdropFilter: "blur(20px) saturate(170%)",
              }}
            >
              <span
                className="font-mono text-[0.7rem] font-bold leading-tight"
                style={{ color: tech.brandColor }}
              >
                {tech.name}
              </span>
              <span className="font-mono text-[0.62rem] text-[var(--text-secondary)] leading-tight mt-0.5">
                {tech.tooltip}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATIONARY PROGRESSIVE SCROLL-REVEAL WORD
   ═══════════════════════════════════════════════════════════════ */

const QUOTE_WORDS = [
  "\"There",
  "is",
  "no",
  "mountain",
  "anywhere;",
  "every",
  "man's",
  "ignorance",
  "is",
  "his",
  "mountain\"",
];

function ScrollWord({
  word,
  range,
  progress,
  isDark,
  reducedMotion,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  isDark: boolean;
  reducedMotion: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(
    progress,
    range,
    [
      isDark ? "rgba(255, 255, 255, 0.22)" : "rgba(26, 23, 20, 0.22)",
      isDark ? "#ffffff" : "#1a1714",
    ]
  );

  if (reducedMotion) {
    return <span className="inline-block text-[var(--text-primary)]">{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-75"
    >
      {word}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FULL-SPAN LIQUID GLASS SECTION WITH CENTER QUOTE & EFFECT
   ═══════════════════════════════════════════════════════════════ */

export function PlaygroundSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress across the section for word-by-word reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 82%", "center 45%"],
  });

  // Attribution reveals smoothly after the main quote is mostly/fully revealed
  const attributionOpacity = useTransform(
    scrollYProgress,
    [0.75, 0.96],
    [0, 1]
  );

  // Interactive spotlight cursor coordinates
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const glassStyle = {
    backgroundColor: isDark
      ? "rgba(20,17,14,0.72)"
      : "rgba(250,248,244,0.74)",
    backdropFilter: "blur(20px) saturate(170%)",
    WebkitBackdropFilter: "blur(20px) saturate(170%)",
    boxShadow: isDark
      ? "0 20px 45px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.08)"
      : "0 20px 45px rgba(26,23,20,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveTech(null);
      }}
      onClick={() => setActiveTech(null)}
      className="relative isolate w-full min-h-[540px] sm:min-h-[600px] md:min-h-[680px] flex items-center justify-center overflow-hidden my-0 transition-all duration-500"
      aria-label="Philosophy and Tech Loadout Surface"
      style={glassStyle}
    >
      {/* ── Interactive Cursor Spotlight Light Sheen ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: isHovered ? 1 : 0.35,
          background: `radial-gradient(circle 380px at ${mousePos.x}% ${mousePos.y}%, ${
            isDark
              ? "rgba(232, 98, 42, 0.14)"
              : "rgba(232, 98, 42, 0.08)"
          } 0%, rgba(255,255,255,0.02) 45%, transparent 75%)`,
        }}
      />

      {/* ── Ambient Fluid Liquid Drift ── */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                x: ["-6%", "6%", "-3%", "-6%"],
                y: ["-4%", "4%", "-5%", "-4%"],
                opacity: [0.25, 0.4, 0.22, 0.25],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -inset-[15%] z-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 25%, ${
              isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(232, 90, 36, 0.05)"
            } 0%, transparent 55%),
            radial-gradient(ellipse at 70% 75%, ${
              isDark ? "rgba(232, 98, 42, 0.08)" : "rgba(0, 0, 0, 0.03)"
            } 0%, transparent 60%)
          `,
          filter: "blur(40px)",
        }}
      />

      {/* ── Gentle Diagonal Optical Glare ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-45"
        style={{
          background:
            "linear-gradient(125deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.03) 80%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      {/* ── CENTER STATIONARY PROGRESSIVE SCROLL-REVEAL QUOTE ── */}
      <div className="relative z-10 mx-auto max-w-3xl lg:max-w-4xl px-6 sm:px-8 text-center pointer-events-none select-none">
        <h2 className="font-display font-medium sm:font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] tracking-tight leading-[1.35] sm:leading-[1.28] flex flex-wrap justify-center gap-x-[0.32em] gap-y-[0.12em]">
          {QUOTE_WORDS.map((word, i) => {
            const start = (i / QUOTE_WORDS.length) * 0.78;
            const end = start + 0.78 / QUOTE_WORDS.length;
            return (
              <ScrollWord
                key={`${word}-${i}`}
                word={word}
                range={[start, end]}
                progress={scrollYProgress}
                isDark={isDark}
                reducedMotion={reducedMotion}
              />
            );
          })}
        </h2>

        {/* Attribution fading in after the quote is revealed */}
        <motion.p
          style={reducedMotion ? {} : { opacity: attributionOpacity }}
          className="mt-6 md:mt-8 font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--accent)] font-medium"
        >
          — Bishop David Oyedepo
        </motion.p>
      </div>

      {/* ── SUSPENDED BRAND TECH ICONS FLOATING IN GLASS ── */}
      {techs.map((tech) => (
        <SuspendedLogo
          key={tech.id}
          tech={tech}
          isActive={activeTech === tech.id}
          onActivate={() => setActiveTech(tech.id)}
          onDeactivate={() => setActiveTech(null)}
          reducedMotion={reducedMotion}
          isDark={isDark}
        />
      ))}
    </section>
  );
}
