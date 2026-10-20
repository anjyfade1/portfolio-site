"use client";

import { Mascot3D } from "@/components/Mascot3D";

const tiles = Array.from({ length: 16 }, (_, index) => {
  const column = index % 4;
  const row = Math.floor(index / 4);

  return {
    key: `${row}-${column}`,
    style: {
      left: `${column * 25}%`,
      top: `${row * 25}%`,
      width: "25%",
      height: "25%",
      backgroundImage: "url('/images/Meme.jpeg')",
      backgroundPosition: `${(column / 3) * 100}% ${(row / 3) * 100}%`,
      backgroundSize: "400% 400%",
      transitionDelay: `${index * 38}ms`,
    },
  };
});

export function AboutHeroAvatar() {
  return (
    <div
      className="group relative h-36 w-36 shrink-0 cursor-pointer outline-none sm:h-44 sm:w-44"
      tabIndex={0}
      role="img"
      aria-label="AJ mascot. Hover or focus to reveal a meme."
    >
      <div className="absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-95 group-hover:opacity-0 group-focus:scale-95 group-focus:opacity-0">
        <Mascot3D size={176} />
      </div>

      <div className="absolute inset-1 overflow-hidden rounded-full">
        {tiles.map((tile) => (
          <span
            key={tile.key}
            aria-hidden="true"
            style={tile.style}
            className="absolute scale-75 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 group-focus:scale-100 group-focus:opacity-100"
          />
        ))}
      </div>

      <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
        Meme unlocked
      </span>
    </div>
  );
}