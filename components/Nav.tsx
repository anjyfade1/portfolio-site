"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const shellStyle = scrolled
    ? {
        maxWidth: "1120px",
        margin: "12px auto 0",
        borderRadius: "9999px",
        border: isDark
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid rgba(26,23,20,0.08)",
        backgroundColor: isDark ? "rgba(20,17,14,0.72)" : "rgba(250,248,244,0.74)",
        backdropFilter: "blur(20px) saturate(170%)",
        WebkitBackdropFilter: "blur(20px) saturate(170%)",
        boxShadow: isDark
          ? "0 18px 40px rgba(0,0,0,0.22)"
          : "0 18px 40px rgba(26,23,20,0.10)",
      }
    : {
        maxWidth: "100%",
        margin: "0 auto",
        borderRadius: "0px",
        border: "1px solid transparent",
        backgroundColor: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: "none",
      };

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from {
            transform: translateY(-18px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-nav-slide-down {
          animation: navSlideDown 0.38s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      <header
        className="fixed left-0 right-0 top-0 z-50 px-3 transition-all duration-500 md:px-5"
        role="banner"
      >
        <div
          className={`${scrolled ? "animate-nav-slide-down" : ""} transition-all duration-500`}
          style={{
            ...shellStyle,
            transition:
              "margin 0.4s ease, max-width 0.4s ease, border-radius 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <div className="container-grid">
            <div
              className="flex items-center justify-between"
              style={{ height: scrolled ? "64px" : "72px", transition: "height 0.3s ease" }}
            >
              <Link
                href="/"
                className="group flex items-center gap-2 font-display text-xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-150 hover:text-[var(--accent)]"
                aria-label="AJ - Home"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--accent)] font-mono text-sm font-bold text-white">
                  AJ
                </span>
              </Link>

              <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
                {navLinks.map(({ href, label }) => {
                  const isActive =
                    pathname === href || (href === "/work" && pathname.startsWith("/work"));

                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
                        isActive
                          ? "font-semibold text-[var(--accent)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {label}
                      {isActive && (
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)]"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  className="flex h-fit w-fit cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500/40"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(26,23,20,0.07)",
                  }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ease-out"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.62)",
                      color: isDark ? "#faf8f4" : "#1a1714",
                    }}
                  >
                    {theme === "dark" ? (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    )}
                  </span>
                </button>

                <Link
                  href="/contact"
                  className="hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] px-5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all duration-150 hover:-translate-y-px hover:bg-[var(--accent-hover)] sm:inline-flex"
                >
                  Let&apos;s Talk
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </Link>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={menuOpen}
                  className="flex h-9 w-9 flex-col items-center justify-center rounded solid-panel md:hidden"
                >
                  <span
                    className={`block h-0.5 w-4 bg-[var(--text-primary)] transition-transform duration-200 ${
                      menuOpen ? "translate-y-1 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`mt-1 block h-0.5 w-4 bg-[var(--text-primary)] transition-opacity duration-200 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`mt-1 block h-0.5 w-4 bg-[var(--text-primary)] transition-transform duration-200 ${
                      menuOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="container-grid mt-3 md:hidden">
            <nav
              className="solid-panel flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4"
              aria-label="Mobile navigation"
            >
              {navLinks.map(({ href, label }) => {
                const isActive =
                  pathname === href || (href === "/work" && pathname.startsWith("/work"));

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded px-3 py-2 font-mono text-xs uppercase tracking-wider ${
                      isActive
                        ? "bg-[var(--accent)] font-bold text-white"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-2 rounded bg-[var(--accent)] px-3 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-white"
              >
                Start a Mission
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
