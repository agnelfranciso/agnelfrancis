"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, User, Code2, Gamepad2, Sparkles, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { educationData } from "@/data/education";

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState<"about" | "experience">("about");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") === "experience") {
      setActiveTab("experience");
    }
  }, []);

  return (
    <div className="about-tabs-container" style={{ width: "100%" }}>
      {/* Modern Segmented Pill Switcher */}
      <div className="about-segmented-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === "about"}
          onClick={() => setActiveTab("about")}
          className={`about-pill-tab ${activeTab === "about" ? "active" : ""}`}
        >
          <User size={15} className="tab-pill-icon" />
          <span>About</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "experience"}
          onClick={() => setActiveTab("experience")}
          className={`about-pill-tab ${activeTab === "experience" ? "active" : ""}`}
        >
          <Briefcase size={15} className="tab-pill-icon" />
          <span>Experience</span>
        </button>
      </div>

      <div className="about-tab-content">
        {activeTab === "about" && (
          <div className="about-pane animate-fade-in">
            {/* Bio Paragraphs */}
            <p className="about-lead-text">
              Hi, I&apos;m <span className="highlight-text">Agnel Francis Olakkengil</span> — a full-stack developer, designer, and the <strong>Founder of FramePixel</strong>. FramePixel is an independent, non-registered company built by students to engineer showcase-quality web platforms, transit utilities, and multiplayer games where all contributors share credit equally.
            </p>
            <p className="about-sub-text">
              Currently pursuing Computer Science and Engineering (Cybersecurity) at <strong>Jyothi Engineering College (Autonomous), Cheruthuruthy</strong>. My passion lies at the intersection of technology, creativity, and play.
            </p>

            {/* Quick Facts Strip */}
            <div className="about-facts-strip">
              <span className="fact-chip">
                <ShieldCheck size={13} />
                <span>CSE (Cybersecurity)</span>
              </span>
              <span className="fact-chip">
                <Sparkles size={13} />
                <span>Founder @ FramePixel</span>
              </span>
              <span className="fact-chip">
                <MapPin size={13} />
                <span>Kerala, India</span>
              </span>
            </div>

            {/* Studio Showcase Card */}
            <div className="framepixel-card">
              <div className="framepixel-header">
                <div className="framepixel-kicker">
                  <span className="status-pulse-dot" />
                  <span>STUDIO &amp; LAB</span>
                </div>
                <h2 className="framepixel-title">FramePixel</h2>
                <p className="framepixel-desc">
                  FramePixel is an independent, non-registered collaborative company and studio domain where students build showcase-quality products together. From hyper-local transit platforms to real-time multiplayer games, every contributor shares equal credit on software complete enough to be proud of.
                </p>
              </div>

              <div className="framepixel-grid">
                <div className="framepixel-pillar">
                  <div className="pillar-header">
                    <span className="pillar-num">01</span>
                    <Code2 size={16} className="pillar-icon" />
                  </div>
                  <h3 className="pillar-title">FramePixel Studio</h3>
                  <p className="pillar-text">
                    A collaborative digital collective with friends engineering bespoke websites, transit applications, and lightweight modern platforms.
                  </p>
                </div>

                <div className="framepixel-pillar">
                  <div className="pillar-header">
                    <span className="pillar-num">02</span>
                    <Gamepad2 size={16} className="pillar-icon" />
                  </div>
                  <h3 className="pillar-title">Web-Based Gaming</h3>
                  <p className="pillar-text">
                    Developing multiplayer word battles, cooperative puzzle games, and interactive story experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="about-pane animate-fade-in">
            <div className="experience-timeline">
              {educationData.map((inst, idx) => (
                <div key={inst.id} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="timeline-icon-box timeline-logo-box">
                      <img
                        src={inst.logo}
                        alt={`${inst.name} Logo`}
                        className="timeline-logo-img"
                      />
                    </div>
                    {idx < educationData.length - 1 && (
                      <div className="timeline-line" />
                    )}
                  </div>
                  <Link
                    href={`/education/${inst.id}`}
                    className={`timeline-card timeline-card-clickable ${
                      inst.status === "current" ? "current" : ""
                    }`}
                  >
                    <div className="timeline-badge-row">
                      <span
                        className={
                          inst.status === "current"
                            ? "current-badge"
                            : "year-badge"
                        }
                      >
                        {inst.status === "current" && (
                          <span className="badge-pulse-dot" />
                        )}
                        {inst.statusLabel}
                      </span>
                    </div>
                    <h3 className="timeline-title">{inst.name}</h3>
                    <p className="timeline-degree">{inst.degree}</p>
                    <p className="timeline-location">{inst.location}</p>
                    <span className="timeline-explore-link">
                      <span>
                        {inst.projectIds.length} Projects &bull;{" "}
                        {inst.blogSlugs.length} Posts &bull; View Details
                      </span>
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
