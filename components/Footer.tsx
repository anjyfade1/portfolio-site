"use client";

import { useEffect, useState } from "react";
import { personal } from "@/data/portfolio";

export function Footer() {
  const [visitorInfo, setVisitorInfo] = useState<{
    location: string;
    time: string;
    timeZoneCode: string;
  }>({
    location: "LOCAL",
    time: "",
    timeZoneCode: "",
  });

  useEffect(() => {
    // Detect visitor's local timezone & city name
    let detectedLocation = "LOCAL";
    let detectedTzCode = "";

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        const parts = tz.split("/");
        const rawCity = parts[parts.length - 1] || tz;
        detectedLocation = rawCity.replace(/_/g, " ").toUpperCase();
      }

      const parts = new Intl.DateTimeFormat("en-US", {
        timeZoneName: "short",
      }).formatToParts(new Date());
      const tzPart = parts.find((p) => p.type === "timeZoneName");
      if (tzPart) {
        detectedTzCode = tzPart.value;
      }
    } catch {
      detectedLocation = "LOCAL";
    }

    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setVisitorInfo({
        location: detectedLocation,
        time: timeStr,
        timeZoneCode: detectedTzCode,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="relative z-0 bg-[var(--bg-subtle)] border-t border-[var(--hairline)] py-12"
      role="contentinfo"
    >
      <div className="container-grid flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info: Brand + Full Name */}
        <div className="flex flex-col gap-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-display font-bold text-xl text-[var(--text-primary)]">
              {personal.brandName}
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              · {personal.name}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Frontend Engineer · {personal.location}
          </p>
        </div>

        {/* Right Links & Socials */}
        <div className="flex items-center gap-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150"
          >
            Email
          </a>
        </div>
      </div>

      <div className="container-grid mt-8 pt-6 border-t border-[var(--hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs font-mono text-[var(--text-muted)]">
        <div>
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="text-[var(--text-secondary)]">
            {visitorInfo.location} · {visitorInfo.time || "--:--:--"} {visitorInfo.timeZoneCode}
          </span>
        </div>
      </div>
    </footer>
  );
}
