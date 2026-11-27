export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  logo?: string;
  bgClass: string;
  tags: string[];
  size: "normal" | "large";
  isMobileApp?: boolean;
  badge?: string;
  links?: { url: string, label: string, type: 'live' | 'github' | 'fdroid' | 'playstore' | 'download', fileName?: string, fileSize?: string }[];
  // Detail page specifics
  client?: string;
  role?: string;
  timeline?: string;
  focus?: string;
  status?: string;
  impact?: string;
  tech?: string;

  overview?: string;
  whyItExists?: string;
  challenge?: string;
  solution?: string;
  impactDesc?: string;

  keyHighlightsTitle?: string;
  keyHighlights?: { title: string; description: string }[];
  liveLink?: string;
  screenshots?: string[];
  videos?: { src: string; title?: string; poster?: string }[];
}

export const projectsData: Project[] = [
  {
    id: "gridwiser",
    category: "Web App · Productivity",
    title: "GridWiser",
    description: "Modern timetable UI studio with 12 handcrafted architectural presets, AI schedule import, conflict merging, and instant PNG, PDF, .ZIP, and .ICS exports.",
    image: "/images/projects/gridwiser/1.png",
    bgClass: "bg-blue",
    tags: ["Next.js 16", "TypeScript", "Firebase", "Tailwind CSS"],
    size: "large",
    isMobileApp: false,
    links: [
      { url: "https://gridwise-umber.vercel.app/", label: "Live Studio", type: "live" },
      { url: "https://github.com/agnelfranciso/gridwiser", label: "View Source Code", type: "github" }
    ],
    liveLink: "https://gridwise-umber.vercel.app/",
    screenshots: [
      "/images/projects/gridwiser/1.png",
      "/images/projects/gridwiser/2.png",
      "/images/projects/gridwiser/3.png",
      "/images/projects/gridwiser/4.png"
    ],
    videos: [
      {
        src: "/videos/projects/gridwiser.mp4",
        title: "GridWiser Launch Film",
        poster: "/images/projects/gridwiser/1.png"
      }
    ],

    role: "Sole Developer",
    timeline: "November 2026",
    focus: "Timetable Design Studio & Cloud Sync",
    tech: "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion, Firebase Auth & Cloud Storage, jsPDF, JSZip",

    overview: "GridWiser is a modern timetable UI studio that transforms raw class subjects and weekly timings into crisp, print-ready schedules. Users can build schedules manually through a 2-step onboarding wizard or extract them from images and PDFs using AI-assisted JSON import, preview live across 12 structurally distinct templates, and export in multiple formats.",
    whyItExists: "Traditional timetable makers produce generic, rigid spreadsheets. GridWiser treats weekly schedules like editorial design systems—offering proportional grids, horizontal timelines, bento dashboards, and daily poster packs with strict client-side privacy for exports and AI parsing.",

    keyHighlightsTitle: "Key Features",
    keyHighlights: [
      { title: "12 Architectural Presets", description: "Includes Cron Studio, Swiss Timeline, Sapphire Bento, Editorial Journal, Precision Run, Acid Daily, Ivory Daily Deck, and Exhibition Blue." },
      { title: "Overlap Detection & Smart Merge", description: "Automatically detects conflicting weekly timings and merges intentional parallel labs or electives into unified split cards." },
      { title: "AI Import & Local Parsing", description: "Generates a structured prompt for external AI tools and parses the returned JSON 100% client-side." },
      { title: "Multi-Format Exports", description: "Direct 2x Retina PNGs, single-archive daily poster .ZIPs, multi-page PDFs via jsPDF, .ICS calendar files, and JSON backups." },
      { title: "Google OAuth & Share Links", description: "Passwordless Google Sign-In, private cloud sync, self-serve Account Settings (/account), and PII-free public share links." }
    ]
  },

  {
    id: "kochitransitgo",
    category: "Public Transport",
    title: "Kochi Transit Go",
    description: "Offline Kochi Metro route planner and fare calculator. Fast, Free & Private.",
    image: "/images/projects/kochi-transit-go/1.png",
    bgClass: "bg-green",
    tags: ["Android", "Kotlin", "Offline", "GTFS"],
    size: "large",
    isMobileApp: true,
    links: [
      { url: "https://f-droid.org/en/packages/app.agneldev.kochitransitgo/", label: "Download from F-Droid", type: "fdroid" },
      { url: "https://github.com/agnelfranciso/Kochi-Transit-Go", label: "Android Source Code", type: "github" },
      { url: "https://github.com/agnelfranciso/Kochi-Transit-Go-Web", label: "Web Source Code", type: "github" },
      { url: "https://kochitransitgo.vercel.app/", label: "Web Portal", type: "live" }
    ],
    screenshots: [
      "/images/projects/kochi-transit-go/1.png",
      "/images/projects/kochi-transit-go/2.png",
      "/images/projects/kochi-transit-go/3.png",
      "/images/projects/kochi-transit-go/4.png"
    ],

    role: "Sole Developer",
    timeline: "June 2026",
    focus: "Privacy-first Transit Companion",
    tech: "Android, Kotlin, GTFS, SQLite",

    overview: "Kochi Transit Go is the definitive, privacy-respecting transit companion for the Kochi Metro system. Built from the ground up as a native Android app, it provides instantaneous access to train schedules, routes, and fare calculations without ever requiring an internet connection.",
    whyItExists: "Privacy First: No analytics, no ad trackers, and no unnecessary permissions. Your location data stays on your device. The app operates fully offline with bundled GTFS schedules.",

    keyHighlightsTitle: "Features",
    keyHighlights: [
      { title: "Offline Mode", description: "All official GTFS schedules are bundled locally. Plan trips even deep underground." },
      { title: "Instant Fare Calculator", description: "Know exactly how much your trip will cost before you reach the station." },
      { title: "GPS Station Locator", description: "Automatically detects the nearest metro station using your device's location." },
      { title: "Live Tracker", description: "See upcoming departures and platform directions." },
      { title: "Open Source", description: "Fully open-source under the MIT License and uses official Kochi Metro Open GTFS data." }
    ]
  },

  {
    id: "aerisiq",
    category: "Safety & AI Utility",
    title: "AerisIQ",
    description: "Privacy-first disaster risk intelligence and local safety utility for Android, featuring an offline LLM.",
    image: "/images/projects/aerisiq/13.png",
    bgClass: "bg-blue",
    tags: ["Android", "Kotlin", "On-Device AI", "Jetpack Compose"],
    size: "large",
    isMobileApp: true,
    links: [
      { url: "https://github.com/agnelfranciso/AerisIQ", label: "View Source Code", type: "github" },
      { url: "/downloads/aerisiq/AerisIQ-release.apk", label: "Download App", type: "download", fileName: "AerisIQ-release.apk", fileSize: "26.5 MB" }
    ],
    screenshots: [
      "/images/projects/aerisiq/13.png",
      "/images/projects/aerisiq/15.png",
      "/images/projects/aerisiq/16.png",
      "/images/projects/aerisiq/14.png",
      "/images/projects/aerisiq/17.png",
      "/images/projects/aerisiq/18.png"
    ],

    role: "Lead Developer",
    timeline: "June 2026 (Made in 2 days)",
    focus: "Privacy-first Disaster Risk Intelligence",
    tech: "Kotlin, Jetpack Compose, LiteRT, MediaPipe, Qwen 2.5 0.5B",

    overview: "AerisIQ is a Free and Open Source Software (FOSS), privacy-first disaster risk intelligence and local safety utility application for Android. The app queries public warning feeds, parses raw disaster bulletins, combines them with live local weather telemetry, and processes the combined datasets using an offline Large Language Model (LLM) running securely in the device's sandbox.",
    whyItExists: "Built to operate under strict user-sovereignty principles. 100% offline AI ensures safety summaries are executed client-side with no chat logs transmitted. It uses a zero-telemetry approach, meaning no analytical trackers or advertisement loggers.",

    keyHighlightsTitle: "Key Features",
    keyHighlights: [
      { title: "100% Offline AI", description: "Safety summaries are executed client-side using Qwen 2.5 0.5B Instruct model via MediaPipe LLM Inference APIs." },
      { title: "Geocoding API", description: "Coordinates are resolved via client-side API requests. If location permissions are withheld, users can select regions manually." },
      { title: "Safety Lock", description: "For extreme warnings, a 6-step checklist card is displayed. Users must check off all procedures before AI analysis is unlocked." },
      { title: "Premium UI", description: "Features a premium dark glassmorphic design system using Google Sans Flex variable-axis typography and directional page-slide transitions." },
      { title: "Zero Telemetry", description: "No trackers are present. Clearing app storage permanently deletes all local files and AI weights." }
    ]
  },

  {
    id: "ente-nadu",
    category: "Community & Civic Tech",
    title: "Ente Nadu",
    description: "Hyper-local community directory connecting local service providers with village households, developed under the Skill Share initiative by Samagra Shiksha Kerala (VHSE).",
    image: "/images/projects/entenadu.png",
    bgClass: "bg-yellow",
    tags: ["React Native", "Firebase", "Civic Tech", "Skill Share"],
    size: "normal",
    links: [{ url: "https://sarvodayam.in/entenadu", label: "Visit Live Site", type: "live" }],

    client: "Skill Share • Samagra Shiksha Kerala (VHSE) / Sarvodayam VHSS",
    role: "Student Developer & Lead Architect",
    timeline: "2023 - 2024",
    status: "Completed Initiative",
    focus: "Community Skills & Vocational Connection",
    impact: "100+ Providers",
    tech: "React Native, Firebase, Cloud Firestore",

    overview: "Ente Nadu was developed as part of Skill Share, a community-focused initiative implemented by Samagra Shiksha Kerala under Kerala's Vocational Higher Secondary Education (VHSE) program. The core vision of Skill Share is to connect students' practical vocational competencies directly with local community needs. Built at Sarvodayam VHSS Aryampadam, Ente Nadu acts as a centralized digital directory and service-matching platform bridging skilled village professionals (electricians, plumbers, artisans, and technicians) directly with households.",
    whyItExists: "In rural and semi-urban panchayats, households often struggle to quickly locate trusted local trade workers, while skilled vocational professionals lack a formal digital presence. Developed under the Samagra Shiksha Kerala Skill Share umbrella, Ente Nadu was created to bridge this divide, promote local vocational employment, and stimulate a self-reliant village micro-economy.",
    challenge: "Creating an ultra-accessible, lightweight mobile platform that non-tech-savvy village residents and local service providers could navigate effortlessly under inconsistent rural mobile data connections.",
    solution: "Engineered a clean React Native mobile interface with Firebase real-time data sync, categorized service directories, one-tap direct calling, and offline caching for essential contact directories.",
    impactDesc: "Successfully cataloged and connected over 100 verified service providers across the local panchayat, enabling seamless contact between residents and skilled trade professionals.",

    keyHighlightsTitle: "Key Highlights & Skill Share Objectives",
    keyHighlights: [
      { title: "Skill Share Integration", description: "Implemented under Samagra Shiksha Kerala's VHSE program to apply vocational training directly to community challenges." },
      { title: "Verified Provider Directory", description: "Direct contact channels for electricians, plumbers, carpenters, mechanics, and local trade artisans." },
      { title: "Localized Content", description: "Tailored specifically for the regional needs and vernacular language preferences of the village community." },
      { title: "Low-Bandwidth Optimization", description: "Lightweight architecture optimized for quick loading and one-tap telephone dialing even on 2G/3G connections." }
    ]
  },

  {
    id: "bussiler",
    category: "Android Application",
    title: "Bussiler",
    description: "Native Android public transportation platform for Velur. Real-time departure countdowns, bus reminder alerts, and full-day offline schedules.",
    image: "/images/framepixel/Screenshot_20261121-144406.png",
    bgClass: "bg-blue",
    tags: ["Android", "Kotlin", "SQLite", "Transit Telemetry", "Velur"],
    size: "normal",
    isMobileApp: true,
    links: [
      {
        url: "/downloads/bussiler/Bussiler.apk",
        label: "Download Bussiler APK",
        type: "download",
        fileName: "Bussiler.apk",
        fileSize: "22.0 MB"
      }
    ],

    client: "FramePixel",
    role: "Founder & Lead Architect",
    timeline: "2022 - 2025 (Active Native App)",
    focus: "First Major Software Project • Hyper-local Transit Utility",
    status: "Android Active (Website Retired)",
    tech: "Android Native, Kotlin, SQLite / Room, Local Notifications, Material You",

    overview: "Bussiler was the first major software project of my life, spanning multiple years of experimentation, rebuilds, and hosted domains (busiler, bussilier, bussiler, bussily). What began with copying and pasting ChatGPT snippets into raw HTML files to solve a frustrating local timetable image grew into an enduring obsession that defined my early development journey and directly inspired me to pursue computer engineering as my career. After rebuilds in React and Next.js, the project officially retired the web prototype and transitioned completely into a native Android application engineered for one-tap convenience, offline reliability, and native departure reminders.",
    whyItExists: "Commuters across Velur and surrounding Kerala corridors previously had to rely on cumbersome, outdated timetable images circulated locally. Finding a bus meant zooming, scrolling across massive sheets, and guessing if the schedule was still valid. Bussiler exists to answer the only question that matters at a bus stop: 'When is the next bus?'—with instant departure countdowns, native reminder alarms, and complete offline reliability.",
    challenge: "Creating an accurate, dependable public transportation utility with zero pre-existing transit APIs or live telemetry in rural Kerala. Early web prototypes suffered from mobile connectivity dropouts at village bus stops, data synchronization across routes was brittle, and static frameworks couldn't deliver real-time arrival notifications on mobile devices.",
    solution: "Fully retired the legacy web prototypes and engineered a dedicated native Android application featuring local SQLite caching for 100% offline schedules, color-coded corridor countdown cards (Thrissur, Wadakkanchery, Kechery), native notification departure alarms, and destination search.",
    impactDesc: "Beyond providing Velur commuters with a reliable, one-tap transit companion, Bussiler served as my personal software engineering crucible. It was where I learned programming through vibecoding—dissecting AI code across restrictive token limits, debugging broken logic, and understanding the vital difference between flashy UI libraries and robust underlying data architecture.",

    keyHighlightsTitle: "Native Android Features & Transit Architecture",
    keyHighlights: [
      { title: "Live Corridor Countdowns", description: "Color-accented cards for Thrissur, Wadakkanchery, and Kechery with live minute-by-minute countdowns." },
      { title: "Bus Timing Alerts", description: "Notification bell reminders for individual bus departures so commuters never miss a ride." },
      { title: "Full-Day Offline Timetables", description: "Complete 24-hour schedules with local SQLite caching for zero-network access at rural stops." },
      { title: "Route Hierarchy & Search", description: "Breadcrumb paths for intermediate stops, plus instant search for popular destinations." },
      { title: "Shareable Timing Cards", description: "One-tap branded timing alert cards with exact stops for easy sharing on WhatsApp." },
      { title: "Future Vision: Kerala Transit Telemetry", description: "An ambitious roadmap to collaborate with transport authorities to enable unified live tracking for private and KSRTC fleets across Kerala." }
    ],
    screenshots: [
      "/images/framepixel/Screenshot_20261121-144406.png",
      "/images/framepixel/Screenshot_20261121-144409.png",
      "/images/framepixel/Screenshot_20261121-144413.png",
      "/images/framepixel/Screenshot_20261121-144420.png",
      "/images/framepixel/Screenshot_20261121-144425.png",
      "/images/framepixel/Screenshot_20261121-144440.png"
    ]
  },

  {
    id: "cineseat",
    category: "Backend Architecture • Cinema Intelligence & Spatial Geometry",
    title: "CineSeat API",
    badge: "Live Service",
    description: "High-performance cinema showtimes intelligence & 3D auditorium spatial geometry engine evaluating SMPTE 196M optical standards and THX acoustic sightlines across 2,167+ Indian cities.",
    image: "/images/projects/cineseat/01_scalar_overview.png",
    bgClass: "bg-purple",
    tags: ["FastAPI", "Python 3.12", "Pydantic v2", "Spatial Geometry", "SMPTE 196M", "Docker", "Scalar UI", "Antideploy"],
    size: "large",
    isMobileApp: false,
    links: [
      { url: "https://cineseat-api.antideploy.app/docs", label: "Interactive Scalar Docs", type: "live" },
      { url: "https://cineseat-api.antideploy.app", label: "Live API Server", type: "live" },
      { url: "https://github.com/agnelfranciso/cineseat-api", label: "View Source Code", type: "github" }
    ],
    screenshots: [
      "/images/projects/cineseat/01_scalar_overview.png",
      "/images/projects/cineseat/02_smpte_formulation.png",
      "/images/projects/cineseat/03_best_seats_engine.png",
      "/images/projects/cineseat/04_auditorium_layout.png",
      "/images/projects/cineseat/05_cities_geo_lookup.png"
    ],

    role: "System Architect & Backend Engineer",
    timeline: "November 2026",
    status: "Production REST Service",
    focus: "3D Cinema Geometry & Optical Viewing Optimization",
    tech: "FastAPI, Python 3.12, Pydantic v2, Scalar OpenAPI 3.1, Haversine Geo-Routing, Docker, Antideploy",

    overview: "CineSeat API is a production-grade cinema showtimes and seating intelligence platform engineered to eliminate bad cinema seating. While conventional ticketing platforms represent cinema auditoriums as flat 2D seat grids that obscure true viewing angles, CineSeat models physical auditoriums in true 3D metric units (x, y, z) and rigorously evaluates each seat against global optical standards—including SMPTE 196M (≥30° FOV, 45° reference sweet spot), THX viewing distance guidelines (≥36° immersion), horizontal off-axis keystoning, and vertical cervical neck tilt limits (≤15°). Built with FastAPI, Pydantic v2, and deployed on Antideploy with a rich interactive Scalar documentation UI, it serves 2,167+ Indian cities with millisecond spatial vector calculations.",
    whyItExists: "Built to solve the fundamental problem of ticket booking: getting the best seat, while giving developers a public API for pan-India cinema listings. Inspired by Sunith V S's seats.movie, I noticed that while 3D previews were a great concept, there was no open, public solution available for developers building movie dashboards or ticketing platforms. CineSeat was engineered from scratch as a standalone REST API to bridge this gap.",
    challenge: "Computing real-time optical geometry for hundreds of seats across diverse auditorium architectures (stadium seating tiers, sloped floors, varying screen widths and elevations) requires continuous trigonometric evaluations without compromising API response latency. Furthermore, managing geographic showtimes and cinema metadata across 2,167+ Indian cities and towns demanded an ultra-efficient in-memory spatial index and clean RESTful design.",
    solution: "I engineered a vector-based spatial geometry engine that computes 3D Euclidean distances, horizontal FOV arctangents, off-axis displacement angles, and vertical neck tilt angles in single-digit milliseconds. The engine synthesizes these metrics into a normalized 0–100 composite quality score, dynamically finds optimal contiguous seat blocks for parties of any size, and exposes interactive API documentation powered by Scalar OpenAPI 3.1.",

    keyHighlightsTitle: "Key Architecture & Mathematical Highlights",
    keyHighlights: [
      { title: "SMPTE 196M Optical Math", description: "Evaluates horizontal Field of View (FOV) against the 30° minimum and 45° reference sweet spot to guarantee optimal retinal immersion." },
      { title: "THX Neck Tilt Protection", description: "Computes vertical viewing angles relative to screen center; penalizes seats exceeding the 15° cervical neck fatigue threshold." },
      { title: "Off-Axis Keystoning Mitigation", description: "Calculates angular lateral displacement from the screen centerline, preventing optical trapezoid distortion and stereo audio imbalance." },
      { title: "Contiguous Block Optimizer", description: "Sliding-window geometry algorithm that discovers and ranks adjacent seats for families and groups based on aggregated vantage scores." },
      { title: "2,167+ Cities Geo-Directory", description: "Full geographic dataset spanning all 28 Indian states, complete with Tier-1 metro filters and spherical Haversine nearest-city GPS lookup." },
      { title: "3D Auditorium Modeling", description: "True metric coordinate representation of screen width, elevation, stadium tier step rises, and row curved radii." },
      { title: "Scalar OpenAPI 3.1 UI", description: "Modern, interactive API reference with multi-language code snippets (cURL, Python, Node.js, PHP, Ruby) and live payload testing." },
      { title: "Antideploy Cloud Infrastructure", description: "Packaged as a lightweight multi-stage Docker container deployed natively on Antideploy with automated TLS and edge routing." }
    ]
  },

  {
    id: "campuscrave",
    category: "Concept Demo • Campus Logistics",
    title: "CampusCrave",
    badge: "Concept Demo",
    description: "[Interactive Demo] An Android prototype for hyper-local classroom doorstep canteen logistics, unifying students, canteen staff, and peer runners with simulated corridor telemetry.",
    image: "/images/projects/campuscrave/03_home_feed.png",
    bgClass: "bg-green",
    tags: ["Concept Demo", "Android", "Kotlin", "Jetpack Compose", "Material 3", "Clean Architecture"],
    size: "large",
    isMobileApp: true,
    links: [
      { url: "/downloads/campuscrave/CampusCrave-v1.0.0.apk", label: "Download Demo APK (v1.0.0)", type: "download", fileName: "CampusCrave-v1.0.0.apk", fileSize: "20.5 MB" },
      { url: "https://github.com/agnelfranciso/CampusCrave", label: "View Source Code", type: "github" }
    ],
    screenshots: [
      "/images/projects/campuscrave/03_home_feed.png",
      "/images/projects/campuscrave/12_live_tracking_inflight.png",
      "/images/projects/campuscrave/06_food_detail.png",
      "/images/projects/campuscrave/01_onboarding.png",
      "/images/projects/campuscrave/02_student_access.png",
      "/images/projects/campuscrave/04_soft_drinks_category.png",
      "/images/projects/campuscrave/05_drinks_catalog.png",
      "/images/projects/campuscrave/07_saved_dropoffs_dialog.png",
      "/images/projects/campuscrave/08_food_search.png",
      "/images/projects/campuscrave/09_search_filter_sheet.png",
      "/images/projects/campuscrave/10_doorstep_basket.png",
      "/images/projects/campuscrave/11_order_confirmed.png",
      "/images/projects/campuscrave/13_runner_handoff.png",
      "/images/projects/campuscrave/14_order_completed.png",
      "/images/projects/campuscrave/15_student_profile.png",
      "/images/projects/campuscrave/16_cravepass_plans.png",
      "/images/projects/campuscrave/17_demo_presentation_lab.png"
    ],

    role: "Lead Android Architect & Sole Developer",
    timeline: "October 2026",
    status: "Interactive Demo / Evaluator Prototype",
    focus: "Hyper-Local Classroom Doorstep Logistics",
    tech: "Kotlin, Jetpack Compose, Material 3, Clean Architecture MVVM + StateFlow, Stitch Tokens",

    overview: "CampusCrave is an interactive concept demo and evaluator prototype of a college-supported, student-operated food ordering and classroom delivery platform for Android. Built as a demonstration prototype to test and showcase door-to-door logistics within multi-block academic campuses, students can simulate pre-ordering meals delivered directly outside lecture room doors. Simultaneously, it illustrates how campus breaks can be transformed into voluntary micro-enterprise earning opportunities for peer runners.",
    whyItExists: "Built as a proof-of-concept demo to solve the universal campus lunch rush bottleneck. Traditional commercial delivery apps fail inside college campuses because lecture halls lack fixed seat numbering, commercial delivery drivers cannot enter academic buildings, and classroom drop-offs disrupt lectures. CampusCrave introduces designated classroom doorstep drop zones with 4-digit PIN verification, bell-synchronized preparation batching, and student corridor couriers.",
    challenge: "College lunch breaks are rigidly timed (typically 30–40 minutes). When hundreds of students converge onto a single canteen facility simultaneously, they encounter 25+ minute queues, cold or rushed food, and tardiness to afternoon sessions. Canteen operators face overwhelming rushes and unpredictable demand surges, while students lack flexible on-campus micro-earning options that fit between classes.",
    solution: "CampusCrave provides a synchronized tri-pillar logistics network: classroom doorstep drop zones outside lecture doors, pre-orders synchronized with lecture bells, student corridor couriers using thermal bags, the DemandCraft™ feasibility engine to prevent ordering items that take longer than the remaining break, and SmartStop™ capacity halt state machines to protect kitchen bandwidth.",

    keyHighlightsTitle: "Key Features & Architecture",
    keyHighlights: [
      { title: "Classroom Doorstep Drop Zones", description: "Food handoffs occur strictly outside lecture room doors with a 4-digit PIN verification, preserving academic decorum with zero in-class disruption." },
      { title: "Academic Corridor Routing Matrix", description: "Built-in campus wayfinding matrix covering Eastern (EAB), Western (WAB), Administrative (ADM), and Southern (SAB) blocks with multi-floor room targeting." },
      { title: "Bell-Synchronized Timetables", description: "Pre-orders open 10–20 minutes before the bell, allowing central kitchen staff to batch-prepare orders before the mass rush." },
      { title: "DemandCraft™ Feasibility", description: "Intelligent engine dynamically evaluates preparation times against the lecture resumption bell to guarantee prompt delivery." },
      { title: "SmartStop™ Capacity Halt", description: "Reactive StateFlow state machine automatically throttles checkouts when courier workload or kitchen prep queues approach saturation." },
      { title: "5-Second Payment Handshake", description: "Realistic simulation of a student payment gateway featuring animated multi-node handshake verification and instant slot confirmation." },
      { title: "Live Indoor Waypoint Radar", description: "Live corridor radar telemetry showing courier assignment, transit waypoints, and the 4-digit collection PIN." },
      { title: "Campus CravePass Subscriptions", description: "Essential (₹49/mo) and Pro (₹99/mo) plans with 12:00 PM priority slot reservation and free doorstep drops." },
      { title: "Evaluator Demo Lab", description: "Built-in presentation tool to warp simulated timetable clocks, trigger rush hours, and step through all 8 order lifecycle states." }
    ]
  },

  {
    id: "castlink",
    category: "Entertainment",
    title: "CastLink",
    description: "Find overlapping cast and crew between your favorite movies and TV series, instantly.",
    image: "/images/projects/castlink/4.png",
    bgClass: "bg-purple",
    isMobileApp: false,
    tags: ["Next.js", "TypeScript", "CSS", "TMDB API"],
    size: "normal",
    links: [
      { url: "https://castlink-pi.vercel.app/", label: "Visit Live Site", type: "live" },
      { url: "https://github.com/agnelfranciso/castlink", label: "View Source Code", type: "github" }
    ],
    screenshots: [
      "/images/projects/castlink/1.png",
      "/images/projects/castlink/2.png",
      "/images/projects/castlink/3.png",
      "/images/projects/castlink/4.png"
    ],

    role: "Creator",
    timeline: "2026",
    focus: "Movies & TV Connectivity",
    tech: "Next.js 16 (App Router), TypeScript, Pure CSS Variables, TMDB API",

    overview: "CastLink is an ultra-minimalist web application designed to quickly connect the dots between cinematic universes. It allows you to find overlapping cast and crew between your favorite movies and TV series instantly. Ever wondered where you've seen an actor before? Or wanted to know every single crew member who worked on both Breaking Bad and Better Call Saul? CastLink gives you the exact intersection immediately.",

    keyHighlightsTitle: "Features",
    keyHighlights: [
      { title: "1v1 Search", description: "Compare two movies or TV series and instantly see every actor, director, and crew member they share." },
      { title: "Multiple Titles Search", description: "Add as many titles as you want to find the rare few people who worked across an entire franchise." },
      { title: "Detailed Person Modal", description: "Click on any person to see exactly what character they played (or job they performed) and how many episodes they were in." },
      { title: "Ultra-Minimalist Design", description: "A clean, monochrome, glassmorphism-free interface utilizing the Geist font family for maximum readability." },
      { title: "High Performance", description: "Built on Next.js 16 App Router with robust, resilient API fetching that automatically handles strict rate limits." }
    ]
  },

  {
    id: "semfolder",
    category: "Academic Productivity",
    title: "The SemFolder",
    description: "Local-first semester and course manager for students.",
    image: "/images/projects/semfolder.png",
    bgClass: "bg-orange",
    tags: ["React", "PWA", "LocalStorage"],
    size: "normal",
    links: [{ url: "https://thesemfolder.netlify.app/download", label: "Download the App", type: "live" }],

    role: "Web & Android",
    timeline: "2024",
    focus: "Student Utility",
    tech: "React, PWA, LocalStorage",

    overview: "The SemFolder helps students organize courses and study materials semester-wise — clean, fast, and fully offline. It is built specifically for students who want a simple, distraction-free way to manage their academic life without the bloat of complex LMS systems.",
    whyItExists: "Most academic apps are cluttered and require constant internet connection. SemFolder focuses on a local-first approach, ensuring that your data is always available, private, and fast. No loading screens, no tracking, just your subjects.",

    keyHighlightsTitle: "Key Highlights",
    keyHighlights: [
      { title: "Semester-Based", description: "Organize everything by semester. Switch between semesters instantly and keep your academic life structured." },
      { title: "Course Management", description: "Add courses with custom names, codes, and teacher info. Assign icons and pin important subjects." },
      { title: "Linked Courses", description: "Link the same subject across semesters to share materials and history. Avoid duplicate clutter." },
      { title: "Batch Actions", description: "Multi-select courses and delete multiple subjects at once with visual selection mode." },
      { title: "Modern UI", description: "Clean Material 3 design with intuitive gestures. Tap to open, long-press for quick actions." },
      { title: "Local-First", description: "All data stored locally on your device. Fast, private, and works completely offline." }
    ]
  },

  {
    id: "osimposter",
    category: "Game & Entertainment",
    title: "OSImposter",
    description: "A fast, 100% free, fully open-source party game with infinite variety.",
    image: "/images/projects/osimposter/1.png",
    bgClass: "bg-purple",
    tags: ["React", "Next.js", "Local-first", "Open Source"],
    size: "normal",
    isMobileApp: false,
    links: [
      { url: "https://osimposter.vercel.app/", label: "Play Now", type: "live" },
      { url: "https://github.com/agnelfranciso/osimposter", label: "View Source Code", type: "github" }
    ],
    screenshots: [
      "/images/projects/osimposter/1.png",
      "/images/projects/osimposter/2.png"
    ],
    role: "Creator",
    timeline: "2026",
    focus: "Social Deduction & Party Game",
    tech: "React, Next.js",
    overview: "OSImposter is a completely local-first, highly customizable web-based party game where you create the fun. It reimagines the social deduction genre by allowing endless variety through custom word packs tailored specifically for your friends.",
    whyItExists: "Most social deduction and \"imposter\" party games have a glaring flaw: they get bland fast. They ship with a static set of words that get extremely repetitive after a few matches, hints that are too obvious, and vocabulary that might not even be relatable to your friend group. OSImposter was built to solve that.",
    keyHighlightsTitle: "Key Features",
    keyHighlights: [
      { title: "Endless Variety via Word Packs", description: "Create your own custom word packs tailored specifically for your friends, or fill them with inside jokes and local places." },
      { title: "Import & Export", description: "Download your awesome packs as a JSON file and share them with the community, or import massive, creative word packs from others instantly." },
      { title: "Custom Game Rules", description: "Set the number of imposters, toggle hints and category visibility, use optional discussion timers, and a built-in voting mechanism." },
      { title: "Mobile Optimized", description: "Designed as a sleek, premium mobile-first experience so you can easily pass the phone around in a circle of friends." },
      { title: "Privacy First", description: "Everything happens locally right inside your web browser. There is no server tracking you, no accounts, and no data leaving your device." },
      { title: "100% Ad-Free & Open Source", description: "No microtransactions, no pop-ups, no paywalls. Just pure, uninterrupted fun." }
    ]
  },

  {
    id: "ampa",
    category: "Data Science & AI",
    title: "AMPA Predictor",
    description: "A Next-Generation Statistical Football Predictor for the 2026 FIFA World Cup.",
    image: "/images/projects/ampa/1.png",
    bgClass: "bg-purple",
    tags: ["Python", "Pandas", "Statistics", "HTML/JS"],
    size: "normal",
    links: [{ url: "https://github.com/agnelfranciso/AMPA-Predictor", label: "View Source Code", type: "github" }],
    screenshots: [
      "/images/projects/ampa/1.png"
    ],

    role: "Creator",
    timeline: "July 2026",
    focus: "Probabilistic Simulations",
    tech: "Python, HTML, JS, Batch",

    overview: "AMPA (Agnel Match Predicting Algorithm) is a state-of-the-art simulation framework engineered specifically for the 2026 FIFA World Cup. It processes over 49,000 historical international matches dating back to the 1870s, computes dynamic attacking and defensive strengths, and runs a complex Bivariate Poisson Distribution to simulate every possible scoreline of every match in the tournament.",
    challenge: "Unlike basic predictors that rely purely on static FIFA rankings or simple win/loss ratios, AMPA required a robust mathematical model. I had to resolve the classical overdispersion problem in football goal modeling where the variance of goals is greater than the mean.",
    solution: "I implemented a Negative Binomial Distribution with Dixon-Coles correction to prevent 0-0 inflation, along with a custom Elo rating system. The project is split into AMPE (Python Engine) which acts as the brain, and AMPI (Web Interface) which visually renders the tournament bracket.",

    keyHighlightsTitle: "The Statistical Model",
    keyHighlights: [
      { title: "Custom Elo Rating System", description: "Goal difference multiplier and tournament weighting ensure accurate relative strength tracking." },
      { title: "Negative Binomial Distribution", description: "Dixon-Coles correction prevents 0-0 inflation, with a custom bivariate urgency factor for highly realistic match outcomes." },
      { title: "Form, Streaks & Momentum", description: "Tracks a team's last 10-15 matches to trigger momentum multipliers based on streaks and recent head-to-head records." },
      { title: "Live Data Integration", description: "Fetches real-time, in-progress World Cup 2026 scores. Real outcomes overwrite predictions dynamically." }
    ]
  },

  {
    id: "agnel-forms",
    category: "SaaS & Tools",
    title: "Agnel Forms",
    description: "A highly-customizable, privacy-focused, self-hosted alternative to Typeform & Google Forms.",
    image: "/images/projects/forms/1.png",
    bgClass: "bg-blue",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
    size: "normal",
    links: [{ url: "https://agnel-forms.vercel.app/", label: "Visit Live Site", type: "live" }, { url: "https://github.com/agnelfranciso/Personal-Form-Creator-Template", label: "View Source Code", type: "github" }],
    screenshots: [
      "/images/projects/forms/1.png"
    ],

    role: "Full Stack Developer",
    timeline: "2026",
    focus: "Privacy & Data Collection",
    tech: "Next.js, Supabase, Tailwind CSS",

    overview: "Built from the ground up for absolute privacy, limitless customization, and flexible storage. Agnel Forms pushes the boundaries of data collection—featuring advanced flows like custom ID-to-email mapping, secure email verification before submission, and complex respondent tracking.",

    keyHighlightsTitle: "Features",
    keyHighlights: [
      { title: "Dynamic Form Builder", description: "Drag and drop interface for building forms." },
      { title: "Conditional Branching Logic", description: "Show/hide questions based on previous answers in real-time." },
      { title: "Identity Verification", description: "Lock forms behind secure magic-link OTP authentication." },
      { title: "Granular Controls", description: "Set expiration dates, limit response counts to prevent spam, or restrict submissions to one per person effortlessly." }
    ]
  },

  {
    id: "velurpedia",
    category: "Community & Wiki",
    title: "VelurPedia",
    description: "The free encyclopedia for Velur, Thrissur that anyone can edit.",
    image: "/images/projects/velurpedia/1.png",
    bgClass: "bg-orange",
    tags: ["Next.js", "React", "Community"],
    size: "normal",
    links: [{ url: "https://velurwiki.vercel.app/", label: "Visit Live Site", type: "live" }, { url: "https://github.com/agnelfranciso/velur-wiki", label: "View Source Code", type: "github" }],
    screenshots: [
      "/images/projects/velurpedia/1.png"
    ],

    role: "Creator",
    timeline: "2026",
    focus: "Community Knowledge",
    tech: "Next.js, React",

    overview: "VelurPedia is a personal project by Agnel Francis — a free, open encyclopedia dedicated entirely to documenting the village of Velur, located in Thrissur district, Kerala, India.",
    whyItExists: "Velur is a significant place — rich in history, culture, and community life. Yet, very little documented historical data about Velur is available online. Most of what is known lives in the memories of residents or physical archives. VelurPedia was created to change that, making data available to everyone freely.",
    keyHighlightsTitle: "Key Features & Philosophy",
    keyHighlights: [
      { title: "Familiar Interface", description: "Uses a Wikipedia-style UI, including Wikitext formatting, infoboxes, and internal linking, making it easy for anyone to contribute." },
      { title: "Community Driven", description: "Anyone can create an account and submit edits or new articles. All community submissions go through an editorial review process to ensure quality." },
      { title: "Open Access", description: "All content is freely available to read, reference, and share. Local knowledge should be accessible, searchable, and preserved for future generations." },
      { title: "Locally Focused", description: "Unlike broader platforms, VelurPedia features guidelines tailored for a locally-focused wiki, documenting everything from local landmarks to stories." }
    ]
  },

  {
    id: "kerala-holiday-api",
    category: "AI",
    title: "Kerala Holiday API",
    description: "Autonomous AI engine tracking educational holidays across all 14 districts in Kerala.",
    bgClass: "bg-blue",
    tags: ["Python", "FastAPI", "React", "Gemini AI"],
    size: "normal",
    links: [
      { url: "https://github.com/agnelfranciso/kerala-holiday-api", label: "GitHub", type: "github" }
    ],
    role: "Creator & AI Engineer",
    timeline: "2026",
    focus: "AI Reasoning, Web Scraping, APIs",
    tech: "Python, FastAPI, React, TypeScript, Gemini API, BeautifulSoup4",
    overview: "A fully autonomous AI engine that tracks educational holidays across all 14 districts in Kerala. Built with a React frontend and a FastAPI backend, the engine dynamically scrapes Google News and utilizes Google Gemini to reason through news reports, filter out stale data, and extract highly accurate, structured JSON payloads.",
    challenge: "Finding accurate, up-to-date information on educational holidays across all districts in Kerala is challenging. News reports can be ambiguous (e.g., confusing yesterday's 'tomorrow' with today's 'tomorrow'), making it hard to extract structured data reliably.",
    solution: "I built a fully autonomous engine that scrapes Google News, feeds the pure text to Google Gemini using few-shot Chain-of-Thought (CoT) reasoning, and exposes the parsed JSON via a FastAPI backend to a React dashboard.",
    keyHighlights: [
      { title: "Smart Scraping", description: "Bypasses Google News redirects and filters out generic website junk (like 'Subscribe here') to feed pure news data to the AI." },
      { title: "Batched AI Inference", description: "Uses Gemini to analyze news for all 14 districts in a single batched prompt." },
      { title: "Few-Shot Reasoning", description: "The AI is strictly guided by few-shot CoT to avoid common pitfalls when parsing ambiguous news dates." },
      { title: "Confidence Scoring", description: "If the AI infers a district because it wasn't explicitly named, the UI flags it with a yellow warning triangle." },
      { title: "Bring Your Own Key (BYOK)", description: "Securely enter your Gemini API key directly into the web UI to power the engine locally." }
    ]
  },

  {
    id: "opcode-impact-2026",
    category: "Web Development",
    title: "Opcode Impact 2026",
    description: "Official website for the National Level 24-Hour Cybersecurity Hackathon.",
    image: "/images/projects/opcode/1.png",
    bgClass: "bg-green",
    tags: ["Frontend", "Web Development", "UI/UX"],
    size: "normal",
    isMobileApp: false,
    links: [
      { url: "https://opcode-impact-2026.vercel.app/", label: "Visit Live Site", type: "live" }
    ],
    screenshots: [
      "/images/projects/opcode/1.png",
      "/images/projects/opcode/2.png"
    ],
    client: "Jyothi Engineering College",
    role: "Website Refiner",
    timeline: "2026",
    focus: "Event Website Optimization",
    overview: "OPCODE IMPACT 2026 is a premier National Level 24-Hour Cybersecurity for Sustainable Development Hackathon hosted by Jyothi Engineering College. I worked on developing and refining the hackathon's official website, focusing on improving the overall user experience, design, and performance.",
    keyHighlightsTitle: "Key Highlights",
    keyHighlights: [
      { title: "Website Improvement", description: "Refined and improved the overall website architecture, design, and user experience." },
      { title: "Information Accessibility", description: "Structured event details, tracks, schedule, and FAQs to make it easily accessible for participants." },
      { title: "Performance Optimization", description: "Optimized the website to ensure fast loading times and smooth navigation for hackathon registrants." }
    ]
  },

  {
    id: "the-fise",
    category: "Photography",
    title: "The Fise™",
    description: "Minimalistic photography company portfolio.",
    bgClass: "bg-orange",
    tags: ["Frontend", "Design"],
    size: "normal",
    client: "The Fise™",
    role: "Lead Frontend Developer & Designer",
    timeline: "2024",
    status: "Completed",
    tech: "HTML5, CSS3, JavaScript",

    overview: "A sleek, high-performance portfolio crafted for a minimalistic photography company. Focuses on large typography, stunning imagery, and seamless page transitions.",
  },

  {
    id: "sunroute",
    category: "Full Stack",
    title: "SunRoute",
    description: "Find the perfect seat on your bus based on real-time sun position analysis. Powered by OpenStreetMap and SunCalc.",
    image: "/images/framepixel/sunroute-preview.png",
    bgClass: "bg-teal",
    tags: ["React", "TypeScript", "OSRM", "SunCalc"],
    size: "normal",
    links: [
      { url: "https://sunroute.netlify.app/", label: "Visit Live Site", type: "live" }
    ],
    role: "Creator & Lead Developer",
    timeline: "2026",
    status: "Active",
    tech: "React, TypeScript, Tailwind CSS, Leaflet, SunCalc, OpenStreetMap OSRM",
    challenge: "Determining precise sun position along a dynamic route required integrating multiple data sources and handling complex astronomical calculations.",
    solution: "Implemented SunCalc for solar calculations and combined it with OSRM routing segmentation to provide optimal shade seat recommendations.",
    keyHighlightsTitle: "Key Features",
    keyHighlights: [
      { title: "Real Route Analysis", description: "Uses OpenStreetMap's OSRM engine to calculate exact road paths." },
      { title: "Precise Sun Tracking", description: "SunCalc calculates exact solar coordinates at each timestamp." },
      { title: "Smart Recommendations", description: "Analyzes heading differentials to reserve sun-shielded seats." },
      { title: "Instant & Free", description: "100% free with no tracking, no ads, and no sign-up required." }
    ]
  },

  {
    id: "bauhaus",
    category: "AI Agents · Design Tooling",
    title: "Bauhaus",
    logo: "/images/projects/bauhaus/logo.svg",
    description: "Autonomous graphic design intelligence skill (agentskills.io) paired with a local-first WebSocket design studio, Ask AI layer referencing, and 8-format export.",
    image: "/images/projects/bauhaus/studio-editor.png",
    bgClass: "bg-dark",
    tags: ["Agent Skills", "MCP", "Node.js", "Playwright", "SVG/PDF"],
    size: "normal",
    links: [
      { url: "https://github.com/agnelfranciso/Bauhaus", label: "View Source Code", type: "github" },
      { url: "https://github.com/agnelfranciso/Bauhaus/releases/latest", label: "Latest Release", type: "download" }
    ],
    screenshots: [
      "/images/projects/bauhaus/studio-editor.png",
      "/images/projects/bauhaus/studio-dashboard.png",
      "/images/projects/bauhaus/hackathon-poster.png",
      "/images/projects/bauhaus/college-flyer.png",
      "/images/projects/bauhaus/exhibition-poster.png"
    ],
    videos: [
      {
        src: "/videos/projects/bauhaus-promo.mp4",
        title: "Bauhaus Launch Film",
        poster: "/images/projects/bauhaus/studio-editor.png"
      }
    ],
    role: "Sole Architect & Developer",
    timeline: "November 2026",
    focus: "Agentic Graphic Design & Live Scene Graph Studio",
    status: "Active · v1.0.0",
    tech: "Node.js, TypeScript/ESM, WebSockets, Ajv JSON Schema, Playwright Core, Sharp, MCP SDK, Chromium HarfBuzz",

    overview: "Bauhaus is an open-standard Agent Skill and local-first design studio that turns AI coding agents into autonomous graphic designers. Instead of generating flattened bitmaps, Bauhaus plans from first principles, constructs a schema-validated .bauhaus.json scene graph, streams live edits to a browser workspace, inspects rendered previews, and exports verified PNG, SVG, and 300 DPI Print-Ready PDFs.",
    whyItExists: "AI image generators produce uneditable rasters with garbled text, while standard HTML5 Canvas2D libraries struggle with complex Indic scripts like Malayalam and Hindi. Bauhaus bridges that gap with a structured scene graph and Chromium HarfBuzz rendering.",
    challenge: "Building a zero-database, portable design editor that works across Antigravity, Claude Code, Cursor, Codex, Gemini CLI, and Copilot while keeping live WebSocket sync, inline text editing, and print-grade exports rock solid.",
    solution: "Designed a versioned JSON scene graph (12 element types) paired with a Node.js HTTP/WebSocket studio, a stdio MCP server with live sync and fs.watch external reload, and a Playwright + Sharp export verifier.",
    impactDesc: "Validated against the official agentskills.io specification (skills-ref validate), tested end-to-end across English, Malayalam, and Hindi posters, and published as an open-source v1.0.0 release.",

    keyHighlightsTitle: "Key Capabilities",
    keyHighlights: [
      { title: "Live WebSocket Studio", description: "Dedicated Dashboard (/) and Editor (/design/<id>) with Layers, Projects switcher, inline on-canvas text editing, cursor-anchored zoom, and a 27-icon geometric SVG pack." },
      { title: "Right-Click → Ask AI", description: "Select or right-click any element on the canvas to copy a structured [bauhaus:ref] token and instruct your AI agent to modify that exact layer live." },
      { title: "Multilingual HarfBuzz Engine", description: "Automatic Unicode script detection and Google/local font loading for English, Malayalam, Hindi, Tamil, and Arabic without missing-glyph boxes." },
      { title: "8-Format Verified Export", description: "Direct browser download and CLI/MCP export for PNG, JPEG, WebP, SVG, PDF, Print-Ready PDF (bleed & crop marks), HTML/CSS, and .bauhaus.json." }
    ]
  }
];
