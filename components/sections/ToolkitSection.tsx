"use client";

import { loadout } from "@/data/portfolio";

export function ToolkitSection() {
  return (
    <section className="section-pad">
      <div className="container-grid">
        <h2 className="font-display font-bold text-3xl mb-4 text-[var(--text-primary)]">
          Technical Inventory
        </h2>
        <div className="flex flex-wrap gap-2">
          {loadout.core.map((item) => (
            <span key={item.name} className="mono-tag">
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
