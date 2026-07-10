import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Anjolaoluwa Onifade — Frontend Developer",
  description:
    "Frontend developer based in Lagos, Nigeria. I build fast, accessible, production-grade web experiences with React, Next.js, and TypeScript.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Lagos Nigeria",
    "Web Developer",
    "Anjolaoluwa Onifade",
  ],
  authors: [{ name: "Anjolaoluwa Onifade", url: "https://github.com/anjyfade1" }],
  creator: "Anjolaoluwa Onifade",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Anjolaoluwa Onifade",
    title: "Anjolaoluwa Onifade — Frontend Developer",
    description:
      "Frontend developer based in Lagos, Nigeria. I build fast, accessible, production-grade web experiences.",
    images: [
      {
        url: "/og-image.png", // TODO: create /public/og-image.png (1200x630)
        width: 1200,
        height: 630,
        alt: "Anjolaoluwa Onifade — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjolaoluwa Onifade — Frontend Developer",
    description:
      "Frontend developer based in Lagos, Nigeria. Building fast, accessible web experiences.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased transition-colors duration-300">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-ember-500 text-white rounded-md font-semibold"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
