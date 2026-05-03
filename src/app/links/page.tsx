"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faArrowUpRightFromSquare, faFilePdf } from '@fortawesome/free-solid-svg-icons';
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
    { 
      name: "Download Resume", 
      url: "/resume/resume.pdf", 
      icon: <FontAwesomeIcon icon={faFilePdf} width={20} />, 
      external: true,
      download: true
    },
  ];

  return (
    <main style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      width: '100vw',
      padding: '2rem',
      background: 'radial-gradient(circle at top right, rgba(255,107,107,0.05), transparent), radial-gradient(circle at bottom left, rgba(78,205,196,0.05), transparent)',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden'
    }}>
      <div className="links-container" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        textAlign: 'center', 
        position: 'relative', 
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Profile Header */}
        <div className="links-profile" style={{ marginBottom: '2.5rem', transition: 'all 0.4s ease' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            margin: '0 auto 1.4rem', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '4px solid white',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            background: 'linear-gradient(45deg, var(--accent-blue), var(--accent-pink))',
            position: 'relative'
          }}>
            <Image 
              src="/images/agnel_cropped.png" 
              alt="Agnel Francis Olakkengil" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <h1 style={{ fontFamily: 'IntraNet', fontSize: '2.5rem', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>Agnel Francis</h1>
          <p style={{ fontFamily: 'PPSupplyMono', fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold' }}>
            Designer & Developer
          </p>
        </div>

        {/* Links List */}
        <div className="links-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
          {links.map((link, index) => (
            <Link 
              key={index}
              href={link.url}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              download={link.download ? "Agnel_Francis_Resume.pdf" : undefined}
              className="link-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.1rem 1.6rem',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                textDecoration: 'none',
                color: 'var(--text-main)',
                fontFamily: 'Aise',
                fontSize: '1rem',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <span className="link-icon" style={{ 
                  width: '36px', 
                  height: '36px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.03)',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  {link.icon}
                </span>
                <span style={{ fontWeight: '600' }}>{link.name}</span>
              </div>
              <div className="arrow-icon" style={{ transition: 'all 0.3s ease' }}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} width={12} style={{ opacity: 0.2 }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Background Shapes */}
      <div className="floating-shapes" style={{ opacity: 0.08, pointerEvents: 'none' }}>
        <div className="shape shape-1" style={{ width: '400px', height: '400px', top: '-10%', right: '-10%' }}></div>
        <div className="shape shape-2" style={{ width: '300px', height: '300px', bottom: '10%', left: '-5%' }}></div>
        <div className="shape shape-3" style={{ width: '200px', height: '200px', top: '40%', right: '5%', background: 'var(--accent-blue)' }}></div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .links-container {
            max-width: 850px !important;
            flex-direction: row !important;
            justify-content: center !important;
            text-align: left !important;
            gap: 6rem !important;
            align-items: center !important;
          }
          .links-profile {
            margin-bottom: 0 !important;
            text-align: left !important;
            flex: 1;
          }
          .links-profile div:first-child {
            margin-left: 0 !important;
            width: 180px !important;
            height: 180px !important;
          }
          .links-profile h1 {
            font-size: 3rem !important;
          }
          .links-list {
            flex: 1;
            max-width: 360px;
          }
        }
        .link-card:hover {
          transform: translateY(-5px) scale(1.02);
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1) !important;
          border-color: transparent !important;
          color: white !important;
          box-shadow: 0 20px 40px rgba(255, 107, 107, 0.2);
        }
        .link-card:hover .link-icon {
          background: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
          transform: rotate(-10deg);
        }
        .link-card:hover .arrow-icon {
          transform: translate(3px, -3px);
          color: white !important;
          opacity: 1 !important;
        }
        .link-card:hover span {
          color: white !important;
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
