"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight, Play, Pause, RotateCcw, Trophy, Zap } from "lucide-react";

const GRID_SIZE = 20;

type Point = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type SpeedKey = "chill" | "normal" | "hyper";

const SPEEDS: Record<SpeedKey, { label: string; ms: number }> = {
  chill: { label: "Chill", ms: 145 },
  normal: { label: "Normal", ms: 105 },
  hyper: { label: "Hyper", ms: 72 },
};

const OPPOSITE: Record<Dir, Dir> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

function randomFreeCell(occupied: Point[]): Point {
  const occupiedSet = new Set(occupied.map((p) => `${p.x},${p.y}`));
  const free: Point[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!occupiedSet.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)] || { x: 0, y: 0 };
}

export default function CyberSnake() {
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [bonusFood, setBonusFood] = useState<Point | null>(null);
  const [bonusTicks, setBonusTicks] = useState(0);
  const [dir, setDir] = useState<Dir>("RIGHT");
  const dirQueue = useRef<Dir[]>([]);
  const [speed, setSpeed] = useState<SpeedKey>("normal");
  const [wrapWalls, setWrapWalls] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cybersnake-best");
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch { /* ignore */ }
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    setSnake(initialSnake);
    setFood(randomFreeCell(initialSnake));
    setBonusFood(null);
    setBonusTicks(0);
    setDir("RIGHT");
    dirQueue.current = [];
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  }, []);

  const queueDirection = useCallback((nextDir: Dir) => {
    if (gameOver) return;
    const lastPlanned = dirQueue.current.length > 0 ? dirQueue.current[dirQueue.current.length - 1] : dir;
    if (nextDir === lastPlanned || OPPOSITE[nextDir] === lastPlanned) return;
    if (dirQueue.current.length < 2) {
      dirQueue.current.push(nextDir);
    }
    if (!isRunning && !gameOver) {
      setIsRunning(true);
    }
  }, [dir, gameOver, isRunning]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") queueDirection("UP");
      else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") queueDirection("DOWN");
      else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") queueDirection("LEFT");
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") queueDirection("RIGHT");
      else if (e.key === " ") {
        if (gameOver) resetGame();
        else setIsRunning((r) => !r);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [queueDirection, gameOver, resetGame]);

  useEffect(() => {
    if (!isRunning || gameOver) return;

    const interval = setInterval(() => {
      let activeDir = dir;
      if (dirQueue.current.length > 0) {
        activeDir = dirQueue.current.shift()!;
        setDir(activeDir);
      }

      setSnake((prev) => {
        const head = prev[0];
        let nx = head.x;
        let ny = head.y;
        if (activeDir === "UP") ny--;
        else if (activeDir === "DOWN") ny++;
        else if (activeDir === "LEFT") nx--;
        else if (activeDir === "RIGHT") nx++;

        if (wrapWalls) {
          nx = (nx + GRID_SIZE) % GRID_SIZE;
          ny = (ny + GRID_SIZE) % GRID_SIZE;
        } else if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
          setGameOver(true);
          setIsRunning(false);
          return prev;
        }

        const ateNormal = nx === food.x && ny === food.y;
        const ateBonus = bonusFood !== null && nx === bonusFood.x && ny === bonusFood.y;
        const bodyToCheck = ateNormal || ateBonus ? prev : prev.slice(0, -1);

        if (bodyToCheck.some((seg) => seg.x === nx && seg.y === ny)) {
          setGameOver(true);
          setIsRunning(false);
          return prev;
        }

        const nextSnake = [{ x: nx, y: ny }, ...prev];
        if (!ateNormal && !ateBonus) nextSnake.pop();

        if (ateNormal) {
          const nextScore = score + 10;
          setScore(nextScore);
          if (nextScore > highScore) {
            setHighScore(nextScore);
            try { localStorage.setItem("cybersnake-best", String(nextScore)); } catch { /* ignore */ }
          }
          setFood(randomFreeCell(nextSnake));
          if (!bonusFood && Math.random() < 0.25) {
            setBonusFood(randomFreeCell([...nextSnake, food]));
            setBonusTicks(45);
          }
        } else if (ateBonus) {
          const nextScore = score + 30;
          setScore(nextScore);
          if (nextScore > highScore) {
            setHighScore(nextScore);
            try { localStorage.setItem("cybersnake-best", String(nextScore)); } catch { /* ignore */ }
          }
          setBonusFood(null);
          setBonusTicks(0);
        }

        return nextSnake;
      });

      if (bonusFood) {
        setBonusTicks((t) => {
          if (t <= 1) {
            setBonusFood(null);
            return 0;
          }
          return t - 1;
        });
      }
    }, SPEEDS[speed].ms);

    return () => clearInterval(interval);
  }, [isRunning, gameOver, dir, food, bonusFood, score, highScore, speed, wrapWalls]);

  const snakeMap = new Map<string, number>();
  snake.forEach((seg, idx) => snakeMap.set(`${seg.x},${seg.y}`, idx));

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
        <Link href="/games" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'PPSupplyMono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Quit Game
        </Link>

        <div style={{ display: "flex", gap: "0.75rem", fontFamily: "'PPSupplyMono', monospace" }}>
          <div style={{ background: "var(--surface)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "10px", padding: "0.4rem 0.85rem" }}>
            Score: <strong>{score}</strong>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "10px", padding: "0.4rem 0.85rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            <Trophy size={14} color="var(--accent-primary)" /> <strong style={{ color: "var(--accent-primary)" }}>{highScore}</strong>
          </div>
        </div>
      </div>

      {/* Mode Controls */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {(Object.keys(SPEEDS) as SpeedKey[]).map((key) => {
          const active = speed === key;
          return (
            <button
              key={key}
              onClick={() => setSpeed(key)}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "999px",
                border: active ? "1px solid var(--text-main)" : "1px solid rgba(0,0,0,0.1)",
                background: active ? "var(--text-main)" : "var(--surface)",
                color: active ? "var(--bg-color)" : "var(--text-main)",
                fontFamily: "'PPSupplyMono', monospace",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {SPEEDS[key].label}
            </button>
          );
        })}

        <button
          onClick={() => setWrapWalls((w) => !w)}
          style={{
            padding: "0.45rem 0.9rem",
            borderRadius: "999px",
            border: wrapWalls ? "1px solid var(--accent-blue)" : "1px solid rgba(0,0,0,0.1)",
            background: wrapWalls ? "var(--accent-blue)" : "var(--surface)",
            color: wrapWalls ? "#fff" : "var(--text-main)",
            fontFamily: "'PPSupplyMono', monospace",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          Walls: {wrapWalls ? "Wrap" : "Solid"}
        </button>

        <button
          onClick={() => (gameOver ? resetGame() : setIsRunning((r) => !r))}
          style={{
            padding: "0.45rem 0.9rem",
            borderRadius: "999px",
            border: "none",
            background: "var(--accent-primary)",
            color: "#fff",
            fontFamily: "'PPSupplyMono', monospace",
            fontSize: "0.8rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          {gameOver ? <><RotateCcw size={14} /> Restart</> : isRunning ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Play</>}
        </button>
      </div>

      {/* Board */}
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
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
          if (Math.abs(dx) > Math.abs(dy)) queueDirection(dx > 0 ? "RIGHT" : "LEFT");
          else queueDirection(dy > 0 ? "DOWN" : "UP");
        }}
        style={{
          position: "relative",
          aspectRatio: "1/1",
          width: "100%",
          maxWidth: "460px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          background: "#111318",
          borderRadius: "18px",
          padding: "8px",
          gap: "1px",
          border: "2px solid rgba(0,0,0,0.15)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
          const x = idx % GRID_SIZE;
          const y = Math.floor(idx / GRID_SIZE);
          const key = `${x},${y}`;
          const segIdx = snakeMap.get(key);
          const isHead = segIdx === 0;
          const isBody = segIdx !== undefined && segIdx > 0;
          const isFood = food.x === x && food.y === y;
          const isBonus = bonusFood !== null && bonusFood.x === x && bonusFood.y === y;

          let bg = "rgba(255,255,255,0.03)";
          let radius = "3px";
          if (isHead) {
            bg = "#22c55e";
            radius = "5px";
          } else if (isBody) {
            bg = "#16a34a";
            radius = "4px";
          } else if (isFood) {
            bg = "#f97316";
            radius = "50%";
          } else if (isBonus) {
            bg = "#eab308";
            radius = "50%";
          }

          return <div key={key} style={{ background: bg, borderRadius: radius }} />;
        })}

        {(!isRunning || gameOver) && (
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            background: "rgba(17, 19, 24, 0.78)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
            padding: "1.5rem",
          }}>
            <h2 style={{ fontFamily: "'IntraNet', sans-serif", fontSize: "2rem", marginBottom: "0.5rem" }}>
              {gameOver ? "Connection Lost" : "CyberSnake"}
            </h2>
            <p style={{ fontFamily: "'PPSupplyMono', monospace", fontSize: "0.9rem", color: "#d1d5db", marginBottom: "1.25rem" }}>
              {gameOver ? `Final Score: ${score}` : "Collect orange packets (+10) & gold nodes (+30)"}
            </p>
            <button
              onClick={() => (gameOver ? resetGame() : setIsRunning(true))}
              style={{
                padding: "0.75rem 1.75rem",
                borderRadius: "999px",
                border: "none",
                background: "#22c55e",
                color: "#052e16",
                fontWeight: "bold",
                fontFamily: "'IntraNet', sans-serif",
                fontSize: "1rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              {gameOver ? <><RotateCcw size={16} /> Play Again</> : <><Zap size={16} /> Start Run</>}
            </button>
          </div>
        )}
      </div>

      {/* Mobile / Click D-Pad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 52px)", gap: "0.5rem", justifyContent: "center", marginTop: "1.25rem" }}>
        <div />
        <button onClick={() => queueDirection("UP")} aria-label="Up" style={{ width: "52px", height: "46px", padding: 0, borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ArrowUp size={20} />
        </button>
        <div />
        <button onClick={() => queueDirection("LEFT")} aria-label="Left" style={{ width: "52px", height: "46px", padding: 0, borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ArrowLeft size={20} />
        </button>
        <button onClick={() => queueDirection("DOWN")} aria-label="Down" style={{ width: "52px", height: "46px", padding: 0, borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ArrowDown size={20} />
        </button>
        <button onClick={() => queueDirection("RIGHT")} aria-label="Right" style={{ width: "52px", height: "46px", padding: 0, borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
