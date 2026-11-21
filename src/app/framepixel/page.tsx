import type { Metadata } from "next";
import FramePixelClient from "./FramePixelClient";

export const metadata: Metadata = {
  title: "FramePixel — Digital Platforms & Web Games",
  description: "High-Utility Web Systems • Real-Time Multiplayer Games • Velur & Global. Digital solutions and games studio founded by Agnel Francis.",
  keywords: ["FramePixel", "Digital Studio", "Web Games", "Agnel Francis", "Velur", "Bussiler", "SunRoute", "Party Room"],
  openGraph: {
    title: "FramePixel — Digital Platforms & Web Games",
    description: "High-Utility Web Systems • Real-Time Multiplayer Games • Velur & Global",
    url: "https://agnelfrancis.com/framepixel",
    siteName: "FramePixel Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FramePixel — Digital Platforms & Web Games",
    description: "High-Utility Web Systems • Real-Time Multiplayer Games • Velur & Global",
    creator: "@oslohaz_e",
  },
};

export default function FramePixelPage() {
  return <FramePixelClient />;
}
