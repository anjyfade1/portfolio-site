"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface CarouselItem {
  caption: string;
  imageUrl: string;
}

export function ScreenshotCarousel({
  title,
  items,
  interval = 4000,
}: {
  title: string;
  items: CarouselItem[];
  interval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    if (!items || items.length === 0) return;
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items]);

  const handlePrev = useCallback(() => {
    if (!items || items.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items]);

  // Auto-scroll effect with pause-on-hover
  useEffect(() => {
    if (!items || items.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [items, isPaused, interval, handleNext]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className=" overflow-hidden space-y-3 group/carousel"
    >
      <div className="flex items-center justify-between font-mono text-xs">

        <span className="text-2xs text-[var(--accent)] font-semibold tracking-wider">
          {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative aspect-video w-full rounded-lg border border-[var(--hairline)] overflow-hidden bg-[#0d0c0b]">
        {items.map((item, idx) => (
          <div
            key={item.caption + idx}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === currentIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.caption}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority={idx === 0}
            />
          </div>
        ))}

        {items.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 text-white backdrop-blur-sm border border-white/20 hover:bg-[var(--accent)] transition-colors flex items-center justify-center font-mono text-sm shadow-md"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 text-white backdrop-blur-sm border border-white/20 hover:bg-[var(--accent)] transition-colors flex items-center justify-center font-mono text-sm shadow-md"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between font-mono text-2xs text-[var(--text-muted)] pt-1">
        <span className="truncate pr-2">FIG: {currentItem.caption}</span>
        {items.length > 1 && (
          <div className="flex gap-1.5 flex-shrink-0">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-[var(--accent)] w-4" : "bg-neutral-600 hover:bg-neutral-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
