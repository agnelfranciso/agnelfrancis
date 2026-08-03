export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  bgClass: string;
  tags: string[];
  size: "normal" | "large";
  isMobileApp?: boolean;
  links?: { url: string, label: string, type: 'live' | 'github' | 'fdroid' | 'playstore' }[];
  // Detail page specifics
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
}

export const projectsData: Project[] = [
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
    links: [{ url: "https://github.com/agnelfranciso/AerisIQ", label: "View Source Code", type: "github" }],
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
    id: "semfolder",
    category: "Academic Productivity",
    title: "The SemFolder",
    description: "Local-first semester and course manager for students.",
    image: "/images/projects/semfolder.png",
    bgClass: "bg-orange",
    tags: ["React", "PWA", "LocalStorage"],
    size: "large",
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
    id: "bussiler",
    category: "Public Transport",
    title: "Bussiler",
    description: "Real-time bus schedules and route information for Velur.",
    image: "/images/projects/bussiler.png",
    bgClass: "bg-blue",
    tags: ["HTML", "CSS", "JS"],
    size: "normal",
    links: [{ url: "https://bussiler-app.netlify.app/", label: "Visit Live Site", type: "live" }],
    
    role: "Full Stack Lead",
    timeline: "Aug 2024 - Present",
    status: "Live Beta",
    tech: "HTML, CSS, JS",
    
    challenge: "Commuters in Velur faced a daily struggle with unpredictable bus timings and lack of route information. The goal was to create a centralized, easily accessible digital platform to bridge this information gap.",
    solution: "Bussiler provides a lightweight, user-friendly interface for passengers to check schedules instantly. By digitizing manual timetables, we've reduced waiting times and improved travel planning for hundreds of daily commuters.",
    
    keyHighlightsTitle: "Key Features",
    keyHighlights: [
      { title: "Real-time Schedules", description: "Accurate departure and arrival times for all buses in Velur." },
      { title: "Route Details", description: "Comprehensive route maps and stop information." },
      { title: "Upcoming Predictions", description: "Smart algorithms to predict the next available bus." },
      { title: "Mobile First", description: "Optimized for seamless experience on all mobile devices." }
    ]
  },
  {
    id: "ente-nadu",
    category: "Community",
    title: "Ente Nadu",
    description: "Connects local service providers with community members.",
    image: "/images/projects/entenadu.png",
    bgClass: "bg-yellow",
    tags: ["React Native", "Firebase"],
    size: "normal",
    links: [{ url: "https://sarvodayam.in/entenadu", label: "Visit Live Site", type: "live" }],
    
    role: "Developer Intern",
    timeline: "2023 - 2024",
    impact: "100+ Providers",
    tech: "React Native, Firebase",
    
    overview: "Ente Nadu is a student-driven initiative developed during my internship to address the disconnect between skilled local workers and residents needing services. It serves as a digital directory and connection platform for the village.",
    impactDesc: "The platform successfully onboarded over 100 service providers, ranging from electricians to plumbers, ensuring they have better visibility. It has strengthened community bonds and supported the local micro-economy.",
    
    keyHighlightsTitle: "Key Highlights",
    keyHighlights: [
      { title: "Service Connections", description: "Bridging the gap between local service providers and households." },
      { title: "Localized Content", description: "Tailored specifically for the needs of the village community." },
      { title: "Real-time Updates", description: "Live notifications for service availability and community news." }
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
    size: "large",
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
    id: "the-fise",
    category: "Photography",
    title: "The Fise™",
    description: "Minimalistic photography company portfolio.",
    bgClass: "bg-orange",
    tags: ["Frontend", "Design"],
    size: "large",
    
    overview: "A sleek, high-performance portfolio crafted for a minimalistic photography company. Focuses on large typography, stunning imagery, and seamless page transitions.",
  }
];
