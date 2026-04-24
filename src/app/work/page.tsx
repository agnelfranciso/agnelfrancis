import Projects from "@/components/Projects";

export default function WorkPage() {
  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">Selected Work</h1>
        <p className="page-subtitle">A curated collection of my recent projects, experiments, and open-source contributions.</p>
      </div>
      <Projects />
    </main>
  );
}
