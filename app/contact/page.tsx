"use client";

import { useState } from "react";
import { personal } from "@/data/portfolio";

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
    <div className="pt-32 pb-24">
      <div className="container-grid max-w-3xl">
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
        <div className="solid-panel p-8 md:p-12">
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
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", projectType: "Dashboard / Portal", details: "" });
                }}
                className="mt-4 px-6 py-2.5 solid-panel text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Send Another Signal
              </button>
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
                <label htmlFor="projectType" className="block font-mono text-2xs uppercase text-[var(--text-secondary)] font-semibold mb-2">
                  Product Type
                </label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full p-3 bg-[var(--bg)] border border-[var(--hairline)] rounded text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none font-body"
                >
                  <option value="Dashboard / Portal">Dashboard / Analytics System</option>
                  <option value="Ordering / E-Commerce">Ordering System / E-Commerce Storefront</option>
                  <option value="Client Portal">Client Portal / Admin System</option>
                  <option value="Landing Page">High-Conversion Landing Page</option>
                  <option value="Full Frontend Build">Full Frontend Application Build</option>
                  <option value="Other">Other Collaboration</option>
                </select>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-mono text-xs font-semibold uppercase tracking-wider rounded transition-all duration-150 shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Transmitting Mission Signal...
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>
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
