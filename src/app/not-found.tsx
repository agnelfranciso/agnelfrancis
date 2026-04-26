import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main-layout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', minHeight: 'calc(100vh - var(--nav-height) - 100px)' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px' }}>
        <p style={{ 
          fontFamily: 'PPSupplyMono', 
          fontSize: '1rem', 
          textTransform: 'uppercase', 
          color: 'var(--accent-primary)', 
          letterSpacing: '0.2em', 
          marginBottom: '2rem',
          fontWeight: '500'
        }}>
          404 Error
        </p>
        <h1 style={{ 
          fontFamily: 'IntraNet', 
          fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
          lineHeight: '1.2', 
          marginBottom: '2rem',
          color: 'var(--text-main)'
        }}>
          Lost in the <br/>
          <span className="text-outline" style={{ WebkitTextStroke: '1.5px var(--text-main)' }}>Digital Void.</span>
        </h1>
        <p className="description" style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem auto' }}>
          The page you are looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back to the main path.
        </p>
        <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
          <Link href="/" className="btn-primary wave-btn">
            <span className="btn-text">Back to Home</span>
            <span className="wave-emoji">🏠</span>
          </Link>
          <Link href="/work" className="btn-secondary">View Work</Link>
        </div>
      </div>
    </main>
  );
}
