import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <section className="home-projects-section">
        <h2 className="section-title text-center" style={{marginTop: "6rem", marginBottom: "3rem"}}>Selected Work</h2>
        <Projects limit={3} />
      </section>
    </main>
  );
}
