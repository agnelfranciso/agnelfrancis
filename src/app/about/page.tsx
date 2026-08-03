import type { Metadata } from "next";
import Image from "next/image";
import AboutTabs from "@/components/AboutTabs";

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
