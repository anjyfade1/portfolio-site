import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Anjolaoluwa Onifade`,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-28 pb-24">
      <div className="container-grid max-w-4xl">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-ember-500 transition-colors duration-200 mb-10 font-mono"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          All work
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[var(--text-muted)]">{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" aria-hidden="true" />
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full border"
              style={{
                color: project.color,
                borderColor: `${project.color}30`,
                backgroundColor: `${project.color}10`,
              }}
            >
              {project.role}
            </span>
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2rem,6vw,4rem)] text-[var(--text-primary)] leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
            {project.tagline}
          </p>
        </header>

        {/* TODO: Add project image/video here */}
        {/* 
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] mb-12 bg-[var(--bg-subtle)] flex items-center justify-center">
          <p className="text-[var(--text-muted)] font-mono text-sm">
            Project screenshot / demo video coming soon
          </p>
        </div>
        */}

        {/* Placeholder image area */}
        <div
          className="w-full aspect-video rounded-2xl border border-dashed border-[var(--border)] mb-12 flex flex-col items-center justify-center gap-3 bg-[var(--bg-subtle)]"
          aria-label="Project demo placeholder"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${project.color}15` }}
            aria-hidden="true"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: project.color }} aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <p className="text-[var(--text-muted)] font-mono text-xs text-center">
            TODO: Add project screenshots or demo video
            <br />
            Replace this div in{" "}
            <code className="text-ember-500">/app/work/[slug]/page.tsx</code>
          </p>
        </div>

        {/* Case study body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Main content */}
          <div className="md:col-span-2 space-y-10">
            {/* Context */}
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">The Context</h2>
              <div className="ruled-line mb-4" />
              <p className="text-[var(--text-secondary)] leading-relaxed">{project.context}</p>
            </div>

            {/* What I built */}
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">What I Built</h2>
              <div className="ruled-line mb-4" />
              <p className="text-[var(--text-secondary)] leading-relaxed">{project.whatIBuilt}</p>
            </div>

            {/* Outcome */}
            {project.outcome && (
              <div>
                <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">Outcome</h2>
                <div className="ruled-line mb-4" />
                <p className="text-[var(--text-secondary)] leading-relaxed">{project.outcome}</p>
              </div>
            )}

            {/* Highlights */}
            {project.highlights && (
              <div>
                <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">Key Highlights</h2>
                <div className="ruled-line mb-4" />
                <ul className="space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <div
                        className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${project.color}15` }}
                        aria-hidden="true"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: project.color }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[var(--text-secondary)]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Stack */}
            <div className="card p-5">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="card p-5">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">Links</p>
              <div className="space-y-2">
                {(project as any).liveUrl ? (
                  <a
                    href={(project as any).liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-ember-500 hover:underline"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Live Demo
                  </a>
                ) : (
                  <p className="text-xs text-[var(--text-muted)] font-mono">Live URL — TODO</p>
                )}
                {(project as any).githubUrl ? (
                  <a
                    href={(project as any).githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-ember-500 hover:underline"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" /></svg>
                    GitHub Repo
                  </a>
                ) : (
                  <p className="text-xs text-[var(--text-muted)] font-mono">GitHub URL — TODO</p>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* More projects */}
        {otherProjects.length > 0 && (
          <div>
            <div className="ruled-line mb-8" />
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-6">
              More Work
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="card p-5 group hover:border-ember-500/50 transition-colors"
                >
                  <p className="text-xs font-mono mb-1" style={{ color: p.color }}>{p.role}</p>
                  <h3 className="font-display font-bold text-[var(--text-primary)] group-hover:text-ember-500 transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">{p.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
