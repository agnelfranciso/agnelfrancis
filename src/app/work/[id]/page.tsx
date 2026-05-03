import type { Metadata } from "next";
import { projectsData } from "../../../data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find(p => p.id === id);
  
  if (!project) {
    return {
      title: "Project Not Found | Agnel Francis",
    };
  }

  return {
    title: `${project.title} | Agnel Francis`,
    description: project.description,
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="page-container" style={{ paddingBottom: "6rem" }}>
      <div className="project-detail-header" style={{marginBottom: "3rem"}}>
        <Link href="/#work" className="back-link">← Back to Projects</Link>
        <p className="subtitle" style={{marginTop: "1.5rem", marginBottom: "0"}}>{project.category}</p>
        <h1 className="page-title" style={{marginTop: "0.5rem", fontSize: "4.5vw", marginBottom: "1.5rem"}}>{project.title}</h1>
        <p style={{fontSize: "1.4rem", color: "var(--text-muted)", maxWidth: "800px", lineHeight: "1.6"}}>{project.description}</p>
        
        <div className="tags" style={{marginTop: "2.5rem"}}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      
      <div className={`project-hero-image ${project.bgClass}`} style={{
        width: "100%", 
        aspectRatio: "16 / 7", 
        borderRadius: "var(--border-radius-md)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        marginBottom: "4rem",
        boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.03)",
        position: "relative",
        overflow: "hidden"
      }}>
        {project.image ? (
            <img 
                src={project.image} 
                alt={project.title} 
                style={{ maxWidth: '90%', maxHeight: '85%', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', display: 'block' }} 
            />
        ) : (
            <div className="abstract-shape abstract-circle" style={{transform: "scale(1.5)"}}></div>
        )}
      </div>

      <div className="project-detail-content">
        
        {/* Meta Sidebar */}
        <div className="project-meta">
            {project.role && (
                <div>
                    <h4 style={{fontFamily: "PPSupplyMono, monospace", fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem"}}>Role</h4>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>{project.role}</p>
                </div>
            )}
            {project.timeline && (
                <div>
                    <h4 style={{fontFamily: "PPSupplyMono, monospace", fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem"}}>Timeline</h4>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>{project.timeline}</p>
                </div>
            )}
            {(project.focus || project.impact || project.status) && (
                <div>
                    <h4 style={{fontFamily: "PPSupplyMono, monospace", fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem"}}>{project.focus ? "Focus" : project.status ? "Status" : "Impact"}</h4>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>{project.focus || project.status || project.impact}</p>
                </div>
            )}
            {project.tech && (
                <div>
                    <h4 style={{fontFamily: "PPSupplyMono, monospace", fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem"}}>Tech</h4>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>{project.tech}</p>
                </div>
            )}
            {project.liveLink && (
                <div style={{marginTop: "1rem"}}>
                    <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-primary wave-btn"
                        style={{ width: "100%", padding: "0.8rem 1.5rem", fontSize: "1rem" }}
                    >
                        <span>Visit Live Site</span>
                        <span className="wave-emoji">↗</span>
                    </a>
                </div>
            )}
        </div>

        {/* Content Body */}
        <div className="project-content" style={{ fontSize: "1.25rem", lineHeight: "1.8", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "3.5rem" }}>
            
            {project.overview && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "1.5rem"}}>Overview</h2>
                    <p>{project.overview}</p>
                </section>
            )}

            {project.challenge && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "1.5rem"}}>The Challenge</h2>
                    <p>{project.challenge}</p>
                </section>
            )}

            {project.solution && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "1.5rem"}}>The Solution</h2>
                    <p>{project.solution}</p>
                </section>
            )}

            {project.whyItExists && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "1.5rem"}}>Why It Exists</h2>
                    <p>{project.whyItExists}</p>
                </section>
            )}

            {project.impactDesc && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "1.5rem"}}>Impact</h2>
                    <p>{project.impactDesc}</p>
                </section>
            )}

            {project.keyHighlights && project.keyHighlights.length > 0 && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "2rem"}}>
                        {project.keyHighlightsTitle || "Key Highlights"}
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                        {project.keyHighlights.map((highlight, index) => (
                            <div key={index} style={{ padding: "2rem", background: "white", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)"}}>
                                <h3 style={{fontFamily: "IntraNet, sans-serif", fontSize: "1.6rem", color: "var(--text-main)", marginBottom: "0.8rem"}}>{highlight.title}</h3>
                                <p style={{margin: 0}}>{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
      </div>
    </main>
  );
}
