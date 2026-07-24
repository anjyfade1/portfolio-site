import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Work — Anjolaoluwa Onifade",
  description:
    "Selected projects and case studies by Anjolaoluwa Onifade — frontend developer based in Lagos, Nigeria.",
};

function ProjectListCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block focus-visible:outline-none">
      <article className="card p-8 lg:p-10 h-full relative overflow-hidden">
        {/* Accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: project.color }}
          aria-hidden="true"
        />

        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[var(--text-muted)]">{project.year}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]" aria-hidden="true" />
              <span className="text-xs font-mono" style={{ color: project.color }}>
                {project.role}
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] group-hover:text-ember-500 transition-colors duration-200">
              {project.title}
            </h2>
          </div>
          <div className="mt-1 w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover:border-ember-500 group-hover:text-ember-500 group-hover:scale-110 transition-all duration-200 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{project.tagline}</p>

        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">{project.context}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {project.highlights?.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: project.color }} aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </article>
    </Link>
  );
}

export default function WorkPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="container-grid">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] text-[var(--text-primary)] leading-tight mb-6">
            Selected
            <br />
            <span className="text-gradient">Work.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
            A collection of projects I&apos;ve designed and built — from fintech dashboards to
            multi-vendor e-commerce platforms. Each case study covers the problem, my approach,
            the stack, and the outcome.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectListCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Add more CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--text-muted)] text-sm font-mono mb-2">
            More projects coming soon — personal builds, open source, and experiments.
          </p>
          <Link
            href="/contact"
            className="text-ember-500 text-sm hover:underline font-medium"
          >
            Have a project in mind? Let&apos;s talk →
          </Link>
        </div>
      </div>
    </div>
  );
}
