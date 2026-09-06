"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

const WORDS = [
  { word: "KOCHI", hint: "Location of the offline Metro project" },
  { word: "VELUR", hint: "The village documented in VelurPedia" },
  { word: "REACT", hint: "A frontend framework used in many projects" },
  { word: "FORMS", hint: "Agnel _____ (Custom Typeform alternative)" },
  { word: "METRO", hint: "The train system you built a transit app for" },
  { word: "LOCAL", hint: "SemFolder is a _____-first semester manager" },
  { word: "MATCH", hint: "Project Memory _____" },
  { word: "GAMES", hint: "FramePixel builds web-based _____" },
  { word: "CASTS", hint: "CastLink finds overlapping _____" },
  { word: "TRAIN", hint: "Public transport vehicle" },
  { word: "ROUTE", hint: "Bussiler provides bus schedule and _____" },
  { word: "FOCUS", hint: "Privacy-first disaster risk intelligence _____" },
  { word: "AERIS", hint: "First part of the name for your offline disaster AI app" },
  { word: "AGNEL", hint: "The creator of this portfolio" },
  { word: "PIXEL", hint: "Frame_____ (Digital solutions studio)" },
  { word: "CODES", hint: "Op_____ Impact 2026 Hackathon" },
  { word: "SCORE", hint: "AMPA Predictor simulates this for football matches" },
  { word: "WORLD", hint: "AMPA predicts the 2026 FIFA _____ Cup" },
  { word: "CLOUD", hint: "Where modern web apps are hosted" },
  { word: "FETCH", hint: "JavaScript API used to get data" },
  { word: "PAGES", hint: "Next.js App Router uses these for routing" },
  { word: "BUILD", hint: "Compiling code for production" },
  { word: "STACK", hint: "A combination of technologies (e.g., Tech _____)" },
  { word: "LOGIC", hint: "Conditional branching _____ in Agnel Forms" },
  { word: "DEBUG", hint: "Finding and fixing errors in code" },
  { word: "ERROR", hint: "When the code doesn't work" },
  { word: "STATE", hint: "React hook: use_____" },
  { word: "PROPS", hint: "Data passed between React components" },
  { word: "HOOKS", hint: "React features like useEffect and useState" },
  { word: "CACHE", hint: "Temporary storage for fast data retrieval" },
  { word: "TOKEN", hint: "Used for secure authentication" },
  { word: "USERS", hint: "The people who interact with your apps" },
  { word: "LINUX", hint: "The open-source operating system" },
  { word: "CYBER", hint: "_____security (Opcode Impact focus)" },
  { word: "HACKS", hint: "What you do at a hackathon" },
  { word: "VULNS", hint: "Short for vulnerabilities" },
  { word: "PATCH", hint: "Fixing a security hole" },
  { word: "SHELL", hint: "Command line interface" },
  { word: "VIRUS", hint: "Malicious software" },
  { word: "PORTS", hint: "Network endpoints (e.g., 80, 443, 3000)" },
  { word: "BYTES", hint: "Units of digital data" },
  { word: "OAUTH", hint: "Open standard for access delegation" },
  { word: "ADMIN", hint: "The user with all permissions" },
  { word: "LOGIN", hint: "Authentication gateway" },
  { word: "ALERT", hint: "Notification of an event (or a JS function)" },
  { word: "PROXY", hint: "An intermediary server" },
  { word: "INDEX", hint: "The first page or position zero" },
  { word: "QUERY", hint: "A request for data from a database" },
  { word: "ASYNC", hint: "Non-blocking JavaScript functions" },
  { word: "AWAIT", hint: "Pauses async function execution" },
  { word: "MOUNT", hint: "When a React component is inserted into the DOM" }
];

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

type LetterStatus = "correct" | "present" | "absent" | "empty";

interface Tile {
  letter: string;
  status: LetterStatus;
}

