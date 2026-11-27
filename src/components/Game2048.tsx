"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Undo2, Trophy } from "lucide-react";

const SIZE = 4;

const TECH_LABELS: Record<number, { tag: string; bg: string; fg: string }> = {
  2: { tag: "HTML", bg: "#f3f4f6", fg: "#1f2937" },
  4: { tag: "CSS", bg: "#e0f2fe", fg: "#0369a1" },
  8: { tag: "JS", bg: "#fef08a", fg: "#854d0e" },
  16: { tag: "TS", bg: "#bfdbfe", fg: "#1e40af" },
  32: { tag: "React", bg: "#cffafe", fg: "#0e7490" },
  64: { tag: "Next.js", bg: "#18181b", fg: "#ffffff" },
  128: { tag: "Kotlin", bg: "#ddd6fe", fg: "#5b21b6" },
  256: { tag: "FastAPI", bg: "#bbf7d0", fg: "#166534" },
  512: { tag: "Docker", bg: "#93c5fd", fg: "#1e3a8a" },
  1024: { tag: "AI", bg: "#fbcfe8", fg: "#9d174d" },
  2048: { tag: "SHIP!", bg: "#f97316", fg: "#ffffff" },
  4096: { tag: "SCALE", bg: "#dc2626", fg: "#ffffff" },
};

type Board = number[][];

function createEmptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandomTile(board: Board): Board {
  const empty: [number, number][] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) empty.push([r, c]);
    }
  }
  if (empty.length === 0) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const next = board.map((row) => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function initBoard(): Board {
  return addRandomTile(addRandomTile(createEmptyBoard()));
}

function slideRowLeft(row: number[]): { newRow: number[]; gained: number; moved: boolean } {
  const nonZero = row.filter((v) => v !== 0);
  const merged: number[] = [];
  let gained = 0;

  for (let i = 0; i < nonZero.length; i++) {
    if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
      const val = nonZero[i] * 2;
      merged.push(val);
      gained += val;
      i++;
    } else {
      merged.push(nonZero[i]);
    }
  }

  while (merged.length < SIZE) merged.push(0);
  const moved = merged.some((v, idx) => v !== row[idx]);
  return { newRow: merged, gained, moved };
}

function rotateClockwise(board: Board): Board {
  return board[0].map((_, c) => board.map((row) => row[c]).reverse());
}

function moveBoard(board: Board, dir: "left" | "right" | "up" | "down"): { next: Board; gained: number; moved: boolean } {
  let rotations = 0;
  if (dir === "up") rotations = 3;
  else if (dir === "right") rotations = 2;
  else if (dir === "down") rotations = 1;

  let working = board.map((r) => [...r]);
  for (let i = 0; i < rotations; i++) working = rotateClockwise(working);

  let totalGained = 0;
  let anyMoved = false;
  working = working.map((row) => {
    const { newRow, gained, moved } = slideRowLeft(row);
    totalGained += gained;
    if (moved) anyMoved = true;
    return newRow;
  });

  const backRotations = (4 - rotations) % 4;
  for (let i = 0; i < backRotations; i++) working = rotateClockwise(working);

  return { next: working, gained: totalGained, moved: anyMoved };
}

function hasMovesLeft(board: Board): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return true;
      if (r + 1 < SIZE && board[r][c] === board[r + 1][c]) return true;
      if (c + 1 < SIZE && board[r][c] === board[r][c + 1]) return true;
    }
  }
  return false;
}

