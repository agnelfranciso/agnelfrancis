"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Flag } from "lucide-react";

type WatchlistItem = {
  id: number;
  title: string;
  aliases: string[];
  hint: string;
};

const WATCHLIST: WatchlistItem[] = [
  { id: 1, title: "The Mentalist", aliases: ["the mentalist", "mentalist"], hint: "Observation skills and crime-solving." },
  { id: 2, title: "Breaking Bad", aliases: ["breaking bad"], hint: "Chemistry teacher turns to cooking." },
  { id: 3, title: "Dexter", aliases: ["dexter"], hint: "Blood spatter analyst by day, killer by night." },
  { id: 4, title: "Interstellar", aliases: ["interstellar"], hint: "Through a wormhole to save humanity." },
  { id: 5, title: "The Odyssey", aliases: ["the odyssey", "odyssey"], hint: "An epic journey back home." },
  { id: 6, title: "Tenet", aliases: ["tenet"], hint: "Time inversion espionage." },
  { id: 7, title: "Squid Game", aliases: ["squid game", "squid games"], hint: "Deadly Korean children's games." },
  { id: 8, title: "Alice in Borderland", aliases: ["alice in borderland"], hint: "Deadly survival games in a deserted Tokyo." },
  { id: 9, title: "Fight Club", aliases: ["fight club"], hint: "First rule: You do not talk about it." },
  { id: 10, title: "Infinity War", aliases: ["infinity war", "avengers infinity war"], hint: "Thanos snaps his fingers." },
  { id: 11, title: "Endgame", aliases: ["endgame", "avengers endgame"], hint: "Avengers assemble to reverse the snap." },
  { id: 12, title: "Inception", aliases: ["inception"], hint: "A dream within a dream." },
  { id: 13, title: "Oppenheimer", aliases: ["oppenheimer"], hint: "Father of the atomic bomb." },
  { id: 14, title: "The Amazing Spider-Man", aliases: ["amazing spider man", "the amazing spider man", "amazing spiderman"], hint: "Andrew Garfield swings through NY." },
  { id: 15, title: "The Dark Knight", aliases: ["the dark knight", "dark knight"], hint: "Why so serious?" },
  { id: 16, title: "Dune", aliases: ["dune"], hint: "Spice and sandworms." },
  { id: 17, title: "Deadpool", aliases: ["deadpool"], hint: "The merc with a mouth." },
  { id: 18, title: "John Wick", aliases: ["john wick", "jhon wick"], hint: "They killed his dog." },
  { id: 19, title: "Fast and Furious", aliases: ["fast and furious", "the fast and the furious"], hint: "Family and fast cars." },
  { id: 20, title: "Toy Story", aliases: ["toy story"], hint: "Woody and Buzz." },
  { id: 21, title: "Guardians of the Galaxy", aliases: ["guardians of the galaxy", "gog", "gotg"], hint: "Star-Lord, Groot, and a raccoon." },
  { id: 22, title: "F1 Movie", aliases: ["f1", "f1 movie", "formula 1"], hint: "High speed racing drama." },
  { id: 23, title: "The Truman Show", aliases: ["the truman show", "truman show"], hint: "His entire life is a reality TV broadcast." },
  { id: 24, title: "Better Call Saul", aliases: ["better call saul"], hint: "Slippin' Jimmy becomes a lawyer." },
  { id: 25, title: "Dunkirk", aliases: ["dunkirk", "dunkir"], hint: "WW2 evacuation on the beaches." },
  { id: 26, title: "Mission Impossible", aliases: ["mission impossible", "mission impo"], hint: "Tom Cruise does insane stunts." },
  { id: 27, title: "Jurassic Park", aliases: ["jurassic park", "jurrasic aprk"], hint: "Dinosaurs brought back to life." },
];

const GAME_TIME = 300; // 5 minutes in seconds

