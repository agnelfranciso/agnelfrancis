"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Bomb, Flag, RotateCcw, ShieldCheck, Timer } from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";

const CONFIG: Record<Difficulty, { label: string; rows: number; cols: number; mines: number; cellSize: number }> = {
  easy: { label: "9×9 (10 Mines)", rows: 9, cols: 9, mines: 10, cellSize: 38 },
  medium: { label: "14×14 (32 Mines)", rows: 14, cols: 14, mines: 32, cellSize: 32 },
  hard: { label: "16×22 (65 Mines)", rows: 16, cols: 22, mines: 65, cellSize: 28 },
};

type Cell = {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacent: number;
};

const NUMBER_COLORS: Record<number, string> = {
  1: "#2563eb",
  2: "#16a34a",
  3: "#dc2626",
  4: "#7c3aed",
  5: "#b91c1c",
  6: "#0891b2",
  7: "#1f2937",
  8: "#4b5563",
};

function createEmptyGrid(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacent: 0,
    }))
  );
}

function getNeighbors(r: number, c: number, rows: number, cols: number): [number, number][] {
  const res: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) res.push([nr, nc]);
    }
  }
  return res;
}

function plantMines(grid: Cell[][], safeRow: number, safeCol: number, mines: number): Cell[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const next = grid.map((row) => row.map((cell) => ({ ...cell })));

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const inSafeZone = Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1;
    if (!next[r][c].isMine && !inSafeZone) {
      next[r][c].isMine = true;
      placed++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (next[r][c].isMine) continue;
      next[r][c].adjacent = getNeighbors(r, c, rows, cols).filter(([nr, nc]) => next[nr][nc].isMine).length;
    }
  }

  return next;
}

