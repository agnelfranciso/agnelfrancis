"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  role: string;
  description: string;
  github?: string;
  linkedin?: string;
  website?: string;
  bgClass: string;
  image?: string;
}

interface Props {
  collaborators: Collaborator[];
}

export default function InteractiveHallOfFame({ collaborators }: Props) {
  const [selectedPerson, setSelectedPerson] = useState<Collaborator | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPerson(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedPerson) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPerson]);

  return (
    <>
      <div className="hof-grid">
        {collaborators.map((person) => (
          <div 
            key={person.id} 
            className="hof-card"
            onClick={() => setSelectedPerson(person)}
          >
            <div className="hof-card-inner">
              {person.image && (
                <div className="hof-avatar">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={person.image} alt={person.name} />
                </div>
              )}
              <h2 className="hof-name">{person.name}</h2>
              <div className="hof-role">{person.role}</div>
              <p className="hof-excerpt">{person.description.substring(0, 80)}...</p>
              <div className="hof-click-hint">Click to view</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      <div 
        className={`hof-modal-overlay ${selectedPerson ? 'open' : ''}`}
        onClick={() => setSelectedPerson(null)}
      >
        <div 
          className={`hof-modal-content ${selectedPerson ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        >
          <button className="hof-modal-close" onClick={() => setSelectedPerson(null)}>
            <X size={24} />
          </button>
          
          {selectedPerson && (
            <div className="hof-modal-inner">
              {selectedPerson.image && (
                <div className="hof-modal-avatar">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedPerson.image} alt={selectedPerson.name} />
                </div>
              )}
              <h2 className="hof-modal-name">{selectedPerson.name}</h2>
              <div className="hof-modal-role">{selectedPerson.role}</div>
              <p className="hof-modal-description">{selectedPerson.description}</p>
              
              <div className="hof-modal-links">
                {selectedPerson.github && (
                  <Link href={selectedPerson.github} target="_blank" rel="noopener noreferrer" className="hof-social-btn">
                    <ExternalLink size={16} /> GitHub
                  </Link>
                )}
                {selectedPerson.linkedin && (
                  <Link href={selectedPerson.linkedin} target="_blank" rel="noopener noreferrer" className="hof-social-btn">
                    <ExternalLink size={16} /> LinkedIn
                  </Link>
                )}
                {selectedPerson.website && (
                  <Link href={selectedPerson.website} target="_blank" rel="noopener noreferrer" className="hof-social-btn">
                    <ExternalLink size={16} /> Website
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
