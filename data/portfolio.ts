// ============================================================
// THE FRONTEND ARC  DATA MODULE (AJ / Anjolaoluwa Onifade)
// Centralized Data Layer for Data-Driven Rendering
// ============================================================

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  productType: "Dashboard" | "E-Commerce" | "Client Portal" | "Landing Page" | "Admin System" | "Ordering Systems" | "Lead Management" | "LPG Commerce" | "Meal Planning & Nutrition" | "Internal Banking System" | "Loan Matching Platform" | "Creative Platform" | "NGO";
  year: string;
  role: string;
  status: string; // e.g., "Internal System", "Public App", "Private Demo", "Real Client Project", "IN DEVELOPMENT", "PRIVATE INTERNAL SYSTEM"
  featured: boolean;
  color: string; // Brand accent hint
  liveUrl?: string;
  githubUrl?: string;
  posterImage: string;
  featureChips?: string[];
  stack: string[];

  // Flexible Case File Sections (Rendered dynamically only when present)
  overview?: string;
  theProduct?: {
    clientPlatform?: string[];
    adminPlatform?: string[];
  };
  theExperience?: {
    landingPage: string[];
    applicationForm: string[];
  };
  digitalExperience?: string[];
  creativeExperience?: string[];
  submissionFlow?: string;
  cmsAndContent?: {
    cms: string;
    features: string[];
  };
  contentAndTrust?: string;
  thePlatform?: {
    role: string;
    roleTag: string;
    description: string;
    highlights: string[];
  }[];
  platformWorkflows?: {
    title: string;
    steps: string[];
  }[];
  adminPlatform?: {
    category: string;
    features: string[];
  }[];
  coreCapabilities?: {
    title: string;
    description: string;
  }[];
  currentStatus?: string;
  myRole?: string;
  whatIBuilt?: { title: string; description: string }[];
  engineering?: { title: string; problem?: string; solution: string }[];
  builtInMotion?: { title: string; caption: string; videoUrl: string; posterUrl: string }[];
  interfaceCarousels?: { title: string; items: { caption: string; imageUrl: string }[] }[];
  interfaceViews?: { caption: string; imageUrl: string }[];
  result?: { metric?: string; summary: string } | string;

  // Legacy fallback aliases for backward compatibility if needed
  featureVideos?: { title: string; caption: string; videoUrl: string; posterUrl: string }[];
  gallery?: { caption: string; imageUrl: string }[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  type: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
}

export interface BuiltDetailFeature {
  id: string;
  title: string;
  category: string;
  description: string;
  posterUrl: string;
  videoUrl: string;
  tags: string[];
}

export const personal = {
  name: "Anjolaoluwa Onifade",
  brandName: "AJ",
  role: "Frontend Engineer",
  tagline: "I build modern web products for businesses.",
  bioShort: "I build modern web products for businesses. Dashboards, client portals, ordering systems, and high-conversion landing pages with React, TypeScript, Next.js, and Tailwind CSS.",
  bioFull: [
    "I enjoy bringing ideas to life. From the first conversation to the final interaction, I like building products that feel intuitive, reliable, and enjoyable to use.",
    "My background is in Mechanical Engineering, where I learned that one decision can influence everything that follows and that mindset shapes how I approach software today. I care about clean architecture, maintainable code, and the small details that make a product feel complete.",
    "I'm also exploring cybersecurity, which has changed the way I think about building applications. Understanding how systems fail has made me more intentional about how they should be designed in the first place.",
    "I enjoy seeing projects through to completion. There's something rewarding about taking an idea from a sketch, solving the challenges along the way, and shipping something that people genuinely enjoy using.",
  ],
  location: "Lagos, Nigeria",
  email: "competentanjola@gmail.com",
  github: "https://github.com/anjyfade1",
  linkedin: "https://www.linkedin.com/in/anjolaoluwa-onifade-8589b91a1",
  availability: "Available for remote roles & contracts worldwide",
  statusBadge: "STATUS: System Online · Open for Build Missions",
};

export const currentArc = {
  title: "Current Arc",
  subtitle: "What I'm focused on right now",
  description: "Currently building high-performance frontend architecture for fintech and e-commerce clients. Focusing on data-dense dashboards, role-based admin portals, and persistent checkout mechanics.",
  focusAreas: [
    { title: "Real-time Dashboards", tag: "Analytics & Data Feeds" },
    { title: "Client & Admin Portals", tag: "Role-Based Access" },
    { title: "Ordering Systems", tag: "State & Payment Flows" },
    { title: "High-Impact Landing Pages", tag: "Lighthouse 95+ Performance" },
  ],
  status: "Available for new projects",
};

