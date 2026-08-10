"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { motion, useReducedMotion } from "motion/react";

type MotionDemo = {
  id: string;
  title: string;
  tags: string;
  videoSrc?: string;
  mediaFit?: "cover" | "contain";
  accent: string;
  poster: "search" | "analytics" | "checkout" | "auth" | "responsive" | "publishing";
};

const demos: MotionDemo[] = [
  {
    id: "instant-search",
    title: "Interface Motion",
    tags: "React · GSAP · Matter.js",
    videoSrc: "/images/work-video-1.mp4",
    accent: "rgba(232, 98, 42, 0.42)",
    poster: "search",
  },
  {
    id: "dashboard-analytics",
    title: "Login & Order Flow",
    tags: "Forms · Lead Request",
    videoSrc: "/images/work-video-2.mp4",
    accent: "rgba(84, 132, 255, 0.38)",
    poster: "analytics",
  },
  {
    id: "checkout-flow",
    title: "Lead Filtering & Search",
    tags: "Filters · Data Tables",
    videoSrc: "/images/work-video-3.mp4",
    mediaFit: "contain",
    accent: "rgba(31, 184, 122, 0.34)",
    poster: "checkout",
  },
];

function PosterFrame({ demo, active }: { demo: MotionDemo; active: boolean }) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[1rem] border border-[var(--hairline)] bg-[var(--bg)]"
      style={{
        backgroundImage: `radial-gradient(circle at 18% 12%, ${demo.accent}, transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.07), transparent 42%)`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(var(--text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--text-primary)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] opacity-70" />
          <span className="h-2 w-2 rounded-full bg-[var(--text-primary)] opacity-20" />
          <span className="h-2 w-2 rounded-full bg-[var(--text-primary)] opacity-20" />
        </div>
        <span className="h-2 w-16 rounded-full bg-[var(--text-primary)] opacity-10" />
      </div>

      {demo.poster === "search" && (
        <div className="absolute inset-x-7 top-16 space-y-3">
          <div className="h-10 rounded-full border border-[var(--hairline)] bg-[var(--bg-subtle)] px-4 py-3">
            <div className="h-2 w-2/3 rounded-full bg-[var(--accent)] opacity-60" />
          </div>
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className={`h-12 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] transition-transform duration-700 ${
                active && item === 1 ? "translate-x-3" : ""
              }`}
            />
          ))}
        </div>
      )}

      {demo.poster === "analytics" && (
        <div className="absolute inset-x-7 bottom-8 top-16 grid grid-cols-4 items-end gap-3">
          {[46, 72, 56, 88, 62, 78, 44, 68].map((height, item) => (
            <span
              key={item}
              className="rounded-t-lg bg-[var(--accent)] opacity-50 transition-all duration-700"
              style={{ height: active ? `${Math.min(height + 10, 94)}%` : `${height}%` }}
            />
          ))}
        </div>
      )}

      {demo.poster === "checkout" && (
        <div className="absolute inset-x-7 top-16 grid gap-3">
          <div className="h-14 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)]" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)]" />
            <div className="h-20 rounded-xl border border-[var(--hairline)] bg-[var(--accent)] opacity-30" />
          </div>
          <div className="h-9 rounded-full bg-[var(--accent)] opacity-65" />
        </div>
      )}
    </div>
  );
}

function PreviewSurface({
  demo,
  active,
  reducedMotion,
  videoRef,
}: {
  demo: MotionDemo;
  active: boolean;
  reducedMotion: boolean;
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  const mediaFitClass = demo.mediaFit === "contain" ? "object-contain" : "object-cover";
  const videoSrcWithTime = demo.videoSrc ? `${demo.videoSrc}#t=0.001` : "";

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1rem] bg-[#0d0c0b]">
      {/* Video Thumbnail at Rest (when not active) */}
      {demo.videoSrc && !active && (
        <video
          className={`absolute inset-0 h-full w-full rounded-[1rem] ${mediaFitClass}`}
          src={videoSrcWithTime}
          muted
          playsInline
          preload="metadata"
        />
      )}

      {/* Motion Video playing on Hover / Active */}
      {demo.videoSrc && active && !reducedMotion && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full rounded-[1rem] ${mediaFitClass}`}
          src={demo.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* Fallback Poster Frame if no video source */}
      {!demo.videoSrc && <PosterFrame demo={demo} active={active} />}
    </div>
  );
}

function DemoCard({
  demo,
  active,
  dimmed,
  onActivate,
}: {
  demo: MotionDemo;
  active: boolean;
  dimmed: boolean;
  onActivate: (node: HTMLElement) => void;
}) {
  return (
    <article
      onMouseEnter={(event) => onActivate(event.currentTarget)}
      onPointerEnter={(event) => onActivate(event.currentTarget)}
      onFocus={(event) => onActivate(event.currentTarget)}
      aria-hidden={active}
      className={`group relative flex h-[420px] flex-col overflow-hidden rounded-[1.35rem] border bg-[var(--bg-subtle)] p-4 transition-[border-color,opacity,transform] duration-300 lg:h-[430px] cursor-pointer ${
        active ? "border-[var(--accent)]" : "border-[var(--hairline)]"
      } ${active ? "pointer-events-none opacity-0" : dimmed ? "opacity-90" : "opacity-100"}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
            {demo.title}
          </h3>
          <p className="mt-2 font-mono text-2xs uppercase tracking-wider text-[var(--text-muted)]">
            {demo.tags}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--hairline)] px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-[var(--accent)]">
          {active ? "Live Preview" : "Hover to Preview"}
        </span>
      </div>

      <PreviewSurface
        demo={demo}
        active={false}
        reducedMotion={false}
        videoRef={undefined}
      />

      <div className="mt-4 flex items-center justify-between font-mono text-xs text-[var(--text-secondary)]">
        <span>Hover for Motion</span>
        <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
      </div>

      <div className="mt-3 h-px overflow-hidden bg-[var(--hairline)]">
        <span
          className="block h-full origin-left bg-[var(--accent)]"
          style={{
            transform: active ? "scaleX(1)" : "scaleX(0)",
            transition: active ? "transform 8s linear" : "transform 180ms ease",
          }}
        />
      </div>
    </article>
  );
}

