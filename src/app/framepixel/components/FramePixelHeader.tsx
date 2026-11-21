"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function FramePixelHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Dynamically set page favicon to FramePixel logo on this URL
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    const originalHref = link?.href || "/icon.png";

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = "/images/framepixel/logo.png";

    return () => {
      if (link && originalHref) {
        link.href = originalHref;
      }
    };
  }, []);

  return (
    <>
      <header className="fp-header">
        <div className="fp-header-inner">
          <Link href="/framepixel" className="fp-brand" aria-label="FramePixel Studio Homepage">
            <img
              src="/images/framepixel/logo.png"
              alt="FramePixel Logo"
              className="fp-logo-img"
              width={34}
              height={38}
            />
            <div className="fp-brand-text">
              <span className="fp-brand-title">
                FramePixel<span style={{ color: "var(--fp-coral)" }}>.</span>
              </span>
              <span className="fp-brand-subtitle">Digital Studio &amp; Games</span>
            </div>
          </Link>

          <div className="fp-nav-actions">
            <nav className="fp-desktop-links" aria-label="Desktop Navigation">
              <Link href="/framepixel#work" className="fp-nav-link">
                Selected Works
              </Link>
              <Link href="/framepixel#capabilities" className="fp-nav-link">
                Practice
              </Link>
              <Link href="/framepixel/collaborators" className="fp-nav-link">
                Collaborators
              </Link>
              <Link href="/framepixel#contact" className="fp-nav-link">
                Contact
              </Link>
            </nav>

            {/* Mobile-only menu toggle (hidden on desktop) */}
            <button
              type="button"
              className="fp-menu-btn"
              aria-label="Toggle Navigation Drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href="/framepixel#contact" className="fp-btn-primary fp-header-cta">
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-out Drawer Menu */}
      <div
        className={`fp-drawer-backdrop ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Studio Navigation Drawer"
      >
        <div className="fp-drawer" onClick={(e) => e.stopPropagation()}>
          <div>
            <div className="fp-drawer-top">
              <span className="fp-drawer-brand">
                FramePixel<span style={{ color: "var(--fp-coral)" }}>.</span>
              </span>
              <button
                type="button"
                className="fp-drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>
            <nav className="fp-drawer-nav">
              <Link href="/framepixel" onClick={() => setDrawerOpen(false)}>Studio Home</Link>
              <Link href="/framepixel#work" onClick={() => setDrawerOpen(false)}>Selected Work</Link>
              <Link href="/framepixel#capabilities" onClick={() => setDrawerOpen(false)}>Practice</Link>
              <Link href="/framepixel/collaborators" onClick={() => setDrawerOpen(false)}>Collaborators</Link>
              <Link href="/framepixel#credo" onClick={() => setDrawerOpen(false)}>Credo</Link>
              <Link href="/framepixel#contact" onClick={() => setDrawerOpen(false)}>Contact</Link>
            </nav>

            <div className="fp-drawer-projects-sub">
              <span>Studio Projects</span>
              <Link href="/framepixel/projects/bussiler" onClick={() => setDrawerOpen(false)}>
                → Bussiler (Android Transit App)
              </Link>
              <Link href="/framepixel/projects/sunroute" onClick={() => setDrawerOpen(false)}>
                → SunRoute (Solar Seat Finder)
              </Link>
            </div>
          </div>

          <div className="fp-drawer-bottom">
            <p style={{ margin: "0 0 0.35rem 0", fontWeight: 700, color: "var(--fp-ink)" }}>
              FramePixel • Digital Solutions &amp; Games
            </p>
            <p style={{ margin: "0 0 0.25rem 0" }}>agnelfrancis2007@hotmail.com</p>
            <p style={{ margin: 0 }}>Velur, Kerala • Global Systems</p>
          </div>
        </div>
      </div>
    </>
  );
}
