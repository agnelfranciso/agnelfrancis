"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faDownload, faShieldAlt, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

export interface ProjectLink {
  url: string;
  label: string;
  type: "live" | "github" | "fdroid" | "playstore" | "download";
  fileName?: string;
  fileSize?: string;
}

interface Props {
  links: ProjectLink[];
  projectTitle: string;
}

export default function ProjectActionButtons({ links, projectTitle }: Props) {
  const [activeDownload, setActiveDownload] = useState<ProjectLink | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (activeDownload) {
      document.body.style.overflow = "hidden";
      setAgreed(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeDownload]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeDownload) {
        setActiveDownload(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDownload]);

  const handleLinkClick = (e: React.MouseEvent, link: ProjectLink) => {
    if (link.type === "download") {
      e.preventDefault();
      setActiveDownload(link);
    }
  };

  const handleConfirmDownload = () => {
    if (!activeDownload || !agreed) return;

    // Trigger download
    const link = document.createElement("a");
    link.href = activeDownload.url;
    link.download = activeDownload.fileName || activeDownload.url.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal
    setActiveDownload(null);
  };

  if (!links || links.length === 0) return null;

  return (
    <>
      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            onClick={(e) => handleLinkClick(e, link)}
            target={link.type === "download" ? undefined : "_blank"}
            rel={link.type === "download" ? undefined : "noopener noreferrer"}
            className="btn-primary wave-btn"
            style={{
              width: "100%",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.8rem",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {link.type === "download" ? (
              <FontAwesomeIcon icon={faDownload} style={{ fontSize: "1.1rem" }} />
            ) : link.type === "fdroid" ? (
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.2rem", height: "1.2rem", fill: "currentColor" }}>
                <title>F-Droid</title>
                <path d="M20.472,10.081H3.528c-0.877,0-1.589,0.711-1.589,1.589v10.59c0,0.877,0.711,1.589,1.589,1.589h16.944 c0.877,0,1.589-0.711,1.589-1.589V11.67C22.061,10.792,21.349,10.081,20.472,10.081z M12,22.525c-3.066,0-5.56-2.494-5.56-5.56 s2.494-5.56,5.56-5.56c3.066,0,5.56,2.494,5.56,5.56S15.066,22.525,12,22.525z M12,12.411c-2.511,0-4.554,2.043-4.554,4.554 S9.489,21.519,12,21.519s4.554-2.043,4.554-4.554S14.511,12.411,12,12.411z M12,20.274c-1.563,0-2.881-1.103-3.221-2.568h1.67 c0.275,0.581,0.859,0.979,1.551,0.979c0.96,0,1.721-0.761,1.721-1.721c0-0.96-0.761-1.721-1.721-1.721 c-0.649,0-1.2,0.352-1.493,0.874H8.805c0.378-1.412,1.669-2.462,3.195-2.462c1.818,0,3.309,1.491,3.309,3.309 C15.309,18.783,13.818,20.274,12,20.274z M23.849,0.396c-0.001,0.001-0.002,0.002-0.002,0.003 c-0.002-0.002-0.004-0.003-0.006-0.005c0.001-0.001,0.002-0.003,0.004-0.004c-0.116-0.137-0.279-0.231-0.519-0.238 c-0.202,0.005-0.391,0.097-0.512,0.259l-1.818,2.353c-0.164-0.058-0.339-0.095-0.523-0.095H3.528c-0.184,0-0.358,0.038-0.523,0.095 L1.187,0.41c-0.121-0.162-0.31-0.253-0.512-0.259c-0.24,0.006-0.403,0.1-0.519,0.238c0.001,0.001,0.002,0.003,0.004,0.004 C0.157,0.395,0.155,0.397,0.153,0.399C0.153,0.398,0.152,0.397,0.151,0.396C0.085,0.474-0.146,0.822,0.139,1.22l1.909,2.471 C1.981,3.867,1.94,4.057,1.94,4.257v3.707c0,0.877,0.711,1.589,1.589,1.589h16.944c0.877,0,1.589-0.711,1.589-1.589V4.257 c0-0.2-0.041-0.39-0.109-0.566l1.909-2.471C24.146,0.822,23.915,0.474,23.849,0.396z M6.904,8.228c-0.987,0-1.787-0.8-1.787-1.787 s0.8-1.787,1.787-1.787s1.787,0.8,1.787,1.787S7.891,8.228,6.904,8.228z M17.229,8.228c-0.987,0-1.787-0.8-1.787-1.787 s0.8-1.787,1.787-1.787c0.987,0,1.787,0.8,1.787,1.787S18.216,8.228,17.229,8.228z"/>
              </svg>
            ) : link.type === "github" ? (
              <FontAwesomeIcon icon={faGithub} style={{ fontSize: "1.2rem" }} />
            ) : (
              <FontAwesomeIcon icon={faGlobe} style={{ fontSize: "1.2rem" }} />
            )}
            <span>{link.label}</span>
            <span className="wave-emoji">{link.type === "download" ? "↓" : "↗"}</span>
          </a>
        ))}
      </div>

      {/* Download Agreement Modal Portal */}
      {mounted && activeDownload && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="agreement-title"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 2147483647, // Maximum z-index to guarantee it is over all elements
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
            backgroundColor: "rgba(5, 5, 8, 0.82)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          onClick={() => setActiveDownload(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "540px",
              background: "#FAF8F5",
              color: "#1F1F1F",
              borderRadius: "24px",
              padding: "2rem",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveDownload(null)}
              aria-label="Close dialog"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                background: "rgba(0, 0, 0, 0.04)",
                color: "#1F1F1F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Header */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--accent-primary, #FF6B6B)",
                  background: "rgba(255, 107, 107, 0.1)",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  marginBottom: "0.75rem",
                  fontWeight: 600,
                }}
              >
                <FontAwesomeIcon icon={faShieldAlt} />
                <span>Pre-Download Agreement</span>
              </div>
              <h3
                id="agreement-title"
                style={{
                  fontFamily: "IntraNet, sans-serif",
                  fontSize: "1.6rem",
                  lineHeight: "1.2",
                  margin: "0 0 0.5rem 0",
                  color: "#1F1F1F",
                }}
              >
                Download {projectTitle}
              </h3>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "#6B6B6B" }}>
                File: <strong>{activeDownload.fileName || "AerisIQ-release.apk"}</strong> {activeDownload.fileSize ? `(${activeDownload.fileSize})` : "(~27 MB)"}
              </p>
            </div>

            {/* Terms Content Box */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                borderRadius: "16px",
                padding: "1.2rem",
                fontSize: "0.88rem",
                lineHeight: "1.6",
                color: "#4A4A4A",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, color: "#1F1F1F" }}>
                Please review the terms before downloading and installing:
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>
                  <strong>Direct Package Installation (APK):</strong> This app is packaged directly for Android. Installing it requires enabling <em>&ldquo;Install Unknown Apps&rdquo;</em> on your device.
                </li>
                <li>
                  <strong>Safe & Privacy-First:</strong> AerisIQ executes 100% offline on-device AI with zero remote analytics, telemetry, or data tracking.
                </li>
                <li>
                  <strong>Provided As-Is (FOSS):</strong> This software is provided free and open-source for personal evaluation and safety assistance without commercial warranties.
                </li>
                <li>
                  <strong>Hardware Requirements:</strong> Requires Android 8.0+ and sufficient device memory to run the offline AI model.
                </li>
              </ul>
            </div>

            {/* Checkbox agreement */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                cursor: "pointer",
                userSelect: "none",
                fontSize: "0.9rem",
                color: "#1F1F1F",
                lineHeight: "1.4",
                padding: "0.4rem 0",
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  marginTop: "0.2rem",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                  accentColor: "var(--accent-primary, #FF6B6B)",
                }}
              />
              <span>
                I understand that this is an independent Android APK, accept the download terms, and agree to install it at my own discretion.
              </span>
            </label>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "0.5rem",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveDownload(null)}
                style={{
                  flex: 1,
                  padding: "0.85rem 1.25rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  background: "transparent",
                  color: "#1F1F1F",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDownload}
                disabled={!agreed}
                style={{
                  flex: 2,
                  padding: "0.85rem 1.25rem",
                  borderRadius: "14px",
                  border: "none",
                  background: agreed ? "var(--accent-primary, #FF6B6B)" : "rgba(0, 0, 0, 0.15)",
                  color: agreed ? "#ffffff" : "#888888",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 700,
                  cursor: agreed ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  transition: "all 0.25s ease",
                  boxShadow: agreed ? "0 8px 24px rgba(255, 107, 107, 0.35)" : "none",
                }}
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Agree & Download APK</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
