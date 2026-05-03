"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ResumeFAB() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show on the links page or until mounted to prevent hydration mismatch
  if (!mounted || pathname === '/links') return null;

  return (
    <a 
      href="/resume/resume.pdf" 
      download="Agnel_Francis_Resume.pdf"
      className="resume-fab"
      aria-label="Download Resume"
    >
      <span className="fab-text">Download Resume</span>
      <div className="fab-icon">
        <FontAwesomeIcon icon={faFilePdf} />
      </div>

      <style jsx>{`
        .resume-fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 99;
          display: flex;
          align-items: center;
          background: var(--bg-sidebar, #0F0F0F);
          color: white;
          border-radius: 30px;
          padding: 5px;
          text-decoration: none;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          overflow: hidden;
          width: 45px;
          height: 45px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .fab-icon {
          width: 35px;
          height: 35px;
          min-width: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: all 0.5s ease;
          position: absolute;
          right: 4px;
        }

        .fab-text {
          font-family: 'PPSupplyMono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
          padding-left: 15px;
          padding-right: 40px;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.5s ease;
          color: white;
          font-weight: bold;
        }

        .resume-fab:hover {
          width: 190px;
          background: var(--accent-primary, #FF5A5A);
          box-shadow: 0 15px 35px rgba(255, 90, 90, 0.3);
          border-color: rgba(255,255,255,0.2);
        }

        .resume-fab:hover .fab-text {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-fab:hover .fab-icon {
          transform: rotate(-10deg);
        }

        @media (max-width: 768px) {
          .resume-fab {
            bottom: 25px;
            right: 25px;
          }
          /* Keep it as a simple circle on mobile for better UX */
          .resume-fab:hover {
            width: 45px;
          }
          .fab-text {
            display: none;
          }
        }
      `}</style>
    </a>
  );
}
