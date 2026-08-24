"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useSharedTransition } from "@/components/SharedProjectTransition";

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
  const heroRef = useRef<HTMLDivElement>(null);
  const { registerTargetHero, isTransitioning } = useSharedTransition();

  useEffect(() => {
    // Ensure the case study page always opens instantly at the very top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0 });
    }

    // Register this hero element as the transition target for the shared element animation
    if (heroRef.current) {
      registerTargetHero(slug, heroRef.current);
    }
  }, [slug, registerTargetHero]);

  // During transition, animate the hero to fade out to avoid duplication with the transition overlay
  const initial = prefersReducedMotion
    ? { opacity: isTransitioning ? 0 : 1 }
    : { opacity: isTransitioning ? 0 : 0.85, y: isTransitioning ? 0 : 24, scale: isTransitioning ? 1 : 0.985 };

  const animate = { opacity: isTransitioning ? 0 : 1, y: 0, scale: 1 };

  return (
    <motion.div
      ref={heroRef}
      id={`case-study-hero-${slug}`}
      initial={initial}
      animate={animate}
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
