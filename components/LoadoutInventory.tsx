"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import type { IconType } from "react-icons";
import {
  SiBootstrap,
  SiCss,
  SiElementor,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNpm,
  SiNetlify,
  SiNextdotjs,
  SiOkta,
  SiPostman,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiSanity,
  SiRedux,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWordpress,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
export interface LoadoutItem {
  name: string;
  description: string;
  level?: string;
}

interface LoadoutGroup {
  label: string;
  items: LoadoutItem[];
}

interface LoadoutInventoryProps {
  groups: LoadoutGroup[];
}


type TechIcon = { Icon: IconType; color: string };

const techIcons: Record<string, TechIcon> = {
  React: { Icon: SiReact, color: "text-[#61dafb]" },
  TypeScript: { Icon: SiTypescript, color: "text-[#3178c6]" },
  "Next.js": { Icon: SiNextdotjs, color: "text-[var(--text-primary)]" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "text-[#38bdf8]" },
  Bootstrap: { Icon: SiBootstrap, color: "text-[#7952b3]" },
  "JavaScript (ES6+)": { Icon: SiJavascript, color: "text-[#f7df1e]" },
  "Redux Toolkit": { Icon: SiRedux, color: "text-[#764abc]" },
  "React Query": { Icon: SiReactquery, color: "text-[#ff4154]" },
  "RESTful API Integration": { Icon: SiPostman, color: "text-[#ff6c37]" },
  "Sanity CMS": { Icon: SiSanity, color: "text-[#f03e2f]" },
  Firebase: { Icon: SiFirebase, color: "text-[#ffca28]" },
  "Framer Motion": { Icon: SiFramer, color: "text-[#0055ff]" },
  GSAP: { Icon: SiGreensock, color: "text-[#88ce02]" },
  "Radix UI": { Icon: SiRadixui, color: "text-[var(--text-primary)]" },
  CSS: { Icon: SiCss, color: "text-[#1572b6]" },
  WordPress: { Icon: SiWordpress, color: "text-[#21759b]" },
  Elementor: { Icon: SiElementor, color: "text-[#92003b]" },
  "Git / GitHub": { Icon: SiGit, color: "text-[#f05032]" },
  Vite: { Icon: SiVite, color: "text-[#646cff]" },
  npm: { Icon: SiNpm, color: "text-[#cb3837]" },
  Vercel: { Icon: SiVercel, color: "text-[var(--text-primary)]" },
  Netlify: { Icon: SiNetlify, color: "text-[#00c7b7]" },
  "VS Code": { Icon: VscVscode, color: "text-[#007acc]" },
  Jest: { Icon: SiJest, color: "text-[#c21325]" },
  "React Testing Library": { Icon: SiTestinglibrary, color: "text-[#e33332]" },
  "IAM Workflows": { Icon: SiOkta, color: "text-[#007dc1]" },
};
export function LoadoutInventory({ groups }: LoadoutInventoryProps) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const arenaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const items = groups.flatMap((group, groupIndex) =>
    group.items.map((item) => ({ ...item, group: group.label, groupIndex }))
  );

  useEffect(() => {
    if (!inView || !arenaRef.current) return;

    let animationFrame = 0;
    let destroyed = false;
    let cleanup = () => {};

    void import("matter-js").then((Matter) => {
      if (destroyed || !arenaRef.current) return;

      const arena = arenaRef.current;
      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;
      const engine = Engine.create({ gravity: { x: 0, y: 1.05, scale: 0.001 } });
      const bounds = arena.getBoundingClientRect();
      const isCompact = bounds.width < 640;
      const cardWidth = isCompact ? Math.min(152, bounds.width * 0.42) : 176;
      const cardHeight = isCompact ? 86 : 104;
      const wallSize = 44;

      const floor = Bodies.rectangle(bounds.width / 2, bounds.height + wallSize / 2, bounds.width, wallSize, {
        isStatic: true,
        friction: 0.9,
      });
      const ceiling = Bodies.rectangle(bounds.width / 2, -wallSize / 2, bounds.width, wallSize, {
        isStatic: true,
        friction: 0.9,
      });
      const leftWall = Bodies.rectangle(-wallSize / 2, bounds.height / 2, wallSize, bounds.height * 2, {
        isStatic: true,
      });
      const rightWall = Bodies.rectangle(bounds.width + wallSize / 2, bounds.height / 2, wallSize, bounds.height * 2, {
        isStatic: true,
      });
      const bodies = items.map((_, index) => {
        // A deterministic spread gives every card its own meteor-like entry,
        // while staying stable if the section mounts again.
        const spread = ((index * 73 + 19) % 101) / 100;
        const body = Bodies.rectangle(
          cardWidth / 2 + spread * (bounds.width - cardWidth),
          cardHeight / 2 + 8 + ((index * 37) % 150),
          cardWidth,
          cardHeight,
          {
            restitution: 0.36,
            friction: 0.62,
            frictionAir: 0.009,
            density: 0.0025,
            chamfer: { radius: 14 },
          }
        );

        Body.setAngle(body, ((index * 19) % 11 - 5) * 0.045);
        Body.setVelocity(body, {
          x: ((index * 29) % 9 - 4) * 0.42,
          y: 1.1 + ((index * 17) % 5) * 0.18,
        });
        Body.setAngularVelocity(body, ((index * 13) % 7 - 3) * 0.025);
        return body;
      });

      // Keep the playground draggable with a mouse, while preserving normal
      // page scrolling for touch-first devices.
      const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
      const mouse = supportsFinePointer ? Mouse.create(arena) : null;
      const mouseConstraint = mouse
        ? MouseConstraint.create(engine, {
            mouse,
            constraint: {
              stiffness: 0.16,
              damping: 0.08,
              render: { visible: false },
            },
          })
        : null;

      if (mouse) {
        const mouseWheelHandler = (mouse as unknown as { mousewheel?: EventListener }).mousewheel;
        if (mouseWheelHandler) {
          arena.removeEventListener("wheel", mouseWheelHandler);
          arena.removeEventListener("mousewheel", mouseWheelHandler);
          arena.removeEventListener("DOMMouseScroll", mouseWheelHandler);
        }
      }

      Composite.add(engine.world, [
        floor,
        ceiling,
        leftWall,
        rightWall,
        ...bodies,
        ...(mouseConstraint ? [mouseConstraint] : []),
      ]);

      const update = () => {
        Engine.update(engine, 1000 / 60);
        bodies.forEach((body, index) => {
          const card = cardRefs.current[index];
          if (!card) return;

          card.style.opacity = "1";
          card.style.transform = `translate3d(${body.position.x - cardWidth / 2}px, ${body.position.y - cardHeight / 2}px, 0) rotate(${body.angle}rad)`;
        });
        animationFrame = requestAnimationFrame(update);
      };

      update();

      const handleResize = () => {
        const nextBounds = arena.getBoundingClientRect();
        Body.setPosition(floor, { x: nextBounds.width / 2, y: nextBounds.height + wallSize / 2 });
        Body.setPosition(ceiling, { x: nextBounds.width / 2, y: -wallSize / 2 });
        Body.setPosition(leftWall, { x: -wallSize / 2, y: nextBounds.height / 2 });
        Body.setPosition(rightWall, { x: nextBounds.width + wallSize / 2, y: nextBounds.height / 2 });
      };

      window.addEventListener("resize", handleResize);
      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", handleResize);
        if (mouse) Mouse.clearSourceEvents(mouse);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    });

    return () => {
      destroyed = true;
      cleanup();
    };
  }, [inView, items]);

  return (
    <section ref={ref} aria-label="Full loadout inventory">
      <div
        ref={arenaRef}
        role="list"
        className="relative h-[820px] w-full touch-pan-y overflow-hidden md:h-[500px]"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg)] to-transparent" aria-hidden="true" />
        {items.map((item, index) => (
          <div
            key={item.name}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            role="listitem"
            className={`absolute left-0 top-0 flex w-[calc(50%-0.5rem)] flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--hairline)] bg-[var(--bg)]/90 p-3 text-center shadow-lg will-change-transform cursor-grab select-none active:cursor-grabbing md:w-44`}
            style={{ opacity: 0 }}
          >
            {(() => {
                const tech = techIcons[item.name];
                const Icon = tech?.Icon ?? SiCss;
                return <Icon aria-hidden="true" className={`h-7 w-7 ${tech?.color ?? "text-[var(--accent)]"}`} />;
              })()}
              <h3 className="font-mono text-[10px] font-semibold tracking-tight text-[var(--text-primary)]">
                {item.name}
              </h3>
          </div>
        ))}
      </div>
    </section>
  );
}