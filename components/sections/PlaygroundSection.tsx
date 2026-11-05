"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
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
  { id: "saitama", name: "Saitama", tooltip: "One Punch Man", brandColor: "#ef4444", glowColor: "rgba(239, 68, 68, 0.42)", size: 48, position: { top: "18%", left: "12%" }, floatX: 6, floatY: 8, floatDuration: 6.5, floatDelay: 0 },
  { id: "genos", name: "Genos", tooltip: "Incinerator Cannons", brandColor: "#f59e0b", glowColor: "rgba(245, 158, 11, 0.42)", size: 42, position: { top: "16%", left: "84%" }, floatX: -5, floatY: 7, floatDuration: 7.2, floatDelay: 1.2 },
  { id: "shinra", name: "Shinra", tooltip: "Fire Force", brandColor: "#fb7185", glowColor: "rgba(251, 113, 133, 0.42)", size: 44, position: { top: "48%", left: "8%" }, floatX: 5, floatY: -6, floatDuration: 6.8, floatDelay: 0.8 },
  { id: "erza", name: "Erza", tooltip: "Fairy Tail", brandColor: "#f43f5e", glowColor: "rgba(244, 63, 94, 0.42)", size: 44, position: { top: "45%", left: "88%" }, floatX: -6, floatY: 8, floatDuration: 7.8, floatDelay: 1.6 },
  { id: "megumi", name: "Megumi", tooltip: "JJK", brandColor: "#64748b", glowColor: "rgba(100, 116, 139, 0.45)", size: 42, position: { top: "78%", left: "14%" }, floatX: 7, floatY: -8, floatDuration: 6.2, floatDelay: 0.4 },
  { id: "tanjiro", name: "Tanjiro", tooltip: "Water-breathing Blade", brandColor: "#38bdf8", glowColor: "rgba(56, 189, 248, 0.42)", size: 42, position: { top: "80%", left: "82%" }, floatX: -6, floatY: -7, floatDuration: 7.4, floatDelay: 2.1 },
  { id: "shadow", name: "Shadow", tooltip: "The Eminence in Shadow", brandColor: "#a78bfa", glowColor: "rgba(167, 139, 250, 0.45)", size: 40, position: { top: "14%", left: "50%" }, floatX: 4, floatY: 6, floatDuration: 8, floatDelay: 1, mobileHidden: true },
  { id: "naruto", name: "Naruto", tooltip: "Glowing blue Rasengan", brandColor: "#60a5fa", glowColor: "rgba(96, 165, 250, 0.45)", size: 40, position: { top: "84%", left: "50%" }, floatX: -5, floatY: 7, floatDuration: 7, floatDelay: 1.8, mobileHidden: true },
  { id: "zoro", name: "Zoro", tooltip: "One Piece", brandColor: "#34d399", glowColor: "rgba(52, 211, 153, 0.42)", size: 40, position: { top: "64%", left: "92%" }, floatX: -4, floatY: -6, floatDuration: 6.6, floatDelay: 2.4, mobileHidden: true },
];
const characterArt: Record<string, string> = {
  saitama: "/images/playground/characters/saitama-chibi.webp",
  genos: "/images/playground/characters/genos-chibi.webp",
  shinra: "/images/playground/characters/shinra-chibi.webp",
  erza: "/images/playground/characters/erza-chibi.webp",
  megumi: "/images/playground/characters/megumi-chibi.webp",
  tanjiro: "/images/playground/characters/tanjiro-chibi.webp",
  shadow: "/images/playground/characters/shadow-chibi.webp",
  naruto: "/images/playground/characters/naruto-chibi.webp",
  zoro: "/images/playground/characters/zoro-chibi.webp",
};

/* ═══════════════════════════════════════════════════════════════
   AUTHENTIC BRAND SVG ICONS
   ═══════════════════════════════════════════════════════════════ */

