"use client";

import React, { useState } from "react";
import Link from "next/link";
import FramePixelHeader from "./components/FramePixelHeader";
import FramePixelFooter from "./components/FramePixelFooter";
import "./framepixel.css";

export default function FramePixelClient() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setFormMessage("Transmitting message to FramePixel studio...");

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      (typeof window !== "undefined"
        ? atob("Y2NkMjBlMWMtZDEyNy00N2I3LTg4YjUtNDFiNDUwODBkOTMw")
        : "");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", "New Transmission from FramePixel Studio Website");
    formData.append("from_name", "FramePixel Studio Portal");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormMessage("Transmission received. FramePixel will be in touch shortly.");
        form.reset();
        setTimeout(() => {
          setFormStatus("idle");
          setFormMessage("");
        }, 6000);
      } else {
        setFormStatus("error");
        setFormMessage(data.message || "Transmission failed. Please reach out to agnelfrancis2007@hotmail.com.");
      }
    } catch {
      setFormStatus("error");
      setFormMessage("Network issue. Please email agnelfrancis2007@hotmail.com directly.");
    }
  };

  return (
    <div className="fp-wrapper">
      <FramePixelHeader />

      <main>
        {/* Hero Section */}
        <section className="fp-hero">
          <div className="fp-hero-content">
            <div className="fp-status-badge">
              <span className="fp-pulse-dot" />
              <span>Velur Studio &bull; Non-Registered Student Collective</span>
            </div>

            <h1 className="fp-hero-headline">
              We build pl<span className="fp-accent-ring">a</span>tforms &amp; games that{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>matter.</span>
            </h1>

            <p className="fp-hero-subhead">
              High-Utility Web Systems &bull; Real-Time Multiplayer Games &bull; Velur &amp; Global
            </p>

            <div className="fp-hero-buttons">
              <a href="#work" className="fp-btn-dark">
                View Selected Work ↓
              </a>
              <a href="#contact" className="fp-btn-outline">
                Book Exploration
              </a>
            </div>

            {/* Studio Metric Highlights in Hero */}
            <div className="fp-hero-metrics" style={{ marginBottom: "2rem" }}>
              <div className="fp-hero-metric-item">
                <span className="fp-hero-metric-value">35K+</span>
                <span className="fp-hero-metric-label">Daily Commuters</span>
              </div>
              <div className="fp-metric-divider" style={{ color: "var(--fp-ink-border)" }}>•</div>
              <div className="fp-hero-metric-item">
                <span className="fp-hero-metric-value">&lt;50ms</span>
                <span className="fp-hero-metric-label">Sync Latency</span>
              </div>
              <div className="fp-metric-divider" style={{ color: "var(--fp-ink-border)" }}>•</div>
              <div className="fp-hero-metric-item">
                <span className="fp-hero-metric-value">100%</span>
                <span className="fp-hero-metric-label">Free &amp; Open Utilities</span>
              </div>
            </div>
          </div>

          {/* Live Status Ticker Bar */}
          <div className="fp-ticker-bar">
            <div className="fp-ticker-item-live">
              <span className="fp-ticker-dot-green" />
              <span style={{ fontWeight: 600, color: "var(--fp-ink)" }}>
                Studio Status: Active / Accepting Q3–Q4 Commissions
              </span>
            </div>
            <div>
              <span>VELUR &bull; GLOBAL SYSTEMS &bull; EST. 2026</span>
            </div>
            <div>
              <a href="#work" style={{ color: "var(--fp-ink)", textDecoration: "none", fontWeight: 700 }}>
                Explore Selected Work ↓
              </a>
            </div>
          </div>
        </section>

        {/* Selected Works Section */}
        <section className="fp-section" id="work">
          <div className="fp-section-inner">
            <div className="fp-section-header">
              <div className="fp-section-title-wrap">
                <span className="fp-section-badge-dot" />
                <span className="fp-section-tag">Selected Works</span>
              </div>
              <span className="fp-section-count">01 &mdash; 03</span>
            </div>

            <div className="fp-projects-list">
              {/* Project 01: Bussiler */}
              <article className="fp-project-card">
                <div className="fp-project-meta-col">
                  <div>
                    <span className="fp-project-num">01 / Founding Studio Project &bull; Android Transit</span>
                    <h2 className="fp-project-title">Bussiler</h2>
                    <p className="fp-project-desc">
                      FramePixel's founding transit platform. Born from a multi-year development journey across multiple domains, Bussiler completely retired its legacy web prototypes to deliver a dedicated native Android application with live corridor countdowns, departure alarms, full-day offline schedules, and transit telemetry.
                    </p>

                    <div className="fp-project-tags">
                      <span className="fp-tag-pill">Android Native</span>
                      <span className="fp-tag-pill">Real-Time Countdown</span>
                      <span className="fp-tag-pill">Departure Alerts</span>
                      <span className="fp-tag-pill">Offline Timetables</span>
                      <span className="fp-tag-pill">Velur Corridors</span>
                    </div>

                    <div className="fp-project-actions">
                      <Link href="/framepixel/projects/bussiler" className="fp-btn-primary">
                        View App Case Study &rarr;
                      </Link>
                      <a
                        href="/project-files/bussiler/Bussiler.apk"
                        download="Bussiler.apk"
                        className="fp-btn-outline"
                      >
                        Download APK (22 MB) ↓
                      </a>
                    </div>
                  </div>

                  <div className="fp-project-footer">
                    <span>Public Transit Architecture</span>
                    <span style={{ fontWeight: 700, color: "var(--fp-ink)" }}>Android &bull; Active</span>
                  </div>
                </div>

                {/* Mockup Preview Visual */}
                <div className="fp-project-mockup-wrapper" style={{ backgroundColor: "#0F0F10" }}>
                  <div className="fp-browser-bar" style={{ backgroundColor: "#18181A", color: "#F6F3EC", borderBottomColor: "rgba(255,255,255,0.1)" }}>
                    <div className="fp-browser-dots">
                      <span className="fp-browser-dot" style={{ backgroundColor: "#FF5F56" }} />
                      <span className="fp-browser-dot" style={{ backgroundColor: "#FFBD2E" }} />
                      <span className="fp-browser-dot" style={{ backgroundColor: "#27C93F" }} />
                    </div>
                    <span>bussiler &bull; android release</span>
                    <span style={{ color: "#10B981", fontWeight: 700 }}>Live Telemetry</span>
                  </div>
                  <div className="fp-mockup-screen" style={{ maxHeight: "420px", display: "flex", justifyContent: "center", padding: "1rem", backgroundColor: "#0F0F10" }}>
                    <img
                      src="/images/framepixel/Screenshot_20261121-144406.png"
                      alt="Bussiler Android Native App Screen"
                      className="fp-mockup-img"
                      style={{ maxHeight: "380px", width: "auto", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)" }}
                    />
                  </div>
                </div>
              </article>

              {/* Project 02: SunRoute */}
              <article className="fp-project-card">
                <div className="fp-project-meta-col">
                  <div>
                    <span className="fp-project-num">02 / Algorithmic Booking</span>
                    <h2 className="fp-project-title">SunRoute</h2>
                    <p className="fp-project-desc">
                      Find the perfect seat on your bus based on real-time sun position analysis. Combines OpenStreetMap OSRM routing and the SunCalc astronomical library to guarantee maximum shade on every journey.
                    </p>

                    <div className="fp-project-tags">
                      <span className="fp-tag-pill">Full Stack</span>
                      <span className="fp-tag-pill">React + TypeScript</span>
                      <span className="fp-tag-pill">SunCalc Astro Engine</span>
                      <span className="fp-tag-pill">OSRM Routing</span>
                    </div>

                    <div className="fp-project-actions">
                      <Link href="/framepixel/projects/sunroute" className="fp-btn-primary">
                        View Case Study &rarr;
                      </Link>
                      <a
                        href="https://sunroute.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fp-btn-outline"
                      >
                        Visit Website ↗
                      </a>
                    </div>
                  </div>

                  <div className="fp-project-footer">
                    <span>Solar Azimuth Geometry</span>
                    <span style={{ fontWeight: 700, color: "var(--fp-ink)" }}>2026 &bull; Global</span>
                  </div>
                </div>

                {/* Mockup Preview Visual */}
                <div className="fp-project-mockup-wrapper" style={{ backgroundColor: "#0F0F10" }}>
                  <div className="fp-browser-bar" style={{ backgroundColor: "#1A1A1C", color: "#F6F3EC", borderBottomColor: "rgba(255,255,255,0.1)" }}>
                    <div className="fp-browser-dots">
                      <span className="fp-browser-dot" style={{ backgroundColor: "#FF5F56" }} />
                      <span className="fp-browser-dot" style={{ backgroundColor: "#FFBD2E" }} />
                      <span className="fp-browser-dot" style={{ backgroundColor: "#27C93F" }} />
                    </div>
                    <span>sunroute.netlify.app</span>
                    <span style={{ color: "#34D399", fontWeight: 700 }}>Optimal Shade 98%</span>
                  </div>
                  <div className="fp-mockup-screen">
                    <img
                      src="/images/framepixel/sunroute-preview.png"
                      alt="SunRoute Application Screen"
                      className="fp-mockup-img"
                    />
                  </div>
                </div>
              </article>

              {/* Project 03: Party Room */}
              <article className="fp-project-card">
                <div className="fp-project-meta-col">
                  <div>
                    <span className="fp-project-num">03 / Multiplayer Web Games</span>
                    <h2 className="fp-project-title">Party Room</h2>
                    <p className="fp-project-desc">
                      Ultra-low latency social party game platform. Zero downloads, one-click room codes, and synchronized interactive challenges for groups up to 32 simultaneous players.
                    </p>

                    <div className="fp-project-tags">
                      <span className="fp-tag-pill">WebSockets</span>
                      <span className="fp-tag-pill">Sub-50ms Sync</span>
                      <span className="fp-tag-pill">Mobile First</span>
                      <span className="fp-tag-pill">Zero Downloads</span>
                    </div>

                    <div className="fp-project-actions">
                      <Link href="/games" className="fp-btn-primary">
                        Play Games Now &rarr;
                      </Link>
                      <a href="#contact" className="fp-btn-outline">
                        Commission Game Deck
                      </a>
                    </div>
                  </div>

                  <div className="fp-project-footer">
                    <span>Viral Engagement Platforms</span>
                    <span style={{ fontWeight: 700, color: "var(--fp-ink)" }}>2026 &bull; Real-Time</span>
                  </div>
                </div>

                {/* Party Room Visual Preview Card */}
                <div className="fp-project-mockup-wrapper" style={{ background: "linear-gradient(135deg, #1A1A1E 0%, #111113 100%)", color: "#F6F3EC", padding: "2.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <span style={{ fontFamily: "var(--font-mono-fp)", fontSize: "11px", letterSpacing: "0.15em", color: "var(--fp-coral)", textTransform: "uppercase" }}>
                      Live Game Arena
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono-fp)", fontSize: "11px", color: "#10B981" }}>
                      <span className="fp-pulse-dot" style={{ backgroundColor: "#10B981" }} />
                      Connected
                    </span>
                  </div>

                  <div style={{ padding: "1.5rem", borderRadius: "14px", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", marginBottom: "1.5rem" }}>
                    <div style={{ fontFamily: "var(--font-mono-fp)", fontSize: "10px", color: "rgba(246, 243, 236, 0.6)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      Room Code
                    </div>
                    <div style={{ fontFamily: "var(--font-editorial)", fontSize: "2.8rem", letterSpacing: "0.08em", color: "#FFFFFF", lineHeight: 1 }}>
                      FPX-7749
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono-fp)", fontSize: "11px", color: "rgba(246, 243, 236, 0.7)" }}>
                    <span>Up to 32 players per room</span>
                    <span style={{ color: "var(--fp-coral)", fontWeight: 700 }}>0s App Install</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Our Practice / Capabilities Section */}
        <section className="fp-section" id="capabilities">
          <div className="fp-section-inner">
            <div style={{ marginBottom: "2.5rem" }}>
              <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.6rem" }}>
                Our Practice
              </span>
              <h2 className="fp-font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.05, margin: 0, color: "var(--fp-ink)", maxWidth: "840px" }}>
                Clean architectural code married with editorial aesthetics.
              </h2>
            </div>

            <div className="fp-practice-grid">
              <div className="fp-practice-card">
                <div>
                  <span className="fp-practice-num">01 / Digital Solutions</span>
                  <h3 className="fp-practice-title">Bespoke Platforms</h3>
                  <p className="fp-practice-desc">
                    We design and construct fast web systems from zero: algorithmic scheduling tools, transit management dashboards, and lightweight portals engineered without code bloat.
                  </p>
                </div>
                <div className="fp-practice-badge">Core Architecture</div>
              </div>

              <div className="fp-practice-card">
                <div>
                  <span className="fp-practice-num">02 / Web Games</span>
                  <h3 className="fp-practice-title">Multiplayer Play</h3>
                  <p className="fp-practice-desc">
                    Real-time social party experiences and gamified promotional web applications powered by sub-second WebSockets, creating authentic viral brand loyalty.
                  </p>
                </div>
                <div className="fp-practice-badge">Real-Time Sync</div>
              </div>

              <div className="fp-practice-card">
                <div>
                  <span className="fp-practice-num">03 / Interface Design</span>
                  <h3 className="fp-practice-title">Editorial UI/UX</h3>
                  <p className="fp-practice-desc">
                    We reject cookie-cutter templates in favor of bespoke typographic character, generous negative space, and intuitive interactions that delight users.
                  </p>
                </div>
                <div className="fp-practice-badge">Tailored Typography</div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Credo Section */}
        <section className="fp-section fp-credo-section" id="credo">
          <div className="fp-section-inner">
            <span className="fp-section-tag" style={{ display: "block", marginBottom: "1.75rem" }}>
              Studio Credo
            </span>
            <blockquote className="fp-credo-quote">
              &ldquo;We make digital utilities feel tactile, purposeful, and delightfully engaging &mdash; whether you are reserving a sun-shaded bus seat or guessing punchlines in a party game.&rdquo;
            </blockquote>
            <div className="fp-credo-author">
              <div className="fp-avatar">AF</div>
              <div>
                <p className="fp-author-name">Agnel Francis</p>
                <p className="fp-author-title">Founder &amp; Principal Technologist, FramePixel</p>
              </div>
            </div>
          </div>
        </section>

        {/* Initiate Dialogue / Contact Section */}
        <section className="fp-section" id="contact" style={{ borderBottom: "none" }}>
          <div className="fp-section-inner">
            <div className="fp-contact-grid">
              <div>
                <span className="fp-section-tag">Initiate Dialogue</span>
                <h2 className="fp-contact-title">Let’s collaborate.</h2>
                <p className="fp-contact-desc">
                  Have a transit project, custom web application, or multiplayer game in mind? Drop us a brief or email directly.
                </p>

                <div className="fp-contact-details">
                  <div className="fp-contact-line">
                    <span style={{ color: "var(--fp-coral)" }}>&bull;</span>
                    <span style={{ color: "var(--fp-ink-muted)", textTransform: "uppercase" }}>Direct Studio Email:</span>
                    <a href="mailto:agnelfrancis2007@hotmail.com" className="fp-contact-email-link">
                      agnelfrancis2007@hotmail.com
                    </a>
                  </div>
                  <div className="fp-contact-line">
                    <span style={{ color: "var(--fp-coral)" }}>&bull;</span>
                    <span style={{ color: "var(--fp-ink-muted)", textTransform: "uppercase" }}>Studio Base:</span>
                    <span>Velur, Kerala &bull; Worldwide</span>
                  </div>
                </div>
              </div>

              {/* Minimalist Contact Form */}
              <div className="fp-form-card">
                <form onSubmit={handleFormSubmit}>
                  <div className="fp-form-group">
                    <label htmlFor="fp-name" className="fp-form-label">Name</label>
                    <input
                      id="fp-name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      className="fp-form-input"
                    />
                  </div>

                  <div className="fp-form-group">
                    <label htmlFor="fp-email" className="fp-form-label">Email</label>
                    <input
                      id="fp-email"
                      name="email"
                      type="email"
                      placeholder="jane@studio.com"
                      required
                      className="fp-form-input"
                    />
                  </div>

                  <div className="fp-form-group">
                    <label htmlFor="fp-message" className="fp-form-label">Message</label>
                    <textarea
                      id="fp-message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about your project or partnership..."
                      required
                      className="fp-form-textarea"
                    />
                  </div>

                  <div style={{ paddingTop: "0.5rem" }}>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting" || formStatus === "success"}
                      className="fp-btn-primary"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        opacity: formStatus === "submitting" ? 0.7 : 1,
                        cursor: formStatus === "submitting" ? "default" : "pointer",
                      }}
                    >
                      {formStatus === "submitting"
                        ? "Transmitting..."
                        : formStatus === "success"
                        ? "Transmission Sent ✓"
                        : "Send Transmission →"}
                    </button>

                    {formMessage && (
                      <p
                        style={{
                          marginTop: "1rem",
                          fontSize: "12px",
                          fontFamily: "var(--font-mono-fp)",
                          textAlign: "center",
                          color: formStatus === "error" ? "var(--fp-coral)" : "#10B981",
                          fontWeight: 600,
                        }}
                      >
                        {formMessage}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FramePixelFooter />
    </div>
  );
}
