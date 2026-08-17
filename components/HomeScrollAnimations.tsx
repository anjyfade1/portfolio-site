"use client";

import { Children, type ReactNode } from "react";
import {
  ScrollReveal,
  Parallax,
} from "@/components/ScrollAnimations";

/**
 * HomeScrollAnimations
 *
 * Wraps each direct child (section) with scroll-triggered reveal + parallax.
 * Each section gets a staggered entry delay and a subtle parallax depth offset
 * so the page feels alive as the user scrolls.
 *
 * This is a client component boundary — the page.tsx itself stays a server component.
 */

const sectionConfigs = [
  // 03 · Featured Work
  { speed: 0.12, direction: "up" as const, distance: 56, duration: 0.85, delay: 0.05 },
  // 04 · Core Loadout (Liquid Glass Playground)
  { speed: 0, direction: "none" as const, distance: 0, duration: 0.4, delay: 0 },
  // 05 · Contact CTA (Seamlessly attached)
  { speed: 0, direction: "none" as const, distance: 0, duration: 0.4, delay: 0 },
];

export function HomeScrollAnimations({ children }: { children: ReactNode }) {
  const childArray = Children.toArray(children);

  return (
    <>
      {childArray.map((child, index) => {
        const config = sectionConfigs[index] ?? sectionConfigs[0];

        return (
          <Parallax key={index} speed={config.speed}>
            <ScrollReveal
              direction={config.direction}
              distance={config.distance}
              duration={config.duration}
              delay={config.delay}
              margin="0px 0px -100px 0px"
            >
              {child}
            </ScrollReveal>
          </Parallax>
        );
      })}
    </>
  );
}
