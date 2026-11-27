"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Flag } from "lucide-react";

type WatchlistItem = {
  id: number;
  title: string;
  aliases: string[];
  hint: string;
  type: "Movie" | "Series";
};

const WATCHLIST: WatchlistItem[] = [
  { id: 1, title: "The Mentalist", aliases: ["the mentalist", "mentalist"], hint: "Observation skills and crime-solving.", type: "Series" },
  { id: 2, title: "Breaking Bad", aliases: ["breaking bad"], hint: "Chemistry teacher turns to cooking.", type: "Series" },
  { id: 3, title: "Dexter", aliases: ["dexter"], hint: "Blood spatter analyst by day, killer by night.", type: "Series" },
  { id: 4, title: "Interstellar", aliases: ["interstellar"], hint: "Through a wormhole to save humanity.", type: "Movie" },
  { id: 5, title: "The Odyssey", aliases: ["the odyssey", "odyssey"], hint: "An epic journey back home.", type: "Movie" },
  { id: 6, title: "Tenet", aliases: ["tenet"], hint: "Time inversion espionage.", type: "Movie" },
  { id: 7, title: "Squid Game", aliases: ["squid game", "squid games"], hint: "Deadly Korean children's games.", type: "Series" },
  { id: 8, title: "Alice in Borderland", aliases: ["alice in borderland"], hint: "Deadly survival games in a deserted Tokyo.", type: "Series" },
  { id: 9, title: "Fight Club", aliases: ["fight club"], hint: "First rule: You do not talk about it.", type: "Movie" },
  { id: 10, title: "Infinity War", aliases: ["infinity war", "avengers infinity war"], hint: "Thanos snaps his fingers.", type: "Movie" },
  { id: 11, title: "Endgame", aliases: ["endgame", "avengers endgame"], hint: "Avengers assemble to reverse the snap.", type: "Movie" },
  { id: 12, title: "Inception", aliases: ["inception"], hint: "A dream within a dream.", type: "Movie" },
  { id: 13, title: "Oppenheimer", aliases: ["oppenheimer"], hint: "Father of the atomic bomb.", type: "Movie" },
  { id: 14, title: "The Amazing Spider-Man", aliases: ["amazing spider man", "the amazing spider man", "amazing spiderman"], hint: "Andrew Garfield swings through NY.", type: "Movie" },
  { id: 15, title: "The Dark Knight", aliases: ["the dark knight", "dark knight"], hint: "Why so serious?", type: "Movie" },
  { id: 16, title: "Dune", aliases: ["dune"], hint: "Spice and sandworms.", type: "Movie" },
  { id: 17, title: "Deadpool", aliases: ["deadpool"], hint: "The merc with a mouth.", type: "Movie" },
  { id: 18, title: "John Wick", aliases: ["john wick", "jhon wick"], hint: "They killed his dog.", type: "Movie" },
  { id: 19, title: "Fast and Furious", aliases: ["fast and furious", "the fast and the furious"], hint: "Family and fast cars.", type: "Movie" },
  { id: 20, title: "Toy Story", aliases: ["toy story"], hint: "Woody and Buzz.", type: "Movie" },
  { id: 21, title: "Guardians of the Galaxy", aliases: ["guardians of the galaxy", "gog", "gotg"], hint: "Star-Lord, Groot, and a raccoon.", type: "Movie" },
  { id: 22, title: "F1 Movie", aliases: ["f1", "f1 movie", "formula 1"], hint: "High speed racing drama.", type: "Movie" },
  { id: 23, title: "The Truman Show", aliases: ["the truman show", "truman show"], hint: "His entire life is a reality TV broadcast.", type: "Movie" },
  { id: 24, title: "Better Call Saul", aliases: ["better call saul"], hint: "Slippin' Jimmy becomes a lawyer.", type: "Series" },
  { id: 25, title: "Dunkirk", aliases: ["dunkirk", "dunkir"], hint: "WW2 evacuation on the beaches.", type: "Movie" },
  { id: 26, title: "Mission Impossible", aliases: ["mission impossible", "mission impo"], hint: "Tom Cruise does insane stunts.", type: "Movie" },
  { id: 27, title: "Jurassic Park", aliases: ["jurassic park", "jurrasic aprk"], hint: "Dinosaurs brought back to life.", type: "Movie" },
  { id: 28, title: "Mr. Robot", aliases: ["mr robot", "mr. robot"], hint: "Cybersecurity engineer & fsociety hacker.", type: "Series" },
  { id: 29, title: "Severance", aliases: ["severance"], hint: "Work memories surgically separated from life.", type: "Series" },
  { id: 30, title: "The Matrix", aliases: ["the matrix", "matrix"], hint: "Red pill or blue pill.", type: "Movie" },
  { id: 31, title: "The Social Network", aliases: ["the social network", "social network"], hint: "The founding of Facebook.", type: "Movie" },
  { id: 32, title: "Silicon Valley", aliases: ["silicon valley"], hint: "Pied Piper compression startup comedy.", type: "Series" },
  { id: 33, title: "Sherlock", aliases: ["sherlock"], hint: "Benedict Cumberbatch in modern London.", type: "Series" },
  { id: 34, title: "Peaky Blinders", aliases: ["peaky blinders"], hint: "Tommy Shelby & razor blades in caps.", type: "Series" },
  { id: 35, title: "Stranger Things", aliases: ["stranger things"], hint: "Hawkins, Eleven, and the Upside Down.", type: "Series" },
  { id: 36, title: "Dark", aliases: ["dark"], hint: "German time-travel mystery across 33-year cycles.", type: "Series" },
  { id: 37, title: "Black Mirror", aliases: ["black mirror"], hint: "Tech-dystopia anthology series.", type: "Series" },
  { id: 38, title: "Shutter Island", aliases: ["shutter island"], hint: "U.S. Marshal investigates an asylum.", type: "Movie" },
  { id: 39, title: "Prison Break", aliases: ["prison break"], hint: "Blueprints tattooed on his body.", type: "Series" },
  { id: 40, title: "Chernobyl", aliases: ["chernobyl"], hint: "1986 nuclear disaster miniseries.", type: "Series" },
  { id: 41, title: "The Prestige", aliases: ["the prestige", "prestige"], hint: "Rival magicians obsessed with the ultimate trick.", type: "Movie" },
  { id: 42, title: "Parasite", aliases: ["parasite"], hint: "Korean Oscar-winning class satire.", type: "Movie" },
  { id: 43, title: "Whiplash", aliases: ["whiplash"], hint: "Not quite my tempo.", type: "Movie" },
  { id: 44, title: "Spider-Verse", aliases: ["spider verse", "into the spider verse", "across the spider verse", "spider man into the spider verse"], hint: "Miles Morales leaps across dimensions.", type: "Movie" },
  { id: 45, title: "Iron Man", aliases: ["iron man"], hint: "Tony Stark builds a suit in a cave.", type: "Movie" },
  { id: 46, title: "The Batman", aliases: ["the batman", "batman"], hint: "Robert Pattinson solves The Riddler's clues.", type: "Movie" },
  { id: 47, title: "The Godfather", aliases: ["the godfather", "godfather"], hint: "An offer you can't refuse.", type: "Movie" },
  { id: 48, title: "Pulp Fiction", aliases: ["pulp fiction"], hint: "Tarantino's intertwined crime stories.", type: "Movie" },
  { id: 49, title: "Forrest Gump", aliases: ["forrest gump"], hint: "Life is like a box of chocolates.", type: "Movie" },
  { id: 50, title: "Gladiator", aliases: ["gladiator"], hint: "Are you not entertained?", type: "Movie" },
  { id: 51, title: "Top Gun: Maverick", aliases: ["top gun", "top gun maverick", "maverick"], hint: "Fighter jet sequel with Tom Cruise.", type: "Movie" },
  { id: 52, title: "Edge of Tomorrow", aliases: ["edge of tomorrow"], hint: "Live. Die. Repeat. Alien invasion loop.", type: "Movie" },
  { id: 53, title: "Ex Machina", aliases: ["ex machina"], hint: "Turing test with an AI humanoid.", type: "Movie" },
  { id: 54, title: "Blade Runner 2049", aliases: ["blade runner", "blade runner 2049"], hint: "Replicant hunter in neon dystopia.", type: "Movie" },
  { id: 55, title: "The Boys", aliases: ["the boys"], hint: "Vigilantes vs corrupt superheroes.", type: "Series" },
  { id: 56, title: "Invincible", aliases: ["invincible"], hint: "Mark Grayson inherits Viltrumite powers.", type: "Series" },
  { id: 57, title: "True Detective", aliases: ["true detective"], hint: "Rust Cohle and Marty Hart in Louisiana.", type: "Series" },
  { id: 58, title: "Narcos", aliases: ["narcos"], hint: "Rise and fall of Pablo Escobar.", type: "Series" },
  { id: 59, title: "Memento", aliases: ["memento"], hint: "Short-term memory loss told backwards.", type: "Movie" },
  { id: 60, title: "Se7en", aliases: ["se7en", "seven"], hint: "What's in the box?!", type: "Movie" },
];

const GAME_TIME = 360; // 6 minutes in seconds

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
            {guessedIds.size < 20 && " Looks like we need to organize a watch party."}
            {guessedIds.size >= 20 && guessedIds.size < 45 && " Solid taste — you know a lot of my favorites!"}
            {guessedIds.size >= 45 && guessedIds.size < WATCHLIST.length && " Insane cinephile run! So close."}
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
