"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

const setLayerRef =
  (layers: MutableRefObject<HTMLDivElement[]>, index: number) =>
  (node: HTMLDivElement | null) => {
    if (node) {
      layers.current[index] = node;
    }
  };

export function ArcAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const depths = [8, 14, 22, 30];

    const handlePointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      layersRef.current.forEach((layer, index) => {
        const depth = depths[index] ?? 10;
        layer.style.transform = `translate3d(${currentX * depth}px, ${
          currentY * depth
        }px, 0)`;
      });

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={setLayerRef(layersRef, 0)}
        className="absolute inset-[-12%] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage:
            "radial-gradient(circle at 48% 46%, black 0%, transparent 78%)",
        }}
      />

      <div
        ref={setLayerRef(layersRef, 1)}
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      <div
        ref={setLayerRef(layersRef, 2)}
        className="absolute right-[-10%] top-[6%] h-[560px] w-[560px] rounded-full opacity-70 blur-3xl lg:right-[4%] lg:top-[12%]"
        style={{
          background:
            "radial-gradient(circle, rgba(232, 98, 42, 0.24) 0%, rgba(232, 98, 42, 0.08) 34%, transparent 68%)",
        }}
      />

      <div ref={setLayerRef(layersRef, 3)} className="absolute inset-[-8%]">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 760"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M164 686C294 382 548 158 928 70"
            stroke="var(--text-primary)"
            strokeOpacity="0.075"
            strokeWidth="1.2"
          />
          <path
            d="M48 560C258 300 604 164 1142 154"
            stroke="var(--accent)"
            strokeOpacity="0.09"
            strokeWidth="1"
          />
          <path
            d="M322 742C460 438 704 238 1058 142"
            stroke="var(--text-primary)"
            strokeOpacity="0.055"
            strokeWidth="1"
            strokeDasharray="8 18"
          />
          <ellipse
            cx="888"
            cy="360"
            rx="316"
            ry="214"
            stroke="var(--accent)"
            strokeOpacity="0.055"
            strokeWidth="1"
            transform="rotate(-18 888 360)"
          />
        </svg>
      </div>

      <svg
        className="arc-system-nodes absolute inset-0 h-full w-full opacity-[0.32]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <g className="arc-node-drift-a">
          <line x1="12" y1="28" x2="24" y2="18" stroke="var(--text-primary)" strokeOpacity="0.14" strokeWidth="0.12" />
          <line x1="24" y1="18" x2="39" y2="26" stroke="var(--text-primary)" strokeOpacity="0.1" strokeWidth="0.12" />
          <circle cx="12" cy="28" r="0.6" fill="var(--accent)" fillOpacity="0.34" />
          <circle cx="24" cy="18" r="0.45" fill="var(--text-primary)" fillOpacity="0.24" />
          <circle cx="39" cy="26" r="0.52" fill="var(--text-primary)" fillOpacity="0.18" />
        </g>
        <g className="arc-node-drift-b">
          <line x1="66" y1="72" x2="78" y2="62" stroke="var(--text-primary)" strokeOpacity="0.12" strokeWidth="0.12" />
          <line x1="78" y1="62" x2="88" y2="70" stroke="var(--text-primary)" strokeOpacity="0.1" strokeWidth="0.12" />
          <circle cx="66" cy="72" r="0.5" fill="var(--text-primary)" fillOpacity="0.22" />
          <circle cx="78" cy="62" r="0.7" fill="var(--accent)" fillOpacity="0.32" />
          <circle cx="88" cy="70" r="0.44" fill="var(--text-primary)" fillOpacity="0.2" />
        </g>
        <g className="arc-node-drift-c">
          <line x1="44" y1="84" x2="52" y2="76" stroke="var(--text-primary)" strokeOpacity="0.1" strokeWidth="0.12" />
          <line x1="52" y1="76" x2="58" y2="82" stroke="var(--text-primary)" strokeOpacity="0.09" strokeWidth="0.12" />
          <circle cx="44" cy="84" r="0.4" fill="var(--text-primary)" fillOpacity="0.18" />
          <circle cx="52" cy="76" r="0.55" fill="var(--accent)" fillOpacity="0.28" />
          <circle cx="58" cy="82" r="0.36" fill="var(--text-primary)" fillOpacity="0.18" />
        </g>
      </svg>

      <style>{`
        @keyframes arcNodeDriftA {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0.8px, -0.7px, 0); }
        }

        @keyframes arcNodeDriftB {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-0.9px, 0.6px, 0); }
        }

        @keyframes arcNodeDriftC {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0.5px, 0.8px, 0); }
        }

        .arc-node-drift-a {
          animation: arcNodeDriftA 18s ease-in-out infinite;
        }

        .arc-node-drift-b {
          animation: arcNodeDriftB 22s ease-in-out infinite;
        }

        .arc-node-drift-c {
          animation: arcNodeDriftC 26s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .arc-node-drift-a,
          .arc-node-drift-b,
          .arc-node-drift-c {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
