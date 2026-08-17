"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mascot3D Component
 * An original 3D mascot for AJ — minimal, iconic, friendly, and recognizable.
 * Rendered with tactile 3D mouse interaction (Apple Vision Pro style):
 * - Mouse X/Y rotation (±15deg max)
 * - Z-depth translation (+16px on hover)
 * - Dynamic specular lighting position calculated from cursor
 * - Subtle idle breathing animation when idle
 */
export function Mascot3D({ size = 280 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let targetRotX = 0;
    let targetRotY = 0;
    let targetZ = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let currentZ = 0;
    let lightX = 50;
    let lightY = 50;
    let rafId: number;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      // Calculate tilt angles relative to center (-0.5 to 0.5)
      const normX = relativeX / rect.width - 0.5;
      const normY = relativeY / rect.height - 0.5;

      targetRotY = normX * 24; // Y rotation (tilt left/right)
      targetRotX = -normY * 24; // X rotation (tilt up/down)
      targetZ = 16; // Z depth lift

      // Light source moves relative to cursor
      lightX = (relativeX / rect.width) * 100;
      lightY = (relativeY / rect.height) * 100;
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
      setIsHovered(false);
      targetRotX = 0;
      targetRotY = 0;
      targetZ = 0;
      lightX = 50;
      lightY = 50;
    };

    const animate = () => {
      // Lerp smooth movement
      currentRotX = lerp(currentRotX, targetRotX, 0.08);
      currentRotY = lerp(currentRotY, targetRotY, 0.08);
      currentZ = lerp(currentZ, targetZ, 0.08);

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(
          2
        )}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(${currentZ.toFixed(
          1
        )}px)`;
      }

      if (lightRef.current) {
        lightRef.current.style.background = `radial-gradient(circle 140px at ${lightX}% ${lightY}%, rgba(232, 90, 36, 0.18) 0%, transparent 80%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center cursor-pointer select-none"
      style={{ width: size, height: size }}
      aria-label="AJ Brand Mascot 3D Model"
      role="img"
    >
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-2xl solid-panel p-6 flex flex-col items-center justify-center transition-shadow duration-300"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px var(--accent)"
            : "0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px var(--hairline)",
        }}
      >
        {/* Dynamic Specular Light Overlay */}
        <div
          ref={lightRef}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0.4 }}
        />

        {/* 3D Mascot Graphic Representation (Geometric Vector Mark) */}
        <div
          className="relative flex flex-col items-center justify-center gap-4 transition-transform duration-300"
          style={{
            transform: "translateZ(30px)",
            animation: isHovered ? "none" : "float 4s ease-in-out infinite",
          }}
        >
          {/* Iconic AJ Mascot Emblem — High Precision Geometry */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Outer Hex Shield Frame */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[var(--accent)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Geometric Mascot Head Shape */}
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="var(--bg-subtle)" />
              {/* Mascot Face & Eyes */}
              <circle cx="38" cy="45" r="4" fill="currentColor" stroke="none" />
              <circle cx="62" cy="45" r="4" fill="currentColor" stroke="none" />
              {/* Mascot Friendly Smile Line */}
              <path d="M40 60 Q50 68 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" />
              {/* Engineering Node Accents */}
              <circle cx="50" cy="10" r="3" fill="currentColor" />
              <circle cx="90" cy="50" r="3" fill="currentColor" />
              <circle cx="10" cy="50" r="3" fill="currentColor" />
            </svg>
          </div>

          {/* Label Badge */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="font-display font-bold text-lg text-[var(--text-primary)]">
              AJ MASCOT
            </span>
          </div>
        </div>

        {/* Corner Alignment Crosshairs (Japanese UI / CAD style) */}
        <span className="absolute top-2 left-2 font-mono text-2xs text-[var(--text-muted)] pointer-events-none">
          +
        </span>
        <span className="absolute top-2 right-2 font-mono text-2xs text-[var(--text-muted)] pointer-events-none">
          +
        </span>
        <span className="absolute bottom-2 left-2 font-mono text-2xs text-[var(--text-muted)] pointer-events-none">
          +
        </span>
        <span className="absolute bottom-2 right-2 font-mono text-2xs text-[var(--text-muted)] pointer-events-none">
          +
        </span>
      </div>
    </div>
  );
}
