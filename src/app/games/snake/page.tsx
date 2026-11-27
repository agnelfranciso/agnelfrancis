import CyberSnake from "@/components/CyberSnake";

export const metadata = {
  title: "CyberSnake | Agnel Francis",
  description: "Classic arcade Snake with speed modes, wall-wrap toggle, and bonus nodes.",
};

export default function SnakePage() {
  return (
    <main className="page-container" style={{ paddingBottom: "6rem", minHeight: "100vh" }}>
      <header className="page-header" style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <h1 className="page-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>CyberSnake</h1>
        <p className="page-subtitle" style={{ margin: "0 auto" }}>
          Arrow keys, WASD, swipe, or D-pad. Space to pause.
        </p>
      </header>

      <CyberSnake />
    </main>
  );
}
