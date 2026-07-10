"use client";

const TECH_ITEMS = [
  "TypeScript", "React.js", "Next.js", "Redux Toolkit", "Tailwind CSS",
  "Framer Motion", "GSAP", "REST APIs", "Firebase", "Jest", "Vercel",
  "Git", "Figma", "React Query", "Webpack", "Vite", "Sanity CMS",
  "TypeScript", "React.js", "Next.js", "Redux Toolkit", "Tailwind CSS",
  "Framer Motion", "GSAP", "REST APIs", "Firebase", "Jest", "Vercel",
  "Git", "Figma", "React Query", "Webpack", "Vite", "Sanity CMS",
];

export function TechMarquee() {
  return (
    <div
      className="py-6 border-y border-[var(--border)] bg-[var(--bg-subtle)] overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="flex gap-12 w-max"
        style={{
          animation: "marquee 35s linear infinite",
        }}
      >
        {TECH_ITEMS.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm font-mono text-[var(--text-muted)] whitespace-nowrap"
          >
            <span className="w-1 h-1 rounded-full bg-ember-500" />
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
