import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SharedProjectTransitionProvider } from "@/components/SharedProjectTransition";
import { NavVisibilityProvider } from "@/components/sections/NavVisibilityContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AJ — Frontend Engineer",
  description:
    "Frontend engineer based in Lagos, Nigeria. I build modern web products for businesses — dashboards, client portals, ordering systems, and landing pages with React, TypeScript, Next.js, and Tailwind CSS.",
  keywords: [
    "AJ",
    "Frontend Engineer",
    "Anjolaoluwa Onifade",
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Dashboards",
    "Client Portals",
    "Web Products",
    "Lagos Nigeria",
  ],
  authors: [{ name: "Anjolaoluwa Onifade (AJ)", url: "https://github.com/anjyfade1" }],
  creator: "Anjolaoluwa Onifade (AJ)",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AJ — Frontend Engineer",
    title: "AJ — Frontend Engineer · Anjolaoluwa Onifade",
    description:
      "Frontend engineer building modern web products for businesses with React, TypeScript, and Next.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AJ — Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ — Frontend Engineer · Anjolaoluwa Onifade",
    description:
      "Frontend engineer building modern web products for businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased transition-colors duration-200">
        <ThemeProvider>
          <SharedProjectTransitionProvider>
            <NavVisibilityProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-[var(--accent)] text-white rounded font-mono text-xs font-medium"
              >
                Skip to content
              </a>
              <Nav />
              <main id="main-content" className="min-h-screen relative z-10 bg-[var(--bg)]">
                {children}
              </main>
              <Footer />
            </NavVisibilityProvider>
          </SharedProjectTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
