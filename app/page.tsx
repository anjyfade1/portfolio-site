import { personal, currentArc, projects } from "@/data/portfolio";
import { Mascot3D } from "@/components/Mascot3D";
import { ArcAtmosphere } from "@/components/ArcAtmosphere";
import { BuiltInMotionSection } from "@/components/sections/BuiltInMotionSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { HomeScrollAnimations } from "@/components/HomeScrollAnimations";
import { PlaygroundSection } from "@/components/sections/PlaygroundSection";
import { ContactShaderBackground } from "@/components/ContactShaderBackground";
import { RollingTextButton } from "@/components/RollingTextButton";

export default function HomePage() {
  return (
    <div>

      {/* 01. HERO SECTION — Identity & Positioning */}
      <section id="home-hero" className="section-pad relative isolate flex min-h-screen items-center overflow-hidden !pt-28 md:!pt-32" aria-label="Hero">
        <ArcAtmosphere />
        <div className="container-grid relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* Left Column — Text & Positioning */}
          <div className="max-w-3xl">

            {/* Primary Hero Title — AJ ONLY */}
            <h1 className="font-display font-extrabold tracking-tight text-[var(--text-primary)] leading-[0.92] text-[clamp(4rem,10vw,8.5rem)] mb-1 select-none">
              AJ
            </h1>

            {/* Positioning Statement */}
            <h2 className="font-display font-medium text-[clamp(1.75rem, 2.8vw, 2.5rem)] text-[var(--text-secondary)] mb-4">
              Frontend Engineer
            </h2>

            <p className="font-display font-medium text-[var(--text-primary)] text-[clamp(1.5rem,3vw,2.5rem)] leading-tight mb-6">
              I turn ideas into <br /> products people enjoy using
            </p>


            {/* CTAs — match the navbar's pill shape and rolling interaction. */}
            <div className="flex flex-wrap items-center gap-3">
              <RollingTextButton href="/work" text="View Work" className="px-5 py-3 shadow-none hover:-translate-y-px" />
              <RollingTextButton href="/contact" text="Start a Mission" variant="secondary" className="px-5 py-3 hover:-translate-y-px" />
            </div>
          </div>

          {/* Right Column — AJ Original 3D Tactile Mascot */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <Mascot3D size={320} />
          </div>
        </div>
      </section>

      {/* 02. BUILT IN MOTION — Sticky scroll-activated video showcase */}
      <BuiltInMotionSection />

      {/* Scroll-triggered sections with parallax */}
      <HomeScrollAnimations>
        <FeaturedWorkSection />

        {/* 04. PHILOSOPHY & TOOLS — Interactive Playground */}
        <PlaygroundSection />

        {/* 05. CONTACT CTA STRIP */}
        <section className="section-pad relative isolate overflow-hidden text-center my-0" aria-label="Start a Mission">
          <ContactShaderBackground />
          <div className="container-grid relative z-10 max-w-2xl">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)] mt-2 mb-4">
              Let&apos;s build something.
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">
             Have an idea?
             I'd love to hear about it.
            </p>
            <RollingTextButton
              href="/contact"
              text="Start a Conversation"
              id="home-contact-button"
            />
          </div>
        </section>
      </HomeScrollAnimations>
    </div>
  );
}
