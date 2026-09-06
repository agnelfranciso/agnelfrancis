import type { Metadata } from "next";
import GuessWatchlist from "@/components/GuessWatchlist";

export const metadata: Metadata = {
  title: "Guess My Watchlist | Agnel Francis",
  description: "Guess the movies and TV shows on my watchlist before time runs out.",
};

export default function WatchlistPage() {
  return (
    <main className="page-container" style={{ minHeight: "100vh", paddingTop: "4rem", paddingBottom: "4rem" }}>
      <div className="page-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="page-title" style={{ fontSize: "2.5rem" }}>Guess My Watchlist</h1>
        <p className="page-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          I have 27 movies and shows on my list. How many can you guess in 5 minutes?
        </p>
      </div>

      <GuessWatchlist />
    </main>
  );
}
