import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import Category from "@/models/Category";
import { formatDate } from "@/lib/utils";

export const revalidate = 30;

export async function generateMetadata({ params }) {
  await connectDB();
  const post = await Post.findOne({ slug: params.slug }).populate("category", "name").lean();
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords: post.tags?.join(", "),
    openGraph: {
      title: post.title, description: post.excerpt,
      url: `https://newsnova.online/post/${post.slug}`,
      siteName: "NewsNova",
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : [],
      type: "article", publishedTime: post.createdAt,
    },
    twitter: {
      card: "summary_large_image", title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

async function getPost(slug) {
  await connectDB();
  return Post.findOneAndUpdate(
    { slug, published: true },
    { $inc: { views: 1 } },
    { new: true }
  ).populate("category", "name slug color").lean();
}

async function getRelated(categoryId, currentSlug) {
  await connectDB();
  return Post.find({ category: categoryId, slug: { $ne: currentSlug }, published: true })
    .sort({ createdAt: -1 }).limit(3)
    .select("title slug coverImage readTime createdAt")
    .populate("category", "name color").lean();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const related = await getRelated(post.category._id, post.slug);

  return (
    <div className="page-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.25rem 5rem" }}>
      {/* Breadcrumb */}
      <nav style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "var(--ink-muted)", padding: "1rem 0 0.5rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        <Link href="/" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>Home</Link>
        {" / "}
        <Link href={`/category/${post.category.slug}`} style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
          {post.category.name}
        </Link>
        {" / "}
        <span style={{ color: "var(--ink)" }}>{post.title.slice(0, 40)}…</span>
      </nav>

      <hr className="divider-rule" />

      {/* Article */}
      <article style={{ maxWidth: 720, margin: "0 1rem" }}>
        <span className="category-badge" style={{ background: post.category.color }}>
          {post.category.name}
        </span>

        <h1 className="post-title" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
          fontWeight: 700, lineHeight: 1.2,
          marginTop: "0.75rem", marginBottom: "1rem",
        }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}>
          <span>📅 {formatDate(post.createdAt)}</span>
          <span>⏱ {post.readTime} min read</span>
          <span>👁 {post.views} views</span>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div style={{ position: "relative", width: "100%", height: "clamp(200px, 40vw, 420px)", borderRadius: 6, overflow: "hidden", marginBottom: "2rem" }}>
            <Image src={post.coverImage} alt={post.title} fill priority
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem", color: "var(--ink-muted)", borderLeft: "3px solid var(--accent-gold)", paddingLeft: "1rem", marginBottom: "2rem" }}>
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ marginTop: "2.5rem", paddingTop: "1rem", borderTop: "1px solid var(--paper-border)", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", padding: "0.2em 0.7em", background: "var(--paper-warm)", border: "1px solid var(--paper-border)", borderRadius: 2, color: "var(--ink-muted)" }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ marginTop: "4rem", maxWidth: 720, margin: "4rem auto 0" }}>
          <hr className="divider-rule" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "1.5rem" }}>
            More from {post.category.name}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}>
            {related.map((r) => (
              <Link key={r._id} href={`/post/${r.slug}`} style={{ textDecoration: "none" }}>
                <div className="post-card" style={{ background: "white", border: "1px solid var(--paper-border)", borderRadius: 6, overflow: "hidden" }}>
                  {r.coverImage && (
                    <div style={{ position: "relative", height: 120 }}>
                      <Image src={r.coverImage} alt={r.title} fill style={{ objectFit: "cover" }} sizes="250px" />
                    </div>
                  )}
                  <div style={{ padding: "0.9rem" }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.35 }}>{r.title}</p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "var(--ink-muted)", marginTop: "0.5rem" }}>{r.readTime} min read</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
