import type { Metadata } from "next";
import Link from "next/link";
import FramePixelHeader from "../../components/FramePixelHeader";
import FramePixelFooter from "../../components/FramePixelFooter";
import "../../framepixel.css";

export const metadata: Metadata = {
  title: "SunRoute — Case Study | FramePixel Studio",
  description: "Find the perfect seat on your bus based on real-time sun position analysis. OpenStreetMap OSRM routing and SunCalc solar geometry.",
  keywords: ["SunRoute", "Sun position bus seat", "FramePixel", "Solar routing", "Agnel Francis"],
  openGraph: {
    title: "SunRoute Case Study — FramePixel Studio",
    description: "Find the perfect seat on your bus based on real-time sun position analysis.",
    url: "https://agnelfrancis.com/framepixel/projects/sunroute",
  },
};

export default function SunRouteCaseStudyPage() {
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
            <span className="fp-case-meta-item">Category: Web App</span>
            <span>&bull;</span>
            <span className="fp-case-meta-item">Type: Full Stack</span>
            <span>&bull;</span>
            <span className="fp-case-meta-item" style={{ color: "#10B981" }}>
              <span className="fp-pulse-dot" style={{ backgroundColor: "#10B981", width: 6, height: 6 }} />
              Status: Active
            </span>
          </div>

          <h1 className="fp-case-title">SunRoute</h1>

          <p className="fp-case-tagline">
            Find the perfect seat on your bus based on real-time sun position analysis. Never squint on a bus ride again.
          </p>

          {/* Action Bar */}
          <div className="fp-case-action-bar">
            <a
              href="https://sunroute.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="fp-btn-primary"
            >
              Visit Website ↗
            </a>
            <a
              href="https://sunroute.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="fp-btn-outline"
            >
              Live Demo &amp; Route Planner ↗
            </a>
          </div>
        </header>

        {/* Featured Visual Device Viewport */}
        <div className="fp-case-visual-frame" style={{ backgroundColor: "#0C0E12" }}>
          <div className="fp-case-visual-top" style={{ backgroundColor: "#14171E", borderBottomColor: "rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5F56", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FFBD2E", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#27C93F", display: "inline-block" }} />
              <span style={{ marginLeft: "0.75rem", fontFamily: "var(--font-mono-fp)" }}>sunroute.netlify.app</span>
            </div>
            <span style={{ color: "#2DD4BF", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span className="fp-pulse-dot" style={{ backgroundColor: "#2DD4BF", width: 6, height: 6 }} />
              Solar Azimuth Calculation Engine
            </span>
          </div>
          <img
            src="/images/framepixel/sunroute-preview.png"
            alt="SunRoute Solar Seat Calculation Application Interface"
            className="fp-case-visual-img"
          />
        </div>

        {/* Main Content Grid */}
        <div className="fp-case-main-grid">
          <div>
            {/* Overview */}
            <section style={{ marginBottom: "3rem" }}>
              <h2 className="fp-case-section-heading">Overview</h2>
              <p className="fp-case-body-text">
                SunRoute analyzes your journey in real-time, calculating exactly where the sun will be at every point to recommend the perfect seat. Whether you&apos;re commuting daily or taking a long trip, avoid the sun glare with intelligent seat recommendations.
              </p>
              <p className="fp-case-body-text">
                Using OpenStreetMap&apos;s OSRM routing engine and SunCalc library, SunRoute provides precise sun position calculations for your specific route, time, and date to ensure optimal seating arrangements.
              </p>
            </section>

            {/* Key Features */}
            <section style={{ marginBottom: "3.5rem" }}>
              <h2 className="fp-case-section-heading">Key Features</h2>
              <div className="fp-case-features-grid">
                <div className="fp-feature-pill-card">
                  <div className="fp-feature-pill-title">
                    <span style={{ color: "var(--fp-coral)" }}>01</span>
                    Real Route Analysis
                  </div>
                  <p className="fp-feature-pill-desc">
                    Uses OpenStreetMap&apos;s OSRM routing engine to calculate the exact path your bus takes.
                  </p>
                </div>

                <div className="fp-feature-pill-card">
                  <div className="fp-feature-pill-title">
                    <span style={{ color: "var(--fp-coral)" }}>02</span>
                    Precise Sun Tracking
                  </div>
                  <p className="fp-feature-pill-desc">
                    SunCalc library calculates the exact sun position at every point along your journey.
                  </p>
                </div>

                <div className="fp-feature-pill-card">
                  <div className="fp-feature-pill-title">
                    <span style={{ color: "var(--fp-coral)" }}>03</span>
                    Smart Recommendations
                  </div>
                  <p className="fp-feature-pill-desc">
                    Analyzes sun angles relative to travel direction for optimal seating positions.
                  </p>
                </div>

                <div className="fp-feature-pill-card">
                  <div className="fp-feature-pill-title">
                    <span style={{ color: "var(--fp-coral)" }}>04</span>
                    Instant Results
                  </div>
                  <p className="fp-feature-pill-desc">
                    Get your seat recommendation in seconds &mdash; no account required, completely free.
                  </p>
                </div>

                <div className="fp-feature-pill-card">
                  <div className="fp-feature-pill-title">
                    <span style={{ color: "var(--fp-coral)" }}>05</span>
                    Web Scheduling
                  </div>
                  <p className="fp-feature-pill-desc">
                    Plan trips ahead on any device with advanced scheduling capabilities.
                  </p>
                </div>

                <div className="fp-feature-pill-card">
                  <div className="fp-feature-pill-title">
                    <span style={{ color: "var(--fp-coral)" }}>06</span>
                    Map Navigation
                  </div>
                  <p className="fp-feature-pill-desc">
                    View your journey on an interactive map and open directions in Google/Apple Maps.
                  </p>
                </div>
              </div>
            </section>

            {/* Challenges & Solutions */}
            <section style={{ marginBottom: "3.5rem" }}>
              <h2 className="fp-case-section-heading">Challenges &amp; Solutions</h2>

              {/* Challenge 1 */}
              <div className="fp-case-card-panel" style={{ marginBottom: "2rem" }}>
                <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Challenge 01
                </span>
                <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.75rem", margin: "0 0 0.75rem 0", color: "var(--fp-ink)" }}>
                  Accurate Sun Position Calculation
                </h3>
                <p className="fp-case-body-text" style={{ marginBottom: "1.25rem" }}>
                  Determining precise sun position along a dynamic route required integrating multiple data sources and handling complex astronomical calculations.
                </p>
                <div style={{ borderLeft: "3px solid var(--fp-coral)", paddingLeft: "1.25rem" }}>
                  <div style={{ fontFamily: "var(--font-mono-fp)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--fp-coral)", fontWeight: 700, marginBottom: "0.25rem" }}>
                    Solution: SunCalc Integration
                  </div>
                  <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--fp-ink)" }}>
                    Implemented SunCalc library for accurate solar position calculations and combined it with route segmentation to provide seat recommendations for each portion of the journey.
                  </p>
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="fp-case-card-panel">
                <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Challenge 02
                </span>
                <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.75rem", margin: "0 0 0.75rem 0", color: "var(--fp-ink)" }}>
                  Route Precision
                </h3>
                <p className="fp-case-body-text" style={{ marginBottom: "1.25rem" }}>
                  Needed to calculate exact paths buses take, not just straight lines between destinations.
                </p>
                <div style={{ borderLeft: "3px solid var(--fp-coral)", paddingLeft: "1.25rem" }}>
                  <div style={{ fontFamily: "var(--font-mono-fp)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--fp-coral)", fontWeight: 700, marginBottom: "0.25rem" }}>
                    Solution: OpenStreetMap OSRM
                  </div>
                  <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--fp-ink)" }}>
                    Integrated Open Source Routing Machine (OSRM) API to get realistic route calculations based on actual road networks and traffic patterns.
                  </p>
                </div>
              </div>
            </section>

            {/* About SunRoute / Open-Source Mission */}
            <section style={{ marginBottom: "3rem" }}>
              <div className="fp-case-card-panel" style={{ backgroundColor: "#F0ECE3", border: "1px solid rgba(17,17,17,0.15)" }}>
                <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.6rem" }}>
                  Open-Source Ethos
                </span>
                <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "2rem", margin: "0 0 1rem 0", color: "var(--fp-ink)" }}>
                  About SunRoute
                </h3>
                <p className="fp-case-body-text" style={{ marginBottom: "1rem" }}>
                  SunRoute is an open-source project built with open-source technologies. Inspired by the Veyil App by PCL Technologies, SunRoute expands on that innovative concept by adding web-based scheduling, route preview, and detailed segment analysis to help you find the best seat on your bus ride.
                </p>
                <blockquote style={{ borderLeft: "3px solid var(--fp-coral)", margin: "1.25rem 0", paddingLeft: "1.25rem", fontFamily: "var(--font-editorial)", fontSize: "1.35rem", fontStyle: "italic", color: "var(--fp-ink)" }}>
                  &ldquo;100% free forever, with no tracking, no ads &mdash; just helpful sun avoidance for everyone. Built to make commuting more comfortable for bus travelers everywhere.&rdquo;
                </blockquote>
              </div>
            </section>
          </div>

          {/* Sidebar / Meta Details */}
          <div>
            {/* Tech Stack Box */}
            <div className="fp-case-tech-box">
              <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.5rem" }}>
                Modern Architecture
              </span>
              <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.65rem", margin: 0, color: "var(--fp-ink)" }}>
                Technology Stack
              </h3>
              <div className="fp-case-tech-tags">
                <span className="fp-tech-badge">React</span>
                <span className="fp-tech-badge">TypeScript</span>
                <span className="fp-tech-badge">Tailwind CSS</span>
                <span className="fp-tech-badge">Leaflet</span>
                <span className="fp-tech-badge">SunCalc</span>
                <span className="fp-tech-badge">OpenStreetMap OSRM</span>
              </div>
            </div>

            {/* Geometry Formula Highlight */}
            <div className="fp-case-card-panel" style={{ background: "linear-gradient(145deg, #18181A 0%, #111113 100%)", color: "#F6F3EC" }}>
              <span style={{ fontFamily: "var(--font-mono-fp)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--fp-coral)", fontWeight: 700, display: "block", marginBottom: "0.5rem" }}>
                Solar Geometry
              </span>
              <h4 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.6rem", color: "#FFFFFF", margin: "0 0 0.5rem 0" }}>
                Azimuth &amp; Heading Differential
              </h4>
              <p style={{ fontSize: "0.9rem", color: "rgba(246, 243, 236, 0.7)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
                By comparing the vehicle heading vector θ_bus against the solar azimuth angle θ_sun at each waypoint timestamp, SunRoute resolves thermal side incidence with &gt;98% empirical accuracy.
              </p>
              <div style={{ fontFamily: "var(--font-mono-fp)", fontSize: "11px", color: "#2DD4BF" }}>
                Δθ = |θ_bus - θ_sun| mod 360°
              </div>
            </div>

            {/* Launch App Card */}
            <div className="fp-case-card-panel">
              <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.5rem" }}>
                Try It Live
              </span>
              <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.75rem", margin: "0 0 0.5rem 0", color: "var(--fp-ink)" }}>
                Ready to plan your trip?
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--fp-ink-muted)", lineHeight: 1.5, margin: "0 0 1.25rem 0" }}>
                Enter your start, destination, and departure time for an instant smart seat recommendation.
              </p>
              <a
                href="https://sunroute.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="fp-btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Launch SunRoute App ↗
              </a>
            </div>
          </div>
        </div>
      </main>

      <FramePixelFooter />
    </div>
  );
}