export default function Game2048() {
  const [board, setBoard] = useState<Board>(() => initBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [prevState, setPrevState] = useState<{ board: Board; score: number } | null>(null);
  const [hasWon, setHasWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("game-2048-best");
      if (saved) setBestScore(parseInt(saved, 10) || 0);
    } catch { /* ignore */ }
  }, []);

  const handleMove = useCallback((dir: "left" | "right" | "up" | "down") => {
    if (gameOver) return;
    if (hasWon && !keepPlaying) return;

    const { next, gained, moved } = moveBoard(board, dir);
    if (!moved) return;

    setPrevState({ board: board.map((r) => [...r]), score });
    const withTile = addRandomTile(next);
    const newScore = score + gained;

    setBoard(withTile);
    setScore(newScore);

    if (newScore > bestScore) {
      setBestScore(newScore);
      try { localStorage.setItem("game-2048-best", String(newScore)); } catch { /* ignore */ }
    }

    if (!hasWon && withTile.some((row) => row.some((v) => v >= 2048))) {
      setHasWon(true);
    } else if (!hasMovesLeft(withTile)) {
      setGameOver(true);
    }
  }, [board, score, bestScore, gameOver, hasWon, keepPlaying]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        handleMove("left");
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        handleMove("right");
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        handleMove("up");
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        handleMove("down");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleMove]);

  const restart = () => {
    setBoard(initBoard());
    setScore(0);
    setPrevState(null);
    setHasWon(false);
    setKeepPlaying(false);
    setGameOver(false);
  };

  const undo = () => {
    if (!prevState) return;
    setBoard(prevState.board);
    setScore(prevState.score);
    setPrevState(null);
    setGameOver(false);
  };

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/games" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'PPSupplyMono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Quit Game
        </Link>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "12px", padding: "0.45rem 0.9rem", textAlign: "center", fontFamily: "'PPSupplyMono', monospace" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Score</div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{score}</div>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "12px", padding: "0.45rem 0.9rem", textAlign: "center", fontFamily: "'PPSupplyMono', monospace" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.25rem", justifyContent: "center" }}>
              <Trophy size={10} /> Best
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--accent-primary)" }}>{bestScore}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", gap: "0.75rem" }}>
        <button
          onClick={undo}
          disabled={!prevState}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(0,0,0,0.1)",
            background: "var(--surface)",
            color: prevState ? "var(--text-main)" : "var(--text-muted)",
            opacity: prevState ? 1 : 0.5,
            fontFamily: "'PPSupplyMono', monospace",
            fontSize: "0.85rem",
            cursor: prevState ? "pointer" : "default",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Undo2 size={15} /> Undo
        </button>

        <button
          onClick={restart}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "none",
            background: "var(--text-main)",
            color: "var(--bg-color)",
            fontFamily: "'PPSupplyMono', monospace",
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <RotateCcw size={15} /> New Game
        </button>
      </div>

      {/* Win / Game Over Overlay */}
      {((hasWon && !keepPlaying) || gameOver) && (
        <div style={{
          textAlign: "center",
          padding: "1.5rem",
          marginBottom: "1.25rem",
          borderRadius: "16px",
          background: hasWon && !gameOver ? "rgba(249, 115, 22, 0.1)" : "rgba(239, 68, 68, 0.1)",
          border: hasWon && !gameOver ? "1px solid #f97316" : "1px solid #ef4444",
        }}>
          <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "2rem", marginBottom: "0.5rem" }}>
            {hasWon && !gameOver ? "2048 — SHIPPED!" : "No Moves Left!"}
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
            Final Score: <strong>{score}</strong>
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {hasWon && !keepPlaying && !gameOver && (
              <button
                onClick={() => setKeepPlaying(true)}
                style={{ padding: "0.6rem 1.25rem", borderRadius: "999px", border: "1px solid var(--text-main)", background: "var(--surface)", color: "var(--text-main)", fontFamily: "'IntraNet', sans-serif", cursor: "pointer" }}
              >
                Keep Playing
              </button>
            )}
            <button
              onClick={restart}
              style={{ padding: "0.6rem 1.25rem", borderRadius: "999px", border: "none", background: "var(--text-main)", color: "var(--bg-color)", fontFamily: "'IntraNet', sans-serif", cursor: "pointer" }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* 4x4 Grid */}
      <div
        onTouchStart={(e) => {
          const t = e.touches[0];
          touchStart.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(e) => {
          if (!touchStart.current) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - touchStart.current.x;
          const dy = t.clientY - touchStart.current.y;
          touchStart.current = null;
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 25) return;
          if (Math.abs(dx) > Math.abs(dy)) {
            handleMove(dx > 0 ? "right" : "left");
          } else {
            handleMove(dy > 0 ? "down" : "up");
          }
        }}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          gap: "10px",
          padding: "12px",
          background: "rgba(0,0,0,0.08)",
          borderRadius: "20px",
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {board.flat().map((val, idx) => {
          const styleInfo = TECH_LABELS[val] || { tag: `${val}`, bg: "#111827", fg: "#ffffff" };
          return (
            <div
              key={idx}
              style={{
                aspectRatio: "1/1",
                borderRadius: "12px",
                background: val === 0 ? "rgba(255,255,255,0.45)" : styleInfo.bg,
                color: styleInfo.fg,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: val === 0 ? "none" : "0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.12s ease, background 0.15s ease",
              }}
            >
              {val !== 0 && (
                <>
                  <span style={{ fontFamily: "'IntraNet', sans-serif", fontSize: val >= 1024 ? "1.35rem" : "1.65rem", fontWeight: "bold", lineHeight: 1 }}>
                    {val}
                  </span>
                  <span style={{ fontFamily: "'PPSupplyMono', monospace", fontSize: "0.7rem", opacity: 0.85, marginTop: "0.2rem" }}>
                    {styleInfo.tag}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "1rem" }}>
        Use Arrow Keys / WASD or swipe to merge matching tech tiles up to 2048 (SHIP!).
      </p>
    </div>
  );
}
