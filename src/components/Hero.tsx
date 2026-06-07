"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay so CSS transitions fire after paint
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Parallax tilt on the visual card
  useEffect(() => {
    const card = visualRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(900px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) scale(1.02)`;
    };

    const handleLeave = () => {
      card.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)`;
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="hero hero-v2" id="about">
      {/* Ambient background blobs */}
      <div className="floating-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      {/* Grain overlay */}
      <div className="hero-grain" aria-hidden="true" />

      <div className={`hero-v2-inner${mounted ? " hero-revealed" : ""}`}>
        {/* ── LEFT COLUMN ── */}
        <div className="hero-v2-left">
          <p className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Available for projects
          </p>

          <h1 className="hero-v2-title">
            <span className="hv2-line">DESIGNER <span style={{fontFamily: 'Aise, sans-serif', fontWeight: 'normal', fontSize: '0.85em', opacity: 0.8}}>&amp;</span></span>
            <span className="hv2-line hv2-highlight">FULLSTACK</span>
            <span className="hv2-line hv2-outline">DEVELOPER</span>
          </h1>

          <p className="hero-v2-desc">
            I lead <strong>FramePixel</strong>, a digital studio crafting
            web‑based games and modern digital solutions. Currently a
            first‑year <em>CS & Cybersecurity</em> student at Jyothi
            Engineering College.
          </p>

          <div className="hero-v2-actions">
            <Link href="/work" className="btn-primary hv2-btn-primary">
              View My Work
              <span className="btn-arrow">→</span>
            </Link>
            <Link href="/contact" className="btn-secondary wave-btn hv2-btn-secondary">
              Let&apos;s Talk
              <span className="wave-emoji">👋</span>
            </Link>
          </div>

          {/* Stat pills */}
          <div className="hero-stats">
            <div className="stat-pill">
              <span className="stat-number">3+</span>
              <span className="stat-label">Years designing</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects shipped</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">∞</span>
              <span className="stat-label">Ideas brewing</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — visual card ── */}
        <div className="hero-v2-right">
          <div className="hero-visual-card" ref={visualRef}>
            {/* Decorative rings */}
            <div className="visual-ring visual-ring-1" />
            <div className="visual-ring visual-ring-2" />

            {/* Floating badge */}
            <div className="visual-badge visual-badge-tl">
              <span className="badge-icon">🎮</span>
              <span>Game Dev</span>
            </div>
            <div className="visual-badge visual-badge-br">
              <span className="badge-icon">⚡</span>
              <span>Full‑Stack</span>
            </div>

            {/* Central identity block */}
            <div className="visual-identity">
              <div className="visual-avatar-ring">
                <div className="visual-avatar-inner">
                  <span className="visual-initials">AF</span>
                </div>
              </div>
              <p className="visual-name">Agnel Francis</p>
              <p className="visual-role">CEO · FramePixel</p>

              {/* Skill tags inside card */}
              <div className="visual-tags">
                {["React", "Next.js", "Figma", "Node"].map((s) => (
                  <span key={s} className="visual-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative floating orbs outside card */}
          <div className="orb orb-a" />
          <div className="orb orb-b" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-wheel" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
