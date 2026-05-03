import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Protection from "@/components/Protection";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Agnel Francis | Designer & Developer",
  description: "Portfolio of Agnel Francis",
  verification: {
    google: "googlec8e2d91f96bcc759",
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
        <div className="main-layout">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
