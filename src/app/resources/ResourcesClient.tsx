"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Resource, resourcesData, RESOURCE_CATEGORIES } from "@/data/resources";
import "./resources.css";

export default function ResourcesClient() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalResource, setActiveModalResource] = useState<Resource | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts (Cmd+K for search, Esc to close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape" && activeModalResource) {
        setActiveModalResource(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalResource]);

  // Toast auto-hide
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3600);
  };

  // Filter items
  const filteredResources = resourcesData.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.format.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return resourcesData.length;
    return resourcesData.filter((r) => r.category === catId).length;
  };

  const handleDownload = (e: React.MouseEvent, resource: Resource) => {
    e.stopPropagation();
    e.preventDefault();
    if (downloadingId) return;

    setDownloadingId(resource.id);
    triggerToast(`Preparing package "${resource.title}" (${resource.fileSize})...`);

    // In-place preparation before passing to user's browser
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = resource.downloadUrl;
      link.download = resource.downloadUrl.split("/").pop() || `${resource.id}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadingId(null);
      triggerToast(`"${resource.title}" download initiated.`);
    }, 1100);
  };

  const handleCopyHash = (hash: string) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2400);
    triggerToast("SHA-256 hash copied to clipboard.");
  };

  const handleCopyCode = (cmd: string) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(cmd);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2400);
    triggerToast("CLI command copied to clipboard.");
  };

  return (
    <div className="lumina-vault">
      {/* Header */}
      <header className="lumina-header">
        <div className="lumina-header-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            <Link href="/resources" className="lumina-brand">
              <span>Agnel</span>
              <span className="lumina-brand-dot" />
              <span style={{ fontSize: "0.85rem", opacity: 0.6, fontWeight: 500, marginLeft: "0.25rem" }}>
                Vault
              </span>
            </Link>

            <nav className="lumina-nav">
              <button
                type="button"
                className={`lumina-nav-link ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
                style={{ background: "transparent", border: "none" }}
              >
                Vault
              </button>
              <button
                type="button"
                className={`lumina-nav-link ${activeCategory === "ui-kits" ? "active" : ""}`}
                onClick={() => setActiveCategory("ui-kits")}
                style={{ background: "transparent", border: "none" }}
              >
                UI Kits
              </button>
              <button
                type="button"
                className={`lumina-nav-link ${activeCategory === "3d" ? "active" : ""}`}
                onClick={() => setActiveCategory("3d")}
                style={{ background: "transparent", border: "none" }}
              >
                3D Assets
              </button>
              <button
                type="button"
                className={`lumina-nav-link ${activeCategory === "mockups" ? "active" : ""}`}
                onClick={() => setActiveCategory("mockups")}
                style={{ background: "transparent", border: "none" }}
              >
                Mockups
              </button>
              <button
                type="button"
                className={`lumina-nav-link ${activeCategory === "fonts" ? "active" : ""}`}
                onClick={() => setActiveCategory("fonts")}
                style={{ background: "transparent", border: "none" }}
              >
                Fonts
              </button>
            </nav>
          </div>

          <div className="lumina-header-actions">
            <div className="lumina-search-bar">
              <span className="lumina-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search digital assets..."
                className="lumina-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="lumina-search-kbd">⌘K</span>
            </div>

            <Link href="/" className="lumina-btn-ghost-pill">
              Portfolio ↗
            </Link>

            <Link href="/about" className="lumina-user-pill" title="Agnel Francis">
              AF
            </Link>
          </div>
        </div>
      </header>

      {/* Ambient Radial Gradient Glow */}
      <div className="lumina-ambient-glow" aria-hidden="true">
        <div className="lumina-ambient-glow-inner" />
      </div>

      <main style={{ position: "relative", zIndex: 1, paddingTop: "64px" }}>
        {/* Hero Section */}
        <section className="lumina-hero">
          <div className="lumina-hero-badge">
            <span className="lumina-badge-pulse" />
            <span className="lumina-badge-tag">Free Open Vault 2026</span>
            <span className="lumina-badge-sep">•</span>
            <span className="lumina-badge-vol">Vol. 04 Released</span>
          </div>

          <h1 className="lumina-hero-title">
            Digital assets crafted for{" "}
            <span className="lumina-hero-title-italic">clarity</span>
          </h1>

          <p className="lumina-hero-desc">
            A curated sanctuary of free design systems, 3D icons, and interface kits. Built for discerning designers, engineers, and studios.
          </p>

          <div className="lumina-hero-actions">
            <a href="#vault-grid" className="lumina-btn-primary">
              <span>Explore Resources</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            <button
              type="button"
              className="lumina-btn-secondary"
              onClick={() => {
                setActiveCategory("ui-kits");
                const el = document.getElementById("vault-grid");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>View UI Kits</span>
            </button>
          </div>

          {/* Quiet Studio Ribbon */}
          <div className="lumina-ribbon">
            <span className="lumina-ribbon-label">Utilized by craftspeople at independent studios</span>
            <div className="lumina-ribbon-logos">
              <span className="lumina-logo-text" style={{ fontWeight: 800, letterSpacing: "-0.04em" }}>atelier.</span>
              <span className="lumina-logo-text" style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.95rem" }}>KRONOS</span>
              <span className="lumina-logo-text" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.3rem" }}>Vektor</span>
              <span className="lumina-logo-text" style={{ letterSpacing: "0.25em", textTransform: "uppercase", fontSize: "0.85rem", fontWeight: 700 }}>MONOLITH</span>
              <span className="lumina-logo-text" style={{ fontWeight: 700 }}>Forma™</span>
            </div>
          </div>
        </section>

        {/* Catalog Grid Section */}
        <section className="lumina-catalog" id="vault-grid">
          {/* Filter Bar Header */}
          <div className="lumina-filter-header">
            <div>
              <span className="lumina-filter-kicker">Index / Curated Feed</span>
              <h2 className="lumina-filter-title">Archival Collection</h2>
            </div>

            {/* Filter Pills */}
            <div className="lumina-tabs">
              {RESOURCE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`lumina-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                  <span className="lumina-tab-count">{getCategoryCount(cat.id)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Result Feedback if Filtering */}
          {searchQuery && (
            <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--res-on-surface-variant)" }}>
              Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo; ({filteredResources.length} items found) &bull;{" "}
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{ background: "none", border: "none", color: "var(--res-primary)", textDecoration: "underline" }}
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Cards Grid */}
          <div className="lumina-grid">
            {filteredResources.map((item) => (
              <article
                key={item.id}
                className="lumina-card"
                onClick={() => router.push(`/resources/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                {/* Media Preview */}
                <div className="lumina-card-media">
                  {item.isTypographyCard ? (
                    <div className="lumina-type-card-body">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="lumina-card-badge-left" style={{ position: "static" }}>
                          {item.format}
                        </span>
                        <span className="lumina-card-badge-right" style={{ position: "static" }}>
                          {item.price}
                        </span>
                      </div>
                      <div className="lumina-type-specimen">
                        Aesthete <span style={{ fontStyle: "italic", opacity: 0.85 }}>№ 08</span>
                        <div className="lumina-type-subtext">The quick brown fox jumps</div>
                      </div>
                      <div className="lumina-type-styles-strip">
                        <span>Regular</span>
                        <span>•</span>
                        <span>Italic</span>
                        <span>•</span>
                        <span>Display Bold</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="lumina-card-img"
                          loading="lazy"
                        />
                      )}
                      <span className="lumina-card-badge-left">{item.format}</span>
                      <span className="lumina-card-badge-right">{item.price}</span>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="lumina-card-content">
                  <div>
                    <div className="lumina-card-header-row">
                      <h3 className="lumina-card-title">{item.title}</h3>
                      <span className="lumina-card-version">{item.version}</span>
                    </div>
                    <p className="lumina-card-desc">{item.description}</p>
                  </div>

                  <div className="lumina-card-footer">
                    <span className="lumina-card-author">by {item.author}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                      <Link
                        href={`/resources/${item.id}`}
                        className="lumina-btn-ghost-pill"
                        style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Details &rarr;
                      </Link>
                      <button
                        type="button"
                        className="lumina-btn-download-pill"
                        onClick={(e) => handleDownload(e, item)}
                        disabled={downloadingId === item.id}
                      >
                        {downloadingId === item.id ? (
                          <>
                            <span className="material-symbols-outlined text-[13px] animate-spin">
                              progress_activity
                            </span>
                            <span>Packaging...</span>
                          </>
                        ) : (
                          <>
                            <span>Download</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <polyline points="19 12 12 19 5 12" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--res-outline)" }}>
              <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No matching assets found in the vault.</p>
              <button
                type="button"
                className="lumina-btn-ghost-pill"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Community Open Submissions Banner */}
        <section className="lumina-submission-banner">
          <div className="lumina-submission-box">
            <div>
              <span className="lumina-submission-kicker">Open Submissions</span>
              <h3 className="lumina-submission-title">Share your work with the community</h3>
              <p className="lumina-submission-desc">
                We welcome thoughtful interface systems, typefaces, and spatial renders from designers worldwide. Retain full IP ownership and direct portfolio credit.
              </p>
            </div>
            <Link
              href="/contact"
              className="lumina-btn-ghost-pill"
              style={{ padding: "12px 24px !important", fontSize: "0.85rem !important", whiteSpace: "nowrap" }}
            >
              <span>Submit an Asset</span>
              <span style={{ marginLeft: "6px" }}>↑</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Asset Download & Inspection Modal */}
      <div
        className={`lumina-modal-backdrop ${activeModalResource ? "open" : ""}`}
        onClick={() => setActiveModalResource(null)}
        role="dialog"
        aria-modal="true"
      >
        {activeModalResource && (
          <div className="lumina-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lumina-modal-close-btn"
              onClick={() => setActiveModalResource(null)}
              aria-label="Close Modal"
            >
              ✕
            </button>

            <div className="lumina-modal-badge">
              <span className="lumina-badge-pulse" />
              <span>Instant Download Ready</span>
            </div>

            <h2 className="lumina-modal-title">
              Your download of <em>{activeModalResource.title}</em> is ready
            </h2>

            <p className="lumina-modal-desc">
              The archive contains master library binaries, atomic tokens, and preview documentation. Initializing transfer below.
            </p>

            {/* Main Action Card */}
            <div className="lumina-action-card-box">
              <button
                type="button"
                className="lumina-direct-download-btn"
                onClick={(e) => handleDownload(e, activeModalResource)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
                <span>Download {activeModalResource.title.replace(/\s+/g, "_")}.zip</span>
                <span className="lumina-filesize-tag">{activeModalResource.fileSize}</span>
              </button>

              <div className="lumina-status-indicator">
                <span className="lumina-badge-pulse" />
                <span>Transfer ready • Auto-saves to default downloads</span>
              </div>

              {activeModalResource.sha256 && (
                <div className="lumina-meta-hash-row">
                  <div className="lumina-hash-box">
                    <span style={{ textTransform: "uppercase" }}>SHA-256</span>
                    <span style={{ color: "var(--res-on-surface)" }}>
                      {activeModalResource.sha256.slice(0, 8)}...{activeModalResource.sha256.slice(-7)}
                    </span>
                    <button
                      type="button"
                      className="lumina-copy-hash-btn"
                      onClick={() => handleCopyHash(activeModalResource.sha256!)}
                    >
                      {copiedHash ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--res-primary)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Signed &amp; Authenticated Binary</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quickstart Sequence */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.725rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--res-primary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>
                Integration
              </span>
              <h3 style={{ fontSize: "1.25rem", margin: "0 0 1rem 0", color: "var(--res-on-surface)" }}>
                Quickstart Sequence
              </h3>

              <div className="lumina-steps-grid">
                <div className="lumina-step-card">
                  <div>
                    <span className="lumina-step-num">01</span>
                    <h4 className="lumina-step-title">Unpack Assets</h4>
                    <p className="lumina-step-text">Decompress archive contents containing master .fig libraries and raw token files.</p>
                  </div>
                </div>
                <div className="lumina-step-card">
                  <div>
                    <span className="lumina-step-num">02</span>
                    <h4 className="lumina-step-title">Import &amp; Sync</h4>
                    <p className="lumina-step-text">Drag file into your design tool or inject compiled JSON tokens into your styling engine.</p>
                  </div>
                </div>
                <div className="lumina-step-card">
                  <div>
                    <span className="lumina-step-num">03</span>
                    <h4 className="lumina-step-title">Ship Projects</h4>
                    <p className="lumina-step-text">Deploy across client engagements and commercial products under perpetual royalty-free coverage.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CLI Command Snippet if available */}
            {activeModalResource.packageCommand && (
              <div className="lumina-code-box">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ color: "var(--res-primary)" }}>&gt;_</span>
                  <code>{activeModalResource.packageCommand}</code>
                </div>
                <button
                  type="button"
                  className="lumina-copy-code-btn"
                  onClick={() => handleCopyCode(activeModalResource.packageCommand!)}
                >
                  {copiedCode ? "COPIED" : "Copy Command"}
                </button>
              </div>
            )}

            {/* Commercial Rights Certificate Row */}
            <div
              style={{
                backgroundColor: "var(--res-surface-low)",
                borderRadius: "14px",
                padding: "1rem 1.25rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                border: "1px solid var(--res-border-subtle)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--res-on-surface)" }}>
                    Commercial Rights Certificate
                  </span>
                  <span style={{ fontSize: "0.7rem", padding: "1px 6px", borderRadius: "4px", backgroundColor: "rgba(99, 102, 241, 0.2)", color: "var(--res-primary)", fontWeight: 700 }}>
                    Active
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "0.775rem", color: "var(--res-on-surface-variant)" }}>
                  ID: {activeModalResource.certificateId || "AGN-2026-VAULT-FREE"} &bull; Commercial &amp; Personal Use
                </p>
              </div>

              <a
                href={activeModalResource.certificatePdfUrl || "/resources/downloads/lumina-commercial-certificate.pdf"}
                download="Commercial_Rights_Certificate.pdf"
                className="lumina-btn-ghost-pill"
                style={{ fontSize: "0.75rem !important" }}
              >
                Download Certificate PDF ↓
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Floating Toast Notification */}
      <div className={`lumina-toast ${showToast ? "show" : ""}`}>
        <span className="lumina-toast-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span>{toastMessage}</span>
      </div>

      {/* Footer */}
      <footer className="lumina-footer">
        <div className="lumina-footer-inner">
          <div className="lumina-footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.75rem" }}>
                <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--res-on-surface)" }}>Agnel</span>
                <span className="lumina-brand-dot" />
                <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>Vault</span>
              </div>
              <p style={{ fontSize: "0.825rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: 0 }}>
                Minimal digital store curating precision interface assets, typographic specimens, and spatial design elements.
              </p>
            </div>

            <div>
              <div className="lumina-footer-col-title">Categories</div>
              <ul className="lumina-footer-links">
                <li><button type="button" onClick={() => setActiveCategory("all")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>Vault Collection</button></li>
                <li><button type="button" onClick={() => setActiveCategory("ui-kits")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>UI Systems &amp; Kits</button></li>
                <li><button type="button" onClick={() => setActiveCategory("3d")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>Spatial &amp; 3D Objects</button></li>
                <li><button type="button" onClick={() => setActiveCategory("mockups")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>Photorealistic Mockups</button></li>
                <li><button type="button" onClick={() => setActiveCategory("fonts")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>Editorial Typefaces</button></li>
              </ul>
            </div>

            <div>
              <div className="lumina-footer-col-title">Portfolio &amp; Studio</div>
              <ul className="lumina-footer-links">
                <li><Link href="/">Main Portfolio</Link></li>
                <li><Link href="/work">Selected Work</Link></li>
                <li><Link href="/framepixel">FramePixel Studio</Link></li>
                <li><Link href="/blog">Design Insights</Link></li>
                <li><Link href="/contact">Get in Touch</Link></li>
              </ul>
            </div>

            <div>
              <div className="lumina-footer-col-title">Direct Inquiries</div>
              <p style={{ fontSize: "0.825rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: "0 0 0.75rem 0" }}>
                Direct correspondence and bespoke curation requests.
              </p>
              <a
                href="mailto:agnelfrancis2007@hotmail.com"
                style={{ color: "var(--res-primary)", fontSize: "0.85rem", textDecoration: "none" }}
              >
                agnelfrancis2007@hotmail.com
              </a>
            </div>
          </div>

          <div className="lumina-footer-bottom">
            <span>© 2026 Agnel Francis. Curated Vault &amp; Digital Storefront.</span>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link href="/legal" style={{ color: "inherit", textDecoration: "none" }}>Licensing Policy</Link>
              <span>•</span>
              <Link href="/legal" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
