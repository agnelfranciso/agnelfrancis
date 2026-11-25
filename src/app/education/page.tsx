import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, FolderGit2, BookOpen } from "lucide-react";
import { educationData } from "@/data/education";

export const metadata: Metadata = {
  title: "Education | Agnel Francis",
  description:
    "Academic journey of Agnel Francis — Jyothi Engineering College, Sarvodayam VHSS, and Govt RSRV HSS Velur, along with projects and articles built at each institution.",
};

export default function EducationIndexPage() {
  return (
    <main className="page-container education-page-container">
      <div className="education-header">
        <span className="about-kicker">ACADEMIC BACKGROUND</span>
        <h1 className="page-title" style={{ marginTop: "0.45rem" }}>
          Education
        </h1>
        <p className="education-subtitle">
          Every institution that shaped my engineering path — explore achievements, projects built there, and related stories.
        </p>
      </div>

      <div className="education-index-grid">
        {educationData.map((inst) => (
          <Link
            key={inst.id}
            href={`/education/${inst.id}`}
            className="education-index-card"
          >
            <div className="education-index-top">
              <div className="education-logo-wrap">
                <img src={inst.logo} alt={`${inst.name} Logo`} />
              </div>
              <span
                className={
                  inst.status === "current" ? "current-badge" : "year-badge"
                }
              >
                {inst.status === "current" && (
                  <span className="badge-pulse-dot" />
                )}
                {inst.statusLabel}
              </span>
            </div>

            <h2 className="education-index-title">{inst.name}</h2>
            <p className="education-index-degree">{inst.degree}</p>
            <p className="education-index-location">
              <MapPin size={14} />
              <span>{inst.location}</span>
            </p>
            <p className="education-index-overview">{inst.overview}</p>

            <div className="education-index-footer">
              <div className="education-index-counts">
                <span>
                  <FolderGit2 size={14} />
                  {inst.projectIds.length} Projects
                </span>
                <span>
                  <BookOpen size={14} />
                  {inst.blogSlugs.length} Posts
                </span>
              </div>
              <span className="education-read-more">
                <span>Explore</span>
                <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