export default function PortfolioWordle() {
  const [targetWordObj, setTargetWordObj] = useState(WORDS[0]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // Track keyboard state
  const [keyboardState, setKeyboardState] = useState<Record<string, LetterStatus>>({});

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWordObj(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setWin(false);
    setShowHint(false);
    setKeyboardState({});
  };

  const onKeyPress = useCallback((key: string) => {
    if (gameOver) return;

    if (key === "ENTER") {
      if (currentGuess.length !== WORD_LENGTH) {
        // Can add a toast or shake animation here
        return;
      }
      
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      
      // Update keyboard state
      const newKeyboardState = { ...keyboardState };
      const targetWord = targetWordObj.word;
      
      for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = currentGuess[i];
        if (targetWord[i] === letter) {
          newKeyboardState[letter] = "correct";
        } else if (targetWord.includes(letter) && newKeyboardState[letter] !== "correct") {
          newKeyboardState[letter] = "present";
        } else if (!targetWord.includes(letter)) {
          newKeyboardState[letter] = "absent";
        }
      }
      setKeyboardState(newKeyboardState);

      if (currentGuess === targetWord) {
        setWin(true);
        setGameOver(true);
      } else if (newGuesses.length >= MAX_GUESSES) {
        setGameOver(true);
      }
      
      setCurrentGuess("");
    } else if (key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) => prev + key);
    }
  }, [currentGuess, gameOver, guesses, targetWordObj.word, keyboardState]);

  // Listen to physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      if (e.key === "Enter") {
        onKeyPress("ENTER");
      } else if (e.key === "Backspace") {
        onKeyPress("BACKSPACE");
      } else {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          onKeyPress(key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  // Build grid
  const empties = guesses.length < MAX_GUESSES - 1 
    ? Array.from(Array(MAX_GUESSES - 1 - guesses.length)) 
    : [];

  const KeyboardRow = ({ keys }: { keys: string[] }) => (
    <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
      {keys.map((key) => {
        const status = keyboardState[key];
        let bgColor = "var(--surface)";
        let color = "var(--text-main)";
        
        if (status === "correct") { bgColor = "#22c55e"; color = "white"; }
        else if (status === "present") { bgColor = "#eab308"; color = "white"; }
        else if (status === "absent") { bgColor = "rgba(0,0,0,0.1)"; color = "var(--text-muted)"; }

        return (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className={key === "ENTER" || key === "BACKSPACE" ? "wordle-key wordle-key-large" : "wordle-key"}
            style={{
              padding: key === "ENTER" || key === "BACKSPACE" ? "1rem 0.5rem" : "1rem",
              minWidth: key === "ENTER" || key === "BACKSPACE" ? "65px" : "40px",
              background: bgColor,
              color: color,
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: "8px",
              fontFamily: "'IntraNet', sans-serif",
              fontSize: key === "ENTER" || key === "BACKSPACE" ? "1.5rem" : "1rem",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              flex: key === "ENTER" || key === "BACKSPACE" ? "1.5" : "1"
            }}
          >
            {key === "BACKSPACE" ? "⌫" : key === "ENTER" ? "↵" : key}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <Link href="/games" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'PPSupplyMono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Quit Game
        </Link>
        <button 
          onClick={() => setShowHint(true)}
          style={{ background: "none", border: "none", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "0.3rem", cursor: "pointer", fontFamily: "'PPSupplyMono', monospace", textTransform: "uppercase", fontSize: "0.9rem" }}
        >
          <HelpCircle size={16} /> Hint
        </button>
      </div>

      {showHint && (
        <div style={{ background: "rgba(0,0,0,0.02)", border: "1px dashed rgba(0,0,0,0.1)", padding: "1rem", borderRadius: "12px", marginBottom: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
          <strong>Hint:</strong> {targetWordObj.hint}
        </div>
      )}

      {/* Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "3rem", alignItems: "center" }}>
        {/* Previous guesses */}
        {guesses.map((guess, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem" }}>
            {guess.split("").map((letter, j) => {
              const targetWord = targetWordObj.word;
              let status: LetterStatus = "absent";
              if (targetWord[j] === letter) status = "correct";
              else if (targetWord.includes(letter)) status = "present";

              let bgColor = "var(--surface)";
              let color = "var(--text-main)";
              
              if (status === "correct") { bgColor = "#22c55e"; color = "white"; }
              else if (status === "present") { bgColor = "#eab308"; color = "white"; }
              else if (status === "absent") { bgColor = "rgba(0,0,0,0.05)"; color = "var(--text-muted)"; }

              return (
                <div key={j} className="wordle-box" style={{
                  width: "55px", height: "55px",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontSize: "2rem", fontWeight: "bold", fontFamily: "'IntraNet', sans-serif",
                  background: bgColor, color: color,
                  border: status === "absent" ? "none" : "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  textTransform: "uppercase"
                }}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Current guess */}
        {!gameOver && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {Array.from(Array(WORD_LENGTH)).map((_, i) => (
              <div key={i} className="wordle-box" style={{
                width: "55px", height: "55px",
                display: "flex", justifyContent: "center", alignItems: "center",
                fontSize: "2rem", fontWeight: "bold", fontFamily: "'IntraNet', sans-serif",
                background: "var(--surface)",
                border: currentGuess[i] ? "2px solid var(--text-main)" : "2px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                textTransform: "uppercase"
              }}>
                {currentGuess[i] || ""}
              </div>
            ))}
          </div>
        )}

        {/* Empty rows */}
        {empties.map((_, i) => (
          <div key={`empty-${i}`} style={{ display: "flex", gap: "0.5rem" }}>
            {Array.from(Array(WORD_LENGTH)).map((_, j) => (
              <div key={j} className="wordle-box" style={{
                width: "55px", height: "55px",
                border: "2px solid rgba(0,0,0,0.05)",
                borderRadius: "8px",
              }} />
            ))}
          </div>
        ))}
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div style={{ textAlign: "center", padding: "2rem", background: "var(--surface)", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", animation: "fade-in 0.5s ease", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "2rem", marginBottom: "1rem" }}>
            {win ? "You got it!" : "Game Over"}
          </h2>
          {!win && (
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              The word was <strong>{targetWordObj.word}</strong>
            </p>
          )}
          <button 
            onClick={startNewGame}
            style={{ display: "inline-block", background: "var(--text-main)", color: "var(--bg-color)", padding: "0.8rem 2rem", borderRadius: "50px", border: "none", fontSize: "1.1rem", fontFamily: "'IntraNet', sans-serif", cursor: "pointer", transition: "transform 0.2s", marginTop: "1rem" }}
          >
            Play Again
          </button>
        </div>
      )}

      {/* Keyboard */}
      <div style={{ marginTop: "2rem" }}>
        <KeyboardRow keys={["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]} />
        <KeyboardRow keys={["A", "S", "D", "F", "G", "H", "J", "K", "L"]} />
        <KeyboardRow keys={["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 500px) {
          .wordle-key {
            min-width: 28px !important;
            padding: 0.8rem 0.2rem !important;
            font-size: 0.9rem !important;
          }
          .wordle-key-large {
            min-width: 45px !important;
            font-size: 1.2rem !important;
          }
          .wordle-box {
            width: 45px !important;
            height: 45px !important;
            font-size: 1.5rem !important;
          }
        }
      `}} />
    </div>
  );
}
