import type { Metadata } from "next";
import Link from "next/link";
import FramePixelHeader from "../components/FramePixelHeader";
import FramePixelFooter from "../components/FramePixelFooter";
import "../framepixel.css";

export const metadata: Metadata = {
  title: "Collaborators — FramePixel Studio",
  description: "Meet the team and collaborators behind FramePixel. Founded and owned by Agnel Francis, with collaborators Devanarayan T N, Devamshu P Suresh, and Nakul Suresh.",
  keywords: ["FramePixel Collaborators", "Agnel Francis", "Devanarayan T N", "Devamshu P Suresh", "Nakul Suresh", "Velur Studio"],
  openGraph: {
    title: "Collaborators — FramePixel Studio",
    description: "The team and collaborators building platforms and web games at FramePixel.",
    url: "https://agnelfrancis.com/framepixel/collaborators",
  },
};

export default function CollaboratorsPage() {
  return (
    <div className="fp-wrapper">
      <FramePixelHeader />

      <main className="fp-case-wrapper">
        {/* Navigation Bar */}
        <div className="fp-case-nav-bar">
          <Link href="/framepixel" className="fp-case-back-btn">
            &larr; Back to FramePixel Studio
          </Link>
        </div>

        {/* Hero Header */}
        <header className="fp-case-hero-header">
          <div className="fp-case-meta-row">
            <span className="fp-case-meta-item">Studio Collective</span>
            <span>&bull;</span>
            <span className="fp-case-meta-item">People &amp; Partnerships</span>
            <span>&bull;</span>
            <span className="fp-case-meta-item">Velur &bull; Worldwide</span>
          </div>

          <h1 className="fp-case-title">Collaborators</h1>

          <p className="fp-case-tagline">
            The minds building high-utility platforms, real-time multiplayer systems, and regional transit infrastructure at FramePixel.
          </p>
        </header>

        {/* Founder & Owner Spotlight Card */}
        <section style={{ marginBottom: "4rem" }}>
          <div
            style={{
              backgroundColor: "var(--fp-warm-cream-card)",
              border: "1px solid var(--fp-ink-border)",
              borderRadius: "24px",
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="fp-section-badge-dot" />
                <span className="fp-section-tag">Studio Leadership</span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono-fp)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--fp-coral)",
                  fontWeight: 700,
                  backgroundColor: "rgba(242, 90, 43, 0.1)",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "9999px",
                }}
              >
                Founder &amp; Owner
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: 1.05,
                    color: "var(--fp-ink)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Agnel Francis
                </h2>
                <div
                  style={{
                    fontFamily: "var(--font-mono-fp)",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--fp-ink-muted)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Founder, Owner &amp; Principal Technologist
                </div>

                <p
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    color: "var(--fp-ink)",
                    maxWidth: "850px",
                    margin: "0 0 1.5rem 0",
                  }}
                >
                  Agnel Francis founded FramePixel to design and build digital utilities that make an immediate, tangible difference in people&apos;s daily routines. Overseeing product architecture, interactive engineering, and visual design across the studio, Agnel directs platforms like <strong>Bussiler</strong> (Velur transit app), <strong>SunRoute</strong> (solar bus seat routing), and real-time multiplayer party game arenas.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  <span className="fp-tag-pill">Systems Architecture</span>
                  <span className="fp-tag-pill">Product Strategy</span>
                  <span className="fp-tag-pill">Full-Stack &amp; Native Mobile</span>
                  <span className="fp-tag-pill">Game Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaborators Grid */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.5rem" }}>
              Collaborators &amp; Engineering Collective
            </span>
            <h2
              className="fp-font-editorial"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                lineHeight: 1.05,
                margin: 0,
                color: "var(--fp-ink)",
              }}
            >
              Key Contributors
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Collaborator 01: Devanarayan T N */}
            <div
              style={{
                backgroundColor: "var(--fp-warm-cream-card)",
                border: "1px solid var(--fp-ink-border)",
                borderRadius: "20px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono-fp)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--fp-coral)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Collaborator &bull; 01
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "2.2rem",
                    color: "var(--fp-ink)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Devanarayan T N
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-mono-fp)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--fp-ink-muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Systems &amp; Transit Logistics
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    color: "var(--fp-ink-muted)",
                    margin: 0,
                  }}
                >
                  Collaborates on transit route models, timing data collection, timetable verification, and field integration for local logistics platforms across Velur.
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--fp-ink-border)",
                  fontFamily: "var(--font-mono-fp)",
                  fontSize: "11px",
                  color: "var(--fp-ink)",
                  fontWeight: 600,
                }}
              >
                Focus: Transit Telemetry &amp; Field Verification
              </div>
            </div>

            {/* Collaborator 02: Devamshu P Suresh */}
            <div
              style={{
                backgroundColor: "var(--fp-warm-cream-card)",
                border: "1px solid var(--fp-ink-border)",
                borderRadius: "20px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono-fp)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--fp-coral)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Collaborator &bull; 02
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "2.2rem",
                    color: "var(--fp-ink)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Devamshu P Suresh
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-mono-fp)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--fp-ink-muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Product &amp; Systems Design
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    color: "var(--fp-ink-muted)",
                    margin: 0,
                  }}
                >
                  Collaborates on user experience workflows, accessibility validation, and feature ideation to ensure platforms remain lightweight and intuitive for all demographics.
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--fp-ink-border)",
                  fontFamily: "var(--font-mono-fp)",
                  fontSize: "11px",
                  color: "var(--fp-ink)",
                  fontWeight: 600,
                }}
              >
                Focus: Product Flow &amp; User Research
              </div>
            </div>

            {/* Collaborator 03: Nakul Suresh */}
            <div
              style={{
                backgroundColor: "var(--fp-warm-cream-card)",
                border: "1px solid var(--fp-ink-border)",
                borderRadius: "20px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono-fp)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--fp-coral)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Collaborator &bull; 03
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "2.2rem",
                    color: "var(--fp-ink)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Nakul Suresh
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-mono-fp)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--fp-ink-muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Mobile &amp; Client Engineering
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    color: "var(--fp-ink-muted)",
                    margin: 0,
                  }}
                >
                  Collaborates on Android client testing, responsive viewport tuning, notification pipelines, and performance audits on diverse real-world mobile hardware.
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--fp-ink-border)",
                  fontFamily: "var(--font-mono-fp)",
                  fontSize: "11px",
                  color: "var(--fp-ink)",
                  fontWeight: 600,
                }}
              >
                Focus: Client Performance &amp; Hardware Testing
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Ethos Section */}
        <section style={{ marginBottom: "3rem" }}>
          <div
            style={{
              backgroundColor: "rgba(240, 236, 227, 0.45)",
              border: "1px solid var(--fp-ink-border)",
              borderRadius: "20px",
              padding: "2.5rem",
            }}
          >
            <span className="fp-section-tag" style={{ display: "block", marginBottom: "0.75rem" }}>
              How We Work
            </span>
            <h3
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "2.2rem",
                color: "var(--fp-ink)",
                margin: "0 0 1rem 0",
              }}
            >
              Direct, high-trust engineering.
            </h3>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--fp-ink-muted)",
                maxWidth: "850px",
                margin: "0 0 1.5rem 0",
              }}
            >
              At FramePixel, we discard bureaucracy. Each project brings together dedicated collaborators who care about crafting software that solves authentic friction &mdash; from local transit scheduling in Kerala to multiplayer experiences played across continents.
            </p>
            <Link href="/framepixel#contact" className="fp-btn-primary">
              Work With FramePixel &rarr;
            </Link>
          </div>
        </section>
      </main>

      <FramePixelFooter />
    </div>
  );
}
