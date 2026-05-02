export default function Loading() {
  const shimmer = {
    background: "linear-gradient(90deg, #ede8e1 25%, #f5f0e8 50%, #ede8e1 75%)",
    backgroundSize: "700px 100%",
    animation: "shimmer 1.4s infinite linear",
    borderRadius: 4,
  };
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "1rem 1.25rem 5rem" }}>
      <style>{`@keyframes shimmer { 0%{background-position:-700px 0} 100%{background-position:700px 0} }`}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
        <div style={{ width: 80, height: 22, ...shimmer }} />
        <div style={{ width: "95%", height: 36, ...shimmer }} />
        <div style={{ width: "75%", height: 36, ...shimmer }} />
        <div style={{ display: "flex", gap: "1rem" }}>
          {[100, 80, 70].map((w, i) => <div key={i} style={{ width: w, height: 12, ...shimmer }} />)}
        </div>
        <div style={{ width: "100%", height: 340, ...shimmer, marginTop: 8 }} />
        {[100, 90, 100, 85, 95, 80].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 14, ...shimmer }} />
        ))}
      </div>
    </div>
  );
}