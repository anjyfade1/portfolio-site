"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "./ThemeProvider";
import { personal, projects } from "@/data/portfolio";

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl solid-panel overflow-hidden bg-[var(--bg-subtle)] border border-[var(--hairline)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full font-mono text-xs">
          <div className="flex items-center border-b border-[var(--hairline)] px-3 py-2">
            <span className="mr-2 text-[var(--accent)] font-bold">AJ $</span>
            <Command.Input
              autoFocus
              placeholder="Type a command or search routes..."
              className="w-full bg-transparent text-[var(--text-primary)] focus:outline-none font-mono text-xs py-1"
            />
            <span className="font-mono text-2xs text-[var(--text-muted)] border border-[var(--hairline)] px-1.5 py-0.5 rounded">
              ESC
            </span>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="p-4 text-center text-[var(--text-muted)] font-mono text-xs">
              No matching commands found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-[var(--text-muted)] text-2xs uppercase tracking-wider mb-2 font-mono">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex items-center justify-between p-2 rounded cursor-pointer text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
              >
                <span>Go to Home</span>
                <span className="text-2xs text-[var(--text-muted)]">/</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/work"))}
                className="flex items-center justify-between p-2 rounded cursor-pointer text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
              >
                <span>Go to Work (Projects & Built Details)</span>
                <span className="text-2xs text-[var(--text-muted)]">/work</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/about"))}
                className="flex items-center justify-between p-2 rounded cursor-pointer text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
              >
                <span>Go to About (Character Profile & Timeline)</span>
                <span className="text-2xs text-[var(--text-muted)]">/about</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/contact"))}
                className="flex items-center justify-between p-2 rounded cursor-pointer text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
              >
                <span>Go to Contact (Start a Mission)</span>
                <span className="text-2xs text-[var(--text-muted)]">/contact</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Case Studies" className="text-[var(--text-muted)] text-2xs uppercase tracking-wider my-2 font-mono">
              {projects.map((project) => (
                <Command.Item
                  key={project.slug}
                  onSelect={() => runCommand(() => router.push(`/work/${project.slug}`))}
                  className="flex items-center justify-between p-2 rounded cursor-pointer text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
                >
                  <span>{project.title}</span>
                  <span className="text-2xs text-[var(--text-muted)]">{project.productType}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" className="text-[var(--text-muted)] text-2xs uppercase tracking-wider my-2 font-mono">
              <Command.Item
                onSelect={() =>
                  runCommand(() => {
                    navigator.clipboard.writeText(personal.email);
                  })
                }
                className="flex items-center justify-between p-2 rounded cursor-pointer text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
              >
                <span>Copy Email Address ({personal.email})</span>
                <span className="text-2xs text-[var(--text-muted)]">COPY</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => toggleTheme())}
                className="flex items-center justify-between p-2 rounded cursor-pointer text-[var(--text-primary)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
              >
                <span>Toggle Theme Mode ({theme === "dark" ? "Light Mode" : "Dark Mode"})</span>
                <span className="text-2xs text-[var(--text-muted)]">THEME</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-[var(--hairline)] p-2 text-2xs font-mono text-[var(--text-muted)] flex justify-between">
            <span>AJ Command Palette</span>
            <span>Use ↑↓ to navigate, ENTER to select</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
