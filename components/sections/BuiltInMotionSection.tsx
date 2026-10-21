"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavVisibility } from "./NavVisibilityContext";
import { TextScramble } from "../TextScramble";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
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
    demo.mediaFit === "contain" ? "object-contain" : "object-contain md:object-cover";
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

        
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */

function IntroSlide({
  play,
  total,
  scrollProgress,
  reducedMotion,
}: {
  play: boolean;
  total: number;
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const segments = Math.max(total - 1, 1);
  const scale = useTransform(scrollProgress, (progress) =>
    Math.max(0.95, 1 - progress * segments * 0.05),
  );

  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={reducedMotion ? undefined : { scale }}
    >
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-[var(--bg)] px-6 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-[18%] top-[8%] h-[58vw] w-[58vw] rounded-full bg-[rgba(232,98,42,0.16)] blur-[140px]" />
          <div className="absolute -right-[16%] bottom-[-12%] h-[56vw] w-[56vw] rounded-full bg-[rgba(84,132,255,0.14)] blur-[140px]" />
          <div className="absolute left-[32%] top-[32%] h-[36vw] w-[36vw] rounded-full bg-[rgba(31,184,122,0.10)] blur-[130px]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <TextScramble play={play} text="Beyond the Design" duration={1400} className="font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-7xl" />
          <TextScramble play={play} text="Real interactions from products I&apos;ve built." duration={1800} className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl" />
        </div>
      </div>
    </motion.div>
  );
}

export function BuiltInMotionSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const { setHidden } = useNavVisibility();
  const totalSlides = demos.length + 1;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.01 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      setHidden(false);
      setIsSectionVisible(false);
    };
  }, [setHidden]);

  useEffect(() => {
    const segments = Math.max(totalSlides - 1, 1);
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const nextIndex = Math.min(totalSlides - 1, Math.max(0, Math.round(latest * segments)));
      setActiveIndex((previous) => (previous === nextIndex ? previous : nextIndex));
    });
    return unsubscribe;
  }, [scrollYProgress, totalSlides]);

  return (
    <section
      id="built-in-motion"
      ref={containerRef}
      className="relative"
      style={{ height: `${(totalSlides + 1) * 100}vh` }}
      aria-label="Built in Motion"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--bg)]">
        <IntroSlide
          play={isSectionVisible && activeIndex === 0}
          total={totalSlides}
          scrollProgress={scrollYProgress}
          reducedMotion={reducedMotion}
        />
        {demos.map((demo, index) => (
          <StickyVideoSlide
            key={demo.id}
            demo={demo}
            index={index + 1}
            total={totalSlides}
            isActive={activeIndex === index + 1}
            scrollProgress={scrollYProgress}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
}