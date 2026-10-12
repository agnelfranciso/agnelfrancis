"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  html_url: string;
}

type Phase = "closed" | "opening" | "open" | "closing";

const DUR = 400;

const STYLES = `
  @keyframes cl-fadeIn {
    from { opacity: 0; backdrop-filter: blur(0px); }
    to   { opacity: 1; backdrop-filter: blur(6px); }
  }
  @keyframes cl-fadeOut {
    from { opacity: 1; backdrop-filter: blur(6px); }
    to   { opacity: 0; backdrop-filter: blur(0px); }
  }
  @keyframes cl-slideUp {
    from { transform: translateY(110%); }
    to   { transform: translateY(0); }
  }
  @keyframes cl-slideDown {
    from { transform: translateY(0); }
    to   { transform: translateY(110%); }
  }

  .cl-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.52);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex; align-items: flex-end; justify-content: center;
  }
  .cl-overlay-enter { animation: cl-fadeIn  ${DUR}ms cubic-bezier(0.22,1,0.36,1) both; }
  .cl-overlay-exit  { animation: cl-fadeOut ${DUR}ms cubic-bezier(0.6,0,0.8,0.4) both; }

  .cl-sheet {
    width: 100%; max-width: 640px; max-height: 72vh;
    background: var(--bg-color, #faf9f7);
    border-radius: 24px 24px 0 0;
    display: flex; flex-direction: column;
    overflow: hidden;
    box-shadow: 0 -16px 64px rgba(0,0,0,0.2), 0 -2px 12px rgba(0,0,0,0.07);
    will-change: transform;
  }
  .cl-sheet-enter { animation: cl-slideUp   ${DUR}ms cubic-bezier(0.22,1,0.36,1) both; }
  .cl-sheet-exit  { animation: cl-slideDown ${DUR}ms cubic-bezier(0.6,0,0.8,0.4) both; }

  .cl-close-btn {
    background: rgba(0,0,0,0.08);
    border: none;
    border-radius: 50%;
    width: 32px !important;
    height: 32px !important;
    min-width: 32px;
    min-height: 32px;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.85rem;
    color: var(--text-muted, #888);
    flex-shrink: 0;
    line-height: 1;
    padding: 0;
    box-sizing: border-box;
    transition: background 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.2s;
  }
  .cl-close-btn:hover {
    background: rgba(0,0,0,0.14);
    transform: rotate(90deg) scale(1.08);
    color: var(--text-main);
  }

  .cl-row {
    display: flex; align-items: flex-start; gap: 1rem;
    padding: 0.85rem 1.5rem; text-decoration: none; color: inherit;
    transition: background 0.15s;
  }
  .cl-row:hover { background: rgba(0,0,0,0.035); }
`;

export default function ChangelogButton() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isVisible = phase !== "closed";

  const openModal = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("opening");
    // Let mount paint, then switch to open (keeps animation class stable)
    timerRef.current = setTimeout(() => setPhase("open"), DUR);
  }, []);

  const closeModal = useCallback(() => {
    if (phase === "closed" || phase === "closing") return;
    setPhase("closing");
    timerRef.current = setTimeout(() => setPhase("closed"), DUR);
  }, [phase]);

  // Fetch commits on first open
  useEffect(() => {
    if (phase !== "opening" || commits.length > 0) return;
    setLoading(true);
    setError(null);
    fetch("https://api.github.com/repos/agnelfranciso/agnelfrancis/commits?per_page=30")
      .then((r) => { if (!r.ok) throw new Error(`GitHub API ${r.status}`); return r.json(); })
      .then((data: Commit[]) => setCommits(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [phase, commits.length]);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    if (isVisible) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isVisible, closeModal]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isVisible]);

  // Cleanup
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const isExiting = phase === "closing";
  const overlayClass = `cl-overlay ${isExiting ? "cl-overlay-exit" : "cl-overlay-enter"}`;
  const sheetClass   = `cl-sheet   ${isExiting ? "cl-sheet-exit"   : "cl-sheet-enter"}`;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  const shortSha = (sha: string) => sha.slice(0, 7);
  const headline  = (msg: string) => msg.split("\n")[0].trim();

  return (
    <>
      {/* Inject styles once */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Trigger link */}
      <button
        onClick={openModal}
        style={{
          background: "none", border: "none", padding: 0, cursor: "pointer",
          fontSize: "0.78rem", fontFamily: "var(--font-mono, monospace)",
          color: "var(--text-muted, #888)", textDecoration: "underline",
          textUnderlineOffset: "3px", letterSpacing: "0.03em", transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-main)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted, #888)")}
        aria-label="View site changelog"
      >
        changelog
      </button>

      {isVisible && (
        <div
          ref={overlayRef}
          className={overlayClass}
          onClick={(e) => { if (e.target === overlayRef.current) closeModal(); }}
        >
          <div className={sheetClass}>

            {/* Header */}
            <div style={{
              padding: "0.875rem 1.5rem 0.75rem",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              flexShrink: 0,
            }}>
              {/* Drag handle */}
              <div style={{
                width: "40px", height: "4px", borderRadius: "99px",
                background: "rgba(0,0,0,0.13)", margin: "0 auto 1rem",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h2 style={{
                    fontFamily: "'PPSupplySans', sans-serif", fontWeight: 200,
                    fontSize: "1.4rem", letterSpacing: "-0.02em",
                    margin: 0, color: "var(--text-main)", lineHeight: 1.2,
                  }}>
                    Site Changelog
                  </h2>
                  <p style={{
                    fontFamily: "var(--font-mono, monospace)", fontSize: "0.72rem",
                    color: "var(--text-muted, #888)", margin: "0.2rem 0 0", letterSpacing: "0.04em",
                  }}>
                    agnelfranciso/agnelfrancis
                  </p>
                </div>
                <button onClick={closeModal} className="cl-close-btn" aria-label="Close changelog">
                  ✕
                </button>
              </div>
            </div>

            {/* Commit list */}
            <div style={{
              overflowY: "auto", flex: 1, padding: "0.5rem 0",
              scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.15) transparent",
            }}>
              {loading && (
                <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                  Fetching commits…
                </div>
              )}
              {error && (
                <div style={{ padding: "2.5rem", textAlign: "center", color: "#e55", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                  {error}
                </div>
              )}
              {!loading && !error && commits.map((c, i) => (
                <a
                  key={c.sha}
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cl-row"
                  style={{ borderBottom: i < commits.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                >
                  <span style={{
                    fontFamily: "var(--font-mono, monospace)", fontSize: "0.68rem",
                    color: "var(--text-muted, #888)", background: "rgba(0,0,0,0.06)",
                    borderRadius: "6px", padding: "2px 6px", flexShrink: 0,
                    marginTop: "0.15rem", letterSpacing: "0.04em",
                  }}>
                    {shortSha(c.sha)}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: 0, fontSize: "0.875rem", color: "var(--text-main)",
                      fontWeight: 500, lineHeight: 1.4,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {headline(c.commit.message)}
                    </p>
                    <p style={{
                      margin: "0.2rem 0 0", fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.7rem", color: "var(--text-muted, #888)",
                    }}>
                      {c.commit.author.name} · {formatDate(c.commit.author.date)}
                    </p>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", flexShrink: 0, marginTop: "0.1rem" }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
