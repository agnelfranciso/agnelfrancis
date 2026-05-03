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
            Hi, I&apos;m Agnel Francis Olakkengil, a full stack developer who mainly focuses on frontend development. I am a designer and developer, primarily building websites using modern coding practices and AI tools.
          </p>
          <p className="about-description">
            I live in Velur, Thrissur. Currently, I am a first-year student pursuing Computer Science and Engineering (Cybersecurity) at Jyothi Engineering College (Autonomous), Cheruthuruthy. While I am learning core computer science right now, I am deeply passionate about expanding my expertise in the cybersecurity world.
          </p>
          
          <h2 className="section-title" style={{marginTop: "3rem", fontSize: "2rem"}}>Experience & Projects</h2>
          <ul className="experience-list">
            <li>
              <strong>Ente Nadu</strong>
              <span>A collaborative project with my old school, Sarvodayam VHSS Aryampadam.</span>
            </li>
            <li>
              <strong>College Projects</strong>
              <span>Various development projects for Jyothi Engineering College.</span>
            </li>
            <li>
              <strong>Web Development & AI</strong>
              <span>Continuous exploration of UI/UX design and frontend development utilizing AI tools.</span>
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
