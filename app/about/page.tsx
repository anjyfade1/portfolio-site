import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { personal, skills, certifications, education, volunteering } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About — Anjolaoluwa Onifade",
  description:
    "Frontend developer based in Lagos, Nigeria. 4+ years building performant, accessible web experiences in React, Next.js, and TypeScript.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="container-grid">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start mb-24">
          <div>
            <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-4">About Me</p>
            <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] text-[var(--text-primary)] leading-tight mb-8">
              Hi, I&apos;m
              <br />
              <span className="text-gradient">Anjolaoluwa.</span>
            </h1>

            <div className="space-y-5 text-[var(--text-secondary)] text-lg leading-relaxed">
              <p>
                I&apos;m a frontend developer with 4+ years of experience building fast, accessible,
                production-grade web interfaces. My specialty is React and Next.js — but I care just as
                much about what&apos;s happening under the hood as I do about what the user sees.
              </p>
              <p>
                My background in Mechanical Engineering gave me something most devs don&apos;t have:
                a deep, trained instinct for thinking in systems. In engineering, a single design
                decision upstream creates ten problems downstream. I carry that thinking into every
                frontend architecture decision I make — state management, component design,
                data-fetching strategy, performance budgets.
              </p>
              <p>
                I&apos;ve worked across fintech, enterprise, and product contexts. I&apos;ve built
                dashboards, e-commerce platforms, and component libraries. I&apos;ve also done time
                in IT support and identity management — which means I understand the security and
                operational layer that most frontend engineers never see.
              </p>
              <p>
                Right now I&apos;m based in Lagos, Nigeria, open to remote opportunities worldwide.
                I&apos;m especially interested in product-driven teams where design and engineering
                work closely together.
              </p>
            </div>
          </div>

          {/* Avatar */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-subtle)]">
              <Image
                src="/images/anjy-avatar.png"
                alt="Anjolaoluwa Onifade — avatar"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 360px"
                priority
              />
            </div>

            <div className="card p-5">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">At a Glance</p>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <span aria-hidden="true">📍</span>
                  Lagos, Nigeria
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true">💼</span>
                  Open to remote roles worldwide
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true">🎓</span>
                  {education.degree}, {education.school}
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true">🔐</span>
                  Google Cybersecurity Certified
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true">⚡</span>
                  4+ years in React / Next.js
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="w-full py-3.5 bg-ember-500 hover:bg-ember-400 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 text-center inline-block"
            >
              Let&apos;s Work Together →
            </Link>
          </div>
        </div>

        {/* How I Work */}
        <div className="mb-24">
          <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-3">Philosophy</p>
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-10">
            How I Think About Building
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏗",
                title: "Ship First, Then Refine",
                body: "I believe in getting working software in front of users quickly and iterating on real feedback — not perfecting in isolation. Done and deployed beats perfect and unshipped.",
              },
              {
                icon: "🔬",
                title: "Performance Is a Feature",
                body: "A 3G connection in Lagos is not an edge case — it's a real user. I optimize for load time, bundle size, and rendering performance because speed is directly tied to trust and retention.",
              },
              {
                icon: "🎯",
                title: "Accessibility by Default",
                body: "Semantic HTML, keyboard navigation, visible focus states, and proper ARIA aren't extras I bolt on — they're part of how I write components from the start.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="card p-6">
                <div className="text-2xl mb-4" aria-hidden="true">{icon}</div>
                <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-24">
          <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-3">Certifications</p>
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-8">
            Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center mb-4" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ember-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-[var(--text-primary)] mb-1">{cert.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-1">{cert.issuer}</p>
                <p className="text-xs font-mono text-[var(--text-muted)]">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteering */}
        <div className="mb-16">
          <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-3">Community</p>
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-8">
            Giving Back
          </h2>
          <div className="space-y-4">
            {volunteering.map((v) => (
              <div key={v.org} className="card p-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <div className="shrink-0">
                  <p className="text-xs font-mono text-[var(--text-muted)]">{v.period}</p>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[var(--text-primary)] mb-1">{v.org}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{v.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-10 border-t border-[var(--border)]">
          <p className="text-[var(--text-secondary)] mb-4">Ready to work together?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ember-500 hover:bg-ember-400 text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-ember-glow"
          >
            Get In Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
