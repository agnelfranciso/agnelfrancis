import type { Metadata } from "next";
import "./hall-of-fame.css";
import InteractiveHallOfFame from "@/components/InteractiveHallOfFame";

export const metadata: Metadata = {
  title: "Hall of Fame | Agnel Francis",
  description: "A tribute to the incredible people who have helped me and collaborated on my projects.",
};

const collaborators = [
  {
    id: "nakul-suresh",
    name: "Nakul Suresh",
    role: "Project Collaborator - OPCODE IMPACT 2026",
    description: "Brought me onboard to help create the website for OPCODE IMPACT 2026, a National Level 24-Hour Cybersecurity Hackathon. An incredible partner in building secure, resilient platforms.",
    github: "https://github.com/Nakulhhhfrrr",
    bgClass: "bg-blue",
    image: "/images/halloffame/nakul-suresh.png"
  },
  // You can add more collaborators here in the future
];

export default function HallOfFamePage() {
  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">Hall of Fame</h1>
        <p className="page-subtitle">A special tribute to the amazing individuals who have collaborated, mentored, or simply helped me along my journey.</p>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <InteractiveHallOfFame collaborators={collaborators} />
      </div>
    </main>
  );
}
