import Link from "next/link";
import Image from "next/image";
import { formatRelativeDate, truncate } from "../lib/utils";

export default function PostCard({ post, featured = false }) {
  const catColor = post.category?.color || "var(--accent-red)";

  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} style={{ textDecoration: "none" }}>
        <article
          className="post-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            background: "white",
            border: "1px solid var(--paper-border)",
            borderRadius: 6,
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              height: 280,
              background: "var(--paper-warm)",
              overflow: "hidden",
            }}
          >
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ink-muted)",
                  fontSize: "2.5rem",
                }}
              >
                📰
              </div>
            )}
          </div>

          {/* Content */}
          <div
            style={{
              padding: "2rem 2rem 2rem 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span
              className="category-badge"
              style={{ background: catColor, marginBottom: "0.75rem", alignSelf: "flex-start" }}
            >
              {post.category?.name}
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "0.75rem",
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              {truncate(post.excerpt || post.content, 140)}
            </p>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--ink-muted)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {formatRelativeDate(post.createdAt)} · {post.readTime} min read
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Regular card
  return (
    <Link href={`/post/${post.slug}`} style={{ textDecoration: "none" }}>
      <article
        className="post-card"
        style={{
          background: "white",
          border: "1px solid var(--paper-border)",
          borderRadius: 6,
          overflow: "hidden",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            height: 180,
            background: "var(--paper-warm)",
            flexShrink: 0,
          }}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink-muted)",
                fontSize: "2rem",
              }}
            >
              📰
            </div>
          )}
        </div>

        {/* Content */}
        <div
          style={{
            padding: "1rem 1.1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <span
            className="category-badge"
            style={{
              background: catColor,
              alignSelf: "flex-start",
              marginBottom: "0.6rem",
            }}
          >
            {post.category?.name}
          </span>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--ink)",
              marginBottom: "0.5rem",
              lineHeight: 1.35,
              flex: 1,
            }}
          >
            {post.title}
          </h3>
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--ink-muted)",
              lineHeight: 1.55,
              marginBottom: "0.75rem",
            }}
          >
            {truncate(post.excerpt || post.content, 100)}
          </p>
          <div
            style={{
              fontSize: "0.7rem",
              color: "var(--ink-muted)",
              fontFamily: "'DM Mono', monospace",
              marginTop: "auto",
            }}
          >
            {formatRelativeDate(post.createdAt)} · {post.readTime} min read
          </div>
        </div>
      </article>
    </Link>
  );
}
