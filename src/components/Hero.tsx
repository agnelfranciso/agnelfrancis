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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, vx: number, vy: number, size: number, color: string }[] = [];
    const colors = ['#FF5555', '#55AAFF', '#FFDD55', '#22C55E'];
    
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      particles = [];
      const numParticles = (canvas.width * canvas.height) / 6000;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    window.addEventListener('resize', resize);
    // Initial size setup needs a small delay to ensure parent is fully rendered
    setTimeout(resize, 50);

    let mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    // We attach mouse events to the parent to make the hover area larger
    const parent = canvas.parentElement;
    if (parent) {
        parent.addEventListener('mousemove', onMouseMove);
        parent.addEventListener('mouseleave', onMouseLeave);
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 1 - (dist / 150);
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (parent) {
          parent.removeEventListener('mousemove', onMouseMove);
          parent.removeEventListener('mouseleave', onMouseLeave);
      }
      cancelAnimationFrame(animationId);
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

        {/* ── RIGHT COLUMN — visual ── */}
        <div className="hero-v2-right" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <canvas 
            ref={canvasRef} 
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          />
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
