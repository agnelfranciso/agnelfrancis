import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Agnel Francis",
  description: "Learn more about Agnel Francis Olakkengil, a frontend developer and designer pursuing Computer Science & Cybersecurity.",
};

export default function AboutPage() {
  return (
    <main className="page-container">
      <div className="about-content">
        <div className="about-text">
          <h1 className="page-title">About Me</h1>
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

          <h2 className="section-title" style={{ marginTop: "3rem", fontSize: "2rem" }}>Experience & Focus</h2>
          <ul className="experience-list">
            <li>
              <strong>FramePixel Studio</strong>
              <span>Leading a digital solutions studio focused on custom websites, web apps, and interactive games.</span>
            </li>
            <li>
              <strong>Web-Based Gaming</strong>
              <span>Developing multiplayer word battles, cooperative puzzle games, and interactive story experiences.</span>
            </li>
            <li>
              <strong>Cybersecurity</strong>
              <span>First-year CSE student specializing in cybersecurity at Jyothi Engineering College.</span>
            </li>
          </ul>
        </div>
        <div className="about-image-container">
          <div className="about-image-wrapper">
            <Image
              src="/images/agnel.png"
              alt="Agnel Francis Olakkengil"
              width={500}
              height={700}
              className="about-profile-image"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
