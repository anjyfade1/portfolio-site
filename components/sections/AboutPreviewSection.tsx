"use client";

import Image from "next/image";
import Link from "next/link";
import { personal } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

export function AboutPreviewSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="section-pad"
      aria-labelledby="about-heading"
    >
      <div className="container-grid">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center"
        >
          {/* Left — Content */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-3">
              About
            </p>
            <h2
              id="about-heading"
              className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-[var(--text-primary)] leading-tight mb-8"
            >
              I Think in
              <br />
              <span className="text-gradient">Systems.</span>
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                My background is in Mechanical Engineering — a field where you learn fast that
                everything connects, and a bad assumption upstream creates a bigger problem downstream.
                That thinking never left. Today I apply it to frontend architecture, component design,
                and performance optimization.
              </p>
              <p>
                I&apos;ve worked in fintech, enterprise, and product contexts. I care about shipping
                things that actually work — not just look good in a demo. I write tests. I think
                about bundle size. I worry about load time on a 3G connection in Lagos.
              </p>
              <p>
                My Google Cybersecurity certification isn&apos;t an accident either — understanding
                the security layer makes me a better engineer on both sides of any API.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/about"
                id="about-read-more"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] text-[var(--text-secondary)] hover:text-ember-500 hover:border-ember-500 text-sm font-medium rounded-full transition-all duration-200"
              >
                More about me
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right — Avatar + accents */}
          <div
            className="flex flex-col items-center lg:items-end gap-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 200ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 200ms",
            }}
          >
            {/* Avatar */}
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              {/* Background square */}
              <div className="absolute -inset-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]" aria-hidden="true" />
              {/* Accent corner */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-xl bg-ember-500/10 border border-ember-500/20" aria-hidden="true" />
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-[var(--border)]">
                <Image
                  src="/images/anjy-avatar.png"
                  alt="Anjolaoluwa Onifade — 3D bitmoji avatar"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>

            {/* Fun facts card */}
            <div className="card p-5 w-full max-w-[320px]">
              <p className="text-xs font-mono text-[var(--text-muted)] mb-3 uppercase tracking-wider">Quick facts</p>
              <ul className="space-y-3">
                {[
                  { icon: "🎓", text: "B.S. Mechanical Engineering, FUTA" },
                  { icon: "🔐", text: "Google Cybersecurity Certified" },
                  { icon: "🇳🇬", text: "Based in Lagos, Nigeria" },
                  { icon: "⚡", text: "Performance optimization nerd" },
                  { icon: "🌍", text: "Open to remote worldwide" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="text-base shrink-0" aria-hidden="true">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
