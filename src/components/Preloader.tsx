"use client";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    // Also wait for fonts to be ready as requested
    if (typeof document !== 'undefined') {
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }
      
      // Specifically check for fonts
      if ("fonts" in document) {
        document.fonts.ready.then(() => {
          // We still want to ensure other assets are loaded too
        });
      }
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

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
