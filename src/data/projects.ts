export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  bgClass: string;
  tags: string[];
  size: "normal" | "large";
  
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
}

export const projectsData: Project[] = [
  {
    id: "semfolder",
    category: "Academic Productivity",
    title: "The SemFolder",
    description: "Local-first semester and course manager for students.",
    image: "/images/projects/semfolder.png",
    bgClass: "bg-orange",
    tags: ["React", "PWA", "LocalStorage"],
    size: "large",
    liveLink: "https://thesemfolder.netlify.app/",
    
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
    liveLink: "https://bussiler-app.netlify.app/",
    
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
    liveLink: "https://sarvodayam.in/entenadu",
    
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
