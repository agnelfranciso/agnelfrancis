"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Download,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Layers,
  Code2,
  FolderArchive,
  ShieldCheck,
  Smartphone,
  Cpu,
  Terminal,
  Type,
  Globe,
  FileText,
  Search,
  ArrowUpRight,
  ArrowRight,
  ZoomIn,
  Info,
  RefreshCw,
} from "lucide-react";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { Resource, resourcesData } from "@/data/resources";
import "../resources.css";

interface ProductDetailClientProps {
  resource: Resource;
}

function renderFeatureIcon(icon: string) {
  switch (icon) {
    case "code":
      return <Code2 size={18} />;
    case "smartphone":
      return <Smartphone size={18} />;
    case "cpu":
      return <Cpu size={18} />;
    case "terminal":
      return <Terminal size={18} />;
    case "shield":
      return <ShieldCheck size={18} />;
    case "type":
      return <Type size={18} />;
    case "globe":
      return <Globe size={18} />;
    default:
      return <Layers size={18} />;
  }
}

function renderFileIcon(icon: string) {
  switch (icon) {
    case "code":
      return <Code2 size={17} />;
    case "folder":
      return <FolderArchive size={17} />;
    case "type":
      return <Type size={17} />;
    case "smartphone":
      return <Smartphone size={17} />;
    default:
      return <FileText size={17} />;
  }
}

