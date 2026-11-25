import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agnel Vault — Open Source Repos, Fonts & Builds",
  description: "Download the exact typefaces powering agnelfrancis.com, explore open-source GitHub repositories, and grab direct Android APK builds.",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />
      {children}
    </>
  );
}
