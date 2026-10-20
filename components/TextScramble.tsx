"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

const DEFAULT_GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@?/";

type TextScrambleProps = {
  text: string;
  duration?: number;
  glyphs?: string;
  className?: string;
  style?: CSSProperties;
  play?: boolean;
};

export function TextScramble({
  text,
  duration = 1000,
  glyphs = DEFAULT_GLYPHS,
  className,
  style,
  play = true,
}: TextScrambleProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!play || reduce) {
      setDisplay(text);
      return;
    }

    let frame: number;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(
        text
          .split("")
          .map((character, index) => {
            if (character === " " || progress >= 1 || index / text.length < progress) return character;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join(""),
      );
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, glyphs, play, reduce, text]);

  return (
    <span className={className} style={style} aria-label={text}>
      {display}
    </span>
  );
}