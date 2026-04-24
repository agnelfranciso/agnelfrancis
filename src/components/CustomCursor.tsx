"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor for non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      const moveCursor = (e: MouseEvent) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot.current) {
          cursorDot.current.style.left = `${posX}px`;
          cursorDot.current.style.top = `${posY}px`;
        }

        if (cursorOutline.current) {
          cursorOutline.current.animate(
            {
              left: `${posX}px`,
              top: `${posY}px`,
            },
            { duration: 500, fill: "forwards" }
          );
        }
      };

      const handleMouseEnter = () => {
        if (cursorOutline.current && cursorDot.current) {
          cursorOutline.current.style.transform = "translate(-50%, -50%) scale(1.8)";
          cursorOutline.current.style.backgroundColor = "rgba(255, 107, 107, 0.1)"; // highlight
          cursorOutline.current.style.borderColor = "var(--accent-orange)";
          cursorDot.current.style.backgroundColor = "var(--text-main)";
        }
      };

      const handleMouseLeave = () => {
        if (cursorOutline.current && cursorDot.current) {
          cursorOutline.current.style.transform = "translate(-50%, -50%) scale(1)";
          cursorOutline.current.style.backgroundColor = "transparent";
          cursorOutline.current.style.borderColor = "var(--text-main)";
          cursorDot.current.style.backgroundColor = "var(--accent-orange)";
        }
      };

      window.addEventListener("mousemove", moveCursor);

      // We attach the hover events generically by using MutationObserver to track all interactive elements,
      // but simpler approach: use event delegation on document body
      const setupHoverEffects = () => {
        const interactables = document.querySelectorAll("a, button, .project-card");
        interactables.forEach((el) => {
          el.addEventListener("mouseenter", handleMouseEnter);
          el.addEventListener("mouseleave", handleMouseLeave);
        });
      };

      // Slight delay to ensure DOM is ready
      setTimeout(setupHoverEffects, 500);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        const interactables = document.querySelectorAll("a, button, .project-card");
        interactables.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }
  }, []);

  return (
    <>
      <div className="cursor-dot" id="cursor-dot" ref={cursorDot}></div>
      <div className="cursor-outline" id="cursor-outline" ref={cursorOutline}></div>
    </>
  );
}
