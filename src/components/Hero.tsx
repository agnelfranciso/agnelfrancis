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
        <p className="subtitle">CEO of FramePixel</p>
        <h1 className="hero-title">
          <span className="line">DESIGNER</span>
          <span className="line highlight">& FULLSTACK</span>
          <span className="line text-outline">DEVELOPER</span>
        </h1>
        <p className="description">
          I lead <strong>FramePixel</strong>, a digital studio focused on building web-based games and modern digital solutions that matter. Currently a first-year Computer Science & Cybersecurity student at Jyothi Engineering College.
        </p>
        <div className="hero-buttons">
          <Link href="/work" className="btn-primary">View My Work</Link>
          <Link href="/contact" className="btn-secondary">Let&apos;s Talk</Link>
        </div>
      </div>
    </section>
  );
}
