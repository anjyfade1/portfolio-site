import Link from "next/link";
import { personal, currentArc, projects, loadout } from "@/data/portfolio";
import { Mascot3D } from "@/components/Mascot3D";
import { CommandBar } from "@/components/CommandBar";
import { ArcAtmosphere } from "@/components/ArcAtmosphere";
import { BuiltInMotionSection } from "@/components/sections/BuiltInMotionSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";

export default function HomePage() {
  return (
    <div className="pb-16">
      <CommandBar />

      {/* 01. HERO SECTION — Identity & Positioning */}
      <section className="section-pad relative isolate flex min-h-screen items-center overflow-hidden !pt-28 md:!pt-32" aria-label="Hero">
        <ArcAtmosphere />
        <div className="container-grid relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* Left Column — Text & Positioning */}
          <div className="max-w-3xl">

            {/* Primary Hero Title — AJ ONLY */}
            <h1 className="font-display font-extrabold tracking-tight text-[var(--text-primary)] leading-[0.92] text-[clamp(4rem,10vw,8.5rem)] mb-1 select-none">
              AJ
            </h1>

            {/* Positioning Statement */}
            <h2 className="font-display font-medium text-[clamp(1.75rem, 2.8vw, 2.5rem)] text-[var(--text-secondary)] mb-4">
              Frontend Engineer
            </h2>

            <p className="font-display font-medium text-[var(--text-primary)] text-[clamp(1.5rem,3vw,2.5rem)] leading-tight mb-6">
              I turn ideas into <br /> products people enjoy using
            </p>


            {/* Core Direct Copy */}
            {/* <p className="max-w-xl text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8">
              Specializing in React, TypeScript, Next.js, and Tailwind CSS.
              Building data-dense dashboards, client portals, ordering systems,
              and high-conversion landing pages engineered for speed and reliability.
            </p> */}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-mono text-xs font-semibold uppercase tracking-wider rounded transition-all duration-150 shadow-sm"
              >
                View Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 solid-panel text-[var(--text-primary)] hover:border-[var(--accent)] font-mono text-xs font-semibold uppercase tracking-wider rounded transition-all duration-150"
              >
                Start a Mission
              </Link>
            </div>

            {/* Command Bar Keyboard Shortcut Hint */}
            <div className="mt-8 flex items-center gap-2 font-mono text-2xs text-[var(--text-muted)]">
              <span className="px-1.5 py-0.5 solid-panel text-[var(--text-secondary)] font-bold">
                Ctrl + K
              </span>
              <span>Press to open command palette</span>
            </div>
          </div>

          {/* Right Column — AJ Original 3D Tactile Mascot */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <Mascot3D size={320} />
          </div>
        </div>
      </section>

      {/* <div className="hairline-rule my-4" /> */}

      <BuiltInMotionSection />


      {/* 03. FEATURED WORK PREVIEW (Shipped Systems) */}
      <FeaturedWorkSection />

      {/* 04. COMPACT LOADOUT HINT */}
      <section className="section-pad bg-[var(--bg-subtle)] border-y border-[var(--hairline)]" aria-label="Core Loadout">
        <div className="container-grid flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
              04 · Stacks
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] mt-1 mb-2">
              Core Loadout
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl">
              The technologies behind every interface I build
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {loadout.core.map((item) => (
              <span
                key={item.name}
                className="px-4 py-2 solid-panel font-mono text-xs font-semibold text-[var(--text-primary)]"
              >
                {item.name}
              </span>
            ))}
            <Link
              href="/about"
              className="px-4 py-2 font-mono text-xs text-[var(--accent)] hover:underline font-medium"
            >
              Full inventory →
            </Link>
          </div>
        </div>
      </section>

      {/* 05. CONTACT CTA STRIP */}
      <section className="section-pad text-center" aria-label="Start a Mission">
        <div className="container-grid max-w-2xl">
          <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            05 · Start a Mission
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)] mt-2 mb-4">
            Let&apos;s build something.
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">
           Have an idea?
           I'd love to hear about it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-mono text-xs font-semibold uppercase tracking-wider rounded transition-all duration-150"
          >
            Start a Conversation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
