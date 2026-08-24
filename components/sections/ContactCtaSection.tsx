"use client";

import { personal } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";
import { RollingTextButton } from "@/components/RollingTextButton";

export function ContactCtaSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="contact"
      className="section-pad"
      aria-labelledby="cta-heading"
    >
      <div className="container-grid">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="relative rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] p-10 md:p-16 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-ember-500/8 blur-[80px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <h2
              id="cta-heading"
              className="font-display font-bold text-[clamp(2rem,6vw,4rem)] text-[var(--text-primary)] leading-tight mb-6"
            >
              Let&apos;s Build
              <br />
              <span className="text-gradient">Something Great.</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto mb-10">
              I&apos;m open to new opportunities — remote roles, freelance projects, or
              just a good conversation about software.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <RollingTextButton
                id="cta-email"
                href={`mailto:${personal.email}`}
                text={personal.email}
              />
              <div className="flex items-center gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-ember-500 hover:border-ember-500 transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" />
                  </svg>
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-ember-500 hover:border-ember-500 transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
