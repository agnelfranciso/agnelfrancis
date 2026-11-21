import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/images/framepixel/logo.png", type: "image/png" },
    ],
    shortcut: "/images/framepixel/logo.png",
    apple: "/images/framepixel/logo.png",
  },
};

export default function FramePixelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
