import Link from "next/link";
import { personal } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="bg-[var(--bg-subtle)] border-t border-[var(--hairline)] py-12" role="contentinfo">
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
            Frontend Developer · {personal.location}
          </p>
        </div>

        {/* Middle Status Badge */}
        {/* <div className="solid-panel px-3 py-1.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="font-mono text-2xs uppercase tracking-wider text-[var(--text-secondary)]">
            {personal.statusBadge}
          </span>
        </div> */}

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
          © {new Date().getFullYear()}. All rights reserved.
        </div>
        <div>
          THE FRONTEND ARC
        </div>
      </div>
    </footer>
  );
}
