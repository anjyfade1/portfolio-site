"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { projects, type CaseStudy } from "@/data/portfolio";

const easeCurve = [0.22, 1, 0.36, 1] as const;

function FeaturedMediaPosterCard({ project }: { project: CaseStudy }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isActive = isHovered || isFocused;

  // Staggered Layer Animation Variants
  const containerVariants: Variants = {
    initial: {},
    hover: {},
  };

  const imageVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: { duration: 0.6, ease: easeCurve },
    },
  };

  const overlayVariants: Variants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.4, ease: easeCurve },
    },
  };

  // Single Title Variant: rests at lower position unhovered, moves up when active
  const titleVariants: Variants = {
    initial: { y: prefersReducedMotion ? 0 : 36 },
    hover: {
      y: 0,
      transition: { duration: 0.4, ease: easeCurve, delay: 0.02 },
    },
  };

  const metaVariants: Variants = {
    initial: { y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: easeCurve, delay: 0.08 },
    },
  };

  const stackVariants: Variants = {
    initial: { y: prefersReducedMotion ? 0 : 16, opacity: prefersReducedMotion ? 1 : 0 },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: easeCurve, delay: 0.14 },
    },
  };

  const ctaVariants: Variants = {
    initial: { y: prefersReducedMotion ? 0 : 12, opacity: prefersReducedMotion ? 1 : 0 },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: easeCurve, delay: 0.2 },
    },
  };

  const displayStack = project.stack.slice(0, 3).join(" • ");

  return (
    <motion.article
      initial="initial"
      animate={isActive ? "hover" : "initial"}
      variants={containerVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="group relative rounded-2xl border border-[var(--hairline)] bg-[var(--bg-subtle)] overflow-hidden transition-colors duration-300 hover:border-[var(--accent)]/70 focus-within:border-[var(--accent)]/70 focus-within:ring-2 focus-within:ring-[var(--accent)]/40"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block relative w-full aspect-[16/10] outline-none"
        aria-label={`Open Case File for ${project.title}`}
      >
        {/* Hero Screenshot Image */}
        <motion.div className="relative w-full h-full overflow-hidden" variants={imageVariants}>
          <Image
            src={project.posterImage}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top select-none"
            priority={project.featured}
          />
        </motion.div>

        {/* Ambient Dark Backdrop (Always visible for contrast) */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/90 via-[#0d0c0b]/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Translucent Dark Gradient Overlay (Intensified on Hover/Focus) */}
        <motion.div
          variants={overlayVariants}
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/98 via-[#0d0c0b]/85 to-[#0d0c0b]/25 pointer-events-none"
        />

        {/* Single Content Container */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
          {/* SINGLE Title — Moves smoothly on hover without duplicating */}
          <motion.h3
            variants={titleVariants}
            className="font-display text-xl md:text-2xl font-bold tracking-tight text-white mb-2"
          >
            {project.title}
          </motion.h3>

          {/* Product Category & Year */}
          <motion.div
            variants={metaVariants}
            className="font-mono text-xs text-[var(--text-secondary)] font-medium mb-1.5 flex items-center gap-2"
          >
            <span>{project.productType}</span>
            <span>•</span>
            <span>{project.year}</span>
          </motion.div>

          {/* Tech Stack */}
          <motion.p
            variants={stackVariants}
            className="font-mono text-2xs text-[var(--text-muted)] mb-4"
          >
            {displayStack}
          </motion.p>

          {/* Action CTA */}
          <motion.div
            variants={ctaVariants}
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--accent)] tracking-wider uppercase"
          >
            Open Case File
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}

export function FeaturedWorkSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="section-pad relative overflow-hidden" aria-label="Featured Work">
      <div className="container-grid">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)] block mb-3">
              03 · SHIPPED SYSTEMS
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Products I&apos;ve Built
            </h2>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              A selection of products and platforms I&apos;ve designed and shipped. Every project links to a detailed case study.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-150 shrink-0 self-start md:self-end"
          >
            View All Work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* 3-Col Desktop / 2-Col Tablet / 1-Col Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {featured.map((project) => (
            <FeaturedMediaPosterCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
