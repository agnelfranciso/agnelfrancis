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
        <p>© 2026 Agnel Francis Olakkengil. All rights reserved.</p>
        <div className="socials">
          <a href="https://github.com/agnelfranciso" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://www.linkedin.com/in/agnel-francis-olakkengil/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://x.com/oslohaz_e" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com/oslohaz_e/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </section>
  );
}
