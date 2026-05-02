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
      <div style={{ width: 80, height: 22, ...shimmer, margin: "1.5rem 0 0.5rem" }} />
      <div style={{ width: 200, height: 32, ...shimmer, marginBottom: "1.5rem" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.5rem" }}>
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} style={{ background: "white", border: "1px solid #e8e2d9", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: 180, ...shimmer, borderRadius: 0 }} />
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[80, "90%", "70%", "100%"].map((w, j) => (
                <div key={j} style={{ width: w, height: j === 0 ? 18 : 13, ...shimmer }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}