function BrandLogoIcon({ id, size }: { id: string; size: number }) {
  const common = { width: size, height: size, viewBox: "0 0 32 32", fill: "none" };

  switch (id) {
    case "saitama": return <svg {...common}><path d="M11 27 7 17l2-8 3 1 1-4h6l1 4 3-1 2 8-4 10H11Z" fill="#ef4444"/><path d="M11 16h10M13 20h2m2 0h2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>;
    case "genos": return <svg {...common}><path d="M7 9h18v14H7z" fill="#475569"/><path d="M10 6h4v20h-4zm8 0h4v20h-4z" fill="#94a3b8"/><circle cx="12" cy="16" r="3" fill="#f59e0b"/><circle cx="20" cy="16" r="3" fill="#f59e0b"/><circle cx="12" cy="16" r="1" fill="#fff7ed"/><circle cx="20" cy="16" r="1" fill="#fff7ed"/></svg>;
    case "shinra": return <svg {...common}><path d="M16 3c4 5 7 8 7 14a7 7 0 1 1-14 0c0-4 3-8 7-14Z" fill="#fb7185"/><path d="M16 10c2.5 3 3.5 5 3.5 7.2a3.5 3.5 0 1 1-7 0c0-1.8 1-4.2 3.5-7.2Z" fill="#fef3c7"/><path d="m8 24 3-5m10 5-3-5" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round"/></svg>;
    case "erza": return <svg {...common}><circle cx="16" cy="16" r="5" fill="#f43f5e"/><g stroke="#fecdd3" strokeWidth="2.5" strokeLinecap="round"><path d="M16 3v9M16 20v9M3 16h9m8 0h9M6.8 6.8l6.3 6.3m5.8 5.8 6.3 6.3M25.2 6.8l-6.3 6.3m-5.8 5.8-6.3 6.3"/></g></svg>;
    case "megumi": return <svg {...common}><path d="M5 23c2-8 4-13 8-13l3 3 3-3c4 0 6 5 8 13l-5-2-3 5h-6l-3-5-5 2Z" fill="#64748b"/><path d="M12 16h.01M20 16h.01" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round"/><path d="M14 21h4" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case "tanjiro": return <svg {...common}><path d="M7 25 25 7" stroke="#1f2937" strokeWidth="4" strokeLinecap="round"/><path d="m6 26 4-1-3-3-1 4Z" fill="#f43f5e"/><path d="M8 12c5-6 11-6 16-2-4 0-6 2-8 5-2 3-5 4-9 3 3-1 4-3 1-6Z" fill="#38bdf8" opacity=".9"/></svg>;
    case "shadow": return <svg {...common}><path d="M7 25 24 8" stroke="#d8b4fe" strokeWidth="3" strokeLinecap="round"/><path d="M5 27c2-8 8-16 18-21-3 7-2 13 4 18-8 2-14 3-22 3Z" fill="#7c3aed" opacity=".65"/><circle cx="23" cy="9" r="3" fill="#c4b5fd"/></svg>;
    case "naruto": return <svg {...common}><circle cx="16" cy="16" r="11" fill="#38bdf8" opacity=".28"/><path d="M7 16c4-7 14-7 18 0-4 7-14 7-18 0Zm4 0c2-3 8-3 10 0-2 3-8 3-10 0Z" stroke="#7dd3fc" strokeWidth="2"/><path d="M16 6c3 4 3 16 0 20M6 16c4 3 16 3 20 0" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case "zoro": return <svg {...common}><g stroke="#34d399" strokeWidth="3" strokeLinecap="round"><path d="M6 25 25 6M5 17 21 8M11 27 27 11"/></g><g stroke="#ecfdf5" strokeWidth="1.3"><path d="m8 23 3 3m8-18 3 3m-14 4 3 3"/></g></svg>;
    default: return null;
  }
}
/* Suspended anime and manga motif
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

const QUOTES = [
  {
    words: ["\"There", "is", "no", "mountain", "anywhere;", "every", "man's", "ignorance", "is", "his", "mountain\""],
    attribution: "Bishop David Oyedepo",
  },
  {
    words: ["\"A", "man", "who", "is", "moved", "from", "within", "cannot", "be", "stopped", "from", "outside", "except", "he", "stops", "himself", "from", "within.\""],
    attribution: "Mr Richard (GNCC)",
  },
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
  const activeCharacterArt = activeTech ? characterArt[activeTech] : null;
  const [quoteIndex, setQuoteIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);

  // Pick once per home-page visit, then keep the quote stable while scrolling.
  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));
  }, []);

  const quote = QUOTES[quoteIndex];

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
      aria-label="Philosophy and anime interests"
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
      {/* Character collectible revealed by the active floating token */}
      <AnimatePresence mode="wait">
        {activeCharacterArt && activeTech && (
          <motion.div
            key={activeTech}
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-full overflow-hidden"
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            animate={{ opacity: 0.34, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 right-0 w-full sm:w-[62%]">
              <Image
                src={activeCharacterArt}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 62vw"
                className="object-contain object-right"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 mx-auto max-w-3xl lg:max-w-4xl px-6 sm:px-8 text-center pointer-events-none select-none">
        <h2 className="font-display font-medium sm:font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] tracking-tight leading-[1.35] sm:leading-[1.28] flex flex-wrap justify-center gap-x-[0.32em] gap-y-[0.12em]">
          {quote.words.map((word, i) => {
            const start = (i / quote.words.length) * 0.78;
            const end = start + 0.78 / quote.words.length;
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
          {quote.attribution}
        </motion.p>
      </div>

      {/* ── SUSPENDED ANIME COLLECTIBLES FLOATING IN GLASS ── */}
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
