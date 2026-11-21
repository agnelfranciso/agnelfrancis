import React from "react";
import Link from "next/link";

export default function FramePixelFooter() {
  return (
    <footer className="fp-studio-footer">
      <div className="fp-studio-footer-inner">
        <div className="fp-footer-grid">
          {/* Brand Column */}
          <div className="fp-footer-brand-col">
            <Link href="/framepixel" className="fp-footer-logo-wrap">
              <img
                src="/images/framepixel/logo.png"
                alt="FramePixel Logo"
                width={36}
                height={40}
                style={{ borderRadius: 6 }}
              />
              <span className="fp-footer-logo-title">
                FramePixel<span style={{ color: "var(--fp-coral)" }}>.</span>
              </span>
            </Link>
            <p className="fp-footer-summary">
              Digital solutions and web-based games. We help businesses grow with custom websites and engage users with interactive gaming experiences. Founded by Agnel Francis.
            </p>
          </div>

          {/* Solutions Column */}
          <div>
            <div className="fp-footer-col-title">Solutions</div>
            <div className="fp-footer-links-list">
              <Link href="/framepixel#work">Web Development</Link>
              <Link href="/framepixel/projects/bussiler">Digital Strategy</Link>
              <Link href="/games">Custom Games</Link>
              <Link href="/framepixel#contact">Support</Link>
            </div>
          </div>

          {/* Projects Column */}
          <div>
            <div className="fp-footer-col-title">Projects</div>
            <div className="fp-footer-links-list">
              <Link href="/framepixel/projects/bussiler">Bussiler</Link>
              <Link href="/framepixel/projects/sunroute">SunRoute</Link>
              <Link href="/framepixel#work">All Projects</Link>
              <Link href="/framepixel#work">Case Studies</Link>
              <Link href="/framepixel#contact">Work With Us</Link>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <div className="fp-footer-col-title">Company</div>
            <div className="fp-footer-links-list">
              <Link href="/framepixel/collaborators">Collaborators</Link>
              <Link href="/framepixel#contact">Contact</Link>
              <Link href="/framepixel#credo">Studio Credo</Link>
              <Link href="/framepixel#capabilities">Practice</Link>
              <a href="mailto:agnelfrancis2007@hotmail.com">agnelfrancis2007@hotmail.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fp-footer-bottom-bar">
          <div>
            © 2026 FramePixel. All rights reserved. Digital Solutions &amp; Web Games.
          </div>
          <div>
            Created by Agnel Francis
          </div>
        </div>
      </div>
    </footer>
  );
}
