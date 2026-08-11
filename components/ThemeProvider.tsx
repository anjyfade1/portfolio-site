"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

interface ToggleOptions {
  clientX?: number;
  clientY?: number;
  currentTarget?: HTMLElement | null;
}

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent | ToggleOptions) => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

// Helper to remove any active ripple DOM elements safely
function cleanupActiveRipples() {
  if (typeof document === "undefined") return;
  document
    .querySelectorAll(".theme-water-ripple-ring, .theme-fallback-ripple")
    .forEach((el) => el.remove());
}

// Spawns 3 concentric water wave rings radiating outward like a stone cast into a river
function spawnWaterRippleRings(x: number, y: number) {
  if (typeof document === "undefined") return;

  const ringCount = 3;
  const staggerInterval = 130; // ms between radiating water rings

  for (let i = 0; i < ringCount; i++) {
    setTimeout(() => {
      const ring = document.createElement("div");
      ring.className = "theme-water-ripple-ring";
      
      const size = 16 + i * 8;
      const opacity = 0.6 - i * 0.15;
      const borderThickness = 1.8 - i * 0.4;
      const maxScale = 45 + i * 6;

      ring.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        margin-left: -${size / 2}px;
        margin-top: -${size / 2}px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 999999;
        border: ${borderThickness}px solid var(--accent);
        box-shadow: 0 0 20px var(--accent), inset 0 0 10px var(--accent);
        opacity: ${opacity};
        transform: scale(1);
        filter: blur(${0.5 + i * 0.4}px);
        transition: transform 1050ms cubic-bezier(0.16, 0.84, 0.44, 1), opacity 1050ms ease-out;
      `;
      document.body.appendChild(ring);

      requestAnimationFrame(() => {
        ring.style.transform = `scale(${maxScale})`;
        ring.style.opacity = "0";
      });

      setTimeout(() => {
        ring.remove();
      }, 1150);
    }, i * staggerInterval);
  }
}

// Fallback radial expansion for browsers without View Transitions API
function spawnFallbackRipple(
  x: number,
  y: number,
  endRadius: number,
  nextTheme: "dark" | "light",
  onApplyTheme: () => void
) {
  if (typeof document === "undefined") {
    onApplyTheme();
    return;
  }

  cleanupActiveRipples();

  const overlay = document.createElement("div");
  overlay.className = "theme-fallback-ripple";
  const bgColor = nextTheme === "dark" ? "#121110" : "#faf9f6";

  overlay.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${endRadius * 2}px;
    height: ${endRadius * 2}px;
    margin-left: -${endRadius}px;
    margin-top: -${endRadius}px;
    border-radius: 50%;
    background-color: ${bgColor};
    pointer-events: none;
    z-index: 999998;
    transform: scale(0);
    opacity: 1;
    filter: blur(1px);
    transition: transform 950ms cubic-bezier(0.16, 0.84, 0.44, 1);
  `;

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.transform = "scale(1)";
  });

  setTimeout(() => {
    onApplyTheme();
  }, 400);

  setTimeout(() => {
    overlay.remove();
  }, 1000);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
    } else {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback((e?: React.MouseEvent | ToggleOptions) => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    // 1. Respect prefers-reduced-motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setTheme(nextTheme);
      return;
    }

    // 2. Determine click origin coordinates (x, y)
    let x = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let y = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

    if (e) {
      if ("clientX" in e && typeof e.clientX === "number" && e.clientX > 0) {
        x = e.clientX;
        y = e.clientY ?? y;
      } else if (
        "currentTarget" in e &&
        e.currentTarget &&
        "getBoundingClientRect" in e.currentTarget
      ) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    }

    // Maximum distance to cover farthest viewport corner
    const endRadius = Math.hypot(
      Math.max(x, typeof window !== "undefined" ? window.innerWidth - x : 800),
      Math.max(y, typeof window !== "undefined" ? window.innerHeight - y : 600)
    );

    // 3. View Transitions API (Chrome 111+, Edge 111+, Safari 18+, Opera 97+)
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      cleanupActiveRipples();

      const transition = (document as any).startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 1050, // Fluid liquid wave timing (~1.05 seconds)
            easing: "cubic-bezier(0.16, 0.84, 0.44, 1)", // Natural water wave surface acceleration & glide
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });

      spawnWaterRippleRings(x, y);
    } else {
      // 4. Fallback for older browsers
      spawnFallbackRipple(x, y, endRadius, nextTheme, () => setTheme(nextTheme));
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={!mounted ? { visibility: "hidden" } : undefined}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
