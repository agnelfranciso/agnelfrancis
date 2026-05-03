import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Protection from "@/components/Protection";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Agnel Francis | Designer & Developer",
  description: "Portfolio of Agnel Francis - CEO of FramePixel, Frontend Developer & Designer based in Thrissur. Building modern, beautiful websites and web-based games.",
  keywords: ["Agnel Francis", "CEO of FramePixel", "FramePixel", "Frontend Developer", "Designer", "Web Development", "Thrissur", "Jyothi Engineering College", "Portfolio"],
  authors: [{ name: "Agnel Francis" }],
  openGraph: {
    title: "Agnel Francis | CEO of FramePixel",
    description: "Portfolio of Agnel Francis - CEO of FramePixel, Frontend Developer & Designer.",
    url: "https://agnelfrancis.com",
    siteName: "Agnel Francis Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agnel Francis | Designer & Developer",
    description: "Portfolio of Agnel Francis - Frontend Developer & Designer based in Thrissur.",
    creator: "@oslohaz_e",
  },
  verification: {
    google: "googlec8e2d91f96bcc759",
    // Bing/Edge Verification can be added here
    // google-site-verification is used by multiple engines for trust
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Preloader />
        <Protection />
        <CustomCursor />
        <Navbar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Agnel Francis Olakkengil",
              "url": "https://agnelfrancis.com",
              "jobTitle": "CEO of FramePixel | Designer & Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "FramePixel",
                "description": "A digital solutions and web-based games studio focused on building experiences that actually matter."
              },
              "alumniOf": "Jyothi Engineering College",
              "sameAs": [
                "https://github.com/agnelfranciso",
                "https://www.linkedin.com/in/agnel-francis-olakkengil/",
                "https://x.com/oslohaz_e",
                "https://www.instagram.com/oslohaz_e/"
              ]
            })
          }}
        />
        <div className="main-layout">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
