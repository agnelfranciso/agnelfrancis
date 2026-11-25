export interface EducationAchievement {
  title: string;
  description: string;
  tag: string;
}

export interface EducationInstitution {
  id: string;
  name: string;
  shortName: string;
  degree: string;
  period: string;
  status: "current" | "completed";
  statusLabel: string;
  location: string;
  logo: string;
  website?: string;
  overview: string;
  highlights: string[];
  achievements: EducationAchievement[];
  projectIds: string[];
  blogSlugs: string[];
}

export const educationData: EducationInstitution[] = [
  {
    id: "jyothi-engineering-college",
    name: "Jyothi Engineering College (Autonomous)",
    shortName: "Jyothi Engineering College",
    degree: "B.Tech Computer Science and Engineering (Cybersecurity)",
    period: "2025 – 2029",
    status: "current",
    statusLabel: "Current (2025 – 2029)",
    location: "Cheruthuruthy, Thrissur, Kerala",
    logo: "/images/education/jyothi.svg",
    website: "https://jecc.ac.in",
    overview:
      "I am currently learning Cybersecurity at Jyothi Engineering College, actively applying my technical knowledge to build and implement real-world projects. Being shortlisted in the Smart India Hackathon (SIH) and serving as a student volunteer for OPCODE IMPACT — hosted by my own department — have been defining honours of my college journey so far.",
    highlights: [
      "CSE (Cybersecurity)",
      "SIH Shortlisted",
      "OPCODE IMPACT Student Volunteer",
      "Applied Tech & Projects",
    ],
    achievements: [
      {
        title: "Student Volunteer — OPCODE IMPACT Hackathon",
        description:
          "Honoured to be part of the OPCODE IMPACT Hackathon hosted by the CSE (Cybersecurity) department as a student volunteer, supporting hackathon projects and contributing to the event's digital platform.",
        tag: "2026 • Department Hackathon",
      },
      {
        title: "Shortlisted in Smart India Hackathon (SIH)",
        description:
          "Shortlisted at the institutional level for Smart India Hackathon with SpecSync — a proud milestone collaborating on rapid system architecture and practical problem-solving.",
        tag: "National Level • SIH",
      },
      {
        title: "Applying Cybersecurity & Engineering",
        description:
          "Combining coursework in computer science and cybersecurity with hands-on software engineering and campus technical initiatives.",
        tag: "Ongoing",
      },
    ],
    projectIds: ["opcode-impact-2026"],
    blogSlugs: [
      "organizing-opcode-hackathon-2026",
      "opcode-impact-2026",
      "sih-specsync-selection",
    ],
  },
  {
    id: "sarvodayam-vhss",
    name: "Sarvodayam VHSS",
    shortName: "Sarvodayam VHSS",
    degree: "Junior Software Developer Course (VHSE)",
    period: "2023 – 2025",
    status: "completed",
    statusLabel: "2023 – 2025",
    location: "Aryampadam, Thrissur, Kerala",
    logo: "/images/education/sarvodayam.svg",
    overview:
      "Sarvodayam VHSS, Aryampadam is where my technical journey truly began. Because it wasn't a crowded college environment with intense competition for tech roles, I had the space to step up into the school's internal tech initiatives and projects. I joined Skill Share projects, hosted multiple expos, won at the school level, and made lifelong friends who are still close to me today — a journey that will always remain a part of me.",
    highlights: [
      "Where My Tech Journey Began",
      "Internal School Tech & Projects",
      "Skill Share & Multiple Expos",
      "School-Level Winner",
    ],
    achievements: [
      {
        title: "Skill Share Projects & Ente Nadu",
        description:
          "Took part in Samagra Shiksha Kerala's VHSE Skill Share projects at Sarvodayam VHSS, building Ente Nadu to connect skilled local technicians and workers directly with households.",
        tag: "VHSE Skill Share",
      },
      {
        title: "Hosted Multiple Expos & School-Level Wins",
        description:
          "Led internal technical work for the school, organized and hosted multiple technology expos, and earned recognition by winning at the school level.",
        tag: "Expos & Awards",
      },
      {
        title: "Lifelong Friendships & Foundation",
        description:
          "Beyond code and projects, Sarvodayam gave me close friends who are still part of my life today and shaped how I collaborate on everything since.",
        tag: "2023 – 2025",
      },
    ],
    projectIds: ["ente-nadu"],
    blogSlugs: [],
  },
  {
    id: "grsrvhss-velur",
    name: "Govt RSRV HSS, Velur",
    shortName: "Govt RSRV HSS",
    degree: "High School Education (SSLC) • Little KITEs",
    period: "2017 – 2023",
    status: "completed",
    statusLabel: "2017 – 2023",
    location: "Velur, Thrissur, Kerala",
    logo: "/images/education/grsrvhss.svg",
    overview:
      "At Govt RSRV HSS, Velur, I was an active member of Little KITEs — a Kerala government IT initiative. Through Little KITEs, I got to explore a broad creative and technical spectrum including projects, magazine making, and photography. This is where my developer journey started and where I grew into a dedicated computer enthusiast.",
    highlights: [
      "Little KITEs Member (Govt. Initiative)",
      "Projects, Magazine Making & Photography",
      "Start of My Developer Journey",
    ],
    achievements: [
      {
        title: "Little KITEs — Government IT Club",
        description:
          "Participated in Little KITEs (Kerala Infrastructure and Technology for Education), working across software projects, digital magazine making, photography, and multimedia.",
        tag: "Little KITEs",
      },
      {
        title: "Where My Developer Journey Started",
        description:
          "Discovered my passion for computers and programming during high school, turning curiosity into a lifelong developer journey.",
        tag: "2022–2023",
      },
    ],
    projectIds: [],
    blogSlugs: [],
  },
];
