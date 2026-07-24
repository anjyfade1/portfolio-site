import type { Metadata } from "next";
import { personal } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Contact — Anjolaoluwa Onifade",
  description: "Get in touch with Anjolaoluwa Onifade — frontend developer based in Lagos, Nigeria.",
};

const contactLinks = [
  {
    id: "contact-email",
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    description: "Best for project inquiries and professional opportunities",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    external: false,
  },
  {
    id: "contact-github",
    label: "GitHub",
    value: "anjyfade1",
    href: personal.github,
    description: "See my code, repos, and open source contributions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" />
      </svg>
    ),
    external: true,
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    value: "anjolaoluwa-onifade",
    href: personal.linkedin,
    description: "Connect professionally and see my full work history",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="container-grid max-w-4xl">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-mono text-ember-500 uppercase tracking-widest mb-4">Contact</p>
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] text-[var(--text-primary)] leading-tight mb-6">
            Let&apos;s Build
            <br />
            <span className="text-gradient">Something.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            I&apos;m open to new opportunities — full-time remote roles, freelance projects, or
            just a good conversation about frontend engineering. If you have something worth
            building, I&apos;d love to hear about it.
          </p>
        </div>

        {/* Contact links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {contactLinks.map(({ id, label, value, href, description, icon, external }) => (
            <a
              key={id}
              id={id}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="card p-6 group hover:border-ember-500/50 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center text-ember-500 mb-4 group-hover:bg-ember-500 group-hover:text-white transition-all duration-200" aria-hidden="true">
                {icon}
              </div>
              <p className="font-display font-bold text-[var(--text-primary)] mb-0.5 group-hover:text-ember-500 transition-colors duration-200">
                {label}
              </p>
              <p className="text-sm font-mono text-[var(--text-muted)] mb-2 truncate">{value}</p>
              <p className="text-xs text-[var(--text-secondary)]">{description}</p>
            </a>
          ))}
        </div>

        {/* Mailto fallback form note */}
        <div className="card p-8 md:p-10 border-dashed">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)] mb-1">No contact form?</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                This portfolio is a static site — there&apos;s no backend to process form submissions.
                The best way to reach me is directly via email at{" "}
                <a
                  href={`mailto:${personal.email}`}
                  className="text-ember-500 hover:underline"
                >
                  {personal.email}
                </a>
                . If you&apos;d like a contact form added, it can be wired up using{" "}
                <span className="font-mono text-[var(--text-muted)]">Resend</span>,{" "}
                <span className="font-mono text-[var(--text-muted)]">Formspree</span>, or{" "}
                <span className="font-mono text-[var(--text-muted)]">EmailJS</span>{" "}
                — all static-friendly solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Availability note */}
        <div className="mt-12 flex items-center gap-3 text-[var(--text-muted)] text-sm">
          <span className="w-2 h-2 rounded-full bg-jade-500 animate-pulse" aria-hidden="true" />
          <span>Currently available for new projects and full-time remote roles.</span>
        </div>
      </div>
    </div>
  );
}
