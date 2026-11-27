import Game2048 from "@/components/Game2048";

export const metadata = {
  title: "2048: Tech Stack Edition | Agnel Francis",
  description: "Slide and merge tech stack tiles from HTML to SHIP (2048).",
};

export default function Game2048Page() {
  return (
    <main className="page-container" style={{ paddingBottom: "6rem", minHeight: "100vh" }}>
      <header className="page-header" style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <h1 className="page-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>2048: Stack</h1>
        <p className="page-subtitle" style={{ margin: "0 auto" }}>
          Merge matching stack layers from HTML (2) all the way to SHIP! (2048).
        </p>
      </header>

      <Game2048 />
    </main>
  );
}
