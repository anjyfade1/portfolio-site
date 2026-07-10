// ============================================================
// PORTFOLIO CONTENT — Anjolaoluwa Onifade
// Edit this file to update any content displayed on the site.
// ============================================================

export const personal = {
  name: "Anjolaoluwa Onifade",
  displayName: "Anjy",
  role: "Frontend Developer",
  tagline: "I build fast, accessible, production-grade web experiences.",
  bio: `I'm a frontend developer with 4+ years of experience turning complex requirements into clean, 
performant interfaces. My work spans fintech, e-commerce, and enterprise systems — and I care 
deeply about both the code underneath and the experience on top.

I hold a background in Mechanical Engineering, which trained me to think in systems, constraints, 
and trade-offs — skills I apply every day in React, Next.js, and TypeScript. I also have hands-on 
experience in IT support and identity management, so I understand the security and operational 
layer that lives behind good frontend work.

Based in Lagos, Nigeria. Open to remote opportunities worldwide.`,
  location: "Lagos, Nigeria",
  email: "competentanjola@gmail.com",
  github: "https://github.com/anjyfade1",
  linkedin: "https://www.linkedin.com/in/anjolaoluwa-onifade-8589b91a1",
  // TODO: Add resume PDF to /public/resume.pdf and uncomment:
  // resumeUrl: "/resume.pdf",
  avatarUrl: "/images/anjy-avatar.png",
  // availability: "Open to new roles", // Uncomment if true
};

export const projects = [
  {
    slug: "banking-dashboard",
    title: "Internal Banking Dashboard",
    tagline: "Real-time financial intelligence for a fintech client.",
    context:
      "A financial services client needed a secure internal dashboard to monitor transactions and generate automated reports — replacing a slow, manual spreadsheet workflow.",
    role: "Lead Frontend Developer",
    whatIBuilt:
      "A real-time data visualization dashboard featuring live transaction feeds, Chart.js-powered analytics charts, automated report generation, and role-based access controls integrated with the client's API layer.",
    stack: ["React.js", "TypeScript", "Chart.js", "Redux Toolkit", "REST APIs", "Tailwind CSS"],
    outcome:
      "Optimized data rendering logic for large-scale datasets, achieving a 40% improvement in page load performance and measurably improving user retention on the platform.",
    highlights: [
      "40% reduction in page load time",
      "Real-time transaction visualization",
      "Automated report generation",
      "Role-based access UI",
    ],
    // liveUrl: "", // Add when available
    // githubUrl: "", // Add when available
    // imageUrl: "/images/projects/banking-dashboard.png",
    // videoUrl: "/videos/banking-dashboard-demo.mp4",
    featured: true,
    color: "#e8622a",
    year: "2023",
  },
  {
    slug: "ecommerce-platform",
    title: "Multi-Vendor E-Commerce Platform",
    tagline: "A scalable storefront with persistent cart and secure payments.",
    context:
      "A client required a multi-vendor marketplace frontend that could handle complex cart states, multiple vendor product catalogs, and secure payment gateway integration — all without performance degradation.",
    role: "Frontend Developer",
    whatIBuilt:
      "The complete frontend of a multi-vendor e-commerce platform: product catalog, filtering system, persistent shopping cart (Redux Toolkit), payment gateway integration, and vendor dashboards.",
    stack: ["React.js", "Redux Toolkit", "TypeScript", "REST APIs", "Tailwind CSS", "Vercel"],
    outcome:
      "Successfully shipped a production-ready marketplace with zero data-loss bugs in cart persistence across sessions. Reduced prop-drilling complexity significantly through Redux Toolkit centralized state.",
    highlights: [
      "Multi-vendor product catalog",
      "Persistent cart with Redux Toolkit",
      "Secure payment gateway integration",
      "Deployed to production on Vercel",
    ],
    // liveUrl: "",
    // githubUrl: "",
    // imageUrl: "/images/projects/ecommerce.png",
    featured: true,
    color: "#7c6af7",
    year: "2023",
  },
  {
    slug: "sterling-bank-ui",
    title: "Sterling Bank Customer Web App",
    tagline: "Pixel-perfect React components for a top Nigerian bank.",
    context:
      "As a frontend intern at Sterling Bank, I collaborated directly with product designers to build and ship components for the customer-facing web application.",
    role: "Frontend Developer Intern",
    whatIBuilt:
      "A reusable React component library for the bank's customer-facing web app, including account overview UIs, real-time API-powered data displays, and Figma-to-code translations with 100% brand consistency.",
    stack: ["React.js", "JavaScript", "REST APIs", "CSS3", "Figma"],
    outcome:
      "The component library reduced development time for subsequent feature releases by 15%. Passed rigorous code review and participated in Agile sprints from spec to production.",
    highlights: [
      "100% brand consistency from Figma",
      "15% dev time reduction via component library",
      "Real-time account data integration",
      "Agile / code review workflow",
    ],
    // liveUrl: "https://sterling.ng",
    featured: false,
    color: "#22c55e",
    year: "2022",
  },
  // TODO: Add personal/open-source projects with GitHub links as you build them
];

