"use client";

import Link from "next/link";
import { Gamepad2, ArrowRight, ArrowLeft, Bomb, Grid2X2, Zap, Film, Brain, Type } from "lucide-react";

const GAMES = [
  {
    href: "/games/minesweeper",
    title: "CyberSweeper",
    badge: "Strategy",
    description: "Classic Minesweeper reimagined. Choose 9×9, 14×14, or 16×22 grids, flag hidden exploits, chord-clear numbers, and beat your best time.",
    gradient: "linear-gradient(135deg, #ef4444, #f97316)",
    icon: Bomb,
  },
  {
    href: "/games/2048",
    title: "2048: Stack",
    badge: "Puzzle",
    description: "Slide and merge matching tech stack tiles from HTML (2) through React, Next.js, and Docker all the way to SHIP! (2048). Supports swipe & undo.",
    gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
    icon: Grid2X2,
  },
  {
    href: "/games/snake",
    title: "CyberSnake",
    badge: "Arcade",
    description: "Fast-paced grid Snake with 3 speed modes, solid or wrap-around walls, bonus gold packets, keyboard + swipe + mobile D-pad controls.",
    gradient: "linear-gradient(135deg, #16a34a, #22c55e)",
    icon: Zap,
  },
  {
    href: "/games/memory",
    title: "Project Memory Match",
    badge: "Memory",
    description: "Test your memory with 4×3, 4×4, or 5×4 boards featuring projects from this portfolio. Track your moves, time, and personal bests.",
    gradient: "linear-gradient(135deg, var(--accent-primary), var(--accent-blue))",
    icon: Brain,
  },
  {
    href: "/games/wordle",
    title: "Portfolio Wordle",
    badge: "Word",
    description: "Guess the 5-letter hidden word in 6 tries across 95+ tech, cybersecurity, and portfolio terms—complete with hints and win streaks.",
    gradient: "linear-gradient(135deg, var(--accent-blue), var(--accent-yellow))",
    icon: Type,
  },
  {
    href: "/games/watchlist",
    title: "Guess My Watchlist",
    badge: "Trivia",
    description: "60 movies and TV shows on my watchlist. Can you name them all from their clues before the 6-minute timer runs out?",
    gradient: "linear-gradient(135deg, var(--accent-yellow), var(--accent-primary))",
    icon: Film,
  },
];

export default function GamesHubPage() {
  return (
    <main className="page-container" style={{ minHeight: "100vh", paddingBottom: "4rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'PPSupplyMono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>

      <div className="page-header" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", color: "var(--accent-primary)" }}>
          <Gamepad2 size={48} />
        </div>
        <h1 className="page-title">Portfolio Arcade</h1>
        <p className="page-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Welcome to the arcade. Six playable games—from classic strategy and puzzle builds to portfolio trivia.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1060px", margin: "4rem auto 0 auto" }}>
        {GAMES.map((game) => {
          const Icon = game.icon;
          return (
            <Link key={game.href} href={game.href} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  borderRadius: "24px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  height: "100%",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.02)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    background: game.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}>
                    <Icon size={24} />
                  </div>
                  <span style={{
                    fontFamily: "'PPSupplyMono', monospace",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "0.3rem 0.7rem",
                    borderRadius: "999px",
                    background: "rgba(0,0,0,0.04)",
                    color: "var(--text-muted)",
                  }}>
                    {game.badge}
                  </span>
                </div>
                <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "1.5rem", marginTop: "0.25rem" }}>{game.title}</h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6, flexGrow: 1 }}>
                  {game.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", fontWeight: "bold", marginTop: "1rem" }}>
                  Play Now <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
