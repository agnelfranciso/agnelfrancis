"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    const isLinksPage = pathname === "/links";
    const alreadyLoaded = isClient && sessionStorage.getItem("hasLoaded") === "true";

    if (isLinksPage || alreadyLoaded) {
      setLoading(false);
      setProgress(100);
      return;
    }

    // Artificial progress for better UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    const handleLoad = () => {
      setProgress(100);
      if (isClient) sessionStorage.setItem("hasLoaded", "true");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    if (isClient) {
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }
    }

    return () => {
      clearInterval(interval);
      if (isClient) window.removeEventListener("load", handleLoad);
    };
  }, [pathname]);

  // We still render the div to match SSR, but the skip-preloader CSS class 
  // on the html element (from layout.tsx script) will hide it instantly 
  // before hydration if needed.
  return (
    <div className={`preloader ${!loading ? "fade-out" : ""}`}>
      <div className="preloader-content">
        <div className="preloader-logo">AGNEL.</div>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">Crafting Experiences {Math.round(progress)}%</p>
      </div>
    </div>
  );
}
