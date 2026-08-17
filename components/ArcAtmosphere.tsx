"use client";

import { useState } from "react";
import { ChromaFlow, ParticleField, Shader } from "shaders/react";
import { useTheme } from "./ThemeProvider";

export function ArcAtmosphere() {
  const [shaderUnavailable, setShaderUnavailable] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── AMBIENT BASE LIGHTING ── */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 70%, rgba(30, 64, 175, 0.15) 0%, rgba(232, 98, 42, 0.08) 45%, transparent 70%)"
            : "radial-gradient(ellipse at 50% 70%, rgba(59, 130, 246, 0.10) 0%, rgba(232, 98, 42, 0.06) 45%, transparent 65%)",
        }}
      />

      {/* ── 3D UNDULATING PARTICLE TIDE WAVE SURFACE ── */}
      {!shaderUnavailable && (
        <div
          className="absolute inset-x-0 bottom-[-10%] top-[20%] transition-opacity duration-700"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 18%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 18%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)",
          }}
        >
          <Shader
            disableTelemetry
            className="absolute inset-0 h-full w-full"
            style={{ opacity: isDark ? 0.95 : 0.75 }}
            onUnavailable={() => setShaderUnavailable(true)}
          >
            <ParticleField
              count={24000}
              depth={1.3}
              depthSource="luminance"
              particleShape="dot"
              particleSize={0.88}
              depthShading={0.8}
              wobble={0.45}
              rotationX={54}
              rotationY={0}
              rotationZ={0}
              cursorMode="push"
              cursorStrength={1.2}
              cursorRadius={0.28}
            >
              <ChromaFlow
                baseColor={isDark ? "#060913" : "#fbf9f5"}
                upColor={isDark ? "#1d4ed8" : "#2563eb"}
                downColor={isDark ? "#3b82f6" : "#60a5fa"}
                leftColor={isDark ? "#f59e0b" : "#d97706"}
                rightColor={isDark ? "#e8622a" : "#ea580c"}
                intensity={1.05}
                radius={3.4}
                momentum={18}
              />
            </ParticleField>
          </Shader>
        </div>
      )}

      {/* ── TOP AMBIENT FADE ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-transparent opacity-80" />
    </div>
  );
}
