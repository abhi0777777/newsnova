export default function Loading() {
  const shimmer = {
    background: "linear-gradient(90deg, #ede8e1 25%, #f5f0e8 50%, #ede8e1 75%)",
    backgroundSize: "700px 100%",
    animation: "shimmer 1.4s infinite linear",
    borderRadius: 4,
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 4rem" }}>
      <style>{`@keyframes shimmer { 0%{background-position:-700px 0} 100%{background-position:700px 0} }`}</style>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: "0.5rem", padding: "1rem 0" }}>
        {[80, 100, 90, 110, 85].map((w, i) => (
          <div key={i} style={{ width: w, height: 28, ...shimmer }} />
        ))}
      </div>

      <div style={{ borderTop: "3px double #e8e2d9", margin: "0.5rem 0 1.5rem" }} />

      {/* Featured skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", border: "1px solid #e8e2d9", borderRadius: 6, overflow: "hidden", background: "white", marginBottom: "2rem" }}>
        <div style={{ height: 280, ...shimmer, borderRadius: 0 }} />
        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
          {[80, "90%", "70%", "100%", "85%", 110].map((w, i) => (
            <div key={i} style={{ width: w, height: i < 3 ? 22 : i < 5 ? 13 : 12, ...shimmer }} />
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e8e2d9", margin: "1.5rem 0" }} />

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.5rem" }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ background: "white", border: "1px solid #e8e2d9", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: 180, ...shimmer, borderRadius: 0 }} />
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[80, "90%", "70%", "100%", "80%", 100].map((w, j) => (
                <div key={j} style={{ width: w, height: j === 0 ? 18 : j < 3 ? 15 : 12, ...shimmer }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}