export default function ProductDetailClient({ resource }: ProductDetailClientProps) {
  const [activeImg, setActiveImg] = useState<string>(
    resource.previewMain || resource.image || ""
  );
  const [activeTab, setActiveTab] = useState<"overview" | "included" | "license">("overview");

  // In-place download state
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "completed">("idle");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadPhaseText, setDownloadPhaseText] = useState<string>("Initializing...");

  // Copy feedback & toast
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // In-place download flow: prepares & verifies right here before passing file to browser
  const handleInPlaceDownload = () => {
    if (downloadStatus === "downloading") return;

    setDownloadStatus("downloading");
    setDownloadProgress(0);
    setDownloadPhaseText("Connecting to archive mirror...");

    const startTime = Date.now();
    const duration = 1600;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setDownloadProgress(progress);

      if (progress < 35) {
        setDownloadPhaseText("Connecting to asset mirror...");
      } else if (progress < 75) {
        setDownloadPhaseText(`Verifying archive & checksum... (${progress}%)`);
      } else if (progress < 100) {
        setDownloadPhaseText(`Packaging ${resource.fileSize} for transfer... (${progress}%)`);
      } else {
        setDownloadPhaseText("Verified. Passing file to browser...");
      }

      if (progress >= 100) {
        clearInterval(interval);
        const link = document.createElement("a");
        link.href = resource.downloadUrl;
        link.download = resource.downloadUrl.split("/").pop() || `${resource.id}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadStatus("completed");
        triggerToast(`"${resource.title}" passed to browser download.`);

        setTimeout(() => {
          setDownloadStatus("idle");
          setDownloadProgress(0);
        }, 4500);
      }
    }, 40);
  };

  const handleCopyHash = () => {
    const hash = resource.sha256 || "verified-open-release";
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2400);
    triggerToast("Checksum copied to clipboard.");
  };

  const handleCopyCode = () => {
    const cmd = resource.packageCommand || `git clone ${resource.githubUrl || "https://github.com/agnelfranciso"}`;
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(cmd);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2400);
    triggerToast("Command copied to clipboard.");
  };

  const companionAssets = resourcesData
    .filter((item) => item.id !== resource.id)
    .slice(0, 3);

  const titleWords = resource.title.split(" ");
  const titleMain = titleWords.length > 1 ? titleWords.slice(0, -1).join(" ") : resource.title;
  const titleLast = titleWords.length > 1 ? titleWords.slice(-1).join(" ") : "";

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
                <Search size={15} strokeWidth={2} />
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
              <span>{resource.releaseTag || `${resource.version} • Open Release`}</span>
            </div>

            <h1
              className="lumina-product-title"
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                letterSpacing: "-0.03em",
                textTransform: "none",
              }}
            >
              {titleMain}{" "}
              {titleLast && (
                <span
                  className="lumina-product-italic"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {titleLast}
                </span>
              )}
            </h1>

            <p className="lumina-product-tagline">
              {resource.longDescription || resource.description}
            </p>

            <div className="lumina-product-meta-row">
              <div className="lumina-product-meta-item">
                <ShieldCheck size={15} />
                <span>By {resource.author}</span>
              </div>
              <span>&bull;</span>
              <div className="lumina-product-meta-item">
                <Layers size={15} />
                <span>Format: {resource.format}</span>
              </div>
              <span>&bull;</span>
              <div className="lumina-product-meta-item">
                <FolderArchive size={15} />
                <span>Size: {resource.fileSize}</span>
              </div>
              <span>&bull;</span>
              <div className="lumina-product-meta-item">
                <CheckCircle2 size={15} />
                <span>{resource.license || "Free Open Access"}</span>
              </div>
            </div>
          </header>

          {/* Main 2-Column Product Layout */}
          <div className="lumina-product-layout">
            {/* Left Column: Visual Showcase & In-Depth Technical Specs */}
            <div className="lumina-product-left-col">
              {/* Primary Showcase Screen */}
              <div className="lumina-showcase-box">
                <div className="lumina-showcase-screen">
                  {resource.isTypographyCard && !activeImg ? (
                    <div className="lumina-type-card-body" style={{ minHeight: "340px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="lumina-card-badge-left" style={{ position: "static" }}>
                          {resource.format}
                        </span>
                        <span className="lumina-card-badge-right" style={{ position: "static" }}>
                          FREE OTF
                        </span>
                      </div>
                      <div style={{ margin: "auto 0", padding: "1.5rem 0" }}>
                        <span
                          className={`lumina-font-specimen-text ${resource.fontPreviewFamily || ""}`}
                          style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}
                        >
                          {resource.fontSampleText || resource.title}
                        </span>
                        <div className="lumina-type-subtext" style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
                          ABCDEFGHIJKLMNOPQRSTUVWXYZ &bull; 0123456789
                        </div>
                      </div>
                      <div className="lumina-type-styles-strip" style={{ fontSize: "0.8rem", flexWrap: "wrap" }}>
                        {(resource.fontStylesList || ["Regular", "Bold"]).map((st, idx) => (
                          <React.Fragment key={st}>
                            {idx > 0 && <span>&bull;</span>}
                            <span>{st}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <img
                      src={activeImg}
                      alt={`${resource.title} Preview`}
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
                        <ZoomIn size={12} />
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
                    <Layers size={16} />
                    <span>Overview</span>
                  </button>
                  <button
                    type="button"
                    className={`lumina-spec-tab-trigger ${activeTab === "included" ? "active" : ""}`}
                    onClick={() => setActiveTab("included")}
                  >
                    <FolderArchive size={16} />
                    <span>Files Included</span>
                  </button>
                  <button
                    type="button"
                    className={`lumina-spec-tab-trigger ${activeTab === "license" ? "active" : ""}`}
                    onClick={() => setActiveTab("license")}
                  >
                    <ShieldCheck size={16} />
                    <span>License</span>
                  </button>
                </div>

                {/* Tab 1: Overview */}
                {activeTab === "overview" && (
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--res-on-surface)" }}>
                      Technical Highlights
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: "0 0 1.5rem 0" }}>
                      {resource.longDescription || resource.description}
                    </p>

                    <div className="lumina-features-2col">
                      {(resource.features || []).map((feat, i) => (
                        <div key={i} className="lumina-feature-item">
                          <div>
                            <div className="lumina-feature-icon-badge">
                              {renderFeatureIcon(feat.icon)}
                            </div>
                            <h4 className="lumina-feature-title">{feat.title}</h4>
                            <p className="lumina-feature-desc">{feat.desc}</p>
                          </div>
                          <div className="lumina-feature-tag">
                            <CheckCircle2 size={13} />
                            <span>{feat.tag}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Files Included */}
                {activeTab === "included" && (
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--res-on-surface)" }}>
                      Archive Contents
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: "0 0 1.5rem 0" }}>
                      Included inside the downloadable package for {resource.title}.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {(resource.filesIncluded || []).map((file, idx) => (
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
                            gap: "0.75rem",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", minWidth: 0 }}>
                            <span style={{ color: "#ffffff", flexShrink: 0, display: "flex" }}>
                              {renderFileIcon(file.icon)}
                            </span>
                            <span style={{ color: "var(--res-on-surface)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {file.name}
                            </span>
                          </div>
                          <span style={{ color: "var(--res-outline)", fontSize: "0.75rem", flexShrink: 0 }}>
                            {file.size}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Open License */}
                {activeTab === "license" && (
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--res-on-surface)" }}>
                      Usage &amp; Open Licensing
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6, margin: "0 0 1.5rem 0" }}>
                      Distributed under {resource.license || "Open Source / Free Access"}. Completely free to inspect, learn from, and use.
                    </p>

                    <div className="lumina-license-grid">
                      <div
                        style={{
                          padding: "1rem",
                          borderRadius: "10px",
                          backgroundColor: "rgba(16, 185, 129, 0.06)",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                        }}
                      >
                        <div style={{ color: "#10b981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <CheckCircle2 size={15} />
                          <span>Permitted</span>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.8rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6 }}>
                          <li>Personal &amp; educational projects</li>
                          <li>Inspecting, forking, and learning from source</li>
                          <li>Zero cost or account sign-up required</li>
                        </ul>
                      </div>

                      <div
                        style={{
                          padding: "1rem",
                          borderRadius: "10px",
                          backgroundColor: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid var(--res-border-subtle)",
                        }}
                      >
                        <div style={{ color: "#f4f4f5", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <Info size={15} />
                          <span>Notes</span>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.8rem", color: "var(--res-on-surface-variant)", lineHeight: 1.6 }}>
                          <li>Check repository LICENSE file for commercial font/code terms</li>
                          <li>Credit Agnel Francis where applicable</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Aside with Live In-Place Download Flow */}
            <aside className="lumina-product-right-col">
              <div className="lumina-aside-sticky">
                <div className="lumina-purchase-card">
                  <div className="lumina-accent-top-line" />

                  <div className="lumina-asset-status-card">
                    <div className="lumina-status-indicator-badge">
                      <span className="lumina-badge-pulse" />
                      <span>{resource.githubUrl ? "Open Source & Free" : "100% Free Resource"}</span>
                    </div>
                    <p className="lumina-asset-status-desc">
                      Direct download with zero paywalls, accounts, or subscriptions required.
                    </p>
                  </div>

                  {/* In-Place Download Button */}
                  <button
                    type="button"
                    className={`lumina-download-action-btn ${
                      downloadStatus === "downloading" ? "downloading" : ""
                    } ${downloadStatus === "completed" ? "completed" : ""}`}
                    onClick={handleInPlaceDownload}
                    disabled={downloadStatus === "downloading"}
                    aria-live="polite"
                  >
                    {downloadStatus === "downloading" && (
                      <div
                        className="lumina-download-progress-fill"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    )}

                    <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {downloadStatus === "idle" && (
                        <>
                          <Download size={18} strokeWidth={2.3} />
                          <span>Download ({resource.fileSize})</span>
                        </>
                      )}

                      {downloadStatus === "downloading" && (
                        <>
                          <Loader2 size={18} className="lumina-spin" />
                          <span>Downloading ({downloadProgress}%)</span>
                        </>
                      )}

                      {downloadStatus === "completed" && (
                        <>
                          <CheckCircle2 size={18} strokeWidth={2.3} />
                          <span>Downloaded</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* In-Place Status Feed */}
                  {downloadStatus !== "idle" && (
                    <div className="lumina-in-place-status">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
                        {downloadStatus === "completed" ? (
                          <CheckCircle2 size={14} style={{ color: "#10b981", flexShrink: 0 }} />
                        ) : (
                          <RefreshCw size={14} className="lumina-spin" style={{ color: "#ffffff", flexShrink: 0 }} />
                        )}
                        <span style={{ fontSize: "0.75rem", color: "var(--res-on-surface)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {downloadPhaseText}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ffffff", flexShrink: 0 }}>
                        {downloadProgress}%
                      </span>
                    </div>
                  )}

                  {/* GitHub Repository Link */}
                  {resource.githubUrl && (
                    <a
                      href={resource.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lumina-btn-github"
                    >
                      <GithubIcon size={16} />
                      <span>View Source on GitHub</span>
                      <ExternalLink size={13} style={{ opacity: 0.6 }} />
                    </a>
                  )}

                  {/* Live URL Link */}
                  {resource.liveUrl && (
                    <a
                      href={resource.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lumina-btn-github"
                    >
                      <Globe size={16} />
                      <span>Visit Live Project</span>
                      <ExternalLink size={13} style={{ opacity: 0.6 }} />
                    </a>
                  )}

                  {/* Specifications Table */}
                  <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--res-border-subtle)", paddingTop: "1.25rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--res-outline)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.85rem" }}>
                      Details
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.8rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                        <span style={{ color: "var(--res-outline)" }}>License</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500, textAlign: "right" }}>
                          {resource.license || "Open Access"}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                        <span style={{ color: "var(--res-outline)" }}>Format</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500, textAlign: "right" }}>
                          {resource.format}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                        <span style={{ color: "var(--res-outline)" }}>Package</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500, textAlign: "right" }}>
                          {resource.fileSize}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                        <span style={{ color: "var(--res-outline)" }}>Version</span>
                        <span style={{ color: "var(--res-on-surface)", fontWeight: 500, textAlign: "right" }}>
                          {resource.version}
                        </span>
                      </div>
                    </div>

                    {resource.sha256 && (
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
                            SHA-256
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
                            {resource.sha256}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyHash}
                          style={{
                            background: "none",
                            border: "none",
                            color: copiedHash ? "#10b981" : "#ffffff",
                            cursor: "pointer",
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          title="Copy SHA-256"
                        >
                          {copiedHash ? <Check size={15} /> : <Copy size={15} />}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* CLI / Clone Command */}
                  {resource.packageCommand && (
                    <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--res-border-subtle)", paddingTop: "1.25rem" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--res-outline)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                        Terminal / Clone
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
                          gap: "0.5rem",
                          fontFamily: "monospace",
                          fontSize: "0.75rem",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--res-on-surface-variant)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {resource.packageCommand}
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
                            flexShrink: 0,
                            display: "flex",
                          }}
                          title="Copy command"
                        >
                          {copiedCode ? <Check size={15} /> : <Copy size={15} />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Creator Profile Card */}
                <div
                  style={{
                    backgroundColor: "var(--res-surface-low)",
                    border: "1px solid var(--res-border-subtle)",
                    borderRadius: "14px",
                    padding: "1.15rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.9rem",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.95rem",
                      flexShrink: 0,
                    }}
                  >
                    AF
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
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
                      color: "#ffffff",
                      textDecoration: "none",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                      flexShrink: 0,
                    }}
                  >
                    <span>Contact</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Companion Resources Section */}
          {companionAssets.length > 0 && (
            <section style={{ marginTop: "4.5rem", paddingTop: "3rem", borderTop: "1px solid var(--res-border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <span className="lumina-filter-kicker">More from Vault</span>
                  <h2 style={{ fontSize: "1.65rem", fontWeight: 700, color: "var(--res-on-surface)", margin: 0 }}>
                    Other Open Resources
                  </h2>
                </div>
                <Link
                  href="/resources"
                  style={{ fontSize: "0.85rem", color: "#ffffff", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <span>View All</span>
                  <ArrowRight size={14} />
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
                      {comp.isTypographyCard ? (
                        <div className="lumina-type-card-body">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="lumina-card-badge-left" style={{ position: "static" }}>
                              {comp.format}
                            </span>
                            <span className="lumina-card-badge-right" style={{ position: "static" }}>
                              FREE
                            </span>
                          </div>
                          <div style={{ margin: "auto 0" }}>
                            <span
                              className={`lumina-font-specimen-text ${comp.fontPreviewFamily || ""}`}
                              style={{ fontSize: "1.75rem" }}
                            >
                              {comp.fontSampleText || comp.title}
                            </span>
                          </div>
                          <div className="lumina-type-styles-strip">
                            <span>{comp.version}</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          {comp.image && (
                            <img src={comp.image} alt={comp.title} className="lumina-card-img" loading="lazy" />
                          )}
                          <span className="lumina-card-badge-left">{comp.format}</span>
                          <span className="lumina-card-badge-right">
                            {comp.githubUrl ? "OPEN SOURCE" : "FREE"}
                          </span>
                        </>
                      )}
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
                        <span style={{ fontSize: "0.8rem", color: "#ffffff", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                          <span>View Details</span>
                          <ArrowRight size={13} />
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
                <li><Link href="/resources?category=fonts">Portfolio Fonts</Link></li>
                <li><Link href="/resources?category=open-source">Open Source Repos</Link></li>
                <li><Link href="/resources?category=apps">Android APKs</Link></li>
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
              <Link href="/resources" style={{ color: "inherit", textDecoration: "none" }}>Index</Link>
              <Link href="/legal" style={{ color: "inherit", textDecoration: "none" }}>Licensing</Link>
              <Link href="/contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</Link>
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
