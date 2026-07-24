# Anjolaoluwa Onifade — Portfolio

A multi-page developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Statically exported — deploy anywhere (Vercel, Netlify, GitHub Pages).

## 🚀 Quick Start

```bash
cd portfolio-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
portfolio-site/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, nav, footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Design tokens, global styles, Tailwind @theme
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact page
│   ├── work/
│   │   ├── page.tsx        # Work listing
│   │   └── [slug]/page.tsx # Case study pages
│   └── sitemap.ts          # Dynamic sitemap
├── components/
│   ├── Nav.tsx             # Fixed navigation with theme toggle
│   ├── Footer.tsx          # Footer with social links
│   ├── ThemeProvider.tsx   # Dark/light mode context
│   ├── TechMarquee.tsx     # Scrolling tech strip
│   └── sections/
│       ├── HeroSection.tsx
│       ├── FeaturedWorkSection.tsx
│       ├── ExperienceSection.tsx
│       ├── AboutPreviewSection.tsx
│       ├── ToolkitSection.tsx
│       └── ContactCtaSection.tsx
├── data/
│   └── portfolio.ts        # ← ALL CONTENT LIVES HERE
├── hooks/
│   └── useInView.ts        # IntersectionObserver hook
└── public/
    └── images/
        └── anjy-avatar.png  # Your bitmoji avatar
```

## ✏️ How to Edit Content

**All editable content lives in one file: [`data/portfolio.ts`](./data/portfolio.ts)**

### Change your personal info
```ts
export const personal = {
  name: "Anjolaoluwa Onifade",
  email: "competentanjola@gmail.com",
  github: "https://github.com/anjyfade1",
  // ...
};
```

### Add a new project
```ts
export const projects = [
  {
    slug: "my-new-project",        // URL: /work/my-new-project
    title: "My New Project",
    tagline: "Short tagline",
    context: "The problem I solved...",
    role: "Lead Developer",
    whatIBuilt: "What I actually built...",
    stack: ["React", "TypeScript"],
    outcome: "What happened as a result...",
    highlights: ["Key win 1", "Key win 2"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/anjyfade1/repo",
    featured: true,               // Shows on homepage
    color: "#e8622a",             // Accent color for this card
    year: "2024",
  },
];
```

### Add project screenshots or videos
In `app/work/[slug]/page.tsx`, find the TODO comment and replace the placeholder div:
```tsx
// Replace the placeholder with:
<video autoPlay loop muted playsInline className="w-full rounded-2xl">
  <source src="/videos/my-project-demo.mp4" type="video/mp4" />
</video>
// or:
<Image src="/images/projects/my-project.png" alt="..." fill className="object-cover" />
```

Put media files in `/public/videos/` or `/public/images/projects/`.

### Replace your avatar
Replace `/public/images/anjy-avatar.png` with any PNG/WebP image.

### Add your resume PDF
1. Put the file at `/public/resume.pdf`
2. In `data/portfolio.ts`, uncomment: `resumeUrl: "/resume.pdf"`
3. In `components/sections/HeroSection.tsx`, uncomment the download button

## 🎨 Changing the Design

### Colors
Edit the `@theme` block in `app/globals.css`:
```css
@theme {
  --color-ember-500: #e8622a;  /* Change accent color */
  /* ... */
}
```

### Fonts
Change font imports in `app/layout.tsx` (uses `next/font/google`), then update `--font-display`, `--font-body`, `--font-mono` CSS variables in `globals.css`.

## 🌐 Deployment

### Static Export (Netlify, GitHub Pages, Cloudflare Pages)
```bash
npm run build
# Output is in /out directory — deploy that folder
```

### Vercel (recommended — zero config)
```bash
npm install -g vercel
vercel
```
Vercel auto-detects Next.js. Remove `output: 'export'` from `next.config.ts` if you want server features.

### Update your domain
In `app/sitemap.ts` and `public/robots.txt`, replace `https://anjolaoluwa.dev` with your actual domain.

## 📸 Adding Open Graph Image
Create a 1200×630px image at `/public/og-image.png`. This shows when your site is shared on social media.

## 🔧 Development

```bash
npm run dev     # Start dev server
npm run build   # Production build + static export
```

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16 | Framework, App Router, static export |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling + design tokens |
| Motion | 12 | Animation library |
| next/font | — | Web font optimization |

---

Built with ❤️ by Anjolaoluwa Onifade
