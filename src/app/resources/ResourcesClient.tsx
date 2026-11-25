"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowUpRight,
  Download,
  Loader2,
  Info,
  X,
  Check,
  Copy,
  ShieldCheck,
  Code2,
} from "lucide-react";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
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

  // Sync URL query params (?category= or ?q=) on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    const q = params.get("q");
    if (cat && RESOURCE_CATEGORIES.some((c) => c.id === cat)) {
      setActiveCategory(cat);
    }
    if (q) {
      setSearchQuery(q);
    }
  }, []);

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

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3600);
  };

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
    triggerToast(`Preparing "${resource.title}" (${resource.fileSize})...`);

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = resource.downloadUrl;
      link.download = resource.downloadUrl.split("/").pop() || `${resource.id}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadingId(null);
      triggerToast(`"${resource.title}" download started.`);
    }, 900);
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
    triggerToast("Command copied to clipboard.");
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
              {RESOURCE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`lumina-nav-link ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ background: "transparent", border: "none" }}
                >
                  {cat.id === "all" ? "Vault" : cat.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="lumina-header-actions">
            <div className="lumina-search-bar">
              <span className="lumina-search-icon">
                <Search size={15} strokeWidth={2} />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search fonts, repos, APKs..."
                className="lumina-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="lumina-search-kbd">⌘K</span>
            </div>

            <Link
              href="/"
              className="lumina-btn-ghost-pill"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
            >
              <span>Portfolio</span>
              <ArrowUpRight size={13} strokeWidth={2.2} />
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
            <span className="lumina-badge-tag">Open Source &amp; Free Vault</span>
            <span className="lumina-badge-sep">&bull;</span>
            <span className="lumina-badge-vol">{resourcesData.length} Live Releases</span>
          </div>

          <h1
            className="lumina-hero-title"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              letterSpacing: "-0.035em",
              textTransform: "none",
            }}
          >
            Fonts, tools &amp; repos built for{" "}
            <span
              className="lumina-hero-title-italic"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              clarity
            </span>
          </h1>

          <p className="lumina-hero-desc">
            Download the exact typefaces powering this portfolio, inspect open-source GitHub repositories, and grab direct Android APK builds — completely free.
          </p>

          <div className="lumina-hero-actions">
            <a href="#vault-grid" className="lumina-btn-primary">
              <span>Explore Vault</span>
              <ArrowUpRight size={15} strokeWidth={2.3} />
            </a>
            <a
              href="https://github.com/agnelfranciso"
              target="_blank"
              rel="noopener noreferrer"
              className="lumina-btn-secondary"
            >
              <GithubIcon size={15} />
              <span>GitHub Profile</span>
            </a>
          </div>
        </section>

        {/* Catalog Grid Section */}
        <section className="lumina-catalog" id="vault-grid">
          {/* Mobile Search Bar */}
          <div className="lumina-mobile-search-wrap">
            <span className="lumina-mobile-search-icon">
              <Search size={16} strokeWidth={2} />
            </span>
            <input
              type="text"
              placeholder="Search fonts, GitHub repos, APKs..."
              className="lumina-mobile-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Bar Header */}
          <div className="lumina-filter-header">
            <div>
              <span className="lumina-filter-kicker">Index / Public Archive</span>
              <h2 className="lumina-filter-title">Resources &amp; Repositories</h2>
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

          {/* Search Result Feedback */}
          {searchQuery && (
            <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--res-on-surface-variant)" }}>
              Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo; ({filteredResources.length} items found) &bull;{" "}
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{ background: "none", border: "none", color: "#ffffff", textDecoration: "underline", cursor: "pointer" }}
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
                          FREE
                        </span>
                      </div>
                      <div style={{ margin: "auto 0" }}>
                        <span
                          className={`lumina-font-specimen-text ${item.fontPreviewFamily || ""}`}
                          style={{ fontSize: item.fontPreviewFamily === "VaultPreviewIntraNet" ? "1.85rem" : "2.1rem" }}
                        >
                          {item.fontSampleText || item.title}
                        </span>
                        <div className="lumina-type-subtext">
                          {item.title} &bull; Real OTF Archive
                        </div>
                      </div>
                      <div className="lumina-type-styles-strip">
                        {(item.fontStylesList || ["Regular", "Bold"]).slice(0, 3).map((st, idx) => (
                          <React.Fragment key={st}>
                            {idx > 0 && <span>&bull;</span>}
                            <span>{st}</span>
                          </React.Fragment>
                        ))}
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
                      <span className="lumina-card-badge-right">
                        {item.githubUrl ? "OPEN SOURCE" : "FREE"}
                      </span>
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
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lumina-btn-ghost-pill"
                          style={{ padding: "5px 9px", display: "inline-flex", alignItems: "center" }}
                          title="View on GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GithubIcon size={14} />
                        </a>
                      )}
                      <button
                        type="button"
                        className="lumina-btn-download-pill"
                        onClick={(e) => handleDownload(e, item)}
                        disabled={downloadingId === item.id}
                      >
                        {downloadingId === item.id ? (
                          <>
                            <Loader2 size={13} className="lumina-spin" />
                            <span>Preparing...</span>
                          </>
                        ) : (
                          <>
                            <span>Download</span>
                            <Download size={13} strokeWidth={2.2} />
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
              <p style={{ fontSize: "1.1rem", marginBottom: "0.85rem" }}>No matching assets found in the vault.</p>
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
      </main>

      {/* Quick Inspection Modal (kept for keyboard/direct triggers) */}
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
              <X size={16} strokeWidth={2.2} />
            </button>

            <div className="lumina-modal-badge">
              <span className="lumina-badge-pulse" />
              <span>Ready to Download</span>
            </div>

            <h2 className="lumina-modal-title">
              {activeModalResource.title}
            </h2>

            <p className="lumina-modal-desc">
              {activeModalResource.longDescription || activeModalResource.description}
            </p>

            <div className="lumina-action-card-box">
              <button
                type="button"
                className="lumina-direct-download-btn"
                onClick={(e) => handleDownload(e, activeModalResource)}
              >
                <Download size={17} strokeWidth={2.2} />
                <span>Download {activeModalResource.title}</span>
                <span className="lumina-filesize-tag">{activeModalResource.fileSize}</span>
              </button>

              <div className="lumina-status-indicator">
                <ShieldCheck size={15} />
                <span>Free &amp; open access &bull; Direct transfer</span>
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
                      {copiedHash ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {activeModalResource.packageCommand && (
              <div className="lumina-code-box">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", overflow: "hidden" }}>
                  <Code2 size={15} style={{ flexShrink: 0 }} />
                  <code style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {activeModalResource.packageCommand}
                  </code>
                </div>
                <button
                  type="button"
                  className="lumina-copy-code-btn"
                  onClick={() => handleCopyCode(activeModalResource.packageCommand!)}
                >
                  {copiedCode ? "COPIED" : "Copy"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="lumina-footer">
        <div className="lumina-footer-inner">
          <div className="lumina-footer-grid">
            <div>
              <Link href="/resources" className="lumina-brand" style={{ marginBottom: "0.75rem" }}>
                <span>Agnel</span>
                <span className="lumina-brand-dot" />
                <span style={{ fontSize: "0.85rem", opacity: 0.6, fontWeight: 500, marginLeft: "0.25rem" }}>
                  Vault
                </span>
              </Link>
              <p style={{ fontSize: "0.825rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: 0 }}>
                Open-source repositories, Android builds, and the exact typography used across Agnel Francis&apos;s portfolio.
              </p>
            </div>

            <div>
              <h4 className="lumina-footer-col-title">Categories</h4>
              <ul className="lumina-footer-links">
                <li><button type="button" onClick={() => setActiveCategory("all")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>All Resources</button></li>
                <li><button type="button" onClick={() => setActiveCategory("fonts")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>Portfolio Fonts</button></li>
                <li><button type="button" onClick={() => setActiveCategory("open-source")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>Open Source Repos</button></li>
                <li><button type="button" onClick={() => setActiveCategory("apps")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>Android APKs</button></li>
              </ul>
            </div>

            <div>
              <h4 className="lumina-footer-col-title">Ecosystem</h4>
              <ul className="lumina-footer-links">
                <li><a href="https://github.com/agnelfranciso" target="_blank" rel="noopener noreferrer">GitHub (@agnelfranciso)</a></li>
                <li><Link href="/">Main Portfolio</Link></li>
                <li><Link href="/framepixel">FramePixel Collective</Link></li>
                <li><Link href="/contact">Contact Agnel</Link></li>
              </ul>
            </div>
          </div>

          <div className="lumina-footer-bottom">
            <span>&copy; 2026 Agnel Francis &bull; Open Source &amp; Free Resources</span>
            <div style={{ display: "flex", gap: "1.25rem" }}>
              <Link href="/legal" style={{ color: "inherit", textDecoration: "none" }}>Licensing</Link>
              <Link href="/work" style={{ color: "inherit", textDecoration: "none" }}>Case Studies</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`lumina-toast ${showToast ? "show" : ""}`}>
        <Info size={16} />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
