import Link from "next/link";
import { personal, experience, loadout, education, certifications } from "@/data/portfolio";
import { Mascot3D } from "@/components/Mascot3D";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      {/* 01. CHARACTER PROFILE SECTION */}
      <section className="container-grid mb-20" aria-label="Character Profile">
        <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
         CHARACTER PROFILE
        </span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
          The Engineer Behind the Code
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="solid-panel p-8 md:p-12 space-y-6">
            <div>
              {/* Full Name Displayed Naturally */}
              <h2 className="font-display font-bold text-3xl text-[var(--text-primary)]">
                {personal.name}
              </h2>
              <p className="font-mono text-sm text-[var(--accent)] mt-1">
                Known as {personal.brandName} · {personal.role}
              </p>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                Based in {personal.location} · {personal.availability}
              </p>
            </div>

            <div className="hairline-rule" />

            <div className="space-y-4 text-base text-[var(--text-secondary)] leading-relaxed">
              {personal.bioFull.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--hairline)]">
              <div className="p-4 bg-[var(--bg)] border border-[var(--hairline)] rounded">
                <div className="font-mono text-2xs text-[var(--accent)] uppercase font-semibold">
                  Education
                </div>
                <div className="font-display font-bold text-sm text-[var(--text-primary)] mt-1">
                  {education.degree}
                </div>
                <div className="text-xs text-[var(--text-muted)]">{education.school}</div>
              </div>

              <div className="p-4 bg-[var(--bg)] border border-[var(--hairline)] rounded">
                <div className="font-mono text-2xs text-[var(--accent)] uppercase font-semibold">
                  Certification
                </div>
                {certifications.map((cert) => (
                  <div key={cert.name}>
                    <div className="font-display font-bold text-sm text-[var(--text-primary)] mt-1">
                      {cert.name}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">{cert.issuer} ({cert.year})</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Mascot Display */}
          <div className="flex flex-col items-center justify-center">
            <Mascot3D size={280} />
          </div>
        </div>
      </section>

      {/* 02. TIMELINE SECTION (Employment Experience — STRICTLY SEPARATE FROM PROJECTS) */}
      <section className="section-pad bg-[var(--bg-subtle)] border-y border-[var(--hairline)]" aria-label="Career Timeline">
        <div className="container-grid">
          <div className="mb-12">
            <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-1">
              TIMELINE // EMPLOYMENT EXPERIENCE
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)]">
              Career Progression
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Employment roles, contractual engagements, and institutional placements.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-[var(--hairline)]">
            {experience.map((item) => (
              <div key={item.period} className="relative pl-10">
                {/* Milestone Node */}
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)]" aria-hidden="true" />

                <div className="solid-panel p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <div className="font-mono text-xs text-[var(--accent)]">
                        {item.company} · {item.location} ({item.type})
                      </div>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 solid-panel text-[var(--text-secondary)] self-start sm:self-auto">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.summary}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-[var(--hairline)]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--accent)] font-bold">›</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.stack.map((tech) => (
                      <span key={tech} className="mono-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. FULL LOADOUT INVENTORY */}
      <section className="section-pad" aria-label="Technical Loadout">
        <div className="container-grid">
          <div className="mb-12">
            <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-1">
              LOADOUT // FULL TECHNICAL INVENTORY
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)]">
              Tooling & Systems Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Stack */}
            <div className="solid-panel p-6">
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                Core Stack
              </h3>
              <div className="space-y-3">
                {loadout.core.map((item) => (
                  <div key={item.name} className="p-3 bg-[var(--bg)] border border-[var(--hairline)] rounded">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[var(--text-primary)]">
                        {item.name}
                      </span>
                      <span className="font-mono text-2xs px-2 py-0.5 bg-[var(--accent-muted)] text-[var(--accent)] rounded">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* State & Data */}
            <div className="solid-panel p-6">
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                State Management & Data
              </h3>
              <div className="space-y-3">
                {loadout.stateData.map((item) => (
                  <div key={item.name} className="p-3 bg-[var(--bg)] border border-[var(--hairline)] rounded">
                    <div className="font-mono font-bold text-sm text-[var(--text-primary)]">
                      {item.name}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Styling & Motion */}
            <div className="solid-panel p-6">
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Styling, Motion & Primitives
              </h3>
              <div className="space-y-3">
                {loadout.stylingMotion.map((item) => (
                  <div key={item.name} className="p-3 bg-[var(--bg)] border border-[var(--hairline)] rounded">
                    <div className="font-mono font-bold text-sm text-[var(--text-primary)]">
                      {item.name}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Toolchain & Security */}
            <div className="solid-panel p-6">
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Toolchain, Testing & Security
              </h3>
              <div className="space-y-3">
                {[...loadout.toolchain, ...loadout.testing, ...loadout.securityIt].map((item) => (
                  <div key={item.name} className="p-3 bg-[var(--bg)] border border-[var(--hairline)] rounded">
                    <div className="font-mono font-bold text-sm text-[var(--text-primary)]">
                      {item.name}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container-grid text-center pt-8">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-mono text-xs font-semibold uppercase tracking-wider rounded transition-all duration-150"
        >
          Start a Mission
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
