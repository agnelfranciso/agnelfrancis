import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Agnel Resources — Free Design Systems, 3D Assets & UI Kits",
  description:
    "A curated sanctuary of free design systems, 3D icons, and interface kits crafted for clarity by Agnel Francis. High-caliber assets for designers and studios.",
  keywords: [
    "Agnel Resources",
    "Digital Asset Vault",
    "Lumina UI Kit",
    "Free UI Kits",
    "Figma Design Systems",
    "3D Icons",
    "Device Mockups",
    "Editorial Typefaces",
    "Agnel Francis",
  ],
  openGraph: {
    title: "Agnel Resources — Digital Asset Vault",
    description:
      "A curated sanctuary of free design systems, 3D icons, and interface kits crafted for clarity.",
    url: "https://agnelfrancis.com/resources",
    siteName: "Agnel Francis Portfolio & Vault",
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
