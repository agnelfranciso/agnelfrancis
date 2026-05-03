"use client";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLinksPage = pathname === "/links";

  return (
    <div className={isLinksPage ? "" : "main-layout"}>
      {children}
    </div>
  );
}
