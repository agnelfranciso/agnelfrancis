import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  FolderGit2,
  MapPin,
} from "lucide-react";
import { educationData } from "@/data/education";
import { projectsData } from "@/data/projects";
import { getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return educationData.map((inst) => ({
    id: inst.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const inst = educationData.find((e) => e.id === id);
  if (!inst) {
    return { title: "Institution Not Found | Agnel Francis" };
  }

  return {
    title: `${inst.shortName} | Education — Agnel Francis`,
    description: `${inst.degree} at ${inst.name} (${inst.period}). ${inst.overview}`,
  };
}

export default async function EducationDetailPage({ params }: Props) {
  const { id } = await params;
  const inst = educationData.find((e) => e.id === id);

  if (!inst) {
    notFound();
  }

  const connectedProjects = projectsData.filter((p) =>
    inst.projectIds.includes(p.id)
  );
  const connectedBlogs = inst.blogSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post !== null);

  const otherInstitutions = educationData.filter((e) => e.id !== inst.id);

  return (
    <main className="page-container education-page-container">
      {/* Back navigation */}
      <div className="education-top-nav">
        <Link href="/about?tab=experience" className="education-back-link">
          <ArrowLeft size={16} />
          <span>Back to Experience</span>
        </Link>
        <Link href="/education" className="education-back-link">
          <span>All Institutions</span>
        </Link>
      </div>

      {/* Hero Card */}
      <section className="education-hero-card">
        <div className="education-hero-main">
          <div className="education-hero-logo">
            <img src={inst.logo} alt={`${inst.name} Logo`} />
          </div>

          <div className="education-hero-info">
            <div className="timeline-badge-row">
              <span
                className={
                  inst.status === "current" ? "current-badge" : "year-badge"
                }
              >
                {inst.status === "current" && (
                  <span className="badge-pulse-dot" />
                )}
                {inst.statusLabel}
              </span>
            </div>

            <h1 className="education-hero-title">{inst.name}</h1>
            <p className="education-hero-degree">{inst.degree}</p>

            <div className="education-hero-meta">
              <span>
                <MapPin size={15} />
                {inst.location}
              </span>
              <span>
                <Calendar size={15} />
                {inst.period}
              </span>
              {inst.website && (
                <a
                  href={inst.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="education-ext-link"
                >
                  <span>Official Site</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="education-hero-overview">{inst.overview}</p>

        <div className="education-highlights-strip">
          {inst.highlights.map((item) => (
            <span key={item} className="education-highlight-pill">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Achievements & Milestones */}
      <section className="education-section">
        <div className="education-section-head">
          <Award size={18} />
          <h2>Achievements &amp; Milestones</h2>
        </div>

        <div className="education-achievements-grid">
          {inst.achievements.map((ach, idx) => (
            <article key={idx} className="education-achievement-card">
              <div className="education-ach-top">
                <span className="education-ach-index">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="year-badge">{ach.tag}</span>
              </div>
              <h3>{ach.title}</h3>
              <p>{ach.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Connected Projects */}
      {connectedProjects.length > 0 && (
        <section className="education-section">
          <div className="education-section-head-row">
            <div className="education-section-head">
              <FolderGit2 size={18} />
              <h2>
                {connectedProjects.length === 1
                  ? "Project Built Here"
                  : `Projects Built Here (${connectedProjects.length})`}
              </h2>
            </div>
            <Link href="/work" className="education-section-all">
              <span>All Projects</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className={
              connectedProjects.length === 1
                ? "education-connected-single"
                : "education-connected-grid"
            }
          >
            {connectedProjects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.id}`}
                className={`education-project-card ${
                  connectedProjects.length === 1 ? "is-featured" : ""
                }`}
              >
                {project.image && (
                  <div className="education-project-thumb">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </div>
                )}
                <div className="education-project-body">
                  <span className="education-project-cat">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.tags?.length > 0 && (
                    <div className="education-project-tags">
                      {project.tags.slice(0, 4).map((t) => (
                        <span key={t} className="education-tag-chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="education-card-cta">
                    <span>View Case Study</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Connected Blog Posts */}
      {connectedBlogs.length > 0 && (
        <section className="education-section">
          <div className="education-section-head-row">
            <div className="education-section-head">
              <BookOpen size={18} />
              <h2>Related Blog Posts ({connectedBlogs.length})</h2>
            </div>
            <Link href="/blog" className="education-section-all">
              <span>All Posts</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="education-blogs-grid">
            {connectedBlogs.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="education-blog-card"
              >
                <div className="education-blog-meta">
                  <span>{post.date}</span>
                  {post.tags?.[0] && (
                    <>
                      <span>&bull;</span>
                      <span>{post.tags[0]}</span>
                    </>
                  )}
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="education-card-cta">
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other Institutions */}
      <section className="education-section">
        <div className="education-section-head">
          <h2>Other Institutions</h2>
        </div>

        <div className="education-others-grid">
          {otherInstitutions.map((other) => (
            <Link
              key={other.id}
              href={`/education/${other.id}`}
              className="education-other-card"
            >
              <div className="education-other-logo">
                <img src={other.logo} alt={`${other.name} Logo`} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="education-other-period">{other.period}</div>
                <div className="education-other-name">{other.name}</div>
                <div className="education-other-deg">{other.degree}</div>
              </div>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
