import type { Metadata } from "next";
import ProjectMemoryMatch from "@/components/ProjectMemoryMatch";

export const metadata: Metadata = {
  title: "Project Memory Match | Agnel Francis",
  description: "A memory matching game using my portfolio projects.",
};

export default function MemoryMatchPage() {
  return (
    <main className="page-container" style={{ minHeight: "100vh", paddingTop: "4rem", paddingBottom: "4rem" }}>
      <div className="page-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 className="page-title" style={{ fontSize: "2.5rem" }}>Project Memory Match</h1>
        <p className="page-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Find all the matching project pairs. The lower your moves, the better!
        </p>
      </div>

      <ProjectMemoryMatch />
    </main>
  );
}
