"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface FeatureVideoPlayerProps {
  title: string;
  category: string;
  description: string;
  posterUrl?: string;
  videoUrl: string;
  tags?: string[];
}

export function FeatureVideoPlayer({
  title,
  category,
  description,
  posterUrl,
  videoUrl,
  tags = [],
}: FeatureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current && !hasError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setHasError(true);
          });
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !hasError) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch {
        // Ignore seek errors on unbuffered media
      }
      setIsPlaying(false);
    }
  };

  const handleMobileClick = () => {
    if (videoRef.current && !hasError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setHasError(true));
        }
      }
    }
  };

  const hasPosterImage = Boolean(posterUrl && posterUrl.trim().length > 0);
  const effectiveVideoSrc = hasPosterImage ? videoUrl : `${videoUrl}#t=0.001`;

  return (
    <div
      className="solid-panel overflow-hidden group transition-all duration-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobileClick}
    >
      {/* Video Container Frame */}
      <div className="relative aspect-video w-full bg-[#121110] border-b border-[var(--hairline)] overflow-hidden">
        {/* Preloaded Poster Image (Only rendered if explicit posterUrl provided) */}
        {hasPosterImage && (
          <Image
            src={posterUrl!}
            alt={`${title} feature poster`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Video Stream (Always visible if no poster image overlay) */}
        {!hasError && (
          <video
            ref={videoRef}
            src={effectiveVideoSrc}
            poster={hasPosterImage ? posterUrl : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              hasPosterImage && !isPlaying ? "opacity-0" : "opacity-100"
            }`}
            onError={() => setHasError(true)}
          />
        )}

        {/* Status Indicator Badge Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <span className="font-mono text-2xs uppercase tracking-wider px-2 py-1 bg-[var(--bg)]/90 text-[var(--text-primary)] border border-[var(--hairline)] backdrop-blur-none">
            {isPlaying ? "● PLAYING" : "▶ HOVER TO PLAY"}
          </span>
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="font-mono text-2xs uppercase tracking-wider px-2 py-1 bg-[var(--accent)] text-white font-medium">
            {category}
          </span>
        </div>
      </div>

      {/* Feature Details Content */}
      <div className="p-5 flex flex-col justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150">
            {title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stack Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--hairline)]">
            {tags.map((tag) => (
              <span key={tag} className="mono-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
