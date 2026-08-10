import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/portfolio";
import { FeatureVideoPlayer } from "@/components/FeatureVideoPlayer";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Normalize media arrays
  const motionClips = project.builtInMotion || project.featureVideos || [];
  const interfaceScreenshots = project.interfaceViews || project.gallery || [];

  // Build dynamic section index based strictly on present data
  const rawSections: { id: string; label: string }[] = [];
  if (project.overview) rawSections.push({ id: "overview", label: "Overview" });
  if (project.thePlatform) rawSections.push({ id: "platform", label: "The Platform" });
  if (project.theProduct) rawSections.push({ id: "product", label: "The Product" });
  if (project.theExperience) rawSections.push({ id: "experience", label: "The Experience" });
  if (project.digitalExperience) rawSections.push({ id: "digital-experience", label: "Digital Experience" });
  if (project.creativeExperience) rawSections.push({ id: "creative-experience", label: "Creative Experience" });
  if (project.submissionFlow) rawSections.push({ id: "submission-flow", label: "Submission Flow" });
  if (project.cmsAndContent) rawSections.push({ id: "cms-content", label: "Content & CMS" });
  if (project.platformWorkflows) rawSections.push({ id: "workflows", label: "Platform Workflows" });
  if (project.adminPlatform) rawSections.push({ id: "admin-platform", label: "Admin Platform" });
  if (project.coreCapabilities) rawSections.push({ id: "core-capabilities", label: "Core Capabilities" });
  if (project.contentAndTrust) rawSections.push({ id: "content-trust", label: "Content & Trust" });
  if (project.myRole) rawSections.push({ id: "role", label: "My Role" });
  if (project.whatIBuilt && project.whatIBuilt.length > 0) rawSections.push({ id: "built", label: project.slug === "tuyen-legacy-foundation" ? "Frontend & Motion" : "Frontend Implementation" });
  if (motionClips.length > 0) rawSections.push({ id: "motion", label: "Built in Motion" });
  if (project.engineering && project.engineering.length > 0) rawSections.push({ id: "engineering", label: "Technical Notes" });
  if (project.interfaceCarousels || interfaceScreenshots.length > 0) rawSections.push({ id: "interface", label: project.slug === "banking-dashboard" ? "Dashboard Overview" : "Interface Showcase" });
  if (project.stack && project.stack.length > 0) rawSections.push({ id: "stack", label: "Stack" });
  if (project.currentStatus) rawSections.push({ id: "current-status", label: "Current Status" });
  if (project.result) rawSections.push({ id: "result", label: "Closing" });

  const sections = rawSections.map((sec, idx) => ({
    ...sec,
    num: String(idx + 1).padStart(2, "0"),
  }));

  const getSectionNum = (id: string) => {
    return sections.find((s) => s.id === id)?.num || "01";
  };

  return (
    <article className="pt-32 pb-24">
      {/* 1. Header (Product Case File Header) */}
      <header className="container-grid mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] mb-4 uppercase tracking-wider font-semibold">
          <Link href="/work" className="hover:underline">
            CASE FILE
          </Link>
          <span>/</span>
          <span>{project.productType}</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] mb-4 leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-8 font-body">
          {project.tagline}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] font-mono text-xs">
          <div>
            <span className="text-[var(--text-muted)] block text-2xs uppercase tracking-wider mb-1">
              PRODUCT TYPE
            </span>
            <span className="text-[var(--text-primary)] font-semibold">{project.productType}</span>
          </div>
          <div>
            <span className="text-[var(--text-muted)] block text-2xs uppercase tracking-wider mb-1">
              YEAR
            </span>
            <span className="text-[var(--text-primary)] font-semibold">{project.year}</span>
          </div>
          <div>
            <span className="text-[var(--text-muted)] block text-2xs uppercase tracking-wider mb-1">
              ROLE
            </span>
            <span className="text-[var(--text-primary)] font-semibold">{project.role}</span>
          </div>
          <div>
            <span className="text-[var(--text-muted)] block text-2xs uppercase tracking-wider mb-1">
              STATUS
            </span>
            <span className="text-[var(--accent)] font-semibold">{project.status}</span>
          </div>
        </div>

        {/* Action CTAs */}
        {project.liveUrl && (
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider bg-[var(--accent)] text-white rounded hover:opacity-90 transition-opacity"
            >
              View Website ↗
            </a>
          </div>
        )}
      </header>

      {/* Main Cover Shot */}
      <section className="container-grid mb-16">
        <div className="relative aspect-video w-full rounded-2xl border border-[var(--hairline)] overflow-hidden bg-[#0d0c0b] shadow-2xl">
          <Image
            src={project.posterImage}
            alt={`${project.title} poster`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* Grid Layout: Dynamic Index Sidebar + Content */}
      <div className="container-grid grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 items-start">
        {/* Dynamic Case-Study Index (Sidebar) */}
        <aside className="hidden lg:block sticky top-28 solid-panel p-5">
          <span className="font-mono text-2xs text-[var(--text-muted)] uppercase tracking-wider block mb-3 font-semibold">
            CASE FILE INDEX
          </span>
          <nav className="space-y-2 font-mono text-xs">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="block text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors py-0.5"
              >
                <span className="text-[var(--text-muted)] mr-2">{sec.num}</span>
                {sec.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content Body */}
        <div className="space-y-12 max-w-4xl">
          {/* Overview */}
          {project.overview && (
            <section id="overview" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("overview")} · OVERVIEW
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">
                Product Overview
              </h2>
              <div className="text-base text-[var(--text-secondary)] leading-relaxed font-body whitespace-pre-line space-y-4">
                {project.overview}
              </div>
            </section>
          )}

          {/* Digital Experience Section (e.g. Tuyen Legacy Foundation) */}
          {project.digitalExperience && (
            <section id="digital-experience" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("digital-experience")} · DIGITAL EXPERIENCE
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Mission Communication & Engagement Pathways
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.digitalExperience.map((item) => (
                  <div
                    key={item}
                    className="p-5 rounded-lg border border-[var(--hairline)] bg-[var(--bg-subtle)] flex items-start gap-3"
                  >
                    <span className="text-[var(--accent)] font-mono font-bold mt-0.5">✓</span>
                    <span className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Creative Experience Section (e.g. HOC) */}
          {project.creativeExperience && (
            <section id="creative-experience" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("creative-experience")} · CREATIVE EXPERIENCE
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Media-Rich Presentation & Motion
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.creativeExperience.map((item) => (
                  <div
                    key={item}
                    className="p-5 rounded-lg border border-[var(--hairline)] bg-[var(--bg-subtle)] flex items-start gap-3"
                  >
                    <span className="text-[var(--accent)] font-mono font-bold mt-0.5">•</span>
                    <span className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Application & Submission Flow (e.g. HOC) */}
          {project.submissionFlow && (
            <section id="submission-flow" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("submission-flow")} · APPLICATION & SUBMISSION FLOW
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">
                Data & Communication Integration
              </h2>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed font-body">
                {project.submissionFlow}
              </p>
            </section>
          )}

          {/* CMS & Content (e.g. HOC or Tuyen with Sanity & React Parse) */}
          {project.cmsAndContent && (
            <section id="cms-content" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("cms-content")} · CONTENT & CMS
              </span>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--hairline)] mb-6">
                <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                  Structured Content Architecture
                </h2>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                  Powered by {project.cmsAndContent.cms}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.cmsAndContent.features.map((feat) => (
                  <div
                    key={feat}
                    className="p-5 rounded-lg border border-[var(--hairline)] bg-[var(--bg-subtle)] flex items-start gap-3"
                  >
                    <span className="text-[var(--accent)] font-mono font-bold mt-0.5">✓</span>
                    <span className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* The Experience Section (e.g. YourCreditPal) */}
          {project.theExperience && (
            <section id="experience" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("experience")} · THE EXPERIENCE
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                User Journey & Application Flow
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.theExperience.landingPage && (
                  <div className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
                      <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                        Landing Page
                      </h3>
                      <span className="font-mono text-2xs uppercase tracking-wider text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent)]/10">
                        Conversion Focus
                      </span>
                    </div>
                    <ul className="space-y-2.5 font-body text-xs text-[var(--text-secondary)]">
                      {project.theExperience.landingPage.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="text-[var(--accent)] font-mono font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.theExperience.applicationForm && (
                  <div className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
                      <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                        Application & Form Experience
                      </h3>
                      <span className="font-mono text-2xs uppercase tracking-wider text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent)]/10">
                        Multi-Step Flow
                      </span>
                    </div>
                    <ul className="space-y-2.5 font-body text-xs text-[var(--text-secondary)]">
                      {project.theExperience.applicationForm.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="text-[var(--accent)] font-mono font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Content & Trust Section */}
          {project.contentAndTrust && (
            <section id="content-trust" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("content-trust")} · CONTENT & TRUST
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">
                Supporting Content & Financial Guides
              </h2>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed font-body">
                {project.contentAndTrust}
              </p>
            </section>
          )}

          {/* Core Capabilities Section (e.g. Banking Internal Dashboard) */}
          {project.coreCapabilities && (
            <section id="core-capabilities" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("core-capabilities")} · CORE CAPABILITIES
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Platform Administrative Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.coreCapabilities.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-lg border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-2"
                  >
                    <h3 className="font-display font-bold text-xs text-[var(--accent)] uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* The Platform (Multi-Role Architecture Blocks) */}
          {project.thePlatform && (
            <section id="platform" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("platform")} · THE PLATFORM
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Multi-Role Platform Ecosystem
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.thePlatform.map((block) => (
                  <div
                    key={block.role}
                    className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] mb-3">
                        <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                          {block.role}
                        </h3>
                        <span className="font-mono text-2xs uppercase tracking-wider text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent)]/10">
                          {block.roleTag}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-body mb-4 leading-relaxed">
                        {block.description}
                      </p>
                      <ul className="space-y-2 font-body text-xs text-[var(--text-secondary)]">
                        {block.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[var(--accent)] font-mono font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* The Product (Dual Column Breakdown if present) */}
          {project.theProduct && (
            <section id="product" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("product")} · THE PRODUCT
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Platform Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.theProduct.clientPlatform && (
                  <div className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
                      <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                        Public Web Platform
                      </h3>
                      <span className="font-mono text-2xs uppercase tracking-wider text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent)]/10">
                        Website & Blog
                      </span>
                    </div>
                    <ul className="space-y-2.5 font-body text-xs text-[var(--text-secondary)]">
                      {project.theProduct.clientPlatform.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="text-[var(--accent)] font-mono font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.theProduct.adminPlatform && (
                  <div className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
                      <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                        Administrative Suite
                      </h3>
                      <span className="font-mono text-2xs uppercase tracking-wider text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent)]/10">
                        Internal Tools
                      </span>
                    </div>
                    <ul className="space-y-2.5 font-body text-xs text-[var(--text-secondary)]">
                      {project.theProduct.adminPlatform.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="text-[var(--accent)] font-mono font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Platform Workflows */}
          {project.platformWorkflows && (
            <section id="workflows" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("workflows")} · PLATFORM WORKFLOWS
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Visual System Workflows
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.platformWorkflows.map((flow) => (
                  <div
                    key={flow.title}
                    className="p-5 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-3"
                  >
                    <h3 className="font-display font-bold text-xs text-[var(--accent)] uppercase tracking-wider">
                      {flow.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)]">
                      {flow.steps.map((step, sIdx) => (
                        <span key={step} className="inline-flex items-center gap-1.5">
                          <span className="px-2 py-1 rounded bg-[var(--bg)] border border-[var(--hairline)] text-2xs text-[var(--text-primary)]">
                            {step}
                          </span>
                          {sIdx < flow.steps.length - 1 && (
                            <span className="text-[var(--text-muted)] text-2xs font-bold">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Admin Platform Feature Breakdown */}
          {project.adminPlatform && (
            <section id="admin-platform" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("admin-platform")} · ADMIN PLATFORM
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Internal Operations & Data Control
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.adminPlatform.map((block) => (
                  <div
                    key={block.category}
                    className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="pb-3 border-b border-[var(--hairline)] mb-3">
                        <h3 className="font-display font-bold text-xs text-[var(--accent)] uppercase tracking-wider">
                          {block.category}
                        </h3>
                      </div>
                      <ul className="space-y-2 font-body text-xs text-[var(--text-secondary)]">
                        {block.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <span className="text-[var(--accent)] font-mono font-bold mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* My Role */}
          {project.myRole && (
            <section id="role" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("role")} · MY ROLE
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">
                Frontend Ownership
              </h2>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed font-body">
                {project.myRole}
              </p>
            </section>
          )}

          {/* What I Built / Frontend Implementation / Frontend & Motion */}
          {project.whatIBuilt && project.whatIBuilt.length > 0 && (
            <section id="built" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("built")} · {project.slug === "tuyen-legacy-foundation" ? "FRONTEND & MOTION" : "FRONTEND IMPLEMENTATION"}
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Frontend Implementation Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.whatIBuilt.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-lg border border-[var(--hairline)] bg-[var(--bg-subtle)]"
                  >
                    <h3 className="font-display font-semibold text-base text-[var(--text-primary)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Built in Motion */}
          {motionClips.length > 0 && (
            <section id="motion" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("motion")} · BUILT IN MOTION
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Interaction & Motion Mechanics
              </h2>
              <div className="space-y-8">
                {motionClips.map((clip) => (
                  <FeatureVideoPlayer
                    key={clip.title}
                    title={clip.title}
                    category="BUILT IN MOTION"
                    description={clip.caption}
                    posterUrl={clip.posterUrl}
                    videoUrl={clip.videoUrl}
                    tags={project.stack.slice(0, 3)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Technical Notes */}
          {project.engineering && project.engineering.length > 0 && (
            <section id="engineering" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("engineering")} · TECHNICAL NOTES
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                Architecture & Engineering Decisions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.engineering.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-[var(--hairline)] bg-[var(--bg-subtle)] space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-display font-semibold text-base text-[var(--accent)] mb-2">
                        {item.title}
                      </h3>
                      {item.problem && (
                        <p className="text-xs text-[var(--text-secondary)] font-body mb-2">
                          <strong className="font-mono text-2xs text-[var(--text-muted)] uppercase block mb-0.5">
                            CHALLENGE:
                          </strong>
                          {item.problem}
                        </p>
                      )}
                      <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
                        <strong className="font-mono text-2xs text-[var(--text-muted)] uppercase block mb-0.5">
                          ENGINEERING APPROACH:
                        </strong>
                        {item.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interface Showcase (Carousels or Views) */}
          {(project.interfaceCarousels || interfaceScreenshots.length > 0) && (
            <section id="interface" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("interface")} · {project.slug === "banking-dashboard" ? "DASHBOARD OVERVIEW" : "INTERFACE SHOWCASE"}
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
                {project.slug === "banking-dashboard" ? "Internal Operations Dashboard Overview" : "System Interface Gallery"}
              </h2>

              {project.interfaceCarousels ? (
                <div className="space-y-8">
                  {project.interfaceCarousels.map((carousel) => (
                    <ScreenshotCarousel
                      key={carousel.title}
                      title={carousel.title}
                      items={carousel.items}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {interfaceScreenshots.map((img) => (
                    <div key={img.caption} className="space-y-2">
                      <div className="relative aspect-video w-full rounded-xl border border-[var(--hairline)] overflow-hidden bg-[#0d0c0b]">
                        <Image
                          src={img.imageUrl}
                          alt={img.caption}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 100vw, 800px"
                        />
                      </div>
                      <p className="font-mono text-2xs text-[var(--text-muted)] text-center">
                        [ FIG ]: {img.caption}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Stack */}
          {project.stack && project.stack.length > 0 && (
            <section id="stack" className="solid-panel p-8">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("stack")} · STACK
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="mono-tag text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Current Status Section */}
          {project.currentStatus && (
            <section id="current-status" className="solid-panel p-8 border-l-4 border-l-[var(--accent)]">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("current-status")} · CURRENT STATUS
              </span>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                  ● {project.status}
                </span>
              </div>
              <p className="text-base text-[var(--text-secondary)] font-body leading-relaxed whitespace-pre-line">
                {project.currentStatus}
              </p>
            </section>
          )}

          {/* Closing */}
          {project.result && (
            <section id="result" className="solid-panel p-8 border-l-4 border-l-[var(--accent)]">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider block mb-2">
                {getSectionNum("result")} · CLOSING
              </span>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
                Project Summary
              </h2>
              <p className="text-base text-[var(--text-secondary)] font-body leading-relaxed">
                {typeof project.result === "string"
                  ? project.result
                  : project.result.summary}
              </p>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
