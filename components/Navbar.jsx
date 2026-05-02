"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WeatherWidget from "@/components/WeatherWidget";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(250,248,245,0.96)" : "var(--paper)",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: "1px solid var(--paper-border)",
      boxShadow: scrolled ? "0 2px 12px rgba(15,14,13,0.07)" : "none",
      transition: "all 0.3s ease",
    }}>
      {/* Date strip */}
   <div className="navbar-date" style={{
  background: "var(--ink)", color: "var(--paper)",
  display: "flex", alignItems: "center",
  justifyContent: "space-between",
  padding: "5px 1.25rem",
  flexWrap: "wrap", gap: "0.5rem",
}}>
  {/* Date */}
  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
    {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
  </span>

  {/* Weather */}
  <WeatherWidget />
</div>




      {/* Main navbar */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 1.25rem",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 60,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
          fontWeight: 700, color: "var(--ink)", textDecoration: "none",
        }}>
          News<span style={{ color: "var(--accent-red)" }}>Nova</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "1.75rem", alignItems: "center" }} className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem", fontWeight: 500,
              color: isActive(l.href) ? "var(--accent-red)" : "var(--ink)",
              textDecoration: "none",
              borderBottom: isActive(l.href) ? "2px solid var(--accent-red)" : "2px solid transparent",
              paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
            }}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "6px", display: "none",
          }}
          aria-label="Menu"
        >
          <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{
              display: "block", height: 2, background: "var(--ink)", borderRadius: 2,
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              transition: "transform 0.3s",
            }} />
            <span style={{
              display: "block", height: 2, background: "var(--ink)", borderRadius: 2,
              opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s",
            }} />
            <span style={{
              display: "block", height: 2, background: "var(--ink)", borderRadius: 2,
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              transition: "transform 0.3s",
            }} />
          </div>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div style={{
        maxHeight: menuOpen ? 200 : 0,
        overflow: "hidden",
        transition: "max-height 0.3s ease",
        background: "var(--paper)",
        borderTop: menuOpen ? "1px solid var(--paper-border)" : "none",
      }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} style={{
            display: "block", padding: "0.85rem 1.25rem",
            fontWeight: 500, fontSize: "1rem",
            color: isActive(l.href) ? "var(--accent-red)" : "var(--ink)",
            textDecoration: "none",
            borderBottom: "1px solid var(--paper-border)",
          }}>
            {l.label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
