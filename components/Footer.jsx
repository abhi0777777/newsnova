import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", marginTop: "4rem" }}>
      <div className="footer-grid" style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "3rem 1.25rem 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2rem",
      }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            News<span style={{ color: "var(--accent-gold)" }}>Nova</span>
          </div>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "rgba(250,248,245,0.6)", maxWidth: 220 }}>
            Fast, accurate, independent news — delivered straight to you.
          </p>
        </div>

        {/* Pages */}
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent-gold)", marginBottom: "1rem" }}>
            Pages
          </div>
          {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map((l) => (
            <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.875rem", color: "rgba(250,248,245,0.75)", textDecoration: "none", marginBottom: "0.4rem" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent-gold)", marginBottom: "1rem" }}>
            Legal
          </div>
          {[{ href: "/privacy-policy", label: "Privacy Policy" }, { href: "/terms-conditions", label: "Terms & Conditions" }].map((l) => (
            <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.875rem", color: "rgba(250,248,245,0.75)", textDecoration: "none", marginBottom: "0.4rem" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(250,248,245,0.1)", textAlign: "center", padding: "1rem", fontSize: "0.75rem", color: "rgba(250,248,245,0.4)", fontFamily: "'DM Mono', monospace" }}>
        © {year} NewsNova · newsnova.online
      </div>
    </footer>
  );
}
