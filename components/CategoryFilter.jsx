"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function CategoryFilter({ categories, active }) {
  const router = useRouter();

  const handleSelect = (slug) => {
    if (slug === "all") {
      router.push("/");
    } else {
      router.push(`/category/${slug}`);
    }
  };

  const all = [{ slug: "all", name: "All", color: "var(--ink)" }, ...categories];

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        padding: "1rem 0",
      }}
    >
      {all.map((cat) => {
        const isActive = cat.slug === (active || "all");
        return (
          <button
            key={cat.slug}
            onClick={() => handleSelect(cat.slug)}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.35em 0.9em",
              borderRadius: 2,
              border: `2px solid ${isActive ? (cat.color || "var(--ink)") : "var(--paper-border)"}`,
              background: isActive ? (cat.color || "var(--ink)") : "transparent",
              color: isActive ? "white" : "var(--ink-muted)",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontWeight: 500,
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
