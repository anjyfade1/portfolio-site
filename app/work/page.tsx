"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { projects, type CaseStudy } from "@/data/portfolio";
import { useSharedTransition } from "@/components/SharedProjectTransition";
import DotPattern from "@/components/ui/dot-pattern";
import SmoothReveal from "@/components/ui/smooth-reveal";

const easeCurve = [0.22, 1, 0.36, 1] as const;

function ProductShowcaseCard({ project }: { project: CaseStudy }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { startTransition } = useSharedTransition();
  const cardRef = useRef<HTMLDivElement>(null);

  const isActive = isHovered || isFocused;

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      startTransition(
        {
          slug: project.slug,
          posterImage: project.posterImage,
          title: project.title,
          sourceRect: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          },
        },
        e
      );
    }
  };

  const imageVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.6, ease: easeCurve },
    },
  };

  const overlayVariants: Variants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.35, ease: easeCurve },
    },
  };

  const titleVariants: Variants = {
    initial: { y: 0 },
    hover: {
      y: 0,
      transition: { duration: 0.35, ease: easeCurve },
    },
  };

  const expandableVariants: Variants = {
    initial: { height: 0, opacity: 0, marginTop: 0 },
    hover: {
      height: "auto",
      opacity: 1,
      marginTop: 12,
      transition: { duration: 0.35, ease: easeCurve },
    },
  };

  return (
    <motion.article
      ref={cardRef}
      initial="initial"
      animate={isActive ? "hover" : "initial"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="group relative rounded-2xl border border-[var(--hairline)] bg-[var(--bg-subtle)] overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/70 hover:-translate-y-1 focus-within:border-[var(--accent)]/70 focus-within:ring-2 focus-within:ring-[var(--accent)]/40 flex flex-col justify-between"
    >
      <Link
        href={`/work/${project.slug}`}
        onClick={handleCardClick}
        className="block relative w-full aspect-[4/3] outline-none"
        aria-label={`Open Case File for ${project.title}`}
      >
        {/* Cover Image */}
        <motion.div
          className="relative w-full h-full overflow-hidden bg-[var(--bg)]"
          style={{ viewTransitionName: `project-hero-${project.slug}` }}
          variants={imageVariants}
        >
          <Image
            src={project.posterImage}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top select-none"
            priority={project.featured}
          />
        </motion.div>

        {/* Light Ambient Dark Gradient at Bottom Edge (Default State) */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Translucent Dark Overlay Revealed on Hover */}
        <motion.div
          variants={overlayVariants}
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/60 to-black/20 pointer-events-none"
        />

        {/* Card Content Overlay (Positioned at Bottom Edge) */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end pointer-events-none">
          <motion.div variants={titleVariants}>
            {/* Optional Tiny FEATURED Badge */}
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold mb-1.5 drop-shadow-sm">
                <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                FEATURED
              </span>
            )}

            <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm">
              {project.title}
            </h2>
            <p className="text-xs text-neutral-300 line-clamp-1 mt-1 font-body leading-relaxed drop-shadow-sm">
              {project.tagline}
            </p>
          </motion.div>

          {/* Tech Stack Pills + CTA (Expand smoothly on hover without taking height in default state) */}
          <motion.div variants={expandableVariants} className="overflow-hidden flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <span key={tech} className="mono-tag text-2xs bg-black/60 border-white/10 text-neutral-200">
                  {tech}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--accent)] tracking-wider uppercase">
              <span>Open Case File</span>
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
                className="group-hover:translate-x-1.5 transition-transform duration-200"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function WorkPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <DotPattern spacing={22} dotSize={1.9} glowRadius={420} className="z-0 text-[var(--accent)]" />
      {/* Page Header (1440px Max Width) */}
      <section className="relative z-10 mx-auto mb-16 max-w-[1440px] px-6 sm:px-8 md:mb-20 lg:px-12">
        <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] mb-6">
          THE ARCHIVE
        </h1>
        <div className="space-y-3 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl font-body">
          <p className="max-w-2xl text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
            A collection of products I&apos;ve designed, built, and shipped across
            fintech, SaaS, e-commerce, internal tools, and marketing websites.
            Some are public, some are private, but every project reflects a
            different challenge.
          </p>
        </div>
      </section>

      {/* Projects Showcase Gallery (1440px Max Width — 4col XL / 3col LG / 2col MD / 1col Mobile) */}
      <main className="relative z-10 mx-auto mb-24 max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <SmoothReveal
              key={project.slug}
              delay={(index % 3) * 0.1}
              duration={0.6}
              distance={24}
            >
              <ProductShowcaseCard project={project} />
            </SmoothReveal>
          ))}
        </div>
      </main>
    </div>
  );
}
