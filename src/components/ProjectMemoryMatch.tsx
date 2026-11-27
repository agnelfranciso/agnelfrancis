"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { projectsData } from "@/data/projects";

type CardData = {
  id: string; // Unique ID for the card instance
  projectId: string; // ID of the project it represents
  image: string;
  title: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; pairs: number; cols: number }> = {
  easy: { label: "4×3 (6 Pairs)", pairs: 6, cols: 4 },
  medium: { label: "4×4 (8 Pairs)", pairs: 8, cols: 4 },
  hard: { label: "5×4 (10 Pairs)", pairs: 10, cols: 5 },
};

export default function ProjectMemoryMatch() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [cards, setCards] = useState<CardData[]>([]);
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [firstChoice, setFirstChoice] = useState<CardData | null>(null);
  const [secondChoice, setSecondChoice] = useState<CardData | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [bestMoves, setBestMoves] = useState<Record<Difficulty, number | null>>({
    easy: null,
    medium: null,
    hard: null,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("memory-match-best");
      if (saved) setBestMoves(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  // Live timer
  useEffect(() => {
    if (!isActive || isWon) return;
    const interval = setInterval(() => setElapsed((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isActive, isWon]);

  // Initialize game
  const shuffleCards = (level: Difficulty = difficulty) => {
    const projectsWithImages = projectsData.filter(p => p.image);
    const pairCount = Math.min(DIFFICULTY_CONFIG[level].pairs, projectsWithImages.length);

    const shuffledProjects = [...projectsWithImages]
      .sort(() => 0.5 - Math.random())
      .slice(0, pairCount);

    const shuffledCards = [...shuffledProjects, ...shuffledProjects]
      .sort(() => 0.5 - Math.random())
      .map((project) => ({
        id: Math.random().toString(36).substring(7),
        projectId: project.id,
        image: project.image!,
        title: project.title,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setMoves(0);
    setElapsed(0);
    setIsActive(false);
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
    setIsWon(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Handle a choice
  const handleChoice = (card: CardData) => {
    if (!disabled && !card.isMatched && card.id !== firstChoice?.id) {
      if (!isActive) setIsActive(true);
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.projectId === secondChoice.projectId) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.projectId === firstChoice.projectId) {
              return { ...card, isMatched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      const timer = setTimeout(() => {
        setIsWon(true);
        setBestMoves(prev => {
          const currentBest = prev[difficulty];
          if (currentBest === null || moves < currentBest) {
            const updated = { ...prev, [difficulty]: moves };
            try { localStorage.setItem("memory-match-best", JSON.stringify(updated)); } catch { /* ignore */ }
            return updated;
          }
          return prev;
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cards, difficulty, moves]);

  // Reset choices & increase turn
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setMoves(prevMoves => prevMoves + 1);
    setDisabled(false);
  };

  const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

  const handleDifficultyChange = (level: Difficulty) => {
    setDifficulty(level);
    shuffleCards(level);
  };

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <Link href="/games" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'PPSupplyMono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Quit Game
        </Link>
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", fontFamily: "'PPSupplyMono', monospace", fontSize: "1.05rem" }}>
          <span>Time: <strong style={{ color: "var(--text-main)" }}>{formatTime(elapsed)}</strong></span>
          <span>Moves: <strong style={{ color: "var(--accent-primary)" }}>{moves}</strong></span>
          {bestMoves[difficulty] !== null && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Best: {bestMoves[difficulty]}</span>
          )}
        </div>
      </div>

      {/* Difficulty Selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((level) => {
          const active = difficulty === level;
          return (
            <button
              key={level}
              onClick={() => handleDifficultyChange(level)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: active ? "1px solid var(--text-main)" : "1px solid rgba(0,0,0,0.1)",
                background: active ? "var(--text-main)" : "var(--surface)",
                color: active ? "var(--bg-color)" : "var(--text-main)",
                fontFamily: "'PPSupplyMono', monospace",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {DIFFICULTY_CONFIG[level].label}
            </button>
          );
        })}
      </div>

      {isWon ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--surface)", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", animation: "fade-in 0.5s ease" }}>
          <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "3rem", marginBottom: "1rem" }}>You Win!</h2>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
            Matched all {DIFFICULTY_CONFIG[difficulty].pairs} pairs in {moves} moves ({formatTime(elapsed)}).
          </p>
          <button 
            onClick={() => shuffleCards(difficulty)}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--text-main)", color: "var(--bg-color)", padding: "1rem 2rem", borderRadius: "50px", border: "none", fontSize: "1.1rem", fontFamily: "'IntraNet', sans-serif", cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <RotateCcw size={20} /> Play Again
          </button>
        </div>
      ) : (
        <div className="memory-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: `repeat(${DIFFICULTY_CONFIG[difficulty].cols}, 1fr)`, 
          gap: "0.85rem",
          perspective: "1000px" 
        }}>
          {cards.map(card => {
            const isFlipped = card === firstChoice || card === secondChoice || card.isMatched;
            
            return (
              <div 
                key={card.id} 
                className="memory-card"
                onClick={() => handleChoice(card)}
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  cursor: (isFlipped || disabled) ? "default" : "pointer",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Back of Card (Shown initially) */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(135deg, var(--surface) 0%, rgba(0,0,0,0.02) 100%)",
                  borderRadius: "16px",
                  border: "2px solid rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  color: "rgba(0,0,0,0.1)",
                  fontFamily: "'IntraNet', sans-serif",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.02)"
                }}>
                  ?
                </div>

                {/* Front of Card (Project Image) */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "white",
                  borderRadius: "16px",
                  border: card.isMatched ? "2px solid var(--accent-primary)" : "2px solid rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px", background: "rgba(0,0,0,0.02)" }} />
                  {/* Overlay for matched cards */}
                  {card.isMatched && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.2)" }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Global CSS for the 3D flip effect and animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .memory-card {
            border-radius: 8px !important;
          }
          .memory-card > div {
            border-radius: 8px !important;
          }
          .memory-grid {
            gap: 0.5rem !important;
          }
        }
      `}} />
    </div>
  );
}
