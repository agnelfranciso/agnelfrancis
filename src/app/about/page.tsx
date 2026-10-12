import type { Metadata } from "next";
import Image from "next/image";
import AboutTabs from "@/components/AboutTabs";
import ChangelogButton from "@/components/ChangelogButton";

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
          <AboutTabs />
          <div style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--text-muted, #888)",
            fontSize: "0.78rem",
            fontFamily: "var(--font-mono, monospace)",
          }}>
            <span>This site is open-source —</span>
            <ChangelogButton />
          </div>
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
