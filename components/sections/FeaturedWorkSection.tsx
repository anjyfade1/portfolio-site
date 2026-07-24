"use client";

import Link from "next/link";
import { projects } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="group relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms`,
      }}
    >
      <Link href={`/work/${project.slug}`} className="block h-full focus-visible:outline-none">
        <div className="card h-full p-8 lg:p-10 relative overflow-hidden cursor-pointer group-hover:border-opacity-100">
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: project.color }}
            aria-hidden="true"
          />

          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-[var(--text-muted)]">{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border)]" aria-hidden="true" />
                <span className="text-xs font-mono" style={{ color: project.color }}>{project.role}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-ember-500 transition-colors duration-200">
                {project.title}
              </h3>
            </div>
            {/* Arrow icon */}
            <div className="mt-1 w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover:border-ember-500 group-hover:text-ember-500 group-hover:scale-110 transition-all duration-200 shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
            {project.tagline}
          </p>

          {/* Highlights */}
          {project.highlights && (
            <ul className="space-y-2 mb-6">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: project.color }} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
            {project.stack.length > 4 && (
              <span className="tech-tag">+{project.stack.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedWorkSection() {
  const { ref, inView } = useInView();
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="work"
      className="section-pad"
      aria-labelledby="work-heading"
    >
      <div className="container-grid">
        {/* Section header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div>
            <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-3">
              Selected Work
            </p>
            <h2
              id="work-heading"
              className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-[var(--text-primary)] leading-tight"
            >
              Things I&apos;ve
              <br />
              <span className="text-gradient">Shipped.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-ember-500 transition-colors duration-200 font-medium shrink-0 mb-2"
          >
            All projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* TODO placeholder for future work */}
        <div
          className="mt-6 card p-8 border-dashed flex flex-col md:flex-row items-center justify-between gap-4"
          aria-label="Upcoming project slot"
        >
          <div>
            <p className="text-sm font-mono text-[var(--text-muted)] mb-1">Coming Soon</p>
            <p className="text-[var(--text-secondary)] text-sm">
              More projects with GitHub links, demos, and case studies are being added.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 text-sm text-ember-500 hover:underline font-medium"
          >
            Have a project in mind? →
          </Link>
        </div>
      </div>
    </section>
  );
}
