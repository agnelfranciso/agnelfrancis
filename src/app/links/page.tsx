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
    <main className="main-layout" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      padding: '2rem',
      background: 'radial-gradient(circle at top right, rgba(255,107,107,0.05), transparent), radial-gradient(circle at bottom left, rgba(78,205,196,0.05), transparent)'
    }}>
      <div className="links-container" style={{ width: '100%', maxWidth: '440px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        
        {/* Profile Header */}
        <div className="links-profile" style={{ marginBottom: '4rem' }}>
          <div style={{ 
            width: '150px', 
            height: '150px', 
            margin: '0 auto 1.8rem', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '5px solid white',
            boxShadow: '0 25px 60px rgba(0,0,0,0.12)',
            background: 'linear-gradient(45deg, var(--accent-blue), var(--accent-pink))',
            position: 'relative'
          }}>
            <Image 
              src="/images/agnel.png" 
              alt="Agnel Francis Olakkengil" 
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.3)' }}
              priority
            />
          </div>
          <h1 style={{ fontFamily: 'IntraNet', fontSize: '3.2rem', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>Agnel Francis</h1>
          <p style={{ fontFamily: 'PPSupplyMono', fontSize: '0.85rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold' }}>
            Designer & Developer
          </p>
        </div>

        {/* Links List */}
        <div className="links-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
                padding: '1.4rem 2rem',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                textDecoration: 'none',
                color: 'var(--text-main)',
                fontFamily: 'Aise',
                fontSize: '1.15rem',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
                <span className="link-icon" style={{ 
                  width: '40px', 
                  height: '40px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.03)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}>
                  {link.icon}
                </span>
                <span style={{ fontWeight: '600' }}>{link.name}</span>
              </div>
              <div className="arrow-icon" style={{ transition: 'all 0.3s ease' }}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} width={14} style={{ opacity: 0.2 }} />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '6rem', opacity: 0.3, fontSize: '0.7rem', fontFamily: 'PPSupplyMono', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          © {new Date().getFullYear()} Agnel Francis Olakkengil
        </div>
      </div>

      {/* Background Shapes */}
      <div className="floating-shapes" style={{ opacity: 0.08, pointerEvents: 'none' }}>
        <div className="shape shape-1" style={{ width: '400px', height: '400px', top: '-10%', right: '-10%' }}></div>
        <div className="shape shape-2" style={{ width: '300px', height: '300px', bottom: '10%', left: '-5%' }}></div>
        <div className="shape shape-3" style={{ width: '200px', height: '200px', top: '40%', right: '5%', background: 'var(--accent-blue)' }}></div>
      </div>

      <style jsx>{`
        .link-card:hover {
          transform: translateY(-5px) scale(1.02);
          background: white;
          border-color: var(--accent-primary);
          box-shadow: 0 20px 40px rgba(255, 107, 107, 0.15);
        }
        .link-card:hover .link-icon {
          background: var(--accent-primary);
          color: white;
          transform: rotate(-10deg);
        }
        .link-card:hover .arrow-icon {
          transform: translate(3px, -3px);
          color: var(--accent-primary);
          opacity: 1 !important;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .shape {
          animation: float 10s ease-in-out infinite;
        }
        .shape-2 {
          animation-delay: -2s;
        }
        .shape-3 {
          animation-delay: -5s;
        }
      `}</style>
    </main>
  );
}