export const experience = [
  {
    title: "Frontend Developer",
    company: "Independent Contractor",
    type: "Remote",
    period: "Jan 2022 – Present",
    summary:
      "Building and shipping production web applications for fintech and e-commerce clients. Full ownership from architecture through deployment.",
    bullets: [
      "Delivered secure banking dashboard with real-time data visualization and automated reporting",
      "Built multi-vendor e-commerce frontend with Redux Toolkit state management",
      "Maintained 99.9% uptime for client dashboards through proactive monitoring and bug resolution",
      "Wrote component and integration tests with Jest and React Testing Library",
      "Facilitated technical stakeholder meetings to translate business requirements into roadmaps",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "Vercel", "Netlify"],
  },
  {
    title: "IT Support Officer",
    company: "NEFM, Ibadan",
    type: "NYSC",
    period: "Jan 2025 – Oct 2025",
    summary:
      "National service placement managing IT infrastructure, identity management, and technical support for 50+ staff.",
    bullets: [
      "Managed IAM workflows: user role configurations, password resets, permission auditing",
      "Provided Tier 1 support for 50+ staff members",
      "Reduced recurring Tier 1 tickets by 20% through documentation and user guides",
    ],
    stack: ["IAM", "Zoho Desk", "Jira", "AnyDesk"],
  },
  {
    title: "Frontend Developer Intern",
    company: "Sterling Bank",
    type: "On-site · Lagos",
    period: "Apr 2022 – Oct 2022",
    summary:
      "Shipped production React components for a leading Nigerian bank's customer-facing web application.",
    bullets: [
      "Translated high-fidelity Figma designs to pixel-perfect responsive UIs",
      "Developed reusable React component library — 15% reduction in dev time",
      "Integrated secure RESTful APIs for real-time account data display",
      "Participated in Agile ceremonies and code reviews",
    ],
    stack: ["React.js", "JavaScript", "REST APIs", "CSS3", "Figma"],
  },
];

export const skills = {
  core: ["TypeScript", "JavaScript (ES6+)", "React.js", "Next.js"],
  stateData: ["Redux Toolkit", "React Query", "REST API Integration", "Firebase"],
  styling: ["Tailwind CSS", "Framer Motion", "GSAP", "Chakra UI", "Bootstrap", "CSS3"],
  tooling: ["Git / GitHub", "Vite", "Webpack", "Vercel", "Netlify", "VS Code"],
  testing: ["Jest", "React Testing Library"],
  backendInfra: ["Firebase", "Sanity CMS", "SQL / MySQL"],
  itSecurity: ["IAM", "Google Cybersecurity", "Zoho Desk", "Jira"],
};

export const certifications = [
  {
    name: "Google Cybersecurity Certificate",
    issuer: "Google / Coursera",
    year: "2024",
    url: "https://coursera.org", // TODO: Replace with actual credential URL
  },
];

export const education = {
  degree: "B.S. Mechanical Engineering",
  school: "Federal University of Technology Akure",
  // year: "", // TODO: Add graduation year if desired
};

export const volunteering = [
  {
    org: "SDG Volunteer – NYSC",
    period: "Dec 2024 – Oct 2025",
    summary:
      "Supported community development aligned with Sustainable Development Goals — youth empowerment, education, and digital awareness.",
  },
  {
    org: "SDGs ACT FUTA",
    period: "May 2022 – Apr 2024",
    summary:
      "Volunteer member working on SDG solutions to make communities safer. Collaborated with high-profile individuals on project completion.",
  },
];
