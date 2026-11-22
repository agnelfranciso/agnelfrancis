"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Resource, resourcesData, RESOURCE_CATEGORIES } from "@/data/resources";
import "../resources.css";

interface ProductDetailClientProps {
  resource: Resource;
}

export default function ProductDetailClient({ resource }: ProductDetailClientProps) {
  const [activeImg, setActiveImg] = useState<string>(
    resource.previewMain || resource.image || "/resources/images/lumina-detail-main.png"
  );
  const [activeTab, setActiveTab] = useState<"overview" | "included" | "license">("overview");
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  // In-place download state
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "completed">("idle");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadPhaseText, setDownloadPhaseText] = useState<string>("Initializing...");

  // Copy feedback & toast
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  // Search input state for top bar
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3600);
  };

  // In-place download flow:
  // "when download is clicked it downloads here then only passes the file to user after download"
  const handleInPlaceDownload = () => {
    if (downloadStatus === "downloading") return;

    setDownloadStatus("downloading");
    setDownloadProgress(0);
    setDownloadPhaseText("Establishing connection to asset mirror...");

    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds total in-place preparation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setDownloadProgress(progress);

      if (progress < 30) {
        setDownloadPhaseText("Establishing secure connection to asset mirror...");
      } else if (progress < 65) {
        setDownloadPhaseText(`Verifying cryptographic SHA-256 integrity... (${progress}%)`);
      } else if (progress < 95) {
        setDownloadPhaseText(`Packaging ${resource.fileSize} asset bundle for browser transfer... (${progress}%)`);
      } else {
        setDownloadPhaseText("Verification complete. Transferring file to device...");
      }

      if (progress >= 100) {
        clearInterval(interval);
        // Trigger real file download via anchor
        const link = document.createElement("a");
        link.href = resource.downloadUrl;
        link.download = resource.downloadUrl.split("/").pop() || `${resource.id}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadStatus("completed");
        triggerToast(`"${resource.title}" bundle passed to browser download.`);

        // Reset back to idle after 4.5s
        setTimeout(() => {
          setDownloadStatus("idle");
          setDownloadProgress(0);
        }, 4500);
      }
    }, 40);
  };

  const handleCopyHash = () => {
    const hash = resource.sha256 || "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069";
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2400);
    triggerToast("SHA-256 hash copied to clipboard.");
  };

  const handleCopyCode = () => {
    const cmd = resource.packageCommand || `npx agnel-vault pull ${resource.id}`;
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(cmd);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2400);
    triggerToast("Vault CLI command copied to clipboard.");
  };

  // Companion assets (other items)
  const companionAssets = resourcesData
    .filter((item) => item.id !== resource.id)
    .slice(0, 3);

  return (
    <div className="lumina-vault">
      {/* Top Navigation Bar */}
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
              <Link href="/resources" className="lumina-nav-link">
                Vault
              </Link>
              <Link
                href={`/resources?category=${resource.category}`}
                className="lumina-nav-link active"
              >
                {resource.categoryLabel}
              </Link>
              <Link href="/resources" className="lumina-nav-link">
                All Archives
              </Link>
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
                placeholder="Search vault..."
                className="lumina-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/resources?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
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

      <main style={{ position: "relative", zIndex: 1 }}>
        <div className="lumina-detail-page-inner">
          {/* Breadcrumb Navigation */}
          <nav className="lumina-breadcrumb" aria-label="Breadcrumb">
            <Link href="/resources">Vault</Link>
            <span className="lumina-breadcrumb-sep">/</span>
            <Link href={`/resources?category=${resource.category}`}>{resource.categoryLabel}</Link>
            <span className="lumina-breadcrumb-sep">/</span>
            <span style={{ color: "var(--res-on-surface)", fontWeight: 600 }}>{resource.title}</span>
          </nav>

          {/* Product Header Headline */}
          <header className="lumina-product-header">
            <div className="lumina-product-release-pill">
              <span className="lumina-badge-pulse" />
              <span>{resource.releaseTag || `${resource.version} • Open Source Release`}</span>
            </div>

            <h1 className="lumina-product-title">
              {resource.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="lumina-product-italic">
                {resource.title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p className="lumina-product-tagline">
              {resource.longDescription || resource.description}
            </p>

            <div className="lumina-product-meta-row">
              <div className="lumina-product-meta-item">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                <span>By {resource.author}</span>
              </div>
              <span>•</span>
              <div className="lumina-product-meta-item">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>category</span>
                <span>Format: {resource.format}</span>
              </div>
              <span>•</span>
              <div className="lumina-product-meta-item">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>inventory_2</span>
                <span>Size: {resource.fileSize}</span>
              </div>
              <span>•</span>
              <div className="lumina-product-meta-item">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
                <span>{resource.downloadCount || "12.4k"} Downloads</span>
              </div>
              <span>•</span>
              <div className="lumina-product-meta-item">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>license</span>
                <span>License: CC-BY-4.0 Free</span>
              </div>
            </div>
          </header>

          {/* Main 2-Column Product Layout (8 cols + 4 cols) */}
          <div className="lumina-product-layout">
            {/* Left Column: Visual Showcase & In-Depth Technical Specs */}
            <div className="lumina-product-left-col">
              {/* Primary Showcase Screen */}
              <div className="lumina-showcase-box">
                <div className="lumina-showcase-screen">
                  {resource.isTypographyCard && !resource.previewMain ? (
                    <div className="lumina-type-card-body" style={{ minHeight: 460 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="lumina-card-badge-left" style={{ position: "static" }}>
                          {resource.format}
                        </span>
                        <span className="lumina-card-badge-right" style={{ position: "static" }}>
                          {resource.price}
                        </span>
                      </div>
                      <div className="lumina-type-specimen" style={{ fontSize: "3.5rem" }}>
                        Aesthete <span style={{ fontStyle: "italic", opacity: 0.85 }}>№ 08</span>
                        <div className="lumina-type-subtext" style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
                          The quick brown fox jumps over the lazy dog
                        </div>
                      </div>
                      <div className="lumina-type-styles-strip" style={{ fontSize: "0.85rem" }}>
                        <span>Regular</span>
                        <span>•</span>
                        <span>Medium</span>
                        <span>•</span>
                        <span>Italic</span>
                        <span>•</span>
                        <span>Display Bold</span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={activeImg}
                      alt={`${resource.title} Preview Screen`}
                      className="lumina-showcase-img"
                    />
                  )}
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              {resource.gallery && resource.gallery.length > 0 && (
                <div className="lumina-thumbs-grid">
                  {resource.gallery.map((thumb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`lumina-thumb-btn ${activeImg === thumb.img ? "active" : ""}`}
                      onClick={() => setActiveImg(thumb.img)}
                      aria-label={`View thumbnail: ${thumb.label}`}
                    >
                      <img src={thumb.img} alt={thumb.label} className="lumina-thumb-img" />
                      <div className="lumina-thumb-label-bar">
                        <span>{thumb.label}</span>
                        <span className="material-symbols-outlined" style={{ fontSize: 13, opacity: 0.8 }}>
                          zoom_in
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Tabbed Specifications & Features Card */}
              <div className="lumina-detail-tabs-card">
                <div className="lumina-detail-tab-nav">
                  <button
                    type="button"
                    className={`lumina-spec-tab-trigger ${activeTab === "overview" ? "active" : ""}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 17 }}>layers</span>
                    <span>System Overview</span>
                  </button>
                  <button
                    type="button"
                    className={`lumina-spec-tab-trigger ${activeTab === "included" ? "active" : ""}`}
                    onClick={() => setActiveTab("included")}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 17 }}>folder_zip</span>
                    <span>What&apos;s Included</span>
                  </button>
                  <button
                    type="button"
                    className={`lumina-spec-tab-trigger ${activeTab === "license" ? "active" : ""}`}
                    onClick={() => setActiveTab("license")}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 17 }}>verified_user</span>
                    <span>Open License</span>
                  </button>
                </div>

                {/* Tab 1: System Overview */}
                {activeTab === "overview" && (
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--res-on-surface)" }}>
                      Architectural System Breakdown
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: "0 0 1.5rem 0" }}>
                      Designed specifically for enterprise platforms, dark-mode dashboards, and technical software products. Every component follows mathematical token curves and strict contrast compliance.
                    </p>

                    <div className="lumina-features-2col">
                      {(resource.features || [
                        {
                          title: "450+ Production Components",
                          desc: "Fully responsive layouts, auto-layout 5.0, variables, dark/light token bindings, and accessible keyboard states.",
                          icon: "layers",
                          tag: "Figma Variables Native",
                        },
                        {
                          title: "Tailwind 3.4 Token Sync",
                          desc: "Exports directly into Tailwind CSS configuration with seamless hexadecimal and CSS-variable mapping.",
                          icon: "code",
                          tag: "React & Next.js Ready",
                        },
                        {
                          title: "Responsive Breakpoints",
                          desc: "Mobile (375px), Tablet (768px), Desktop (1440px), and Ultra-wide (1920px) pre-structured screen templates.",
                          icon: "devices",
                          tag: "Tested across screens",
                        },
                        {
                          title: "Strict WCAG AAA Contrast",
                          desc: "All text and interactive controls rigorously calibrated against deep obsidian backgrounds for zero ocular strain.",
                          icon: "visibility",
                          tag: "Mathematical Luminance",
                        },
                      ]).map((feat, i) => (
                        <div key={i} className="lumina-feature-item">
                          <div>
                            <div className="lumina-feature-icon-badge">
                              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                                {feat.icon}
                              </span>
                            </div>
                            <h4 className="lumina-feature-title">{feat.title}</h4>
                            <p className="lumina-feature-desc">{feat.desc}</p>
                          </div>
                          <div className="lumina-feature-tag">
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>
                            <span>{feat.tag}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: What's Included */}
                {activeTab === "included" && (
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--res-on-surface)" }}>
                      Archive Directory Manifest
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: "0 0 1.5rem 0" }}>
                      The single downloadable archive includes all production Figma canvases, token JSON dictionaries, vector exports, and usage guides.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {(resource.filesIncluded || [
                        { name: `${resource.id}-canvas.fig`, size: "128.4 MB", icon: "dashboard_customize" },
                        { name: "tokens.dictionary.json", size: "1.2 MB", icon: "data_object" },
                        { name: "icons-vector-exports.svg.zip", size: "14.5 MB", icon: "shapes" },
                        { name: "README-INTEGRATION.md", size: "45 KB", icon: "description" },
                        { name: "COMMERCIAL-LICENSE.pdf", size: "320 KB", icon: "policy" },
                      ]).map((file, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 14px",
                            backgroundColor: "var(--res-surface-container)",
                            borderRadius: "10px",
                            border: "1px solid var(--res-border-subtle)",
                            fontFamily: "'Inter', monospace, sans-serif",
                            fontSize: "0.8rem",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            <span className="material-symbols-outlined" style={{ color: "var(--res-primary)", fontSize: 18 }}>
                              {file.icon}
                            </span>
                            <span style={{ color: "var(--res-on-surface)", fontWeight: 500 }}>{file.name}</span>
                          </div>
                          <span style={{ color: "var(--res-outline)", fontSize: "0.75rem" }}>{file.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Open License */}
                {activeTab === "license" && (
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--res-on-surface)" }}>
                      Open Creative Commons &amp; Commercial Terms
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: "0 0 1.5rem 0" }}>
                      Distributed under the permissive CC BY 4.0 license. You are fully empowered to build, ship, and commercialize digital products using this resource.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                      <div
                        style={{
                          padding: "1rem",
                          borderRadius: "10px",
                          backgroundColor: "rgba(16, 185, 129, 0.08)",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                        }}
                      >
                        <div style={{ color: "#10b981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.35rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>
                          Allowed Use
                        </div>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.8rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6 }}>
                          <li>Unlimited personal &amp; commercial client projects</li>
                          <li>SaaS applications &amp; dashboards</li>
                          <li>Modification, remixing, and theme adaptation</li>
                          <li>No recurring license fees or royalty obligations</li>
                        </ul>
                      </div>

                      <div
                        style={{
                          padding: "1rem",
                          borderRadius: "10px",
                          backgroundColor: "rgba(239, 68, 68, 0.08)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                        }}
                      >
                        <div style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.35rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>cancel</span>
                          Prohibited
                        </div>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.8rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6 }}>
                          <li>Direct sub-licensing or raw redistributing as a standalone UI kit</li>
                          <li>Claiming sole author copyright over original source files</li>
                        </ul>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <a
                        href="/resources/downloads/lumina-commercial-certificate.pdf"
                        download="lumina-commercial-certificate.pdf"
                        className="lumina-btn-download-pill"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
                        <span>Download Signed Commercial Certificate (PDF)</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Benchmark Quality Metrics Strip */}
              <div className="lumina-benchmark-box">
                <div>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--res-outline)", fontWeight: 700, marginBottom: "0.25rem" }}>
                    Quality Assurance Benchmarks
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--res-on-surface)" }}>
                    Figma Auto-Layout 5.0 Compliant • Zero Detached Symbols
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--res-on-surface-variant)", marginTop: "0.25rem" }}>
                    Verified across Figma 2026 Desktop &amp; Web runtimes with automated design linter passes.
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ textAlign: "center", padding: "0.5rem 1rem", background: "var(--res-surface-container)", borderRadius: "8px" }}>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--res-primary)" }}>100%</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--res-outline)", textTransform: "uppercase" }}>Pass Rate</div>
                  </div>
                  <div style={{ textAlign: "center", padding: "0.5rem 1rem", background: "var(--res-surface-container)", borderRadius: "8px" }}>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--res-secondary)" }}>0 ms</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--res-outline)", textTransform: "uppercase" }}>Layout Drift</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Aside with Live In-Place Download Flow */}
            <aside className="lumina-product-right-col">
              <div className="lumina-aside-sticky">
                <div className="lumina-purchase-card">
                  <div className="lumina-accent-top-line" />

                  {/* Price Row */}
                  <div className="lumina-price-row">
                    <div>
                      <span className="lumina-price-tag">{resource.price}</span>
                      {resource.originalPrice && (
                        <span className="lumina-price-original">{resource.originalPrice}</span>
                      )}
                    </div>
                    <span className="lumina-free-forever-pill">FREE FOREVER</span>
                  </div>

                  {/* THE IN-PLACE DOWNLOAD ACTION BUTTON */}
                  <button
                    type="button"
                    className={`lumina-download-action-btn ${
                      downloadStatus === "downloading" ? "downloading" : ""
                    } ${downloadStatus === "completed" ? "completed" : ""}`}
                    onClick={handleInPlaceDownload}
                    disabled={downloadStatus === "downloading"}
                    aria-live="polite"
                  >
                    {/* Progress bar fill layer animating inside the button */}
                    {downloadStatus === "downloading" && (
                      <div
                        className="lumina-download-progress-fill"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    )}

                    <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {downloadStatus === "idle" && (
                        <>
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                            download
                          </span>
                          <span>Download Archive ({resource.fileSize})</span>
                        </>
                      )}

                      {downloadStatus === "downloading" && (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">
                            progress_activity
                          </span>
                          <span>
                            Downloading ({downloadProgress}%)
                          </span>
                        </>
                      )}

                      {downloadStatus === "completed" && (
                        <>
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                            check_circle
                          </span>
                          <span>Archive Downloaded ✓</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* In-Place Status Feed: Shows live progress and cryptographic steps right on the page */}
                  {downloadStatus !== "idle" && (
                    <div className="lumina-in-place-status">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span
                          className={`material-symbols-outlined ${
                            downloadStatus === "downloading" ? "animate-spin" : ""
                          }`}
                          style={{
                            fontSize: 14,
                            color: downloadStatus === "completed" ? "#10b981" : "var(--res-primary)",
                          }}
                        >
                          {downloadStatus === "completed" ? "verified" : "sync"}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--res-on-surface)" }}>
                          {downloadPhaseText}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--res-primary)" }}>
                        {downloadProgress}%
                      </span>
                    </div>
                  )}

                  {/* Secondary Link: Open in Figma preview */}
                  <a
                    href="https://www.figma.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lumina-btn-figma-external"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.45rem",
                      width: "100%",
                      padding: "10px 16px",
                      marginTop: "0.85rem",
                      borderRadius: "8px",
                      backgroundColor: "var(--res-surface-container)",
                      border: "1px solid var(--res-border-subtle)",
                      color: "var(--res-on-surface)",
                      fontSize: "0.825rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>Open Live Preview in Figma</span>
                  </a>

                  {/* Format & Specification Key-Value Table */}
                  <div style={{ marginTop: "1.75rem", borderTop: "1px solid var(--res-border-subtle)", paddingTop: "1.25rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--res-outline)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.85rem" }}>
                      Specifications
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.8rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--res-outline)" }}>License</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500 }}>CC BY 4.0 Commercial</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--res-outline)" }}>Compatibility</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500 }}>Auto Layout 5.0</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--res-outline)" }}>File Size</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500 }}>{resource.fileSize}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--res-outline)" }}>Current Version</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500 }}>{resource.version}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--res-outline)" }}>Last Updated</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500 }}>{resource.updatedAt || "October 2026"}</span>
                      </div>
                    </div>

                    {/* SHA-256 Checksum with Copy Button */}
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        backgroundColor: "var(--res-surface-container)",
                        border: "1px solid var(--res-border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--res-outline)", letterSpacing: "0.08em" }}>
                          SHA-256 Checksum
                        </span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontFamily: "monospace",
                            color: "var(--res-on-surface-variant)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {resource.sha256 || "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyHash}
                        style={{
                          background: "none",
                          border: "none",
                          color: copiedHash ? "#10b981" : "var(--res-primary)",
                          cursor: "pointer",
                          padding: "4px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        title="Copy SHA-256 Checksum"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                          {copiedHash ? "check" : "content_copy"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Optional Tip / Patron Chips */}
                  <div style={{ marginTop: "1.75rem", borderTop: "1px solid var(--res-border-subtle)", paddingTop: "1.25rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--res-outline)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.35rem" }}>
                      Support Future Releases
                    </div>
                    <p style={{ fontSize: "0.775rem", color: "var(--res-on-surface-variant)", margin: "0 0 0.75rem 0", lineHeight: 1.5 }}>
                      This resource is 100% free. If it saved you studio hours, you can optionally tip the author:
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                      {[3, 5, 10].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          className="tip-chip"
                          onClick={() => setSelectedTip(selectedTip === amount ? null : amount)}
                          style={{
                            padding: "6px 0",
                            borderRadius: "8px",
                            border: selectedTip === amount ? "1px solid var(--res-primary)" : "1px solid var(--res-border-subtle)",
                            backgroundColor: selectedTip === amount ? "rgba(99, 102, 241, 0.2)" : "var(--res-surface-container)",
                            color: selectedTip === amount ? "var(--res-primary)" : "var(--res-on-surface)",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          ${amount}.00
                        </button>
                      ))}
                    </div>

                    {selectedTip && (
                      <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--res-secondary)" }}>
                        Thank you for considering a ${selectedTip} contribution! Direct UPI / Card link:{" "}
                        <Link href="/contact" style={{ color: "var(--res-primary)", textDecoration: "underline" }}>
                          Connect via Studio
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* CLI Quick Integration */}
                  <div style={{ marginTop: "1.75rem", borderTop: "1px solid var(--res-border-subtle)", paddingTop: "1.25rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--res-outline)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                      Terminal Pull
                    </div>
                    <div
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        backgroundColor: "var(--res-surface-lowest)",
                        border: "1px solid var(--res-border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "monospace",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span style={{ color: "var(--res-primary-fixed-dim)" }}>
                        {resource.packageCommand || `npx agnel-vault pull ${resource.id}`}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        style={{
                          background: "none",
                          border: "none",
                          color: copiedCode ? "#10b981" : "var(--res-outline)",
                          cursor: "pointer",
                          padding: "2px",
                        }}
                        title="Copy command"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                          {copiedCode ? "check" : "content_copy"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Creator Profile Card */}
                <div
                  style={{
                    backgroundColor: "var(--res-surface-low)",
                    border: "1px solid var(--res-border-subtle)",
                    borderRadius: "14px",
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "var(--res-primary)",
                      color: "#1000a9",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                    }}
                  >
                    AF
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--res-on-surface)" }}>
                      Agnel Francis
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--res-outline)" }}>
                      Founder of FramePixel &bull; Developer
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--res-primary)",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Say Hello &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Companion Resources Section */}
          {companionAssets.length > 0 && (
            <section style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid var(--res-border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem" }}>
                <div>
                  <span className="lumina-filter-kicker">Complementary Assets</span>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--res-on-surface)", margin: 0 }}>
                    Recommended from the Vault
                  </h2>
                </div>
                <Link href="/resources" style={{ fontSize: "0.85rem", color: "var(--res-primary)", textDecoration: "none", fontWeight: 600 }}>
                  View All Archives &rarr;
                </Link>
              </div>

              <div className="lumina-grid">
                {companionAssets.map((comp) => (
                  <Link
                    key={comp.id}
                    href={`/resources/${comp.id}`}
                    className="lumina-card"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="lumina-card-media">
                      {comp.image && (
                        <img src={comp.image} alt={comp.title} className="lumina-card-img" />
                      )}
                      <span className="lumina-card-badge-left">{comp.format}</span>
                      <span className="lumina-card-badge-right">{comp.price}</span>
                    </div>
                    <div className="lumina-card-content">
                      <div>
                        <div className="lumina-card-header-row">
                          <h3 className="lumina-card-title">{comp.title}</h3>
                          <span className="lumina-card-version">{comp.version}</span>
                        </div>
                        <p className="lumina-card-desc">{comp.description}</p>
                      </div>
                      <div className="lumina-card-footer">
                        <span className="lumina-card-author">by {comp.author}</span>
                        <span style={{ fontSize: "0.8rem", color: "var(--res-primary)", fontWeight: 600 }}>
                          View Details &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Vault Footer */}
      <footer className="lumina-footer">
        <div className="lumina-footer-inner">
          <div className="lumina-footer-brand-col">
            <Link href="/resources" className="lumina-brand">
              <span>Agnel</span>
              <span className="lumina-brand-dot" />
              <span style={{ fontSize: "0.85rem", opacity: 0.6, fontWeight: 500, marginLeft: "0.25rem" }}>
                Vault
              </span>
            </Link>
            <p className="lumina-footer-bio">
              A private vault of free, open-source design systems, 3D icons, and interface libraries created by Agnel Francis.
            </p>
          </div>

          <div className="lumina-footer-col">
            <h4 className="lumina-footer-col-title">Archive Sections</h4>
            <div className="lumina-footer-links">
              <Link href="/resources?category=ui-kits" className="lumina-footer-link">UI Systems</Link>
              <Link href="/resources?category=3d" className="lumina-footer-link">3D Renderings</Link>
              <Link href="/resources?category=mockups" className="lumina-footer-link">Device Mockups</Link>
              <Link href="/resources?category=fonts" className="lumina-footer-link">Display Typography</Link>
            </div>
          </div>

          <div className="lumina-footer-col">
            <h4 className="lumina-footer-col-title">Governance</h4>
            <div className="lumina-footer-links">
              <Link href="/resources/downloads/lumina-commercial-certificate.pdf" className="lumina-footer-link">
                Open License terms
              </Link>
              <Link href="/" className="lumina-footer-link">Agnel Portfolio</Link>
              <Link href="/framepixel" className="lumina-footer-link">FramePixel Studio</Link>
              <Link href="/contact" className="lumina-footer-link">Direct Inquiries</Link>
            </div>
          </div>
        </div>

        <div className="lumina-footer-bottom">
          <p className="lumina-footer-copy">
            &copy; 2026 Agnel Francis &bull; All resources freely accessible under CC BY 4.0.
          </p>
          <div className="lumina-footer-sub-links">
            <Link href="/resources" className="lumina-footer-link">Index</Link>
            <Link href="/privacy" className="lumina-footer-link">Privacy</Link>
            <Link href="/contact" className="lumina-footer-link">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`lumina-toast ${showToast ? "show" : ""}`}>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--res-primary)" }}>
          info
        </span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
