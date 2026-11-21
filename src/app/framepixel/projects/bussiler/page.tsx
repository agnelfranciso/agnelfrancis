import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FramePixelHeader from "../../components/FramePixelHeader";
import FramePixelFooter from "../../components/FramePixelFooter";
import { projectsData } from "@/data/projects";
import "../../framepixel.css";

export const metadata: Metadata = {
  title: "Bussiler (Android App) — Case Study | FramePixel Studio",
  description: "Native Android public transportation system for Velur. Real-time departure countdowns, bus reminder alerts, and offline full-day schedules.",
  keywords: ["Bussiler", "Bussiler Android App", "Velur Transit", "FramePixel", "Public Transportation", "Bus Timings Velur"],
  openGraph: {
    title: "Bussiler Android App Case Study — FramePixel Studio",
    description: "Native Android public transportation platform for Velur. Real-time departure countdowns and alert notifications.",
    url: "https://agnelfrancis.com/framepixel/projects/bussiler",
  },
};

export default function BussilerCaseStudyPage() {
  const project = projectsData.find((p) => p.id === "bussiler");

  if (!project) {
    notFound();
  }

  const screenshots = project.screenshots || [];

  return (
    <div className="fp-wrapper">
      <FramePixelHeader />

      <main className="fp-case-wrapper">
        {/* Navigation Bar */}
        <div className="fp-case-nav-bar">
          <Link href="/framepixel#work" className="fp-case-back-btn">
            &larr; Back to Projects
          </Link>
        </div>

        {/* Hero Header */}
        <header className="fp-case-hero-header">
          <div className="fp-case-meta-row">
            <span className="fp-case-meta-item">{project.category}</span>
            <span>&bull;</span>
            <span className="fp-case-meta-item">Native Transit Platform</span>
            <span>&bull;</span>
            <span className="fp-case-meta-item" style={{ color: "#10B981" }}>
              <span className="fp-pulse-dot" style={{ backgroundColor: "#10B981", width: 6, height: 6 }} />
              {project.status || "Android Active (Website Retired)"}
            </span>
          </div>

          <h1 className="fp-case-title">{project.title}</h1>

          <p className="fp-case-tagline">
            {project.description}
          </p>

          {/* Action Bar */}
          <div className="fp-case-action-bar">
            <a
              href="/project-files/bussiler/Bussiler.apk"
              download="Bussiler.apk"
              className="fp-btn-primary"
            >
              Download Bussiler APK (22 MB) ↓
            </a>
            <a
              href="#app-gallery"
              className="fp-btn-outline"
            >
              Explore App Screens ↓
            </a>
            <a
              href="#architecture"
              className="fp-btn-outline"
            >
              Technical Specs ↓
            </a>
          </div>
        </header>

        {/* Featured Android Showcase Viewport */}
        <div
          className="fp-case-showcase-box"
          style={{
            backgroundColor: "#0F0F10",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "28px",
            padding: "2.5rem 1.5rem",
            marginBottom: "4.5rem",
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
              fontFamily: "var(--font-mono-fp)",
              fontSize: "11px",
              color: "rgba(246, 243, 236, 0.75)",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="fp-pulse-dot" style={{ backgroundColor: "#10B981" }} />
              <span>BUSSILER NATIVE ANDROID INTERFACE</span>
            </div>
            <div style={{ color: "var(--fp-coral)", fontWeight: 700 }}>
              TRANSITIONED TO NATIVE MOBILE APP
            </div>
          </div>

          {/* Side-by-side Mobile Screens Showcase */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "1.5rem",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {screenshots.slice(0, 3).map((src, idx) => (
              <div
                key={src}
                style={{
                  maxWidth: "280px",
                  width: "100%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "2px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  src={src}
                  alt={`Bussiler Android Screen ${idx + 1}`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="fp-case-main-grid">
          <div>
            {/* Transition Story / Overview */}
            <section style={{ marginBottom: "3rem" }}>
              <h2 className="fp-case-section-heading">Evolution to Native Android</h2>
              <p className="fp-case-body-text">
                {project.overview ||
                  "Bussiler is a hyper-local transit system engineered specifically for commuters in Velur and surrounding corridors. While initially launched as an HTML web app in 2024, the platform has now fully transitioned to a dedicated native Android application."}
              </p>
              <div
                style={{
                  backgroundColor: "var(--fp-warm-cream-card)",
                  borderLeft: "4px solid var(--fp-coral)",
                  borderRadius: "0 16px 16px 0",
                  padding: "1.5rem",
                  margin: "1.75rem 0",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono-fp)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--fp-coral)", fontWeight: 700, marginBottom: "0.35rem" }}>
                  Platform Strategy Decision
                </div>
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--fp-ink)", fontWeight: 500 }}>
                  The legacy website has been retired in favor of the dedicated native Android app. The Android version is significantly easier to access with a single tap, functions offline when network signals drop, and introduces native notification alarms for individual bus timings.
                </p>
              </div>
            </section>

            {/* Challenge & Solution */}
            <section style={{ marginBottom: "3rem" }}>
              <h2 className="fp-case-section-heading">The Challenge</h2>
              <div className="fp-case-challenge-box">
                <p className="fp-case-body-text" style={{ margin: 0 }}>
                  {project.challenge}
                </p>
              </div>

              <h2 className="fp-case-section-heading" style={{ marginTop: "2.5rem" }}>The Solution</h2>
              <p className="fp-case-body-text">
                {project.solution}
              </p>
            </section>

            {/* Features from Real App UI */}
            <section style={{ marginBottom: "3.5rem" }} id="app-gallery">
              <h2 className="fp-case-section-heading">{project.keyHighlightsTitle || "Native Android Features"}</h2>
              <div className="fp-case-features-grid">
                {project.keyHighlights?.map((feat, index) => (
                  <div key={feat.title} className="fp-feature-pill-card">
                    <div className="fp-feature-pill-title">
                      <span style={{ color: "var(--fp-coral)" }}>0{index + 1}</span>
                      {feat.title}
                    </div>
                    <p className="fp-feature-pill-desc">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Future Ambition Section */}
            <section style={{ marginBottom: "3.5rem" }}>
              <h2 className="fp-case-section-heading">Future Ambition: Unified Kerala Fleet Telemetry</h2>
              <p className="fp-case-body-text">
                The public transportation challenge in Kerala remains deeply personal. The long-term ambition for Bussiler is to engage directly with relevant transport authorities across Kerala, securing official schedule data and telemetry approvals to power unified, live GPS tracking for all private and KSRTC bus fleets across the entire state.
              </p>
            </section>

            {/* Visual Screen Deep-Dive Grid */}
            <section style={{ marginBottom: "3.5rem" }}>
              <h2 className="fp-case-section-heading">Interface Gallery</h2>
              <p className="fp-case-body-text">
                Every screen in Bussiler is engineered with dark mode ergonomics, large high-contrast numerals, and clear touch targets for effortless one-handed use while walking or commuting.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1.25rem",
                  marginTop: "1.5rem",
                }}
              >
                {screenshots.slice(1).map((src) => (
                  <div
                    key={src}
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid var(--fp-ink-border)",
                      backgroundColor: "#0F0F10",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    <img
                      src={src}
                      alt="Bussiler Android Application View"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Details & Specs (No team listing per instruction) */}
          <div>
            {/* Quick Specs Card */}
            <div className="fp-case-card-panel" id="architecture" style={{ borderLeft: "4px solid var(--fp-coral)" }}>
              <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.5rem" }}>
                Platform Status
              </span>
              <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.75rem", margin: "0 0 1rem 0", color: "var(--fp-ink)" }}>
                Active Android Build
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontFamily: "var(--font-mono-fp)", fontSize: "12px" }}>
                <div>
                  <span style={{ color: "var(--fp-ink-muted)", textTransform: "uppercase" }}>Category: </span>
                  <strong style={{ color: "var(--fp-ink)" }}>{project.category}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--fp-ink-muted)", textTransform: "uppercase" }}>Timeline: </span>
                  <strong style={{ color: "var(--fp-ink)" }}>2022 &ndash; 2025</strong>
                </div>
                <div>
                  <span style={{ color: "var(--fp-ink-muted)", textTransform: "uppercase" }}>Target Region: </span>
                  <strong style={{ color: "var(--fp-ink)" }}>Velur, Kerala</strong>
                </div>
                <div>
                  <span style={{ color: "var(--fp-ink-muted)", textTransform: "uppercase" }}>Status: </span>
                  <strong style={{ color: "#10B981" }}>{project.status}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--fp-ink-muted)", textTransform: "uppercase" }}>Focus: </span>
                  <strong style={{ color: "var(--fp-ink)" }}>Studio Founding Project</strong>
                </div>
                <div>
                  <span style={{ color: "var(--fp-ink-muted)", textTransform: "uppercase" }}>Offline Support: </span>
                  <strong style={{ color: "var(--fp-ink)" }}>Full Local SQLite Caching</strong>
                </div>
              </div>
            </div>

            {/* Architecture Stack */}
            <div className="fp-case-tech-box">
              <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.5rem" }}>
                Mobile Architecture
              </span>
              <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.65rem", margin: 0, color: "var(--fp-ink)" }}>
                Technology Stack
              </h3>
              <div className="fp-case-tech-tags">
                {project.tags.map((t) => (
                  <span key={t} className="fp-tech-badge">
                    {t}
                  </span>
                ))}
                <span className="fp-tech-badge">Local Notifications</span>
                <span className="fp-tech-badge">Material You UI</span>
              </div>
              <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--fp-ink-muted)", lineHeight: 1.5, marginBottom: 0 }}>
                {project.tech}
              </p>
            </div>

            {/* Regional Reach Card */}
            <div className="fp-case-card-panel">
              <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.5rem" }}>
                Velur Public Transit
              </span>
              <div style={{ fontFamily: "var(--font-editorial)", fontSize: "3rem", color: "var(--fp-ink)", lineHeight: 1, margin: "0.5rem 0" }}>
                3 Corridors
              </div>
              <p style={{ fontFamily: "var(--font-mono-fp)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--fp-ink-muted)", margin: 0 }}>
                Connecting Thrissur, Wadakkanchery &amp; Kechery hubs with zero paper schedules needed.
              </p>
            </div>
          </div>
        </div>
      </main>

      <FramePixelFooter />
    </div>
  );
}
