import type { Metadata } from "next";
import PortfolioWordle from "@/components/PortfolioWordle";

export const metadata: Metadata = {
  title: "Portfolio Wordle | Agnel Francis",
  description: "Guess the 5-letter hidden word from my portfolio in 6 tries.",
};

export default function WordlePage() {
  return (
    <main className="page-container" style={{ minHeight: "100vh", paddingTop: "4rem", paddingBottom: "4rem" }}>
      <div className="page-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="page-title" style={{ fontSize: "2.5rem" }}>Portfolio Wordle</h1>
        <p className="page-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Guess the 5-letter hidden word in 6 tries.
        </p>
      </div>

      <PortfolioWordle />
    </main>
  );
}