function PreviewOverlay({
  demo,
  rect,
  onClose,
  reducedMotion,
}: {
  demo: MotionDemo;
  rect: CSSProperties;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err: unknown) => {
        if (err instanceof DOMException && err.name !== "AbortError") {
          console.warn("Video playback interrupted", err);
        }
      });
    }
  }, [demo.videoSrc, reducedMotion]);

  return (
    <motion.article
      layout
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
      onPointerLeave={onClose}
      onMouseLeave={onClose}
      className="absolute z-40 flex flex-col overflow-hidden rounded-[1.35rem] border border-[var(--accent)] bg-[var(--bg-subtle)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.25)]"
      style={rect}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
            {demo.title}
          </h3>
          <p className="mt-2 font-mono text-2xs uppercase tracking-wider text-[var(--text-muted)]">
            {demo.tags}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--hairline)] px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-[var(--accent)]">
          Live Preview
        </span>
      </div>

      <PreviewSurface demo={demo} active={true} reducedMotion={reducedMotion} videoRef={videoRef} />
    </motion.article>
  );
}

export function BuiltInMotionSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overlayRect, setOverlayRect] = useState<CSSProperties | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const activeDemo = demos.find((demo) => demo.id === activeId) ?? null;

  const setActiveCard = useCallback(
    (demo: MotionDemo, node: HTMLElement) => {
      const section = sectionRef.current;
      if (!section) return;

      activeCardRef.current = node;
      setActiveId(demo.id);

      const sectionBox = section.getBoundingClientRect();
      const cardBox = node.getBoundingClientRect();
      const gutter = 16;
      const expansion = reducedMotion ? 1 : window.innerWidth >= 1024 ? 1.32 : 1;
      const targetWidth = Math.min(cardBox.width * expansion, sectionBox.width - gutter * 2);
      const targetHeight = reducedMotion
        ? cardBox.height
        : Math.min(cardBox.height * 1.12, sectionBox.height - gutter * 2);
      const cardLeft = cardBox.left - sectionBox.left;
      const cardTop = cardBox.top - sectionBox.top;
      const cardCenter = cardLeft + cardBox.width / 2;
      const preferredLeft =
        cardCenter > sectionBox.width * 0.66
          ? cardLeft + cardBox.width - targetWidth
          : cardCenter < sectionBox.width * 0.34
            ? cardLeft
            : cardLeft - (targetWidth - cardBox.width) / 2;

      setOverlayRect({
        left: Math.max(gutter, Math.min(preferredLeft, sectionBox.width - targetWidth - gutter)),
        top: Math.max(gutter, Math.min(cardTop - (targetHeight - cardBox.height) / 2, sectionBox.height - targetHeight - gutter)),
        width: targetWidth,
        height: targetHeight,
      });
    },
    [reducedMotion],
  );

  useEffect(() => {
    const node = activeCardRef.current;
    const demo = activeDemo;
    if (!node || !demo) return;

    const handleResize = () => setActiveCard(demo, node);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeDemo, setActiveCard]);

  return (
    <section className="section-pad" aria-label="Built in Motion">
      <div className="mx-auto w-[min(90vw,1440px)]">
        <div className="mb-12 max-w-3xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            02 · Built in Motion
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
            Real Frontend
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            Real interactions from products I&apos;ve built.
          </p>
        </div>

        <div
          ref={sectionRef}
          onPointerLeave={() => {
            setActiveId(null);
            setOverlayRect(null);
            activeCardRef.current = null;
          }}
          onMouseLeave={() => {
            setActiveId(null);
            setOverlayRect(null);
            activeCardRef.current = null;
          }}
          className="relative"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {demos.map((demo) => (
              <DemoCard
                key={demo.id}
                demo={demo}
                active={activeId === demo.id}
                dimmed={activeId !== null && activeId !== demo.id}
                onActivate={(node) => setActiveCard(demo, node)}
              />
            ))}
          </div>

          {activeDemo && overlayRect && (
            <PreviewOverlay
              demo={activeDemo}
              rect={overlayRect}
              onClose={() => {
                setActiveId(null);
                setOverlayRect(null);
                activeCardRef.current = null;
              }}
              reducedMotion={reducedMotion}
            />
          )}
        </div>
      </div>
    </section>
  );
}
