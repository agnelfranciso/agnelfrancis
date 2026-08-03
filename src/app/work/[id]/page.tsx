import type { Metadata } from "next";
import { projectsData } from "../../../data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import HorizontalScrollGallery from "../../../components/HorizontalScrollGallery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faDownload } from '@fortawesome/free-solid-svg-icons';
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
            <span key={tag} className="tag" style={{ padding: "clamp(0.3rem, 1.5vw, 0.5rem) clamp(0.8rem, 3vw, 1.5rem)", borderRadius: "var(--border-radius-pill)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "clamp(0.7rem, 2.5vw, 1rem)", fontFamily: "PPSupplyMono, monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>{tag}</span>
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
        {project.isMobileApp && project.screenshots && project.screenshots.length > 1 ? (
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {project.screenshots.slice(0, 3).map((src, idx) => {
                    const transforms = [
                        'scale(1) translateY(0) rotate(0deg)',
                        'scale(0.9) translateX(85%) rotate(8deg)',
                        'scale(0.9) translateX(-85%) rotate(-8deg)'
                    ];
                    return (
                        <img 
                            key={src}
                            src={src} 
                            alt={`${project.title} preview ${idx + 1}`} 
                            style={{ 
                                position: idx === 0 ? 'relative' : 'absolute',
                                maxWidth: '28%', 
                                maxHeight: '85%', 
                                borderRadius: '24px', 
                                boxShadow: '0 30px 60px rgba(0,0,0,0.2)', 
                                display: 'block',
                                transform: transforms[idx] || 'none',
                                zIndex: 3 - idx,
                                transition: 'transform 0.4s ease'
                            }} 
                        />
                    );
                })}
            </div>
        ) : project.image ? (
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
            {project.links && project.links.length > 0 && (
                <div style={{marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.8rem"}}>
                    {project.links.map((link, idx) => (
                        <a 
                            key={idx}
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-primary wave-btn"
                            style={{ 
                                width: "100%", 
                                padding: "0.8rem 1.5rem", 
                                fontSize: "1rem", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center",
                                gap: "0.8rem"
                            }}
                        >
                            {link.type === 'fdroid' ? (
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.2rem", height: "1.2rem", fill: "currentColor" }}>
                                    <title>F-Droid</title>
                                    <path d="M20.472,10.081H3.528c-0.877,0-1.589,0.711-1.589,1.589v10.59c0,0.877,0.711,1.589,1.589,1.589h16.944 c0.877,0,1.589-0.711,1.589-1.589V11.67C22.061,10.792,21.349,10.081,20.472,10.081z M12,22.525c-3.066,0-5.56-2.494-5.56-5.56 s2.494-5.56,5.56-5.56c3.066,0,5.56,2.494,5.56,5.56S15.066,22.525,12,22.525z M12,12.411c-2.511,0-4.554,2.043-4.554,4.554 S9.489,21.519,12,21.519s4.554-2.043,4.554-4.554S14.511,12.411,12,12.411z M12,20.274c-1.563,0-2.881-1.103-3.221-2.568h1.67 c0.275,0.581,0.859,0.979,1.551,0.979c0.96,0,1.721-0.761,1.721-1.721c0-0.96-0.761-1.721-1.721-1.721 c-0.649,0-1.2,0.352-1.493,0.874H8.805c0.378-1.412,1.669-2.462,3.195-2.462c1.818,0,3.309,1.491,3.309,3.309 C15.309,18.783,13.818,20.274,12,20.274z M23.849,0.396c-0.001,0.001-0.002,0.002-0.002,0.003 c-0.002-0.002-0.004-0.003-0.006-0.005c0.001-0.001,0.002-0.003,0.004-0.004c-0.116-0.137-0.279-0.231-0.519-0.238 c-0.202,0.005-0.391,0.097-0.512,0.259l-1.818,2.353c-0.164-0.058-0.339-0.095-0.523-0.095H3.528c-0.184,0-0.358,0.038-0.523,0.095 L1.187,0.41c-0.121-0.162-0.31-0.253-0.512-0.259c-0.24,0.006-0.403,0.1-0.519,0.238c0.001,0.001,0.002,0.003,0.004,0.004 C0.157,0.395,0.155,0.397,0.153,0.399C0.153,0.398,0.152,0.397,0.151,0.396C0.085,0.474-0.146,0.822,0.139,1.22l1.909,2.471 C1.981,3.867,1.94,4.057,1.94,4.257v3.707c0,0.877,0.711,1.589,1.589,1.589h16.944c0.877,0,1.589-0.711,1.589-1.589V4.257 c0-0.2-0.041-0.39-0.109-0.566l1.909-2.471C24.146,0.822,23.915,0.474,23.849,0.396z M6.904,8.228c-0.987,0-1.787-0.8-1.787-1.787 s0.8-1.787,1.787-1.787s1.787,0.8,1.787,1.787S7.891,8.228,6.904,8.228z M17.229,8.228c-0.987,0-1.787-0.8-1.787-1.787 s0.8-1.787,1.787-1.787c0.987,0,1.787,0.8,1.787,1.787S18.216,8.228,17.229,8.228z"/>
                                </svg>
                            ) : (
                                <FontAwesomeIcon icon={
                                    link.type === 'github' ? faGithub : faGlobe
                                } style={{ fontSize: "1.2rem" }} />
                            )}
                            <span>{link.label}</span>
                            <span className="wave-emoji">↗</span>
                        </a>
                    ))}
                </div>
            )}
        </div>

        <div className="project-content" style={{ minWidth: 0, overflowWrap: "break-word", fontSize: "clamp(1rem, 3.5vw, 1.25rem)", lineHeight: "1.8", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "3.5rem" }}>
            
            {project.overview && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "var(--text-main)", marginBottom: "1.5rem"}}>Overview</h2>
                    <p>{project.overview}</p>
                </section>
            )}

            {project.challenge && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "var(--text-main)", marginBottom: "1.5rem"}}>The Challenge</h2>
                    <p>{project.challenge}</p>
                </section>
            )}

            {project.solution && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "var(--text-main)", marginBottom: "1.5rem"}}>The Solution</h2>
                    <p>{project.solution}</p>
                </section>
            )}

            {project.whyItExists && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "var(--text-main)", marginBottom: "1.5rem"}}>Why It Exists</h2>
                    <p>{project.whyItExists}</p>
                </section>
            )}

            {project.impactDesc && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "var(--text-main)", marginBottom: "1.5rem"}}>Impact</h2>
                    <p>{project.impactDesc}</p>
                </section>
            )}

            {project.keyHighlights && project.keyHighlights.length > 0 && (
                <section>
                    <h2 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "var(--text-main)", marginBottom: "2rem"}}>
                        {project.keyHighlightsTitle || "Key Highlights"}
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                        {project.keyHighlights.map((highlight, index) => (
                            <div key={index} style={{ padding: "1.5rem", background: "white", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)"}}>
                                <h3 style={{fontFamily: "IntraNet, sans-serif", fontSize: "clamp(1.2rem, 5vw, 1.6rem)", color: "var(--text-main)", marginBottom: "0.8rem"}}>{highlight.title}</h3>
                                <p style={{margin: 0}}>{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {project.screenshots && project.screenshots.length > 0 && (
                <HorizontalScrollGallery images={[...project.screenshots].sort()} title={project.title} />
            )}
        </div>
      </div>
    </main>
  );
}
