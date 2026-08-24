"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface CaseStudyHeroProps {
  slug: string;
  posterImage: string;
  title: string;
}

const cinematicEase = [0.16, 1, 0.3, 1] as const;

export function CaseStudyHeroImage({
  slug,
  posterImage,
  title,
}: CaseStudyHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Ensure the case study page always opens instantly at the very top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  return (
    <motion.div
      id={`case-study-hero-${slug}`}
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0.85, y: 24, scale: 0.985 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: cinematicEase }}
      className="relative aspect-video w-full rounded-2xl border border-[var(--hairline)] overflow-hidden bg-[#0d0c0b] shadow-2xl origin-center will-change-transform"
    >
      <Image
        src={posterImage}
        alt={`${title} poster`}
        fill
        priority
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover object-top select-none"
      />
    </motion.div>
  );
}

export function CaseStudyContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: cinematicEase, delay: 0.08 }}
    >
      {children}
    </motion.div>
  );
}
