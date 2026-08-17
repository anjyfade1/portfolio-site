"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSharedTransition } from "./SharedProjectTransition";

interface CaseStudyHeroProps {
  slug: string;
  posterImage: string;
  title: string;
}

export function CaseStudyHeroImage({
  slug,
  posterImage,
  title,
}: CaseStudyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerTargetHero } = useSharedTransition();

  useEffect(() => {
    if (containerRef.current) {
      registerTargetHero(containerRef.current);
    }
  }, [registerTargetHero]);

  return (
    <div
      ref={containerRef}
      id={`case-study-hero-${slug}`}
      style={{
        viewTransitionName: `project-hero-${slug}`,
      }}
      className="relative aspect-video w-full rounded-2xl border border-[var(--hairline)] overflow-hidden bg-[#0d0c0b] shadow-2xl"
    >
      <Image
        src={posterImage}
        alt={`${title} poster`}
        fill
        priority
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover object-top select-none"
      />
    </div>
  );
}

export function CaseStudyContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
