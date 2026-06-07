"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "../data/projects";

export default function Projects({ limit }: { limit?: number }) {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      (card as HTMLElement).style.opacity = "0";
      (card as HTMLElement).style.transform = "translateY(40px)";
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;

  return (
    <div className="project-grid">
      {displayedProjects.map((project) => (
        <Link 
          href={`/work/${project.id}`} 
          key={project.id} 
          className={`project-card ${project.size === 'large' ? 'large' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <article style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className={`card-image ${project.bgClass}`}>
              {project.screenshots && project.screenshots.length > 1 ? (
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {project.screenshots.slice(0, 3).map((src, idx) => {
                    // Create a fanned out overlapping effect
                    const transforms = [
                      'scale(1) translateY(0) rotate(0deg)',           // Center (Front)
                      'scale(0.9) translateX(85%) rotate(8deg)',       // Right (Middle)
                      'scale(0.9) translateX(-85%) rotate(-8deg)'      // Left (Back)
                    ];
                    const zIndexes = [3, 2, 1];
                    
                    return (
                      <img 
                        key={src}
                        src={src} 
                        alt={`${project.title} preview ${idx + 1}`} 
                        className="project-cover-image"
                        style={{ 
                          position: idx === 0 ? 'relative' : 'absolute',
                          maxWidth: '30%', 
                          maxHeight: '85%', 
                          borderRadius: '16px', 
                          boxShadow: '0 20px 40px rgba(0,0,0,0.2)', 
                          display: 'block',
                          transform: transforms[idx] || 'none',
                          zIndex: zIndexes[idx] || 0,
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
                  className="project-cover-image"
                  style={{ maxWidth: '85%', maxHeight: '85%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', display: 'block' }} 
                />
              ) : (
                <div className="abstract-shape abstract-circle"></div>
              )}
            </div>
            <div className="card-info" style={{ flexGrow: 1 }}>
              <h3 style={{ color: 'var(--text-main)' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
