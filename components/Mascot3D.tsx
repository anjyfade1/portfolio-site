"use client";

import { useState } from "react";
import Image from "next/image";

/** A softly lit 3D mascot whose image edges blend into the page background. */
export function Mascot3D({ size = 280 }: { size?: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      aria-label="AJ Brand Mascot 3D Model"
      role="img"
    >

      <div
        className="relative flex h-full w-full items-center justify-center animate-[float_4s_ease-in-out_infinite]"
        style={{ filter: "drop-shadow(0 20px 24px rgba(0, 0, 0, 0.32))" }}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-500 ${
            isLoaded ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-hidden={isLoaded}
        >
          <svg
            viewBox="0 0 100 100"
            className="h-3/4 w-3/4 animate-pulse text-[var(--accent)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="var(--bg-subtle)" />
            <circle cx="38" cy="45" r="4" fill="currentColor" stroke="none" />
            <circle cx="62" cy="45" r="4" fill="currentColor" stroke="none" />
            <path d="M40 60 Q50 68 60 60" strokeWidth="2.5" />
            <circle cx="50" cy="10" r="3" fill="currentColor" />
            <circle cx="90" cy="50" r="3" fill="currentColor" />
            <circle cx="10" cy="50" r="3" fill="currentColor" />
          </svg>
        </div>

        <Image
          src="/images/mascot-3d.png"
          alt="AJ 3D Mascot"
          fill
          priority
          onLoad={() => setIsLoaded(true)}
          className={`pointer-events-none select-none object-contain transition-all duration-500 ease-out [mask-image:radial-gradient(ellipse_66%_61%_at_50%_47%,black_48%,transparent_76%)] [mask-repeat:no-repeat] [mask-size:100%_100%] ${
            isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          sizes={`${size}px`}
        />
      </div>
    </div>
  );
}