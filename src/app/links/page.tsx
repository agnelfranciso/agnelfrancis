"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent FontAwesome from adding its CSS since we did it manually above
config.autoAddCss = false;

export default function LinksPage() {
  const links = [
    { 
      name: "Main Portfolio", 
      url: "/", 
      icon: <FontAwesomeIcon icon={faGlobe} width={20} />, 
      external: false 
    },
    { 
      name: "GitHub", 
      url: "https://github.com/agnelfranciso", 
      icon: <FontAwesomeIcon icon={faGithub} width={20} />, 
      external: true 
    },
    { 
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/agnel-francis-olakkengil/", 
      icon: <FontAwesomeIcon icon={faLinkedin} width={20} />, 
      external: true 
    },
    { 
      name: "Instagram", 
      url: "https://www.instagram.com/oslohaz_e/", 
      icon: <FontAwesomeIcon icon={faInstagram} width={20} />, 
      external: true 
    },
    { 
      name: "Twitter / X", 
      url: "https://x.com/oslohaz_e", 
      icon: <FontAwesomeIcon icon={faTwitter} width={20} />, 
      external: true 
    },
  ];

  return (
    <main className="main-layout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh', padding: '2rem' }}>
      <div className="links-container" style={{ width: '100%', maxWidth: '440px', textAlign: 'center' }}>
        
        {/* Profile Header */}
        <div className="links-profile" style={{ marginBottom: '3.5rem' }}>
          <div style={{ 
            width: '140px', 
            height: '140px', 
            margin: '0 auto 1.5rem', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '4px solid white',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            background: 'linear-gradient(45deg, var(--accent-blue), var(--accent-pink))',
            position: 'relative'
          }}>
            <Image 
              src="/images/agnel.png" 
              alt="Agnel Francis Olakkengil" 
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 10%', transform: 'scale(1.4)' }}
              priority
            />
          </div>
          <h1 style={{ fontFamily: 'IntraNet', fontSize: '2.8rem', marginBottom: '0.5rem' }}>Agnel Francis</h1>
          <p style={{ fontFamily: 'PPSupplyMono', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Designer & Developer
          </p>
        </div>

        {/* Links List */}
        <div className="links-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {links.map((link, index) => (
            <Link 
              key={index}
              href={link.url}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="link-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.2rem 1.8rem',
                background: 'white',
                borderRadius: '20px',
                textDecoration: 'none',
                color: 'var(--text-main)',
                fontFamily: 'Aise',
                fontSize: '1.1rem',
                transition: 'all var(--transition-smooth)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <span className="link-icon" style={{ opacity: 0.8 }}>{link.icon}</span>
                <span style={{ fontWeight: '500' }}>{link.name}</span>
              </div>
              {link.external && <FontAwesomeIcon icon={faArrowUpRightFromSquare} width={16} style={{ opacity: 0.3 }} />}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '5rem', opacity: 0.4, fontSize: '0.75rem', fontFamily: 'PPSupplyMono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} Agnel Francis Olakkengil
        </div>
      </div>

      {/* Background Shapes */}
      <div className="floating-shapes" style={{ opacity: 0.05 }}>
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <style jsx>{`
        .link-card:hover {
          transform: scale(1.02);
          background: var(--bg-color);
          border-color: var(--accent-primary);
          box-shadow: 0 10px 25px rgba(255, 107, 107, 0.1);
        }
        .link-card:hover .link-icon {
          color: var(--accent-primary);
          opacity: 1;
        }
      `}</style>
    </main>
  );
}