export default function CyberMinesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [grid, setGrid] = useState<Cell[][]>(() => createEmptyGrid(CONFIG.easy.rows, CONFIG.easy.cols));
  const [minesPlaced, setMinesPlaced] = useState(false);
  const [status, setStatus] = useState<"idle" | "playing" | "won" | "lost">("idle");
  const [elapsed, setElapsed] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const [bestTimes, setBestTimes] = useState<Record<Difficulty, number | null>>({
    easy: null,
    medium: null,
    hard: null,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cybersweeper-best");
      if (saved) setBestTimes(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const timer = setInterval(() => setElapsed((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [status]);

  const resetGame = useCallback((level: Difficulty = difficulty) => {
    const cfg = CONFIG[level];
    setGrid(createEmptyGrid(cfg.rows, cfg.cols));
    setMinesPlaced(false);
    setStatus("idle");
    setElapsed(0);
  }, [difficulty]);

  const handleDifficulty = (level: Difficulty) => {
    setDifficulty(level);
    resetGame(level);
  };

  const revealFlood = (board: Cell[][], startR: number, startC: number) => {
    const rows = board.length;
    const cols = board[0].length;
    const stack: [number, number][] = [[startR, startC]];

    while (stack.length > 0) {
      const [r, c] = stack.pop()!;
      const cell = board[r][c];
      if (cell.isRevealed || cell.isFlagged) continue;
      cell.isRevealed = true;
      if (cell.adjacent === 0 && !cell.isMine) {
        for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
          if (!board[nr][nc].isRevealed && !board[nr][nc].isFlagged) {
            stack.push([nr, nc]);
          }
        }
      }
    }
  };

  const checkWin = (board: Cell[][], totalMines: number) => {
    let unrevealed = 0;
    for (const row of board) {
      for (const cell of row) {
        if (!cell.isRevealed) unrevealed++;
      }
    }
    return unrevealed === totalMines;
  };

  const triggerLoss = (board: Cell[][]) => {
    for (const row of board) {
      for (const cell of row) {
        if (cell.isMine) cell.isRevealed = true;
      }
    }
    setGrid(board);
    setStatus("lost");
  };

  const triggerWin = (board: Cell[][]) => {
    for (const row of board) {
      for (const cell of row) {
        if (cell.isMine) cell.isFlagged = true;
      }
    }
    setGrid(board);
    setStatus("won");
    setBestTimes((prev) => {
      const current = prev[difficulty];
      if (current === null || elapsed < current) {
        const updated = { ...prev, [difficulty]: elapsed };
        try { localStorage.setItem("cybersweeper-best", JSON.stringify(updated)); } catch { /* ignore */ }
        return updated;
      }
      return prev;
    });
  };

  const toggleFlag = (r: number, c: number) => {
    if (status === "won" || status === "lost") return;
    const next = grid.map((row) => row.map((cell) => ({ ...cell })));
    if (next[r][c].isRevealed) return;
    next[r][c].isFlagged = !next[r][c].isFlagged;
    setGrid(next);
  };

  const handleCellClick = (r: number, c: number) => {
    if (status === "won" || status === "lost") return;

    if (flagMode) {
      toggleFlag(r, c);
      return;
    }

    const cfg = CONFIG[difficulty];
    let working = grid.map((row) => row.map((cell) => ({ ...cell })));

    if (!minesPlaced) {
      working = plantMines(working, r, c, cfg.mines);
      setMinesPlaced(true);
      setStatus("playing");
    }

    const target = working[r][c];
    if (target.isFlagged) return;

    // Chord reveal if clicking an already revealed numbered cell
    if (target.isRevealed) {
      if (target.adjacent === 0) return;
      const neighbors = getNeighbors(r, c, cfg.rows, cfg.cols);
      const flaggedCount = neighbors.filter(([nr, nc]) => working[nr][nc].isFlagged).length;
      if (flaggedCount !== target.adjacent) return;

      for (const [nr, nc] of neighbors) {
        const neighbor = working[nr][nc];
        if (!neighbor.isFlagged && !neighbor.isRevealed) {
          if (neighbor.isMine) {
            triggerLoss(working);
            return;
          }
          revealFlood(working, nr, nc);
        }
      }
    } else {
      if (target.isMine) {
        triggerLoss(working);
        return;
      }
      revealFlood(working, r, c);
    }

    if (checkWin(working, cfg.mines)) {
      triggerWin(working);
    } else {
      setGrid(working);
    }
  };

  const flaggedCount = grid.flat().filter((c) => c.isFlagged).length;
  const minesRemaining = CONFIG[difficulty].mines - flaggedCount;
  const cfg = CONFIG[difficulty];

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <Link href="/games" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'PPSupplyMono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Quit Game
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontFamily: "'PPSupplyMono', monospace", fontSize: "1rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <Bomb size={16} color="var(--accent-primary)" /> <strong>{minesRemaining}</strong>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <Timer size={16} /> <strong>{elapsed}s</strong>
          </span>
          {bestTimes[difficulty] !== null && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Best: {bestTimes[difficulty]}s</span>
          )}
        </div>
      </div>

      {/* Controls Row */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {(Object.keys(CONFIG) as Difficulty[]).map((level) => {
          const active = difficulty === level;
          return (
            <button
              key={level}
              onClick={() => handleDifficulty(level)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: active ? "1px solid var(--text-main)" : "1px solid rgba(0,0,0,0.1)",
                background: active ? "var(--text-main)" : "var(--surface)",
                color: active ? "var(--bg-color)" : "var(--text-main)",
                fontFamily: "'PPSupplyMono', monospace",
                fontSize: "0.82rem",
                cursor: "pointer",
              }}
            >
              {CONFIG[level].label}
            </button>
          );
        })}

        <button
          onClick={() => setFlagMode((v) => !v)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: flagMode ? "1px solid var(--accent-primary)" : "1px solid rgba(0,0,0,0.1)",
            background: flagMode ? "var(--accent-primary)" : "var(--surface)",
            color: flagMode ? "#fff" : "var(--text-main)",
            fontFamily: "'PPSupplyMono', monospace",
            fontSize: "0.82rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <Flag size={14} /> {flagMode ? "Flag Mode: ON" : "Flag Mode: OFF"}
        </button>

        <button
          onClick={() => resetGame(difficulty)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(0,0,0,0.1)",
            background: "var(--surface)",
            color: "var(--text-main)",
            fontFamily: "'PPSupplyMono', monospace",
            fontSize: "0.82rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Status Banner */}
      {(status === "won" || status === "lost") && (
        <div style={{
          textAlign: "center",
          padding: "1.25rem",
          marginBottom: "1.5rem",
          borderRadius: "16px",
          background: status === "won" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
          border: status === "won" ? "1px solid #22c55e" : "1px solid #ef4444",
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'IntraNet', sans-serif", fontSize: "1.4rem", color: status === "won" ? "#16a34a" : "#dc2626" }}>
            {status === "won" ? <ShieldCheck size={22} /> : <Bomb size={22} />}
            {status === "won" ? `Grid Secured in ${elapsed}s!` : "Exploit Detonated!"}
          </div>
          <div style={{ marginTop: "0.75rem" }}>
            <button
              onClick={() => resetGame(difficulty)}
              style={{
                padding: "0.55rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: "var(--text-main)",
                color: "var(--bg-color)",
                fontFamily: "'IntraNet', sans-serif",
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Board */}
      <div style={{ overflowX: "auto", display: "flex", justifyContent: "center", paddingBottom: "1rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cfg.cols}, ${cfg.cellSize}px)`,
            gap: "3px",
            padding: "10px",
            background: "var(--surface)",
            borderRadius: "16px",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
            userSelect: "none",
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              let bg = "rgba(0,0,0,0.06)";
              if (cell.isRevealed) {
                bg = cell.isMine ? "rgba(239, 68, 68, 0.2)" : "var(--bg-color)";
              }

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    toggleFlag(r, c);
                  }}
                  style={{
                    width: `${cfg.cellSize}px`,
                    height: `${cfg.cellSize}px`,
                    padding: 0,
                    borderRadius: "6px",
                    border: cell.isRevealed ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(0,0,0,0.12)",
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: status === "won" || status === "lost" ? "default" : "pointer",
                    fontFamily: "'PPSupplyMono', monospace",
                    fontWeight: "bold",
                    fontSize: cfg.cellSize > 30 ? "0.95rem" : "0.8rem",
                    color: cell.adjacent > 0 ? NUMBER_COLORS[cell.adjacent] : "var(--text-main)",
                    transition: "background 0.1s ease",
                  }}
                >
                  {cell.isRevealed ? (
                    cell.isMine ? (
                      <Bomb size={16} color="#dc2626" />
                    ) : cell.adjacent > 0 ? (
                      cell.adjacent
                    ) : null
                  ) : cell.isFlagged ? (
                    <Flag size={14} color="var(--accent-primary)" fill="var(--accent-primary)" />
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>

      <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
        Left click to reveal · Right click (or Flag Mode) to flag · Click a revealed number to chord-clear
      </p>
    </div>
  );
}