export const projects: CaseStudy[] = [
  {
    slug: "leads-profile",
    title: "LeadsProfile",
    tagline: "SaaS platform for lead purchasing, organization, and distribution with dual client and admin platforms.",
    productType: "Lead Management",
    year: "2025-2026",
    role: "Frontend Developer",
    status: "Real Client Project · Rebuilt V1 & V2",
    featured: true,
    color: "#E85A24",
    liveUrl: "https://v2.leadsprofile.com/",
    posterImage: "/images/projects/leads-profile/admin-overview.png",
    stack: ["React", "Vite", "Tailwind CSS", "GSAP", "Matter.js", "Radix UI", "Lucide React"],
    featureChips: [
      " Client Platform",
      " Admin Platform",
      " GSAP + Matter.js Folder",
      " Excel Workflows",
      " Multi-Theme Engine",
      " Analytics Charts",
    ],
    overview: "LeadsProfile is a SaaS platform that allows clients to request, purchase, organize, and manage leads, while providing an administrative platform for uploading, configuring, distributing, and managing leads.\n\nI built the frontend from scratch across both the client and admin platforms, having also built the previous V1 version.",
    theProduct: {
      clientPlatform: [
        "Lead requesting and purchasing",
        "Lead management",
        "Search and filtering",
        "Real-time lead status updates",
        "Excel export",
        "Four-step lead request form",
        "Fulfilment analytics",
        "Weekly, monthly and three-month dashboard views",
        "Dawn / Day / Evening / Night themes",
        "Automatic time-based theme switching",
      ],
      adminPlatform: [
        "Excel lead uploads",
        "Excel column/data configuration",
        "Lead distribution",
        "Client assignment",
        "Approvals and rejections",
        "Lead management",
        "Admin analytics dashboard",
        "Operational charts and overview",
      ],
    },
    whatIBuilt: [
      {
        title: "Data-Heavy Tables",
        description: "Engineered high-density data tables handling hundreds of lead records with instant column sorting, status badges, and selection controls.",
      },
      {
        title: "Search & Filtering",
        description: "Implemented fast client-side query filters by industry, lead quality, date ranges, and assignment status.",
      },
      {
        title: "Multi-Step Workflows",
        description: "Built a structured 4-step lead request wizard with step validation and real-time cost estimations.",
      },
      {
        title: "Dashboard Visualisation",
        description: "Integrated interactive chart components for weekly, monthly, and 3-month lead fulfilment analytics and ops metrics.",
      },
      {
        title: "Theme System",
        description: "Architected a multi-theme engine supporting Dawn, Day, Evening, and Night modes with automatic time-based switching.",
      },
      {
        title: "Excel-Driven Workflows",
        description: "Designed client-side Excel export tools and admin bulk upload suites with dynamic column mapping.",
      },
      {
        title: "Client & Admin Interfaces",
        description: "Structured role-based frontend architecture cleanly separating customer self-service portals from admin control suites.",
      },
    ],
    builtInMotion: [
      {
        title: "Physics-Based Folder Interaction",
        caption: "Physics and motion system using GSAP and Matter.js for tactile folder opening and file drops.",
        videoUrl: "/images/work-video-1.mp4",
        posterUrl: "",
      },
      {
        title: "Client Lead Filtering",
        caption: "Real-time Filtering",
        videoUrl: "/images/projects/leads-profile/leadsvideo-filter.mp4",
        posterUrl: "",
      },
      {
        title: "Admin Lead Request",
        caption: "Four-step lead request and client distribution.",
        videoUrl: "/images/projects/leads-profile/Leadsrequest.mp4",
        posterUrl: "",
      },
    ],
    engineering: [
      {
        title: "Folder Interaction  GSAP + Matter.js",
        solution: "Combined Matter.js rigid-body physics with GSAP motion timelines to create a tactile folder interaction that behaves like a physical folder opening and accepting files.",
      },
      {
        title: "Data-Heavy Lead Tables",
        solution: "Built virtualized table components with debounced search inputs, multi-column sorting, and real-time status management.",
      },
      {
        title: "Excel Workflows & Configuration",
        solution: "Implemented client-side sheet parsing and column configuration logic allowing admins to upload raw lead data, map custom headers, and validate records before distribution.",
      },
      {
        title: "Two-Platform Architecture",
        solution: "Architected a unified design system supporting two distinct user experiences: a streamlined self-service client dashboard and an administrative control panel.",
      },
    ],
    interfaceCarousels: [
      {
        title: "System Interface Views",
        items: [
          {
            caption: "Client Overview Dashboard  Orders pipeline, fulfillment reports, and daytime theme",
            imageUrl: "/images/projects/leads-profile/client-overview.png",
          },
          {
            caption: "Client 'My Leads' Orders Grid  Interactive folder cards and lead progress tracking",
            imageUrl: "/images/projects/leads-profile/client-leads-grid.png",
          },
          {
            caption: "Admin Overview Dashboard  Order revenue analytics, pipeline metrics, and pending approvals",
            imageUrl: "/images/projects/leads-profile/admin-overview.png",
          },
          {
            caption: "Admin Daily Leads Uploads  Batch tracking, total leads analytics, and upload management",
            imageUrl: "/images/projects/leads-profile/admin-uploads.png",
          },
          {
            caption: "Admin Header Configuration Modal  Spreadsheet alias mapping and live header preview",
            imageUrl: "/images/projects/leads-profile/admin-header-mapping.png",
          },
        ],
      },
    ],
    result: "Built the LeadsProfile platform from the ground up across both the client and admin platforms, delivering a complete lead management ecosystem driven by modern frontend engineering.",
  },
  {
    slug: "easy-gas",
    title: "EasyGas",
    tagline: "Multi-role LPG commerce platform connecting customers, vendors, delivery operators, and administrators.",
    productType: "LPG Commerce",
    year: "2023-2024",
    role: "Frontend Developer",
    status: "Private Client Platform · Restricted Access",
    featured: true,
    color: "#3B82F6",
    posterImage: "/images/projects/easy-gas/admin-overview.png",
    stack: ["React", "React Query", "Chakra UI", "Chart.js", "CryptoJS", "Slick Carousel"],
    featureChips: [
      " Customer Marketplace",
      " Vendor Portal",
      " Delivery Operator UI",
      " Admin Ecosystem",
      " Wallet Systems",
      " KYC Verification Guards",
    ],
    overview: "EasyGas is an LPG commerce platform connecting customers, vendors, and delivery operators through dedicated digital experiences.\n\nI worked on the frontend across the customer, vendor, delivery, and administrative platforms, building interfaces and workflows supporting onboarding, verification, purchasing, product management, delivery operations, and wallet-based transactions.",
    thePlatform: [
      {
        role: "CUSTOMER",
        roleTag: "LPG Marketplace & Virtual Account",
        description: "Customers have access to an LPG marketplace where they can browse and purchase gas with dedicated virtual accounts.",
        highlights: [
          "Browse and purchase LPG gas products",
          "Fund and pay via dedicated virtual account",
          "Manage customer dashboard and profile",
          "Verification-gated access (unverified users can access dashboard but cannot complete purchases)",
        ],
      },
      {
        role: "VENDOR",
        roleTag: "Product & Wallet Management",
        description: "Vendors have their own dashboard for managing LPG products and monitoring their commerce activity.",
        highlights: [
          "Add and manage LPG products and prices",
          "Monitor inventory & order fulfillments",
          "Manage platform vendor wallet",
        ],
      },
      {
        role: "DELIVERY",
        roleTag: "Driver Dispatch & Status UI",
        description: "Delivery operators / truck drivers have a dedicated platform for managing delivery requests in real time.",
        highlights: [
          "Accept or decline incoming delivery requests",
          "Real-time delivery status updates",
          "Dedicated driver earnings wallet",
        ],
      },
      {
        role: "ADMIN",
        roleTag: "Ecosystem Operations & KYC Verification",
        description: "The administrative platform manages the wider ecosystem, user verification, and platform operations.",
        highlights: [
          "Review user registrations & submitted KYC documents",
          "Approve, decline, or cancel accounts",
          "Review & approve onboarding and product requests",
          "Manage platform-wide commerce operations",
        ],
      },
    ],
    platformWorkflows: [
      {
        title: "REGISTRATION",
        steps: ["User signs up", "Submits required info/documents", "Admin reviews submitted KYC", "Account approved or declined"],
      },
      {
        title: "ACCOUNT ACCESS",
        steps: ["User registration", "Document verification", "Approved account status", "Full platform access unlocked"],
      },
      {
        title: "CUSTOMER PURCHASE",
        steps: ["Browse LPG marketplace", "Select gas product", "Initiate purchase request", "Payment via virtual account", "Order fulfillment & delivery"],
      },
      {
        title: "DELIVERY",
        steps: ["Order delivery request triggered", "Driver receives request", "Accept or decline option", "Delivery progress updates", "Real-time status synced to customer"],
      },
      {
        title: "PRODUCT MANAGEMENT",
        steps: ["Vendor adds/updates LPG products", "Admin verifies product request", "Product published to marketplace", "Monitor sales & wallet activity"],
      },
      {
        title: "REQUEST VERIFICATION",
        steps: ["User or product request submitted", "Admin queue review", "Document/data validation", "Approval or decline response"],
      },
    ],
    whatIBuilt: [
      {
        title: "Multi-Role Frontend Experiences",
        description: "Architected role-segmented routing and state flows for customers, vendors, delivery operators, and admins.",
      },
      {
        title: "Dashboard Interfaces",
        description: "Built data-dense dashboard views with Chakra UI, Chart.js analytics, and role-specific metrics.",
      },
      {
        title: "Marketplace Interface",
        description: "Designed the LPG gas ordering catalog with dynamic pricing and item selection.",
      },
      {
        title: "Account & Wallet Interfaces",
        description: "Built virtual account payment UI, wallet funding screens, and transaction histories.",
      },
      {
        title: "Verification-Driven Access States",
        description: "Implemented state-driven route guards restricting purchasing functionality until admin document approval.",
      },
      {
        title: "Real-Time Delivery Status UI",
        description: "Built dispatch status components and live order tracking feeds.",
      },
      {
        title: "Data Visualisation",
        description: "Integrated Chart.js canvas components for sales activity and order revenue reporting.",
      },
      {
        title: "Responsive Application Interfaces",
        description: "Developed mobile-friendly layouts for field delivery operators and mobile browser customers.",
      },
      {
        title: "Reusable UI Components",
        description: "Created a modular Chakra UI component system for modals, tables, badges, and form drawers.",
      },
    ],
    interfaceCarousels: [
      {
        title: "System Interface Views",
        items: [
          {
            caption: "Admin Overview Dashboard  Ecosystem metrics, SLA monitoring, onboarding requests, and recent initiated orders",
            imageUrl: "/images/projects/easy-gas/admin-overview.png",
          },
          {
            caption: "Admin KYC & Document Verification  Onboarding request modal, DPR certificate review, and account validation drawer",
            imageUrl: "/images/projects/easy-gas/admin-verification.png",
          },
          {
            caption: "Multi-Role User Registration  User type selection for Filling Plants (Customers), Terminals (Vendors), and Transporters (Delivery)",
            imageUrl: "/images/projects/easy-gas/user-onboarding.png",
          },
          {
            caption: "Vendor Depot Dashboard  Revenue reporting analysis, active product pricing controls, and ongoing order tracking",
            imageUrl: "/images/projects/easy-gas/vendor-dashboard.png",
          },
          {
            caption: "Orders & Delivery Fulfillment  Outgoing orders grid, customer details, delivery status, and invoice PDF preview",
            imageUrl: "/images/projects/easy-gas/orders-fulfillment.png",
          },
        ],
      },
    ],
    result: "EasyGas was a multi-role LPG commerce platform requiring different frontend experiences for customers, vendors, delivery operators, and administrators.",
  },
  {
    slug: "planned-rations",
    title: "PlannedRations",
    tagline: "Personalized meal-planning and nutrition platform helping individuals make better food choices based on their goals.",
    productType: "Meal Planning & Nutrition",
    year: "2025-2026",
    role: "Frontend Developer",
    status: "IN DEVELOPMENT",
    featured: true,
    color: "#10B981",
    liveUrl: "https://plannedrations.com/",
    posterImage: "/images/projects/planned-rations/admin-dashboard.png",
    stack: ["React", "Vite", "Tailwind CSS", "Recharts", "Swiper.js", "GSAP"],
    featureChips: [
      "Landing Page",
      "Nutrition Blog",
      "Admin Dashboard",
      "Member Analytics",
      "CSV Data Export",
      "Recipe Management",
    ],
    overview: "PlannedRations is a personalized meal-planning and nutrition platform designed to help people make better food choices based on their individual goals and needs.\n\nThe wider product is being developed as a mobile application.\n\nMy work has focused on the public-facing website/landing page and the administrative platform that supports the product.",
    theProduct: {
      clientPlatform: [
        "Public product landing page introducing PlannedRations and its mission",
        "Interactive nutrition blog and article reader interface",
        "Health & nutrition content repository",
      ],
      adminPlatform: [
        "Internal administrative dashboard for monitoring platform and user activity",
        "Member analytics and user registration tracking",
        "Content publishing tools for blog posts, articles, and meal recipes",
      ],
    },
    adminPlatform: [
      {
        category: "ANALYTICS & MONITORING",
        features: [
          "Active users & membership growth tracking",
          "Product and user activity metrics",
          "Interactive dashboard visualisations powered by Recharts",
        ],
      },
      {
        category: "DATA MANAGEMENT",
        features: [
          "Export member data and analytics in CSV format",
          "Review and filter relevant platform datasets",
        ],
      },
      {
        category: "CONTENT MANAGEMENT",
        features: [
          "Write, edit, and manage blog posts",
          "Create and publish health articles",
          "Configure and manage healthy meal recipes",
        ],
      },
    ],
    whatIBuilt: [
      {
        title: "Responsive Landing Page",
        description: "Developed interactive marketing sections and responsive product showcases.",
      },
      {
        title: "Blog & Article Interface",
        description: "Built the public nutrition blog UI and article content reader experience.",
      },
      {
        title: "Administrative Dashboard",
        description: "Engineered internal dashboard views for member data monitoring and analytics.",
      },
      {
        title: "Data Visualisation",
        description: "Integrated Recharts components for active user tracking and membership trends.",
      },
      {
        title: "User & Member Monitoring",
        description: "Built search and filter tools for tracking registered platform members and activity.",
      },
      {
        title: "CSV Data Export",
        description: "Implemented client-side data export tools for administrative analytics.",
      },
      {
        title: "Content & Recipe Management",
        description: "Created publishing tools for writing blog posts, articles, and meal recipes.",
      },
    ],
    interfaceCarousels: [
      {
        title: "System Interface Views",
        items: [
          {
            caption: "Admin Analytics Dashboard  Active subscriber tracking, user growth bar charts, user tier distribution & top content performance",
            imageUrl: "/images/projects/planned-rations/admin-dashboard.png",
          },
          {
            caption: "Public Landing Page Hero  Product positioning, App Store / Google Play badges, navigation header & mobile preview",
            imageUrl: "/images/projects/planned-rations/landing-hero.png",
          },
          {
            caption: "Admin Food Library & Recipe Manager  Searchable recipe catalog, calorie calculations, cooking steps & difficulty indicators",
            imageUrl: "/images/projects/planned-rations/recipe-manager.png",
          },
          {
            caption: "Public Nutrition Blog & Content Hub  Article directory, topic search, and published healthy lifestyle guides",
            imageUrl: "/images/projects/planned-rations/public-blog.png",
          },
        ],
      },
    ],
    result: "PlannedRations is an actively developing personalized nutrition product where I have built the public web experience and internal administrative platform.",
  },
  {
    slug: "banking-dashboard",
    title: "Banking Internal Operations Platform",
    tagline: "Internal banking operations platform for administrative user, account, and transaction controls.",
    productType: "Internal Banking System",
    year: "2024-2025",
    role: "Frontend Developer",
    status: "PRIVATE INTERNAL SYSTEM",
    featured: false,
    color: "#10B981",
    posterImage: "/images/projects/banking-dashboard/overview.png",
    stack: ["React", "Chakra UI", "Chart.js", "React Query", "CryptoJS"],
    featureChips: [
      " Private Internal System",
      " User Management",
      " Account Controls",
      " Transaction Limits",
      " Role-Based Access",
    ],
    overview: "This was an internal banking operations platform used by administrative teams to manage users, accounts, transactions, and operational controls.\n\nThe system included different administrative roles, including Admin and Superadmin.\n\nI contributed to the frontend experience across these administrative workflows.",
    coreCapabilities: [
      {
        title: "USER MANAGEMENT",
        description: "Administrative tools for managing platform users and their associated account information.",
      },
      {
        title: "ACCOUNT CONTROLS",
        description: "Tools for configuring virtual account setup and account-level limits.",
      },
      {
        title: "TRANSACTION CONTROLS",
        description: "Administrative controls for setting and managing transaction limits.",
      },
      {
        title: "DATA OPERATIONS",
        description: "Search, filtering, and data export functionality for working with operational records.",
      },
      {
        title: "ADMINISTRATION",
        description: "Separate Admin and Superadmin experiences for managing different levels of administrative responsibility.",
      },
    ],
    whatIBuilt: [
      {
        title: "Data-Heavy Dashboard Interfaces",
        description: "Engineered high-density dashboard layouts handling operational metrics, real-time status badges, and transaction tables.",
      },
      {
        title: "Search & Filtering Experiences",
        description: "Built fast client-side query filters for searching transaction reference IDs, dates, user IDs, and transaction statuses.",
      },
      {
        title: "Data Export Workflows",
        description: "Implemented structured CSV and report export tools for administrative recordkeeping.",
      },
      {
        title: "Dashboard Visualisations",
        description: "Integrated Chart.js donut and bar charts for account type distribution and transaction volume tracking.",
      },
      {
        title: "Role-Based Administrative Experiences",
        description: "Structured role-segmented views separating standard Admin functions from Superadmin privileges.",
      },
      {
        title: "Account & Transaction Management",
        description: "Built interfaces for virtual account configuration, account limit adjustments, and credit/debit audit logs.",
      },
      {
        title: "Reusable UI Components",
        description: "Created modular Chakra UI component patterns for status badges, metrics cards, modals, and data tables.",
      },
    ],
    interfaceCarousels: [
      {
        title: "Dashboard Overview",
        items: [
          {
            caption: "High-level overview of the internal banking operations dashboard.",
            imageUrl: "/images/projects/banking-dashboard/overview.png",
          },
        ],
      },
    ],
    result: "Demonstrated production-grade internal banking interface engineering while respecting the confidential nature of the system.",
  },
  {
    slug: "your-credit-pal",
    title: "YourCreditPal",
    tagline: "Conversion-focused loan-matching platform connecting users with loan opportunities through a structured application experience.",
    productType: "Loan Matching Platform",
    year: "2026",
    role: "Frontend Developer",
    status: "Public Platform",
    featured: false,
    color: "#2563EB",
    liveUrl: "https://www.yourcreditpal.com/",
    posterImage: "/images/projects/your-credit-pal/application-form.png",
    stack: ["React", "GSAP", "Tailwind CSS", "Framer Motion"],
    featureChips: [
      " Landing Page",
      " Multi-Step Application",
      " Form State Validation",
      " Responsive Layouts",
      " Content & Blog Hub",
    ],
    overview: "YourCreditPal is a loan-matching platform that helps users explore loan opportunities by completing a quick application and providing information used to match them with potential lenders.\n\nThe frontend experience focuses on making the application process clear, approachable, and easy to complete.",
    theExperience: {
      landingPage: [
        "Conversion-focused value proposition explaining the loan exploration service",
        "Clear call-to-action triggers guiding users directly into the loan application flow",
        "Responsive layout optimized for mobile and desktop conversions",
      ],
      applicationForm: [
        "Structured multi-step progression guiding users through information entry",
        "Form input handling with real-time field state and validation feedback",
        "Visual progress tracking to maintain user clarity through the application steps",
        "Responsive form architecture built for accessible mobile input",
      ],
    },
    contentAndTrust: "The website includes a dedicated blog and content repository providing supporting financial information around loan matching, credit tips, and service FAQs, forming an essential component of the wider user experience.",
    whatIBuilt: [
      {
        title: "Conversion-Focused Landing Page",
        description: "Built hero sections, feature value blocks, and interactive CTA triggers encouraging application initiation.",
      },
      {
        title: "Multi-Step Application Flow",
        description: "Engineered structured form step transitions with state retention across application screens.",
      },
      {
        title: "Form State & Validation",
        description: "Implemented real-time input validation, error handling, and field step requirements.",
      },
      {
        title: "Responsive Interface Architecture",
        description: "Crafted accessible mobile-first form controls and responsive layout grids.",
      },
      {
        title: "Reusable Frontend Components",
        description: "Created modular UI patterns for step indicators, form inputs, selection cards, and action buttons.",
      },
      {
        title: "Blog & Content Hub Interface",
        description: "Developed article directory views and content reader templates for supporting guides.",
      },
    ],
    interfaceCarousels: [
      {
        title: "System Interface Views",
        items: [
          {
            caption: "Multi-Step Loan Application Flow  Structured step progression (Loan, Personal, Financial, Housing), borrow slider ($1k“$35k), purpose selection chips, credit score selection, and user testimonial sidebar",
            imageUrl: "/images/projects/your-credit-pal/application-form.png",
          },
          {
            caption: "Public Landing Page Hero  Conversion hero section ('Find Loan Offers That Match Your Needs'), main CTA trigger ('See My Personal Loan Options'), and header navigation",
            imageUrl: "/images/projects/your-credit-pal/landing-hero.png",
          },
          {
            caption: "FAQ & Support Center  Categorized accordion questions (Applications, Loan Process, Eligibility, Security & Privacy, Repayment) and lender matching disclosures",
            imageUrl: "/images/projects/your-credit-pal/faq-support.png",
          },
        ],
      },
    ],
    result: "Built a conversion-focused financial services website and multi-step application experience guiding users cleanly through submitting their loan matching information.",
  },
  {
    slug: "hoc",
    title: "House of Creatives",
    tagline: "Media-rich creative agency platform connecting influencers, creators, and bold brands.",
    productType: "Creative Platform",
    year: "2025",
    role: "Frontend Developer",
    status: "Public Platform",
    featured: true,
    color: "#E11D48",
    liveUrl: "https://hocagency.co.uk/",
    posterImage: "/images/projects/hoc/hero-landing.png",
    stack: ["Sanity", "React Parse", "Firebase", "React", "Vite", "Tailwind CSS", "Framer Motion", "Swiper", "Embla Carousel"],
    featureChips: [
      " Media-Rich Hero",
      " Influencer & Brand Ecosystem",
      " Sanity CMS Content",
      " Interactive Mobile Showcase",
      " Connected Submission Flow",
    ],
    overview: "HOC (House of Creatives) is a creative platform designed to connect creatives with opportunities and allow brands to engage with the creative network.\n\nI built the frontend experience for the website, including the highly visual landing experience, animations, content-driven case studies and blog, and the submission form.",
    creativeExperience: [
      "Video-heavy visual presentation and high-impact media layouts",
      "Image-driven sections showcasing creative talent and brand partnerships",
      "Interactive animations and motion effects using Framer Motion",
      "Smooth page transitions and responsive layout structures",
      "Creative portfolio presentation for brand-focused visual storytelling",
    ],
    submissionFlow: "The submission flow was connected to the project's data and communication workflow, allowing submitted information to be captured, routed, and delivered to the client.",
    cmsAndContent: {
      cms: "Sanity CMS",
      features: [
        "Dynamic blog posts & creative article repository",
        "CMS-driven case study showcases",
        "Rich text rendering formatted via React Parse / Block Content",
        "Structured content presentation for brand stories",
      ],
    },
    whatIBuilt: [
      {
        title: "Animation-Heavy Frontend Experience",
        description: "Engineered motion effects, interactive floating icons, and smooth section transitions.",
      },
      {
        title: "Media-Rich Layouts",
        description: "Built hero sections, dual-audience value propositions, and interactive mobile showcases.",
      },
      {
        title: "CMS-Driven Content Engine",
        description: "Integrated Sanity CMS and React Parse for dynamic blog posts and structured case study publishing.",
      },
      {
        title: "Structured Submission Form",
        description: "Created client and creator intake forms connected to data capturing and client routing.",
      },
      {
        title: "Responsive Component System",
        description: "Crafted mobile-optimized cards, video overlays, and interactive carousel modules.",
      },
    ],
    interfaceCarousels: [
      {
        title: "System Interface Gallery",
        items: [
          {
            caption: "Landing Page Hero  'HOUSE OF CREATIVES' header, floating animation icons, and primary navigation",
            imageUrl: "/images/projects/hoc/hero-landing.png",
          },
          {
            caption: "Dual Audience Split  'Work With HOC' for brands and 'Join as a Creator' for bold creative voices",
            imageUrl: "/images/projects/hoc/creative-audience.png",
          },
          {
            caption: "Interactive Mobile Showcase  'Ready to Create with HOC?' with live social metrics (@thehocmgt 678.2k followers)",
            imageUrl: "/images/projects/hoc/mobile-showcase.png",
          },
          {
            caption: "Featured Case Studies & Brand Showcase  Creator video story player and brand feature CTA ('Infinix')",
            imageUrl: "/images/projects/hoc/case-studies-brands.png",
          },
        ],
      },
    ],
    result: "Combined animation-heavy frontend development, media presentation, CMS-driven content, and a connected submission experience into a polished creative platform.",
  },
  {
    slug: "tuyen-legacy-foundation",
    title: "Tuyen Legacy Foundation for Girls",
    tagline: "Empowering women and girls through initiatives supporting their growth, learning, opportunities, and dreams.",
    productType: "NGO",
    year: "2026",
    role: "Frontend Developer",
    status: "Public Platform",
    featured: false,
    color: "#0EA5E9",
    liveUrl: "https://www.tuyenlegacy.com/",
    posterImage: "/images/projects/tuyen/homepage-hero.png",
    stack: ["React", "Tailwind CSS", "GSAP", "Sanity"],
    featureChips: [
      " Mission Storytelling",
      " Initiatives Showcase",
      " Volunteer Onboarding",
      " Donation Pathways",
      " Sanity CMS Content",
    ],
    overview: "Tuyen Legacy Foundation for Girls is an NGO focused on empowering women and girls through initiatives that support their growth, learning, opportunities, and ability to pursue their goals.\n\nThe website was built to communicate the organization's mission, showcase its work and initiatives, and provide ways for people to engage through activities such as donating and volunteering.",
    digitalExperience: [
      "Mission and impact storytelling communicating foundation values and vision",
      "Presentation of initiatives and completed community programs",
      "Clear engagement pathways for donation actions and volunteer sign-ups",
      "Mentorship and event support volunteer onboarding structures",
      "Responsive navigation and clear call-to-action triggers across all viewports",
    ],
    cmsAndContent: {
      cms: "Sanity CMS",
      features: [
        "Dynamic updates for initiatives and completed foundation programs",
        "CMS-driven news and blog section maintained without hardcoding content",
        "Structured content presentation for foundation announcements",
      ],
    },
    whatIBuilt: [
      {
        title: "React-Based Frontend Architecture",
        description: "Engineered clean, componentized React views focused on clear mission communication.",
      },
      {
        title: "GSAP-Powered Animations",
        description: "Implemented smooth motion effects and scroll animations using GSAP.",
      },
      {
        title: "Responsive Styling with Tailwind CSS",
        description: "Crafted accessible, mobile-first layouts with custom typography and color schemes.",
      },
      {
        title: "CMS-Driven Content Experience",
        description: "Integrated Sanity CMS to manage blog articles, program updates, and initiative media dynamically.",
      },
      {
        title: "Interactive Engagement Pathways",
        description: "Built prominent CTA buttons for 'Donate Now' and 'Become a Volunteer'.",
      },
    ],
    interfaceCarousels: [
      {
        title: "System Interface Gallery",
        items: [
          {
            caption: "Homepage Hero  'We Back Her Future' mission header, primary CTAs ('Donate Now', 'Become A Volunteer'), and hero media banner",
            imageUrl: "/images/projects/tuyen/homepage-hero.png",
          },
          {
            caption: "Volunteer With Us  Engagement section detailing Mentorship, Event Support, and Administrative volunteering pathways",
            imageUrl: "/images/projects/tuyen/volunteer-section.png",
          },
          {
            caption: "Completed Programs Showcase  'Northern Girls Literacy Initiative' program card with completion date and details link",
            imageUrl: "/images/projects/tuyen/programs-showcase.png",
          },
        ],
      },
    ],
    result: "A responsive, animation-rich NGO website designed to communicate the foundation's mission, showcase its initiatives, and make it easier for visitors to engage through volunteering and donations.",
  },
  {
    slug: "fairloans-nulldebt",
    title: "Fairloans & Nulldebt",
    tagline: "A three-brand loan website suite for Fairloans America, Fairloans Canada, and Nulldebt.",
    productType: "Landing Page",
    year: "2025",
    role: "Frontend Developer",
    status: "Websites no longer live",
    featured: false,
    color: "#1F7180",
    posterImage: "/images/projects/fairloans-nulldebt/screen-6.jpeg",
    stack: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    featureChips: [
      " Three Brand Websites",
      " Conversion Landing Pages",
      " Responsive Bootstrap Layouts",
      " Interactive JavaScript",
    ],
    overview: "Fairloans & Nulldebt was a three-brand web build for Fairloans America, Fairloans Canada, and Nulldebt. Each public-facing site needed to make a loan journey easy to understand while keeping the visual language and conversion paths suited to its market.\n\nI built the frontend with HTML, CSS, Bootstrap, and vanilla JavaScript, translating the distinct brand directions into responsive landing pages with clear loan application calls to action.",
    theProduct: {
      clientPlatform: [
        "Fairloans America loan landing page",
        "Fairloans Canada loan landing page",
        "Nulldebt consumer loan website",
        "Clear application and loan enquiry calls to action",
        "Responsive layouts for desktop and mobile visitors",
        "Trust, credit-score, and FAQ content areas",
      ],
    },
    whatIBuilt: [
      {
        title: "Three-Brand Frontend Build",
        description: "Developed distinct responsive web experiences for the Fairloans America, Fairloans Canada, and Nulldebt brands while retaining consistent conversion-focused structure.",
      },
      {
        title: "Bootstrap Responsive Layouts",
        description: "Used Bootstrap's grid and utility system to create layouts that adapt cleanly from wide marketing screens to mobile viewports.",
      },
      {
        title: "Conversion-Focused Landing Pages",
        description: "Implemented prominent application CTAs, benefit-led hero sections, trust signals, credit-score prompts, and simple next-step paths.",
      },
      {
        title: "Interactive JavaScript Details",
        description: "Added lightweight JavaScript interactions to support navigation and the expandable FAQ content without a frontend framework.",
      },
    ],
    interfaceCarousels: [
      {
        title: "Fairloans & Nulldebt Website Suite",
        items: [
          {
            caption: "Fairloans promotional banner — quick-loan messaging, application CTA, and branded graphic treatment.",
            imageUrl: "/images/projects/fairloans-nulldebt/screen-1.jpeg",
          },
          {
            caption: "Fairloans America — payday-loan landing page with approval and credit-alert visual cues.",
            imageUrl: "/images/projects/fairloans-nulldebt/screen-2.jpeg",
          },
          {
            caption: "Fairloans Canada — flexible financing hero and credit-score callout.",
            imageUrl: "/images/projects/fairloans-nulldebt/screen-3.jpeg",
          },
          {
            caption: "Nulldebt FAQ and footer — expandable support content and brand information.",
            imageUrl: "/images/projects/fairloans-nulldebt/screen-4.jpeg",
          },
          {
            caption: "Nulldebt process section — clear three-step loan journey from application to funds.",
            imageUrl: "/images/projects/fairloans-nulldebt/screen-5.jpeg",
          },
          {
            caption: "Nulldebt landing page — Canadian payday-loan hero with credit-score CTA.",
            imageUrl: "/images/projects/fairloans-nulldebt/screen-6.jpeg",
          },
        ],
      },
    ],
    currentStatus: "This was a client project for a three-brand loan company. The websites are no longer live, so this case study preserves selected screens from the original work rather than linking to a production site.",
    result: "Delivered responsive, conversion-led public websites for the Fairloans America, Fairloans Canada, and Nulldebt brands using HTML, CSS, Bootstrap, and vanilla JavaScript.",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Frontend Engineer",
    company: "Independent Contractor",
    location: "Remote",
    type: "Contract / Freelance",
    period: "Jan 2022 - Present",
    summary: "Architecting and shipping production web applications for fintech, e-commerce, and enterprise business clients. End-to-end frontend ownership from initial spec to deployment.",
    bullets: [
      "Delivered secure banking intelligence dashboard with real-time transaction monitoring and automated PDF/CSV reporting.",
      "Engineered multi-vendor marketplace storefront with Redux Toolkit cart persistence layer and multi-step checkout.",
      "Maintained 99.9% uptime and zero data-loss state reliability across client production builds.",
      "Wrote unit and integration tests with Jest and React Testing Library to prevent regression bugs.",
      "Collaborated directly with product managers, stakeholders, and backend engineers to define API schemas.",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Vercel"],
  },
  {
    title: "IT Support Officer",
    company: "NEFM",
    location: "Ibadan, Nigeria",
    type: "NYSC Placement",
    period: "Jan 2025 - Oct 2025",
    summary: "Managed IT infrastructure, identity access management (IAM), technical support, and user security workflows for 50+ staff members.",
    bullets: [
      "Configured IAM workflows, user access roles, password security policies, and permission audits.",
      "Provided Tier 1 and Tier 2 technical support, resolving hardware, networking, and software tickets.",
      "Reduced recurring Tier 1 support tickets by 20% by authoring comprehensive internal documentation and user guides.",
    ],
    stack: ["IAM", "Google Cybersecurity", "Zoho Desk", "Jira", "Network Infrastructure"],
  },
  {
    title: "Frontend Developer Intern",
    company: "Sterling Bank",
    location: "Lagos, Nigeria",
    type: "Internship",
    period: "Apr 2022 - Oct 2022",
    summary: "Built reusable React UI components for the bank's customer-facing web application in an Agile team environment.",
    bullets: [
      "Translated high-fidelity Figma designs into pixel-perfect, responsive React components with 100% brand consistency.",
      "Developed a centralized component library that reduced feature development time for subsequent sprint releases by 15%.",
      "Integrated RESTful APIs for real-time account balances, transaction history, and user verification displays.",
      "Participated actively in daily Agile standups, sprint planning, and peer code reviews.",
    ],
    stack: ["React.js", "JavaScript", "REST APIs", "CSS3", "Figma"],
  },
];

export const loadout = {
  core: [
    { name: "React", level: "Primary", description: "Component architecture, hooks, performance optimization" },
    { name: "TypeScript", level: "Primary", description: "Strict type safety, generics, schema contracts" },
    { name: "Next.js", level: "Primary", description: "App Router, static export, SSR/SSG patterns" },
    { name: "Tailwind CSS", level: "Primary", description: "v4 design tokens, custom utility systems" },
    { name: "Bootstrap", level: "Core", description: "Responsive grid systems and production UI patterns" },
    { name: "JavaScript (ES6+)", level: "Core", description: "Async/await, DOM APIs, event loop mechanics" },
  ],
  stateData: [
    { name: "Redux Toolkit", description: "Centralized state, normalized stores, middleware" },
    { name: "React Query", description: "Server state caching, optimistic updates, query invalidation" },
    { name: "RESTful API Integration", description: "Fetch/Axios, endpoint integration, error handling" },
    { name: "Sanity CMS", description: "Structured content modelling and headless CMS integration" },
    { name: "Firebase", description: "Authentication, Firestore database, hosting" },
  ],
  stylingMotion: [
    { name: "Framer Motion", description: "Layout morphing, page transitions, gestures" },
    { name: "GSAP", description: "Timeline choreography, 3D cursor tracking lerp" },
    { name: "Radix UI", description: "100% accessible unstyled DOM primitives" },
    { name: "CSS", description: "CSS Grid, Flexbox, custom variables, responsive layouts" },
    { name: "WordPress", description: "Content-managed websites and theme integration" },
    { name: "Elementor", description: "WordPress page-building workflows and custom frontend work" },
  ],
  toolchain: [
    { name: "Git / GitHub", description: "Version control, branching, PR workflows" },
    { name: "Vite", description: "Fast local development, bundle building" },
    { name: "npm", description: "Package management, scripts, and dependency workflows" },
    { name: "Vercel", description: "CI/CD, serverless deployments, and frontend hosting" },
    { name: "Netlify", description: "Static hosting, deployments, and build automation" },
    { name: "VS Code", description: "Primary IDE, custom snippet workflows" },
  ],
  testing: [
    { name: "Jest", description: "Unit testing, mock functions" },
    { name: "React Testing Library", description: "Component integration testing, DOM assertions" },
  ],
  securityIt: [
    { name: "IAM Workflows", description: "Role-based access, permission auditing" },
  ],
};

export const builtDetailFeatures: BuiltDetailFeature[] = [
  {
    id: "search-filtering",
    title: "Instant Search & Multi-Facet Filtering",
    category: "Data Systems",
    description: "Debounced real-time search with URL parameter synchronization and multi-category filtering.",
    posterUrl: "/images/features/search-poster.jpg",
    videoUrl: "/videos/features/search-filtering.mp4",
    tags: ["React", "TypeScript", "URLSearchParams"],
  },
  {
    id: "pagination-scroll",
    title: "Client-Side Slicing & Pagination",
    category: "Performance",
    description: "Virtualized table pagination with zero render lag across 10,000+ data records.",
    posterUrl: "/images/features/pagination-poster.jpg",
    videoUrl: "/videos/features/pagination.mp4",
    tags: ["React", "TypeScript", "Virtualization"],
  },
  {
    id: "protected-routes",
    title: "Protected Routes & Auth Redirects",
    category: "Security",
    description: "Permission-guarded route boundaries with automatic token validation and silent redirect flow.",
    posterUrl: "/images/features/auth-poster.jpg",
    videoUrl: "/videos/features/protected-routes.mp4",
    tags: ["Next.js", "TypeScript", "IAM"],
  },
  {
    id: "checkout-persistence",
    title: "Persistent Checkout & Cart State",
    category: "E-Commerce",
    description: "Multi-item shopping cart state preserved across sessions with dynamic tax and shipping calculation.",
    posterUrl: "/images/features/checkout-poster.jpg",
    videoUrl: "/videos/features/checkout-flow.mp4",
    tags: ["React", "Redux Toolkit", "Local Cache"],
  },
  {
    id: "dashboard-charts",
    title: "Interactive Financial Analytics Charts",
    category: "Visualization",
    description: "Chart.js canvas visualizations with custom tooltips, zoom intervals, and dynamic dataset toggling.",
    posterUrl: "/images/features/charts-poster.jpg",
    videoUrl: "/videos/features/dashboard-charts.mp4",
    tags: ["Chart.js", "React", "TypeScript"],
  },
  {
    id: "admin-publishing",
    title: "Admin Content Publishing & Role Matrix",
    category: "Admin Systems",
    description: "Live form validation, role-based edit matrix, and instant content status updating.",
    posterUrl: "/images/features/admin-poster.jpg",
    videoUrl: "/videos/features/admin-publishing.mp4",
    tags: ["Radix UI", "React", "Tailwind"],
  },
  {
    id: "responsive-layouts",
    title: "Fluid Responsive Drawer & Layouts",
    category: "UI Architecture",
    description: "Break-point responsive drawers, mobile bottom sheets, and fluid CSS grid alignment.",
    posterUrl: "/images/features/responsive-poster.jpg",
    videoUrl: "/videos/features/responsive-layouts.mp4",
    tags: ["Tailwind CSS", "Framer Motion"],
  },
  {
    id: "tactile-animations",
    title: "Tactile Product UI Micro-Animations",
    category: "Interactions",
    description: "Hardware-accelerated CSS & GSAP micro-interactions for buttons, toggles, and status updates.",
    posterUrl: "/images/features/animation-poster.jpg",
    videoUrl: "/videos/features/animations.mp4",
    tags: ["GSAP", "Framer Motion", "CSS3"],
  },
];

export const education = {
  degree: "B.S. Mechanical Engineering",
  school: "Federal University of Technology Akure (FUTA)",
  note: "Trained in systems thinking, thermodynamics, structural mechanics, and constraint trade-off optimization.",
};

export const certifications = [
  {
    name: "Google Cybersecurity Certificate",
    issuer: "Google / Coursera",
    year: "2024",
    url: "https://coursera.org",
  },
];
