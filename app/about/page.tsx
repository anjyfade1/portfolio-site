import { personal, experience, loadout, education, certifications } from "@/data/portfolio";
import { LoadoutInventory } from "@/components/LoadoutInventory";
import { RollingTextButton } from "@/components/RollingTextButton";
import { AboutHeroAvatar } from "@/components/AboutHeroAvatar";
import TextWriter from "@/components/ui/text-writer";
import TextShine from "@/components/ui/text-shine";
import StaggerList from "@/components/ui/stagger-list";
import Particles from "@/components/ui/particles";

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* 01. ABOUT HERO — editorial identity */}
      <section className="relative min-h-[100svh] overflow-hidden px-6 pb-12 pt-28 md:px-10 md:pt-32" aria-label="About AJ">
        <div className="pointer-events-none absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-[var(--accent)]/10 blur-[150px]" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] max-w-[1500px] flex-col justify-between">
          <div className="grid gap-3 font-mono text-2xs uppercase tracking-[0.14em] text-[var(--text-muted)] sm:grid-cols-2 sm:gap-6">
            <span>Based in {personal.location}</span>
            <span className="sm:text-right">Available for remote roles &amp; contracts worldwide</span>
          </div>

          <div className="py-10 md:py-14">
            <h1 className="font-display text-[clamp(4.3rem,13vw,12rem)] font-extrabold leading-[0.76] tracking-[-0.075em] text-[var(--text-primary)]">
              <TextWriter
                text={"FRONTEND\nENGINEER"}
                className="whitespace-pre-line"
                delay={0.09}
              />
            </h1>
          </div>

          <div className="grid items-end gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div className="flex items-end gap-6">
              <AboutHeroAvatar />
              <p className="max-w-xs font-mono text-xs leading-relaxed text-[var(--text-secondary)] md:mb-3">
                I turn ambitious ideas into useful, dependable products people enjoy using.
              </p>
            </div>
            <div className="text-left md:text-right">
              <TextShine
                text="AJ"
                baseColor="var(--text-primary)"
                shineColor="var(--accent)"
                duration={6}
                className="font-display text-[clamp(4.5rem,12vw,11rem)] font-extrabold leading-[0.78] tracking-[-0.07em]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02. PROFILE & OFF THE CLOCK */}
      <section id="about-profile" className="section-pad px-6 md:px-10" aria-label="Profile and hobbies">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.7fr)] lg:gap-24">
          <div>
            <p className="font-mono text-2xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">The person behind the code</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[0.95] tracking-tight text-[var(--text-primary)] md:text-6xl">
              I’m Anjolaoluwa. Most people know me as AJ.
            </h2>
            <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
              {personal.bioFull.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
          </div>

          <aside className="lg:pt-10" aria-label="Off the clock">
            <p className="mb-7 font-mono text-2xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Off the clock</p>
            <StaggerList className="space-y-7" stagger={0.14} delay={0.08} duration={0.55} distance={18}>
              <div>
                <p className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">Swimming</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Pool time is where my whole body finally melts into calm. Swimming-partner applications are welcome.</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">My kind of stories</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Anime, manga, and series over movies—when the story is good, I&apos;m not ready for it to end. My first filter is usually a 7.0+ rating, though a few lower-rated hidden gems still get through. I’m always open to a good recommendation.</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">Reading, games, good discussion</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Novels, Christian and finance books sit beside everything else I&apos;m curious about. I also enjoy games and a conversation that goes somewhere interesting.</p>
              </div>
            </StaggerList>
          </aside>
        </div>
      </section>
      {/* 02. TIMELINE SECTION (Employment Experience Ã¢â‚¬â€  STRICTLY SEPARATE FROM PROJECTS) */}
      <section className="relative overflow-hidden section-pad bg-[var(--bg-subtle)] border-y border-[var(--hairline)]" aria-label="Career Timeline">
        <Particles
          quantity={300}
          speed={0.03}
          size={3.25}
          repel={90}
          className="pointer-events-none z-0 text-[var(--text-primary)] opacity-40"
        />
        <div className="container-grid relative z-10">
          <div className="mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)]">
              Career Progression
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-[var(--hairline)]">
            {experience.map((item) => (
              <div key={item.period} className="relative pl-10">
                {/* Milestone Node */}
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)]" aria-hidden="true" />

                <div className="space-y-3 py-2 pr-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <div className="font-mono text-xs text-[var(--accent)]">
                        {item.company}  {item.location} ({item.type})
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-secondary)] self-start sm:self-auto">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.summary}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {item.bullets.map((bullet, index) => (
                      <li key={bullet} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--accent)] font-flex w-2 h-2 flex-shrink-0 mt-[2px]">
                          {/* Organic bullet - slightly imperfect circle for less mechanical feel */}
                          <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity={0.8} />
                          </svg>
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.stack.map((tech) => (
                      <span key={tech} className="mono-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. FULL LOADOUT INVENTORY */}
      <section className="section-pad px-0" aria-label="Technical Loadout">
        <LoadoutInventory
            groups={[
              { label: "Core Stack", items: loadout.core },
              { label: "State & Data", items: loadout.stateData },
              { label: "Styling & Motion", items: loadout.stylingMotion },
              {
                label: "Toolchain & Security",
                items: [...loadout.toolchain, ...loadout.testing, ...loadout.securityIt],
              },
            ]}
          />
      </section>
      {/* Bottom CTA */}
      <section className="container-grid text-center pt-8">
        <RollingTextButton href="/contact" text="Start a Mission" />
      </section>
    </div>
  );
}
