"use client";

import { useEffect, useState } from "react";
import { personal } from "@/data/portfolio";

export function StatusBar() {
  const [lagosTime, setLagosTime] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    // Update Lagos local time every second
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString("en-US", {
        timeZone: "Africa/Lagos",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLagosTime(timeStr);
    };

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="hidden lg:flex fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-subtle)] border-t border-[var(--hairline)] px-4 py-1.5 justify-between items-center text-2xs font-mono text-[var(--text-muted)] select-none"
      role="status"
      aria-live="polite"
    >
      {/* Scroll Progress Bar Top Accent Line */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Left Node */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          SYSTEM ONLINE
        </span>
        <span className="text-[var(--hairline)]">|</span>
        <span>LAGOS, NG: {lagosTime || "20:30:00"} WAT</span>
      </div>

      {/* Right Node */}
      <div className="flex items-center gap-3">
        <span>SCROLL: {Math.round(scrollProgress)}%</span>
        <span className="text-[var(--hairline)]">|</span>
        <span className="text-[var(--accent)] font-medium">AJ // FRONTEND ARC</span>
      </div>
    </div>
  );
}
