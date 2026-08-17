"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/* ============================================================
   SCROLL-REVEAL WRAPPER
   Fade + slide children in when they enter the viewport.
   ============================================================ */

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  /** Direction the element slides in from. Default "up". */
  direction?: RevealDirection;
  /** How far (px) the element offsets before entering. Default 48. */
  distance?: number;
  /** Extra delay in seconds. Default 0. */
  delay?: number;
  /** Duration in seconds. Default 0.7. */
  duration?: number;
  /** How much of the element should be visible to trigger. Default "0 0px -60px 0px". */
  margin?: string;
  /** Whether animation should play only once. Default true. */
  once?: boolean;
  /** Additional className on the wrapper. */
  className?: string;
  /** Additional inline style. */
  style?: CSSProperties;
}

const offsetMap: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  direction = "up",
  distance = 48,
  delay = 0,
  duration = 0.7,
  margin = "0px 0px -80px 0px",
  once = true,
  className,
  style,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const dir = offsetMap[direction];

  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 1 }
          : {
              opacity: 0,
              x: dir.x * distance,
              y: dir.y * distance,
            }
      }
      whileInView={
        prefersReduced
          ? { opacity: 1 }
          : {
              opacity: 1,
              x: 0,
              y: 0,
            }
      }
      viewport={{ once, margin }}
      transition={{
        duration: prefersReduced ? 0.01 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   STAGGERED SCROLL-REVEAL CONTAINER + ITEM
   Reveal children one-by-one with staggered timing.
   ============================================================ */

interface StaggerContainerProps {
  children: ReactNode;
  /** Stagger delay between each child in seconds. Default 0.1. */
  stagger?: number;
  /** Base delay before the first child. Default 0. */
  delay?: number;
  /** Viewport margin for trigger. */
  margin?: string;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  delay = 0,
  margin = "0px 0px -80px 0px",
  once = true,
  className,
  style,
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReduced ? 0 : stagger,
            delayChildren: prefersReduced ? 0 : delay,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

export function StaggerItem({
  children,
  direction = "up",
  distance = 36,
  duration = 0.6,
  className,
  style,
}: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  const dir = offsetMap[direction];

  return (
    <motion.div
      variants={{
        hidden: prefersReduced
          ? { opacity: 1 }
          : {
              opacity: 0,
              x: dir.x * distance,
              y: dir.y * distance,
            },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: prefersReduced ? 0.01 : duration,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   PARALLAX WRAPPER
   Shifts children at a different rate than scroll speed,
   creating depth.
   ============================================================ */

interface ParallaxProps {
  children: ReactNode;
  /** Speed multiplier. Positive = moves slower (background feel).
   *  Negative = moves faster (foreground feel). Default 0.15 */
  speed?: number;
  /** Additional className. */
  className?: string;
  /** Additional style. */
  style?: CSSProperties;
}

export function Parallax({
  children,
  speed = 0.15,
  className,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress (0→1) to a Y displacement
  const rawY = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);
  const y: MotionValue<number> = useSpring(rawY, {
    stiffness: 120,
    damping: 30,
    mass: 0.8,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        y: prefersReduced ? 0 : y,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   PARALLAX SECTION
   A full section wrapper that combines scroll-reveal entry
   with parallax depth movement.
   ============================================================ */

interface ParallaxSectionProps {
  children: ReactNode;
  /** Parallax speed. Default 0.1 */
  speed?: number;
  /** Reveal direction. Default "up" */
  direction?: RevealDirection;
  /** Reveal distance in px. Default 60 */
  distance?: number;
  /** Reveal duration in seconds. Default 0.8 */
  duration?: number;
  /** Delay before reveal. Default 0 */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function ParallaxSection({
  children,
  speed = 0.1,
  direction = "up",
  distance = 60,
  duration = 0.8,
  delay = 0,
  className,
  style,
}: ParallaxSectionProps) {
  return (
    <Parallax speed={speed} className={className} style={style}>
      <ScrollReveal
        direction={direction}
        distance={distance}
        duration={duration}
        delay={delay}
      >
        {children}
      </ScrollReveal>
    </Parallax>
  );
}
