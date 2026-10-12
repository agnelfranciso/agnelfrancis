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
    <main className="page-container about-page-container">
      <div className="about-content">
        <div className="about-text">
          <div className="about-header-tag">
            <span className="about-kicker">PROFILE &amp; BACKGROUND</span>
          </div>
          <h1 className="page-title about-page-title">About Me</h1>
          
          <AboutTabs />
          
          <div className="about-changelog-strip">
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
            <div className="about-image-caption">
              <span className="about-caption-dot" />
              <span>Agnel Francis Olakkengil</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
