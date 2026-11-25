export interface ResourceFeature {
  title: string;
  desc: string;
  icon: "layers" | "code" | "smartphone" | "cpu" | "terminal" | "shield" | "type" | "globe";
  tag: string;
}

export interface ResourceFileItem {
  name: string;
  size: string;
  icon: "file" | "code" | "folder" | "type" | "smartphone";
}

export interface ResourceGalleryItem {
  label: string;
  img: string;
}

export interface Resource {
  id: string;
  title: string;
  version: string;
  category: "fonts" | "open-source" | "apps";
  categoryLabel: string;
  description: string;
  longDescription?: string;
  author: string;
  format: string;
  fileSize: string;
  downloadUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  previewMain?: string;
  gallery?: ResourceGalleryItem[];
  features?: ResourceFeature[];
  filesIncluded?: ResourceFileItem[];
  isTypographyCard?: boolean;
  fontPreviewFamily?: string;
  fontSampleText?: string;
  fontStylesList?: string[];
  featured?: boolean;
  tags: string[];
  sha256?: string;
  packageCommand?: string;
  downloadCount?: string;
  updatedAt?: string;
  releaseTag?: string;
  license?: string;
}

export interface ResourceCategory {
  id: "all" | "fonts" | "open-source" | "apps";
  label: string;
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  { id: "all", label: "All" },
  { id: "fonts", label: "Fonts" },
  { id: "open-source", label: "Open Source" },
  { id: "apps", label: "Apps & APKs" },
];

