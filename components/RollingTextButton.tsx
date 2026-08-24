"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

interface RollingTextButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  id?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

const transitionEase = [0.76, 0, 0.24, 1] as const;

export function RollingTextButton({
  text,
  href,
  onClick,
  className = "",
  id,
  icon,
  variant = "primary",
}: RollingTextButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const characters = Array.from(text);

  const baseStyles =
    "relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-lg hover:shadow-[var(--accent)]/30 px-8 py-4",
    secondary:
      "bg-[var(--bg-subtle)] hover:bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--hairline)] hover:border-[var(--accent)] px-8 py-4",
    outline:
      "bg-transparent hover:bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent)]/40 hover:border-[var(--accent)] px-8 py-4",
  }[variant];

  const content = (
    <>
      {/* Rolling Text Container */}
      <span className="relative inline-flex overflow-hidden py-0.5" aria-label={text}>
        {/* Top Text (Slides up out of view on hover) */}
        <span className="inline-flex" aria-hidden="true">
          {characters.map((char, i) => (
            <motion.span
              key={`top-${i}`}
              className="inline-block"
              initial={false}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { y: isHovered ? "-120%" : "0%" }
              }
              transition={{
                duration: 0.4,
                ease: transitionEase,
                delay: prefersReducedMotion ? 0 : i * 0.012,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>

        {/* Bottom Text (Slides up into view on hover) */}
        <span
          className="absolute inset-0 inline-flex pointer-events-none"
          aria-hidden="true"
        >
          {characters.map((char, i) => (
            <motion.span
              key={`bottom-${i}`}
              className="inline-block"
              initial={false}
              animate={
                prefersReducedMotion
                  ? { opacity: isHovered ? 1 : 0 }
                  : { y: isHovered ? "0%" : "120%" }
              }
              transition={{
                duration: 0.4,
                ease: transitionEase,
                delay: prefersReducedMotion ? 0 : i * 0.012,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </span>

      {/* Optional Rolling Icon */}
      {icon ? (
        <motion.span
          className="relative inline-flex overflow-hidden w-4 h-4"
          initial={false}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: isHovered ? [0, 4, 0] : 0,
                  y: isHovered ? [0, -4, 0] : 0,
                }
          }
          transition={{ duration: 0.35, ease: transitionEase }}
        >
          {icon}
        </motion.span>
      ) : (
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </motion.svg>
      )}
    </>
  );

  if (href) {
    if (href.startsWith("mailto:") || href.startsWith("http")) {
      return (
        <a
          id={id}
          href={href}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          className={`${baseStyles} ${variantStyles} ${className}`}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        id={id}
        href={href}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {content}
    </button>
  );
}
