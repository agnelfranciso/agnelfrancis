import CyberMinesweeper from "@/components/CyberMinesweeper";

export const metadata = {
  title: "CyberSweeper | Agnel Francis",
  description: "Sweep the grid for hidden exploits without detonating a mine.",
};

export default function MinesweeperPage() {
  return (
    <main className="page-container" style={{ paddingBottom: "6rem", minHeight: "100vh" }}>
      <header className="page-header" style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <h1 className="page-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>CyberSweeper</h1>
        <p className="page-subtitle" style={{ margin: "0 auto" }}>
          First click is always safe. Flag every hidden exploit to secure the grid.
        </p>
      </header>

      <CyberMinesweeper />
    </main>
  );
}
