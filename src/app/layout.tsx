import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Protection from "@/components/Protection";

export const metadata: Metadata = {
  title: "Agnel Francis | Designer & Developer",
  description: "Portfolio of Agnel Francis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
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