export default function GuessWatchlist() {
  const [guessedIds, setGuessedIds] = useState<Set<number>>(new Set());
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasGivenUp, setHasGivenUp] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, gameOver]);

  // Focus input when game starts
  useEffect(() => {
    if (isPlaying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlaying]);

  const normalizeInput = (str: string) => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    if (!isPlaying && val.length > 0) {
      setIsPlaying(true);
    }

    const normalizedVal = normalizeInput(val);
    
    // Check for match
    const match = WATCHLIST.find(item => 
      !guessedIds.has(item.id) && 
      item.aliases.some(alias => normalizeInput(alias) === normalizedVal)
    );

    if (match) {
      const newGuessedIds = new Set(guessedIds);
      newGuessedIds.add(match.id);
      setGuessedIds(newGuessedIds);
      setInput("");
      
      // Check win condition
      if (newGuessedIds.size === WATCHLIST.length) {
        setGameOver(true);
        setIsPlaying(false);
      }
    }
  };

  const handleGiveUp = () => {
    setHasGivenUp(true);
    setGameOver(true);
    setIsPlaying(false);
  };

  const handleRestart = () => {
    setGuessedIds(new Set());
    setInput("");
    setTimeLeft(GAME_TIME);
    setIsPlaying(false);
    setGameOver(false);
    setHasGivenUp(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <Link href="/games" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'PPSupplyMono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Quit Game
        </Link>
        <div style={{ fontFamily: "'PPSupplyMono', monospace", fontSize: "1.2rem", color: timeLeft < 60 ? "var(--accent-primary)" : "inherit" }}>
          Time: <span style={{ fontWeight: "bold" }}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2rem", fontFamily: "'IntraNet', sans-serif", marginBottom: "0.5rem" }}>
          Score: <span style={{ color: "var(--accent-blue)" }}>{guessedIds.size}</span> / {WATCHLIST.length}
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          Type the names of movies and TV shows below. Correct guesses will be revealed instantly.
        </p>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={gameOver}
          placeholder={gameOver ? "Game Over" : "Start typing to begin..."}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "1rem 1.5rem",
            fontSize: "1.2rem",
            borderRadius: "50px",
            border: "2px solid rgba(0,0,0,0.1)",
            background: "var(--surface)",
            outline: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
            fontFamily: "inherit",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--accent-blue)"}
          onBlur={(e) => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
        />
        
        {(!gameOver && isPlaying) && (
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={handleGiveUp}
              style={{ background: "none", border: "none", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline" }}
            >
              <Flag size={14} /> I give up
            </button>
          </div>
        )}
      </div>

      {gameOver && (
        <div style={{ textAlign: "center", padding: "2rem", background: "var(--surface)", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", animation: "fade-in 0.5s ease", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "2.5rem", marginBottom: "1rem" }}>
            {guessedIds.size === WATCHLIST.length 
              ? "Incredible! You got them all!" 
              : hasGivenUp 
                ? "You gave up!" 
                : "Time's up!"}
          </h2>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
            You guessed {guessedIds.size} out of {WATCHLIST.length}. 
            {guessedIds.size < 10 && " Looks like we need to organize a watch party."}
            {guessedIds.size >= 10 && guessedIds.size < 20 && " Not bad, you've seen a few of my favorites!"}
            {guessedIds.size >= 20 && guessedIds.size < WATCHLIST.length && " So close! Great job."}
          </p>
          <button 
            onClick={handleRestart}
            style={{ display: "inline-block", background: "var(--text-main)", color: "var(--bg-color)", padding: "0.8rem 2rem", borderRadius: "50px", border: "none", fontSize: "1.1rem", fontFamily: "'IntraNet', sans-serif", cursor: "pointer", transition: "transform 0.2s" }}
          >
            <RotateCcw size={18} style={{ verticalAlign: "middle", marginRight: "0.5rem" }} />
            Play Again
          </button>
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem"
      }}>
        {WATCHLIST.map((item) => {
          const isGuessed = guessedIds.has(item.id);
          const isRevealed = gameOver && !isGuessed;

          return (
            <div 
              key={item.id}
              style={{
                padding: "1rem",
                background: isGuessed ? "rgba(34, 197, 94, 0.1)" : isRevealed ? "rgba(239, 68, 68, 0.1)" : "var(--surface)",
                border: isGuessed ? "1px solid rgb(34, 197, 94)" : isRevealed ? "1px solid rgb(239, 68, 68)" : "1px dashed rgba(0,0,0,0.1)",
                borderRadius: "12px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80px",
                transition: "all 0.3s ease",
                color: isGuessed ? "rgb(34, 197, 94)" : isRevealed ? "rgb(239, 68, 68)" : "var(--text-muted)",
                fontWeight: (isGuessed || isRevealed) ? "bold" : "normal",
              }}
            >
              {(isGuessed || isRevealed) ? (
                <span style={{ fontSize: "1.1rem" }}>{item.title}</span>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>???</span>
                  <span style={{ fontSize: "0.8rem", opacity: 0.7, lineHeight: 1.3 }}>{item.hint}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
