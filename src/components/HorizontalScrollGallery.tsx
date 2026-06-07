"use client";
import { useRef, useEffect, useState } from "react";

export default function HorizontalScrollGallery({ images, title }: { images: string[], title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // default true for hydration safety, or false

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      // Clear sticky transform if we switch from mobile to PC
      if (scrollRef.current) scrollRef.current.style.transform = '';
      return; 
    }

    const handleScroll = () => {
      if (!containerRef.current || !scrollRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top;
      const maxScroll = rect.height - window.innerHeight;
      
      let percentage = scrollProgress / maxScroll;
      if (percentage < 0) percentage = 0;
      if (percentage > 1) percentage = 1;
      
      const trackWidth = scrollRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - viewportWidth + 40);
      
      scrollRef.current.style.transform = `translate3d(-${maxTranslate * percentage}px, 0, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  if (!isMobile) {
    return (
      <section style={{ marginTop: "4rem", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)", color: "var(--text-main)"}}>Gallery</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={scrollLeft} style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "var(--text-main)"} onMouseLeave={e => e.currentTarget.style.background = "white"}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button onClick={scrollRight} style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "var(--text-main)"} onMouseLeave={e => e.currentTarget.style.background = "white"}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
        </div>
        <div 
          ref={scrollRef}
          style={{ 
            display: "flex", 
            gap: "2rem", 
            overflowX: "auto", 
            paddingBottom: "1.5rem",
            scrollbarWidth: "none" // Hide scrollbar for firefox
          }}
        >
          <style>{`
            .hide-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          {images.map((src, index) => (
            <div 
              key={index} 
              style={{ 
                flex: "0 0 350px", 
                borderRadius: "16px", 
                overflow: "hidden", 
                border: "1px solid rgba(0,0,0,0.05)", 
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                backgroundColor: "#fff"
              }}
            >
              <img 
                src={src} 
                alt={`${title} screenshot ${index + 1}`} 
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Mobile Sticky version
  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: "300vh", 
        position: "relative",
        marginTop: "4rem"
      }}
    >
      <div 
        style={{ 
          position: "sticky", 
          top: 0, 
          height: "100vh", 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        <div style={{ padding: "0 10vw", marginBottom: "3rem" }}>
          <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)", color: "var(--text-main)"}}>Gallery</h2>
        </div>
        
        <div 
          ref={scrollRef} 
          style={{ 
            display: "flex", 
            gap: "2rem", 
            padding: "0 10vw", 
            willChange: "transform",
            alignItems: "center"
          }}
        >
          {images.map((src, index) => (
            <div 
              key={index} 
              style={{ 
                flex: "0 0 min(220px, 60vw)", 
                borderRadius: "16px", 
                overflow: "hidden", 
                border: "1px solid rgba(0,0,0,0.05)", 
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                backgroundColor: "#fff"
              }}
            >
              <img 
                src={src} 
                alt={`${title} screenshot ${index + 1}`} 
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