export const resourcesData: Resource[] = [
  {
    id: "intranet-font-family",
    title: "IntraNet Display Family",
    version: "4 Weights",
    category: "fonts",
    categoryLabel: "Fonts",
    description: "The geometric brutalist display typeface powering agnelfrancis.com headings — includes Regular, Bold, Italic, and Outline OTFs.",
    longDescription: "The signature display typeface used across Agnel Francis's main portfolio. Engineered for bold architectural headers, high-impact hero typography, and sharp brutalist posters.",
    author: "Agnel Vault",
    format: "OTF • 4 Styles",
    fileSize: "87 KB",
    downloadUrl: "/resources/downloads/intranet-font-family.zip",
    isTypographyCard: true,
    fontPreviewFamily: "VaultPreviewIntraNet",
    fontSampleText: "DESIGN & CODE",
    fontStylesList: ["Regular", "Bold", "Italic", "Outline"],
    featured: true,
    tags: ["Display Font", "OTF", "Portfolio Font", "Geometric", "Headings"],
    packageCommand: "curl -O https://agnelfrancis.com/resources/downloads/intranet-font-family.zip",
    updatedAt: "Portfolio Production Font",
    releaseTag: "Active Portfolio Typeface",
    license: "Free Personal & Web Use",
    features: [
      {
        title: "4 Distinct OTF Weights",
        desc: "Includes IntraNet-Regular.otf, IntraNet-Bold.otf, IntraNet-Italic.otf, and IntraNet-Outline.otf for layered display compositions.",
        icon: "type",
        tag: "OpenType (.otf)",
      },
      {
        title: "Built for Display Scale",
        desc: "Wide geometric proportions calibrated for hero headlines, section markers, and dark-mode contrast.",
        icon: "layers",
        tag: "Used on agnelfrancis.com",
      },
    ],
    filesIncluded: [
      { name: "IntraNet-Regular.otf", size: "71.6 KB", icon: "type" },
      { name: "IntraNet-Bold.otf", size: "66.7 KB", icon: "type" },
      { name: "IntraNet-Italic.otf", size: "38.5 KB", icon: "type" },
      { name: "IntraNet-Outline.otf", size: "103.9 KB", icon: "type" },
    ],
  },
  {
    id: "ppsupply-typeface",
    title: "PP Supply Mono & Sans",
    version: "4 Styles",
    category: "fonts",
    categoryLabel: "Fonts",
    description: "Technical Swiss monospace & neo-grotesque sans pair used for UI labels, navigation, metadata, and code blocks across the portfolio.",
    longDescription: "A precision technical typeface pairing Mono and Sans weights in Regular and Ultralight cuts. Used extensively throughout Agnel Francis's portfolio for navigation, tags, terminal readouts, and system labels.",
    author: "Agnel Vault",
    format: "OTF • Mono & Sans",
    fileSize: "85 KB",
    downloadUrl: "/resources/downloads/ppsupply-typeface.zip",
    isTypographyCard: true,
    fontPreviewFamily: "VaultPreviewPPSupply",
    fontSampleText: "01.SYSTEM_READY",
    fontStylesList: ["Mono Regular", "Mono Ultralight", "Sans Regular", "Sans Ultralight"],
    featured: true,
    tags: ["Monospace", "Sans", "OTF", "UI Font", "Developer"],
    packageCommand: "curl -O https://agnelfrancis.com/resources/downloads/ppsupply-typeface.zip",
    updatedAt: "Portfolio UI Font",
    releaseTag: "Mono + Sans Bundle",
    license: "Free Personal & Evaluation",
    features: [
      {
        title: "Monospace & Sans Pair",
        desc: "Combines fixed-width PPSupplyMono for telemetry/code with clean PPSupplySans for crisp interface copy.",
        icon: "code",
        tag: "Dual-family archive",
      },
      {
        title: "Ultralight & Regular Cuts",
        desc: "Includes both Regular and Ultralight weights for subtle hierarchy in dark minimalist UIs.",
        icon: "type",
        tag: "4 OTF files",
      },
    ],
    filesIncluded: [
      { name: "PPSupplyMono-Regular.otf", size: "23.4 KB", icon: "type" },
      { name: "PPSupplyMono-Ultralight.otf", size: "24.2 KB", icon: "type" },
      { name: "PPSupplySans-Regular.otf", size: "44.6 KB", icon: "type" },
      { name: "PPSupplySans-Ultralight.otf", size: "47.0 KB", icon: "type" },
    ],
  },
  {
    id: "aise-display",
    title: "Aise Body & Display",
    version: "v1.0 OTF",
    category: "fonts",
    categoryLabel: "Fonts",
    description: "Clean contemporary sans-serif font used for portfolio body copy, descriptions, and readable long-form layouts.",
    longDescription: "A balanced sans-serif typeface tailored for clean screen legibility, portfolio case studies, and minimal editorial layouts.",
    author: "Agnel Vault",
    format: "OTF • Single Cut",
    fileSize: "21 KB",
    downloadUrl: "/resources/downloads/aise-display.zip",
    isTypographyCard: true,
    fontPreviewFamily: "VaultPreviewAise",
    fontSampleText: "Minimal Clarity",
    fontStylesList: ["Regular OTF"],
    tags: ["Sans-Serif", "Body Font", "OTF", "Portfolio"],
    packageCommand: "curl -O https://agnelfrancis.com/resources/downloads/aise-display.zip",
    updatedAt: "Portfolio Body Font",
    releaseTag: "Clean Screen Sans",
    license: "Free Personal & Web Use",
    features: [
      {
        title: "Lightweight Web Footprint",
        desc: "Compact single OTF binary optimized for fast loading in web applications and design mockups.",
        icon: "type",
        tag: "20.6 KB compressed",
      },
      {
        title: "High Screen Legibility",
        desc: "Open apertures and balanced x-height designed for dark-on-light and light-on-dark reading.",
        icon: "layers",
        tag: "Editorial & UI",
      },
    ],
    filesIncluded: [
      { name: "Aise.otf", size: "56.8 KB", icon: "type" },
    ],
  },
  {
    id: "kochi-transit-go",
    title: "Kochi Transit Go",
    version: "MIT Open Source",
    category: "open-source",
    categoryLabel: "Open Source",
    description: "Offline Kochi Metro route planner, fare calculator, and GTFS schedule engine built in Kotlin & Next.js.",
    longDescription: "Privacy-first transit companion for Kochi Metro. Bundles official open GTFS schedules locally in SQLite so commuters can calculate fares, locate nearest stations, and plan routes completely offline.",
    author: "Agnel Francis",
    format: "Kotlin • GTFS • GitHub",
    fileSize: "GitHub Repo",
    downloadUrl: "https://github.com/agnelfranciso/Kochi-Transit-Go/archive/refs/heads/main.zip",
    githubUrl: "https://github.com/agnelfranciso/Kochi-Transit-Go",
    liveUrl: "https://kochitransitgo.vercel.app/",
    image: "/images/projects/kochi-transit-go/1.png",
    previewMain: "/images/projects/kochi-transit-go/1.png",
    gallery: [
      { label: "01. Route Planner", img: "/images/projects/kochi-transit-go/1.png" },
      { label: "02. Fare Matrix", img: "/images/projects/kochi-transit-go/2.png" },
      { label: "03. Station Locator", img: "/images/projects/kochi-transit-go/3.png" },
    ],
    featured: true,
    tags: ["Kotlin", "Android", "GTFS", "Open Source", "F-Droid"],
    packageCommand: "git clone https://github.com/agnelfranciso/Kochi-Transit-Go.git",
    updatedAt: "Active on GitHub & F-Droid",
    releaseTag: "Open Source • MIT License",
    license: "MIT License",
    features: [
      {
        title: "100% Offline GTFS Engine",
        desc: "Parses and queries official Kochi Metro open GTFS feeds locally using SQLite with zero network dependency.",
        icon: "smartphone",
        tag: "Zero trackers",
      },
      {
        title: "Open Android + Web Source",
        desc: "Available on GitHub and F-Droid with clean Kotlin architecture and companion Next.js web portal.",
        icon: "code",
        tag: "MIT Licensed",
      },
    ],
    filesIncluded: [
      { name: "Kochi-Transit-Go-main.zip", size: "GitHub Archive", icon: "folder" },
      { name: "app/src/main/kotlin/*", size: "Android Source", icon: "code" },
      { name: "gtfs-data/*.txt", size: "Open GTFS Feed", icon: "file" },
    ],
  },
  {
    id: "cineseat-api",
    title: "CineSeat Intelligence API",
    version: "Open Source",
    category: "open-source",
    categoryLabel: "Open Source",
    description: "SMPTE-based spatial cinema seat scoring engine and auditorium geometry intelligence REST API.",
    longDescription: "A spatial computing API that scores cinema auditorium seats using viewing-angle geometry, SMPTE screen-distance ratios, and ergonomic neck-tilt thresholds instead of flat 2D seat grids.",
    author: "Agnel Francis",
    format: "REST API • GitHub",
    fileSize: "GitHub Repo",
    downloadUrl: "https://github.com/agnelfranciso/cineseat-api/archive/refs/heads/main.zip",
    githubUrl: "https://github.com/agnelfranciso/cineseat-api",
    image: "/images/projects/cineseat/01_scalar_overview.png",
    previewMain: "/images/projects/cineseat/01_scalar_overview.png",
    gallery: [
      { label: "01. Scalar Overview", img: "/images/projects/cineseat/01_scalar_overview.png" },
      { label: "02. SMPTE Formulation", img: "/images/projects/cineseat/02_smpte_formulation.png" },
      { label: "03. Best Seats Engine", img: "/images/projects/cineseat/03_best_seats_engine.png" },
    ],
    featured: true,
    tags: ["API", "Spatial Math", "SMPTE", "Open Source", "Cinema"],
    packageCommand: "git clone https://github.com/agnelfranciso/cineseat-api.git",
    updatedAt: "Open Source API",
    releaseTag: "Spatial Seat Engine",
    license: "MIT License",
    features: [
      {
        title: "SMPTE Viewing Angle Math",
        desc: "Computes horizontal and vertical viewing angles per seat row against auditorium rake and screen width.",
        icon: "cpu",
        tag: "Geometric scoring",
      },
      {
        title: "RESTful JSON Endpoints",
        desc: "Drop-in endpoints for ranking best seats, auditorium layout normalization, and geo-city lookup.",
        icon: "globe",
        tag: "Open Source API",
      },
    ],
    filesIncluded: [
      { name: "cineseat-api-main.zip", size: "GitHub Archive", icon: "folder" },
      { name: "scoring-engine/*", size: "SMPTE Solver", icon: "code" },
    ],
  },
  {
    id: "aerisiq-app",
    title: "AerisIQ Safety & AI",
    version: "v1.0 APK",
    category: "apps",
    categoryLabel: "Apps & APKs",
    description: "Privacy-first disaster risk intelligence & local emergency utility for Android featuring an offline on-device LLM.",
    longDescription: "Built in 48 hours for offline resilience during disasters. Runs an on-device LLM locally on Android to answer survival, first-aid, and emergency preparedness questions with zero internet connectivity.",
    author: "Agnel Francis",
    format: "Android APK • GitHub",
    fileSize: "26.5 MB",
    downloadUrl: "/project-files/aerisiq/AerisIQ-release.apk",
    githubUrl: "https://github.com/agnelfranciso/AerisIQ",
    image: "/images/projects/aerisiq/13.png",
    previewMain: "/images/projects/aerisiq/13.png",
    gallery: [
      { label: "01. Risk Dashboard", img: "/images/projects/aerisiq/13.png" },
      { label: "02. Offline AI Assistant", img: "/images/projects/aerisiq/15.png" },
      { label: "03. Safety Protocols", img: "/images/projects/aerisiq/16.png" },
    ],
    tags: ["Android", "APK", "Offline LLM", "Jetpack Compose", "Open Source"],
    packageCommand: "git clone https://github.com/agnelfranciso/AerisIQ.git",
    updatedAt: "Signed Release APK",
    releaseTag: "Direct APK + Source",
    license: "Open Source",
    features: [
      {
        title: "On-Device Offline LLM",
        desc: "Runs local AI inference directly on Android hardware so guidance works even when cellular networks fail.",
        icon: "cpu",
        tag: "100% Offline AI",
      },
      {
        title: "Direct APK & Full Source",
        desc: "Download the signed AerisIQ-release.apk directly or inspect and build the Jetpack Compose source on GitHub.",
        icon: "smartphone",
        tag: "26.5 MB APK",
      },
    ],
    filesIncluded: [
      { name: "AerisIQ-release.apk", size: "26.5 MB", icon: "smartphone" },
    ],
  },
  {
    id: "kerala-holiday-api",
    title: "Kerala Holiday API",
    version: "REST API",
    category: "open-source",
    categoryLabel: "Open Source",
    description: "Open-source JSON API providing official Kerala public, bank, and gazetted holiday calendars for developers.",
    longDescription: "A lightweight, zero-config open-source REST API delivering structured Kerala government and public holiday datasets for calendars, transit apps, and college utilities.",
    author: "Agnel Francis",
    format: "JSON • Node • GitHub",
    fileSize: "GitHub Repo",
    downloadUrl: "https://github.com/agnelfranciso/kerala-holiday-api/archive/refs/heads/main.zip",
    githubUrl: "https://github.com/agnelfranciso/kerala-holiday-api",
    image: "/images/projects/velurpedia/1.png",
    previewMain: "/images/projects/velurpedia/1.png",
    tags: ["API", "JSON", "Kerala", "Open Source", "Backend"],
    packageCommand: "git clone https://github.com/agnelfranciso/kerala-holiday-api.git",
    updatedAt: "Open Source Repo",
    releaseTag: "Open Data Utility",
    license: "MIT License",
    features: [
      {
        title: "Structured Holiday Feeds",
        desc: "Clean date, holiday category, and regional observance flags ready for direct consumption in web and mobile apps.",
        icon: "code",
        tag: "JSON REST",
      },
      {
        title: "Self-Hostable & Forkable",
        desc: "Clone from GitHub and deploy to Vercel or Cloudflare Workers in seconds.",
        icon: "terminal",
        tag: "MIT License",
      },
    ],
    filesIncluded: [
      { name: "kerala-holiday-api-main.zip", size: "GitHub Archive", icon: "folder" },
    ],
  },
  {
    id: "personal-form-creator",
    title: "Personal Form Creator",
    version: "Next.js Template",
    category: "open-source",
    categoryLabel: "Open Source",
    description: "Open-source custom form builder template with instant shareable links and clean dark/light UI.",
    longDescription: "A self-hostable Next.js form creator template built as an open-source alternative to bloated form SaaS tools. Clone, customize, and deploy your own personal form backend.",
    author: "Agnel Francis",
    format: "Next.js • GitHub",
    fileSize: "GitHub Repo",
    downloadUrl: "https://github.com/agnelfranciso/Personal-Form-Creator-Template/archive/refs/heads/main.zip",
    githubUrl: "https://github.com/agnelfranciso/Personal-Form-Creator-Template",
    liveUrl: "https://agnel-forms.vercel.app/",
    image: "/images/projects/forms/1.png",
    previewMain: "/images/projects/forms/1.png",
    gallery: [
      { label: "01. Form Builder", img: "/images/projects/forms/1.png" },
      { label: "02. Live Preview", img: "/images/projects/forms/2.png" },
    ],
    tags: ["Next.js", "Template", "Forms", "Open Source", "React"],
    packageCommand: "git clone https://github.com/agnelfranciso/Personal-Form-Creator-Template.git",
    updatedAt: "Open Source Template",
    releaseTag: "Next.js Starter",
    license: "MIT License",
    features: [
      {
        title: "Zero Vendor Lock-In",
        desc: "Own your form schemas and submissions without monthly SaaS limits.",
        icon: "shield",
        tag: "Self-hostable",
      },
      {
        title: "Modern React Architecture",
        desc: "Clean Next.js App Router starter ready for Vercel deployment.",
        icon: "code",
        tag: "Open Source",
      },
    ],
    filesIncluded: [
      { name: "Personal-Form-Creator-Template-main.zip", size: "GitHub Archive", icon: "folder" },
    ],
  },
  {
    id: "campuscrave-app",
    title: "CampusCrave Android",
    version: "v1.0.0 APK",
    category: "apps",
    categoryLabel: "Apps & APKs",
    description: "Campus food ordering, live runner tracking, and student canteen utility built for fast college pickups.",
    longDescription: "A complete campus food discovery and doorstep/canteen ordering Android application with live order tracking, search filters, and student access flows.",
    author: "Agnel Francis",
    format: "Android APK • GitHub",
    fileSize: "19.6 MB",
    downloadUrl: "/project-files/campuscrave/CampusCrave-v1.0.0.apk",
    githubUrl: "https://github.com/agnelfranciso/CampusCrave",
    image: "/images/projects/campuscrave/03_home_feed.png",
    previewMain: "/images/projects/campuscrave/03_home_feed.png",
    gallery: [
      { label: "01. Home Feed", img: "/images/projects/campuscrave/03_home_feed.png" },
      { label: "02. Food Detail", img: "/images/projects/campuscrave/06_food_detail.png" },
      { label: "03. Live Tracking", img: "/images/projects/campuscrave/12_live_tracking_inflight.png" },
    ],
    tags: ["Android", "APK", "Campus", "Open Source"],
    packageCommand: "git clone https://github.com/agnelfranciso/CampusCrave.git",
    updatedAt: "v1.0.0 Release",
    releaseTag: "Android APK + Source",
    license: "Open Source",
    features: [
      {
        title: "Live Order Tracking",
        desc: "Real-time inflight status and runner handoff screens tailored for campus hostels and blocks.",
        icon: "smartphone",
        tag: "Android Native",
      },
      {
        title: "Full Source Available",
        desc: "Inspect the complete project repository on GitHub or install the v1.0.0 APK directly.",
        icon: "code",
        tag: "19.6 MB APK",
      },
    ],
    filesIncluded: [
      { name: "CampusCrave-v1.0.0.apk", size: "19.6 MB", icon: "smartphone" },
    ],
  },
];
