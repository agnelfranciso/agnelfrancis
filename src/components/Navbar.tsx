"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (pathname === "/links") return null;

  return (
    <>
      <nav className={`navbar ${isOpen ? 'menu-open' : ''}`}>
        <Link href="/" className="logo">AGNEL.</Link>
        
        {/* We hide the standard nav links globally now via CSS for a clean agency look */}
        <div className="nav-links">
          <Link href="/work" className={pathname === "/work" ? "active" : ""}>Work</Link>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>About</Link>
          <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link>
        </div>

        <Link href="/contact" className="btn-primary wave-btn desktop-btn">
          <span className="btn-text">Say Hello</span>
          <span className="wave-emoji">👋</span>
        </Link>

        {/* Hamburger Icon (Visible Everywhere) */}
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle Menu"
          type="button"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </nav>

      {/* Fullscreen Mobile Menu - Moved outside nav to avoid CSS stacking context traps */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <Link href="/" onClick={() => setIsOpen(false)} className={pathname === "/" ? "active" : ""}>Home</Link>
          <Link href="/work" onClick={() => setIsOpen(false)} className={pathname === "/work" ? "active" : ""}>Work</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className={pathname === "/about" ? "active" : ""}>About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className={pathname === "/contact" ? "active" : ""}>Contact</Link>
          <Link href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer" download="Agnel_Francis_Resume.pdf" onClick={() => setIsOpen(false)}>Resume</Link>
        </div>
      </div>
    </>
  );
}
