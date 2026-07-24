"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHero = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const shellStyle = scrolled
    ? {
        maxWidth: "1200px",
        margin: "12px auto 0",
        borderRadius: "9999px",
      border: isHero
        ? theme === "dark"
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid rgba(26,23,20,0.08)"
        : "1px solid var(--border)",
      boxShadow: isHero
        ? theme === "dark"
          ? "0 18px 40px rgba(0,0,0,0.22)"
          : "0 18px 40px rgba(26,23,20,0.10)"
        : theme === "dark"
          ? "0 18px 40px rgba(0,0,0,0.20)"
          : "0 18px 40px rgba(26,23,20,0.10)",
    }
    : {
      maxWidth: "100%",
      margin: "0 auto",
      borderRadius: "0px",
      border: "1px solid transparent",
      boxShadow: "none",
    };

  const navSurface = isHero
    ? {
      backgroundColor: scrolled
        ? theme === "dark"
          ? "rgba(20,17,14,0.72)"
          : "rgba(250,248,244,0.72)"
        : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
    }
    : {
      backgroundColor: scrolled
        ? theme === "dark"
          ? "rgba(26,23,20,0.78)"
          : "rgba(250,248,244,0.72)"
        : "transparent",
      backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
    };

  const isDarkHero = isHero && theme === "dark";
  const logoColor = isDarkHero ? "#faf8f4" : "var(--text-primary)";
  const linkColor = isDarkHero ? "rgba(184,173,158,0.85)" : "var(--text-secondary)";
  const linkActiveColor = "#e8622a";
  const linkHoverColor = isDarkHero ? "#faf8f4" : "var(--text-primary)";

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
        className="fixed top-0 left-0 right-0 z-50 px-3 transition-all duration-500 md:px-5"
        role="banner"
      >
        <div
          className={`${scrolled ? "animate-nav-slide-down" : ""} transition-all duration-500`}
          style={{
            ...shellStyle,
            ...navSurface,
            transition:
              "margin 0.4s ease, max-width 0.4s ease, border-radius 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <div className="container-grid">
            <div
              className="flex items-center justify-between"
              style={{ height: scrolled ? "72px" : "84px", transition: "height 0.3s ease" }}
            >
              <Link
                href="/"
                className="font-display text-xl font-bold transition-colors duration-200"
                style={{ color: logoColor }}
                aria-label="Anjolaoluwa Onifade - Home"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#e8622a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = logoColor;
                }}
              >
                <span style={{ color: "#e8622a" }}>A</span>njy.
              </Link>

              <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
                {navLinks.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className="group relative text-sm font-medium transition-all duration-200"
                      style={{ color: isActive ? linkActiveColor : linkColor }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLAnchorElement).style.color = linkHoverColor;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLAnchorElement).style.color = linkColor;
                        }
                      }}
                    >
                      {label}
                      <span
                        className="absolute -bottom-1 left-0 h-px rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: "#e8622a",
                          width: isActive ? "100%" : "0%",
                        }}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3 max-w-full w-50 ">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="flex h-fit w-fit cursor-pointer items-center gap-4 rounded-full p-1 transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500/40"
                  style={{
                    backgroundColor: scrolled
                      ? isHero
                        ? "rgba(255,255,255,0.08)"
                        : theme === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.65)"
                      : isHero
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(255,255,255,0.14)",
                  }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ease-out"
                    style={{
                      backgroundColor:
                        theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(26,23,20,0.08)",
                      color: theme === "dark" ? "#faf8f4" : "#1a1714",
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
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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
                    )}
                  </span>
                </button>

                <Link
                  href="/contact"
                  className="hidden min-h-[40px] w-full items-center justify-center gap-2 rounded-full px-1 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px md:inline-flex"
                  style={{
                    backgroundColor: "#e8622a",
                    boxShadow: scrolled ? "none" : isHero ? "0 0 20px rgba(232,98,42,0.3)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#f07040";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#e8622a";
                  }}
                >
                  Let&apos;s Talk
                  <svg
                    width="11"
                    height="11"
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
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full transition-all duration-200 md:hidden"
                  style={{
                    backgroundColor: scrolled
                      ? isHero
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(255,255,255,0.18)"
                      : isHero
                        ? "rgba(255,255,255,0.04)"
                        : "transparent",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="block h-0.5 w-4 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: isHero
                          ? "rgba(184,173,158,0.8)"
                          : "var(--text-secondary)",
                        opacity: menuOpen && i === 1 ? 0 : 1,
                        transform:
                          menuOpen && i === 0
                            ? "rotate(45deg) translate(3.5px, 3.5px)"
                            : menuOpen && i === 2
                              ? "rotate(-45deg) translate(3.5px, -3.5px)"
                              : "none",
                      }}
                    />
                  ))}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-300 md:hidden"
          style={{ maxHeight: menuOpen ? "320px" : "0", opacity: menuOpen ? 1 : 0 }}
        >
          <nav
            className="container-grid mt-2 flex flex-col gap-1 rounded-3xl border px-2 py-4"
            style={{
              backgroundColor:
                theme === "dark" ? "rgba(26,23,20,0.94)" : "rgba(250,248,244,0.96)",
              borderColor: "var(--border)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className="rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isActive ? "#e8622a" : isHero ? "rgba(184,173,158,0.85)" : "var(--text-secondary)",
                    backgroundColor: isActive ? "rgba(232,98,42,0.08)" : "transparent",
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-2 rounded-lg px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200"
              style={{ backgroundColor: "#e8622a" }}
            >
              Let&apos;s Talk
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
