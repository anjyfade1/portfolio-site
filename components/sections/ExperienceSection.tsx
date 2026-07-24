"use client";

import { experience } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

function ExperienceItem({
  item,
  index,
}: {
  item: (typeof experience)[0];
  index: number;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 pb-12 last:pb-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
      }}
    >
      {/* Timeline dot + line */}
      <div className="hidden md:block absolute left-[188px] top-2 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />
      <div className="hidden md:block absolute left-[182px] top-2 w-3 h-3 rounded-full border-2 border-ember-500 bg-[var(--bg)]" aria-hidden="true" />

      {/* Left — Meta */}
      <div className="md:text-right">
        <p className="text-xs font-mono text-[var(--text-muted)] mb-1">{item.period}</p>
        <span className="inline-block text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-muted)]">
          {item.type}
        </span>
      </div>

      {/* Right — Content */}
      <div className="pl-0 md:pl-8">
        <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-0.5">
          {item.title}
        </h3>
        <p className="text-ember-500 text-sm font-medium mb-3">{item.company}</p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
          {item.summary}
        </p>
        <ul className="space-y-2 mb-5">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-ember-500 shrink-0" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      className="section-pad bg-[var(--bg-subtle)]"
      aria-labelledby="exp-heading"
    >
      <div className="container-grid">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-3">Experience</p>
          <h2
            id="exp-heading"
            className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-[var(--text-primary)] leading-tight"
          >
            Where I&apos;ve
            <br />
            <span className="text-gradient">Worked.</span>
          </h2>
        </div>

        <div>
          {experience.map((item, i) => (
            <ExperienceItem key={item.company + item.period} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
