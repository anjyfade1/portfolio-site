"use client";

import { useEffect, useRef, useState } from "react";
import { personal } from "@/data/portfolio";
import { RollingTextButton } from "@/components/RollingTextButton";
import Meteors from "@/components/ui/meteors";
import { Check, ChevronDown } from "lucide-react";

const projectOptions = [
  { value: "Dashboard / Portal", label: "Dashboard / Analytics System" },
  { value: "Ordering / E-Commerce", label: "Ordering System / E-Commerce Storefront" },
  { value: "Client Portal", label: "Client Portal / Admin System" },
  { value: "Landing Page", label: "High-Conversion Landing Page" },
  { value: "Full Frontend Build", label: "Full Frontend Application Build" },
  { value: "Other", label: "Other Collaboration" },
];

function ProjectTypeSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = projectOptions.find((option) => option.value === value) ?? projectOptions[0];

  useEffect(() => {
    const closeOnOutsidePress = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsidePress);
    return () => document.removeEventListener("mousedown", closeOnOutsidePress);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="project-type-label"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") setOpen(true);
        }}
        className="flex w-full items-center justify-between gap-4 rounded border border-[var(--hairline)] bg-[var(--bg)]/80 px-3 py-3 text-left text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
      >
        <span>{selected.label}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[var(--accent)] transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <div
        role="listbox"
        aria-label="Product type"
        className={`absolute z-20 mt-2 w-full origin-top overflow-hidden rounded border border-[var(--hairline)] bg-[var(--bg)]/95 p-1 shadow-2xl backdrop-blur-md transition-all duration-200 ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
      >
        {projectOptions.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-4 rounded px-3 py-2.5 text-left text-xs transition-colors ${active ? "bg-[var(--accent)]/12 text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"}`}
            >
              <span>{option.label}</span>
              {active && <Check className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Dashboard / Portal",
    details: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

    // If key isn't provided in env yet, fallback to launching mailto
    if (!accessKey) {
      window.location.href = `mailto:${personal.email}?subject=Build Mission Inquiry from ${encodeURIComponent(
        formData.name
      )} (${formData.projectType})&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nDetails:\n${formData.details}`
      )}`;
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `Build Mission Inquiry: ${formData.projectType} from ${formData.name}`,
          product_type: formData.projectType,
          message: formData.details,
          from_name: "AJ Portfolio Contact Form",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Unable to send message. Please email directly.");
      }
    } catch {
      setErrorMessage("Network connection error. You can click below to open your email client directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <Meteors
        count={50}
        angle={-18}
        duration={5}
        trailLength={110}
        color="var(--accent)"
        className="z-0 opacity-45"
      />
      <div className="container-grid relative z-10 max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Let&apos;s Build Something.
          </h1>
          <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
            Have an idea, a product, or a problem to solve? I'd love to hear about it and see how we can build it together.
          </p>
        </div>

        {/* Contact Form & Direct Email */}
        <div className="p-2 md:p-4">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-xl font-mono">
                ✓
              </div>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                Mission Signal Received
              </h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[var(--text-primary)] font-semibold">{formData.name}</span>. Your message has been transmitted directly to{" "}
                <a href={`mailto:${personal.email}`} className="text-[var(--accent)] underline">
                  {personal.email}
                </a>
                . I&apos;ll get back to you shortly.
              </p>
              <RollingTextButton text="Send Another Signal" variant="secondary" className="mt-4 px-5 py-3" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", projectType: "Dashboard / Portal", details: "" }); }} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-xs font-mono text-red-400 flex items-center justify-between">
                  <span>{errorMessage}</span>
                  <a
                    href={`mailto:${personal.email}?subject=Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.details)}`}
                    className="underline text-[var(--accent)] shrink-0 ml-2"
                  >
                    Open Mail Client ↗
                  </a>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-mono text-2xs uppercase text-[var(--text-secondary)] font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full p-3 bg-[var(--bg)] border border-[var(--hairline)] rounded text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none font-body"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-2xs uppercase text-[var(--text-secondary)] font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@example.com"
                    className="w-full p-3 bg-[var(--bg)] border border-[var(--hairline)] rounded text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none font-body"
                  />
                </div>
              </div>

              <div>
                <p id="project-type-label" className="mb-2 block font-mono text-2xs font-semibold uppercase text-[var(--text-secondary)]">
                  Product Type
                </p>
                <ProjectTypeSelect
                  value={formData.projectType}
                  onChange={(projectType) => setFormData({ ...formData, projectType })}
                />
              </div>

              <div>
                <label htmlFor="details" className="block font-mono text-2xs uppercase text-[var(--text-secondary)] font-semibold mb-2">
                  Project Details / Requirements
                </label>
                <textarea
                  id="details"
                  rows={5}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Tell me about the problem, timeline, tech stack, and goals..."
                  className="w-full p-3 bg-[var(--bg)] border border-[var(--hairline)] rounded text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none font-body"
                />
              </div>

              <RollingTextButton type="submit" disabled={isSubmitting} text={isSubmitting ? "Transmitting Mission Signal" : "Send Message"} className="w-full py-4" />
            </form>
          )}

          {/* Direct Contact Alternative Box */}
          <div className="mt-8 pt-8 border-t border-[var(--hairline)] text-center space-y-3">
            <span className="font-mono text-2xs uppercase text-[var(--text-muted)] tracking-wider">
              OR EMAIL DIRECTLY
            </span>
            <div>
              <a
                href={`mailto:${personal.email}`}
                className="font-mono text-base font-bold text-[var(--accent)] hover:underline"
              >
                {personal.email}
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 pt-2 font-mono text-xs text-[var(--text-secondary)]">
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                GitHub ↗
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
