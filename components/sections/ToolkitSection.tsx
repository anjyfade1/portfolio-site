"use client";

import { skills } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

const skillGroups = [
  {
    label: "Core Languages & Frameworks",
    items: skills.core,
    color: "#e8622a",
  },
  {
    label: "State & Data",
    items: skills.stateData,
    color: "#7c6af7",
  },
  {
    label: "Styling & Motion",
    items: skills.styling,
    color: "#22c55e",
  },
  {
    label: "Tooling & Deployment",
    items: skills.tooling,
    color: "#f59e0b",
  },
  {
    label: "Testing",
    items: skills.testing,
    color: "#06b6d4",
  },
  {
    label: "Backend & Infra",
    items: skills.backendInfra,
    color: "#ec4899",
  },
  {
    label: "IT & Security",
    items: skills.itSecurity,
    color: "#64748b",
  },
];

function SkillGroup({
  group,
  index,
}: {
  group: (typeof skillGroups)[0];
  index: number;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="card p-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
    >
      {/* Group header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: group.color }}
          aria-hidden="true"
        />
        <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
          {group.label}
        </p>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-subtle)] hover:border-opacity-80 transition-colors duration-150"
            style={{
              borderColor: `${group.color}30`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ToolkitSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="toolkit"
      className="section-pad bg-[var(--bg-subtle)]"
      aria-labelledby="toolkit-heading"
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
          <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-3">Toolkit</p>
          <h2
            id="toolkit-heading"
            className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-[var(--text-primary)] leading-tight"
          >
            Tools &amp;
            <br />
            <span className="text-gradient">Technologies.</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg">
            A grouped view of what I actually use — from core languages to deployment pipelines.
            Everything here is backed by real project usage, not just a course certificate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.label} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
