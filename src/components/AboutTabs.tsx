"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, User } from "lucide-react";

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState<"about" | "experience">("about");

  return (
    <div className="about-tabs-container" style={{ width: "100%" }}>
      <div className="tabs-header" style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1rem" }}>
        <button 
          onClick={() => setActiveTab("about")}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            fontFamily: "IntraNet, sans-serif",
            color: activeTab === "about" ? "var(--text-main)" : "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            position: "relative",
            transition: "color 0.2s"
          }}
        >
          <User size={20} />
          About
          {activeTab === "about" && (
            <div style={{ position: "absolute", bottom: "-1.1rem", left: 0, width: "100%", height: "2px", background: "var(--text-main)", borderRadius: "2px" }} />
          )}
        </button>
        <button 
          onClick={() => setActiveTab("experience")}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            fontFamily: "IntraNet, sans-serif",
            color: activeTab === "experience" ? "var(--text-main)" : "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            position: "relative",
            transition: "color 0.2s"
          }}
        >
          <Briefcase size={20} />
          Experience
          {activeTab === "experience" && (
            <div style={{ position: "absolute", bottom: "-1.1rem", left: 0, width: "100%", height: "2px", background: "var(--text-main)", borderRadius: "2px" }} />
          )}
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "about" && (
          <div className="animate-fade-in">
            <p className="about-description">
              Hi, I&apos;m Agnel Francis Olakkengil, a full-stack developer, designer, and the <strong>CEO of FramePixel</strong>. I specialize in building modern digital solutions and interactive web-based games that blend clean UI with smart logic.
            </p>
            <p className="about-description">
              Currently, I am a first-year student pursuing Computer Science and Engineering (Cybersecurity) at Jyothi Engineering College (Autonomous), Cheruthuruthy. My passion lies at the intersection of technology, creativity, and play.
            </p>

            <h2 className="section-title" style={{ marginTop: "3rem", fontSize: "2rem" }}>FramePixel</h2>
            <p className="about-description" style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
              FramePixel is a digital solutions and web-based games studio focused on building experiences that actually matter. From scalable business platforms to multiplayer party games, we sit at the intersection of technology and engagement.
            </p>

            <ul className="experience-list">
              <li>
                <strong>FramePixel Studio</strong>
                <span>Leading a digital solutions studio focused on custom websites, web apps, and interactive games.</span>
              </li>
              <li>
                <strong>Web-Based Gaming</strong>
                <span>Developing multiplayer word battles, cooperative puzzle games, and interactive story experiences.</span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="animate-fade-in">
            <ul className="experience-list" style={{ marginTop: "1rem" }}>
              <li>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                  <div style={{ flexShrink: 0, marginTop: "0.2rem" }}>
                    <GraduationCap size={28} />
                  </div>
                  <strong style={{ fontSize: "1.15rem", lineHeight: "1.3" }}>Jyothi Engineering College, Cheruthuruthy, Thrissur</strong>
                </div>
                <span>Current (2025 - 2029) • B.Tech Computer Science and Engineering (Cybersecurity)</span>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                  <div style={{ flexShrink: 0, marginTop: "0.2rem" }}>
                    <GraduationCap size={28} />
                  </div>
                  <strong style={{ fontSize: "1.15rem", lineHeight: "1.3" }}>Sarvodayam VHSS, Aryampadam</strong>
                </div>
                <span>2023 - 2025 • Junior Software Developer Course</span>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                  <div style={{ flexShrink: 0, marginTop: "0.2rem" }}>
                    <GraduationCap size={28} />
                  </div>
                  <strong style={{ fontSize: "1.15rem", lineHeight: "1.3" }}>Govt RSRV HSS, Velur</strong>
                </div>
                <span>2017 - 2023 • High School Education</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
