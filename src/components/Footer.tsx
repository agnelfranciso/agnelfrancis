"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/links") return null;

  return (
    <section id="contact" className="footer">
      <div className="footer-content">
        <h2>
          Let&apos;s build something <br />
          <span className="text-outline-light">amazing</span> together.
        </h2>
        <a href="mailto:agnelfrancis2007@hotmail.com" className="email-link">
          agnelfrancis2007@hotmail.com
        </a>
      </div>
      <div className="footer-bottom">
        <div style={{ textAlign: "left" }}>
          <p>© 2026 Agnel Francis Olakkengil. All rights reserved.</p>
          <a href="/legal" style={{ fontSize: "0.9rem", color: "var(--text-muted)", textDecoration: "underline", display: "inline-block", marginTop: "0.5rem", textAlign: "left" }}>Legal & Disclaimer</a>
        </div>
        <div className="socials">
          <a href="https://github.com/agnelfranciso" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://www.linkedin.com/in/agnel-francis-olakkengil/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://x.com/oslohaz_e" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com/oslohaz_e/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
        <p>Not Loading? <a href="/simple" style={{ textDecoration: 'underline', color: 'inherit' }}>Load a simpler page!</a></p>
      </div>
    </section>
  );
}
