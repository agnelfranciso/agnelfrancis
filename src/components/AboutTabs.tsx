"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, User, Code2, Gamepad2, Sparkles, MapPin, ShieldCheck } from "lucide-react";

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState<"about" | "experience">("about");

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
              Hi, I&apos;m <span className="highlight-text">Agnel Francis Olakkengil</span> — a full-stack developer, designer, and the <strong>CEO of FramePixel</strong>. I specialize in building modern digital solutions and interactive web-based games that blend clean UI with smart logic.
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
                <span>CEO @ FramePixel</span>
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
                  FramePixel is a digital solutions and web-based games studio focused on building experiences that actually matter. From scalable business platforms to multiplayer party games, we sit at the intersection of technology and engagement.
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
                    Leading a digital solutions studio focused on custom websites, web apps, and modern interactive platforms.
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
              {/* Item 1 */}
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon-box">
                    <GraduationCap size={18} />
                  </div>
                  <div className="timeline-line" />
                </div>
                <div className="timeline-card current">
                  <div className="timeline-badge-row">
                    <span className="current-badge">
                      <span className="badge-pulse-dot" /> Current (2025 – 2029)
                    </span>
                  </div>
                  <h3 className="timeline-title">Jyothi Engineering College (Autonomous)</h3>
                  <p className="timeline-degree">B.Tech Computer Science and Engineering (Cybersecurity)</p>
                  <p className="timeline-location">Cheruthuruthy, Thrissur</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon-box">
                    <GraduationCap size={18} />
                  </div>
                  <div className="timeline-line" />
                </div>
                <div className="timeline-card">
                  <div className="timeline-badge-row">
                    <span className="year-badge">2023 – 2025</span>
                  </div>
                  <h3 className="timeline-title">Sarvodayam VHSS</h3>
                  <p className="timeline-degree">Junior Software Developer Course</p>
                  <p className="timeline-location">Aryampadam</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon-box">
                    <GraduationCap size={18} />
                  </div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-badge-row">
                    <span className="year-badge">2017 – 2023</span>
                  </div>
                  <h3 className="timeline-title">Govt RSRV HSS</h3>
                  <p className="timeline-degree">High School Education</p>
                  <p className="timeline-location">Velur</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
