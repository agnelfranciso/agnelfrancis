import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <section className="home-projects-section">
        <h2 className="section-title text-center" style={{marginTop: "6rem", marginBottom: "3rem"}}>Selected Work</h2>
        <Projects limit={4} />
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <Link href="/work" className="btn-secondary wave-btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.85rem 2rem", fontSize: "1rem", borderRadius: "var(--border-radius-pill)" }}>
            <span>Explore All Projects</span>
            <span className="wave-emoji">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
