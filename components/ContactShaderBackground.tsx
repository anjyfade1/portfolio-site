"use client";

import { useState } from "react";
import { ChromaFlow, Shader } from "shaders/react";

export function ContactShaderBackground() {
  const [shaderUnavailable, setShaderUnavailable] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(232, 98, 42, 0.18), transparent 48%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 46%)",
        }}
      />
      {!shaderUnavailable && (
        <Shader
          disableTelemetry
          className="absolute inset-[-18%] h-[136%] w-[136%] opacity-85"
          onUnavailable={() => setShaderUnavailable(true)}
        >
          <ChromaFlow
            baseColor="#160d08"
            upColor="#f06a2f"
            downColor="#0a0706"
            leftColor="#2a1209"
            rightColor="#f2a65a"
            intensity={1.15}
            radius={3.6}
            momentum={20}
          />
        </Shader>
      )}
      <div className="absolute inset-0 bg-[var(--bg)]/45 backdrop-blur-[1px]" />
      <div className="absolute inset-0 border-b border-[var(--hairline)]" />
    </div>
  );
}
