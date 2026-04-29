export const metadata = {
  title: "About | NewsNova",
  description: "Learn about NewsNova — an independent digital news platform committed to fast, accurate and unbiased journalism. Know our mission, values and the team behind the stories.",
  openGraph: {
    title: "About | NewsNova",
    description: "Fast, accurate news delivery.",
    url: "https://newsnova.online/about",
    siteName: "NewsNova",
    type: "website",
  },
};
export default function AboutPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
        }}
      >
        About Us
      </span>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.5rem",
          fontWeight: 700,
          margin: "0.5rem 0 1.5rem",
          lineHeight: 1.2,
        }}
      >
        Journalism That Matters
      </h1>
      <hr className="divider-rule" />

      <div className="post-content" style={{ marginTop: "1.5rem" }}>
        <p>
          <strong>NewsNova</strong> is an independent digital news platform dedicated to
          delivering fast, accurate, and unbiased reporting on the stories that matter
          most — from technology and politics to sports, culture, and beyond.
        </p>
        <p>
          We believe that great journalism doesn't require sensationalism. Our goal is
          simple: give you the facts, the context, and the clarity to understand the
          world around you.
        </p>
        <h2>Our Mission</h2>
        <p>
          To democratize access to quality news. We cover stories from India and around
          the globe, with a focus on depth, accuracy, and reader trust.
        </p>
        <h2>Why NewsNova?</h2>
        <p>
          Founded in 2024, NewsNova was built on the belief that readers deserve better
          — better writing, better design, and a reading experience that respects their
          time and intelligence.
        </p>
        <h2>Contact</h2>
        <p>
          Have a tip, correction, or collaboration inquiry? Reach us via our{" "}
          <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  );
}
