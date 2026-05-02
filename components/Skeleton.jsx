export function Sk({ w = "100%", h = 16, r = 4, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }}
    />
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="featured-grid" style={{ border: "1px solid var(--paper-border)", borderRadius: 6, overflow: "hidden", background: "white" }}>
      <div className="skeleton" style={{ height: 280, borderRadius: 0 }} />
      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
        <Sk w={80} h={20} />
        <Sk w="90%" h={26} />
        <Sk w="70%" h={26} />
        <Sk w="100%" h={13} />
        <Sk w="85%" h={13} />
        <Sk w="90%" h={13} />
        <Sk w={110} h={12} />
      </div>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div style={{ background: "white", border: "1px solid var(--paper-border)", borderRadius: 6, overflow: "hidden" }}>
      <div className="skeleton" style={{ height: 180, borderRadius: 0 }} />
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        <Sk w={80} h={18} />
        <Sk w="90%" h={15} />
        <Sk w="70%" h={15} />
        <Sk w="100%" h={12} />
        <Sk w="80%" h={12} />
        <Sk w={100} h={11} style={{ marginTop: 4 }} />
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="page-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 4rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", padding: "1rem 0", flexWrap: "wrap" }}>
        {[80, 100, 90, 110, 85, 95].map((w, i) => <Sk key={i} w={w} h={28} />)}
      </div>
      <div style={{ borderTop: "3px double var(--paper-border)", margin: "0.5rem 0 1.5rem" }} />
      <FeaturedSkeleton />
      <div style={{ borderTop: "1px solid var(--paper-border)", margin: "2rem 0" }} />
      <div className="posts-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => <PostCardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export function PostPageSkeleton() {
  return (
    <div className="page-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 5rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", padding: "1rem 0 0.5rem" }}>
        <Sk w={40} h={12} /><Sk w={8} h={12} /><Sk w={80} h={12} />
      </div>
      <div style={{ borderTop: "3px double var(--paper-border)", margin: "0.5rem 0 1.5rem" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Sk w={80} h={22} />
        <Sk w="95%" h={36} />
        <Sk w="75%" h={36} />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Sk w={100} h={12} /><Sk w={80} h={12} /><Sk w={70} h={12} />
        </div>
        <Sk w="100%" h={340} style={{ marginTop: 8, borderRadius: 6 }} />
        {[100, 90, 100, 85, 95, 80, 100, 75].map((w, i) => (
          <Sk key={i} w={`${w}%`} h={14} />
        ))}
      </div>
    </div>
  );
}

export function CategoryPageSkeleton() {
  return (
    <div className="page-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 4rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", padding: "1rem 0", flexWrap: "wrap" }}>
        {[80, 100, 90, 110, 85].map((w, i) => <Sk key={i} w={w} h={28} />)}
      </div>
      <div style={{ borderTop: "3px double var(--paper-border)", margin: "0.5rem 0 1.5rem" }} />
      <Sk w={80} h={22} style={{ marginBottom: 8 }} />
      <Sk w={200} h={32} style={{ marginBottom: 8 }} />
      <Sk w={120} h={12} style={{ marginBottom: "1.5rem" }} />
      <div className="posts-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => <PostCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
