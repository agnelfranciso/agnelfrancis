"use client";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCustomLayout = pathname === "/links" || pathname.startsWith("/framepixel") || pathname.startsWith("/resources") || pathname.startsWith("/resoources");

  return (
    <div className={isCustomLayout ? "" : "main-layout"}>
      {children}
    </div>
  );
}
