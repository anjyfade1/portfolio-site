import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode base
        "ink-950": "#0f0d0b",
        "ink-900": "#1a1714",
        "ink-800": "#242019",
        "ink-700": "#2d2924",
        "ink-600": "#3a342d",
        "ink-500": "#5a4f44",
        "ink-400": "#7a6f62",
        "ink-300": "#b8ad9e",
        "ink-200": "#d8d0c4",
        "ink-100": "#f0ebe3",
        "ink-50": "#faf8f4",
        // Accent — terracotta
        "ember-500": "#e8622a",
        "ember-400": "#f07040",
        "ember-300": "#f59070",
        "ember-600": "#c44e1c",
        // Secondary accent — violet
        "violet-500": "#7c6af7",
        "violet-400": "#9b8cf9",
        "violet-600": "#6354e0",
        // Success / green
        "jade-500": "#22c55e",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        120: "30rem",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "blink": "blink 1.2s step-end infinite",
        "spin-slow": "spin 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "ember-gradient": "linear-gradient(135deg, #e8622a 0%, #f07040 100%)",
        "dark-gradient": "linear-gradient(180deg, #1a1714 0%, #0f0d0b 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(232,98,42,0.06) 0%, rgba(124,106,247,0.06) 100%)",
      },
      boxShadow: {
        "ember-glow": "0 0 32px rgba(232, 98, 42, 0.2)",
        "card-hover": "0 20px 60px rgba(0, 0, 0, 0.4)",
        "nav": "0 1px 0 rgba(255,255,255,0.05)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
