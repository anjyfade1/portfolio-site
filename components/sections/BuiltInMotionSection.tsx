"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/* ─── Data ──────────────────────────────────────────────────── */

type MotionDemo = {
  id: string;
  title: string;
  tags: string;
  videoSrc?: string;
  mediaFit?: "cover" | "contain";
  accent: string;
};

const demos: MotionDemo[] = [
  {
    id: "instant-search",
    title: "Interface Motion",
    tags: "React · GSAP · Matter.js",
    videoSrc: "/images/work-video-1.mp4",
    accent: "rgba(232, 98, 42, 0.42)",
  },
  {
    id: "dashboard-analytics",
    title: "Login & Order Flow",
    tags: "Forms · Lead Request",
    videoSrc: "/images/work-video-2.mp4",
    accent: "rgba(84, 132, 255, 0.38)",
  },
  {
    id: "checkout-flow",
    title: "Lead Filtering & Search",
    tags: "Filters · Data Tables",
    videoSrc: "/images/work-video-3.mp4",
    mediaFit: "contain",
    accent: "rgba(31, 184, 122, 0.34)",
  },
];

/* ─── Sticky Video Slide ────────────────────────────────────── */

function StickyVideoSlide({
  demo,
  index,
  total,
  isActive,
  scrollProgress,
  reducedMotion,
}: {
  demo: MotionDemo;
  index: number;
  total: number;
  isActive: boolean;
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const segments = Math.max(total - 1, 1);

  /* ── Scroll-driven transforms ──────────────────────────── */

  // Y: enters from below (+100% → 0%), then stays at 0% while next card covers it
  const y = useTransform(scrollProgress, (p) => {
    const local = p * segments - index;
    if (local < -1) return "100%";
    if (local < 0) return `${-local * 100}%`;
    return "0%";
  });

  // Opacity: fades in during entry, stays fully visible once stacked
  const opacity = useTransform(scrollProgress, (p) => {
    const local = p * segments - index;
    if (local < -1) return 0;
    if (local < -0.6) return (local + 1) / 0.4;
    return 1;
  });

  // Scale: stays 1 while active, subtly shrinks when covered by the next card
  const scale = useTransform(scrollProgress, (p) => {
    const local = p * segments - index;
    if (local <= 0) return 1;
    return Math.max(0.95, 1 - local * 0.05);
  });

  /* ── Play / Pause video ────────────────────────────────── */

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch((err: unknown) => {
          if (err instanceof DOMException && err.name !== "AbortError") {
            console.warn("Video playback interrupted", err);
          }
        });
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  const mediaFitClass =
    demo.mediaFit === "contain" ? "object-contain" : "object-cover";
  const projectNum = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      style={Object.assign(
        { zIndex: index },
        reducedMotion
          ? { opacity: isActive ? 1 : 0 }
          : { y, opacity, scale },
      )}
    >
      {/* Video container */}
      <div
        className="relative flex-1 overflow-hidden rounded-2xl border bg-[#0d0c0b] transition-[border-color,box-shadow] duration-500"
        style={{
          borderColor: isActive ? demo.accent : "var(--hairline)",
          boxShadow: isActive
            ? `0 0 60px ${demo.accent}, 0 24px 80px rgba(0,0,0,0.3)`
            : "none",
        }}
      >
        {demo.videoSrc && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full ${mediaFitClass}`}
            src={`${demo.videoSrc}#t=0.001`}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        {/* Project counter badge */}
        <div className="absolute right-4 top-4 z-10 rounded-full bg-black/50 px-3 py-1.5 font-mono text-xs font-semibold backdrop-blur-sm">
          <span
            className={`transition-colors duration-300 ${
              isActive ? "text-[var(--accent)]" : "text-white/60"
            }`}
          >
            {projectNum}
          </span>
          <span className="text-white/30">
            {" "}
            / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */

export function BuiltInMotionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track which slide is closest to center
  useEffect(() => {
    const segments = Math.max(demos.length - 1, 1);
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(
        demos.length - 1,
        Math.max(0, Math.round(latest * segments)),
      );
      setActiveIndex((prev) => (prev === newIndex ? prev : newIndex));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Tall container: (N + 1) viewports gives ~100vh scroll per transition
  const containerHeight = `${(demos.length + 1) * 100}vh`;

  return (
    <section
      ref={containerRef}
      style={{ height: containerHeight }}
      aria-label="Built in Motion"
    >
      {/* Sticky viewport — pinned while user scrolls through videos */}
      <div className="sticky top-8 flex h-screen flex-col overflow-hidden">
        {/* Section header */}
        <div className="mx-auto w-[min(90vw,960px)] pb-6 pt-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
            Beyond the Design
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            Real interactions from products I&apos;ve built.
          </p>
        </div>

        {/* Video viewport — slides stack here, clipped to this area */}
        <div className="relative mx-auto w-[min(90vw,960px)] flex-1 overflow-hidden rounded-2xl pb-8">
          {demos.map((demo, i) => (
            <StickyVideoSlide
              key={demo.id}
              demo={demo}
              index={i}
              total={demos.length}
              isActive={activeIndex === i}
              scrollProgress={scrollYProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
