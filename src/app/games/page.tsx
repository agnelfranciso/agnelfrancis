"use client";

import Link from "next/link";
import { Gamepad2, ArrowRight, ArrowLeft } from "lucide-react";

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
          Welcome to the arcade. Unwind, kill some time, and interact with my work in a new way.
        </p>
      </div>

      <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1000px", margin: "4rem auto 0 auto" }}>
        
        {/* Game 1: Project Memory Match */}
        <Link href="/games/memory" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{
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
            cursor: "pointer"
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
            <div style={{ 
              width: "50px", height: "50px", borderRadius: "12px", 
              background: "linear-gradient(135deg, var(--accent-blue), var(--accent-pink))",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white"
            }}>
              <Gamepad2 size={24} />
            </div>
            <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "1.5rem", marginTop: "0.5rem" }}>Project Memory Match</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6, flexGrow: 1 }}>
              A classic memory card game featuring thumbnails of the actual projects from my portfolio. How fast can you find all the pairs?
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", fontWeight: "bold", marginTop: "1rem" }}>
              Play Now <ArrowRight size={16} />
            </div>
          </div>
        </Link>

        {/* Game 2: Portfolio Wordle */}
        <Link href="/games/wordle" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{
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
            cursor: "pointer"
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
            <div style={{ 
              width: "50px", height: "50px", borderRadius: "12px", 
              background: "linear-gradient(135deg, var(--accent-pink), var(--accent-blue))",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white"
            }}>
              <Gamepad2 size={24} />
            </div>
            <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "1.5rem", marginTop: "0.5rem" }}>Portfolio Wordle</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6, flexGrow: 1 }}>
              Guess the 5-letter hidden word in 6 tries. All words are directly pulled from the technologies, places, and projects in this portfolio!
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", fontWeight: "bold", marginTop: "1rem" }}>
              Play Now <ArrowRight size={16} />
            </div>
          </div>
        </Link>
        {/* Game 3: Guess My Watchlist */}
        <Link href="/games/watchlist" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{
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
            cursor: "pointer"
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
            <div style={{ 
              width: "50px", height: "50px", borderRadius: "12px", 
              background: "linear-gradient(135deg, var(--accent-yellow), var(--accent-primary))",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white"
            }}>
              <Gamepad2 size={24} />
            </div>
            <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "1.5rem", marginTop: "0.5rem" }}>Guess My Watchlist</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6, flexGrow: 1 }}>
              I have 27 movies and shows on my watchlist. Can you guess all of them before the 5-minute timer runs out?
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", fontWeight: "bold", marginTop: "1rem" }}>
              Play Now <ArrowRight size={16} />
            </div>
          </div>
        </Link>

      </div>
    </main>
  );
}
