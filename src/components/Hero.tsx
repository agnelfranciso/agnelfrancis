import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="hero-content">
        <p className="subtitle">Hello, I am Agnel Francis Olakkengil</p>
        <h1 className="hero-title">
          <span className="line">FRONTEND</span>
          <span className="line highlight">DEVELOPER</span>
          <span className="line text-outline">& DESIGNER</span>
        </h1>
        <p className="description">
          I build modern, beautiful websites using cutting-edge code and AI tools. Currently a first-year Computer Science & Cybersecurity student at Jyothi Engineering College in Velur, Thrissur.
        </p>
        <div className="hero-buttons">
          <Link href="/work" className="btn-primary">View My Work</Link>
          <Link href="/contact" className="btn-secondary">Let&apos;s Talk</Link>
        </div>
      </div>
    </section>
  );
}
