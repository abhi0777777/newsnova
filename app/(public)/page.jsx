import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import Category from "@/models/Category";

export const revalidate = 60;

async function getData() {
  await connectDB();
  const [posts, categories] = await Promise.all([
    Post.find({ published: true })
      .populate("category", "name slug color")
      .sort({ createdAt: -1 })
      .limit(30)
      .select("title slug excerpt content coverImage category readTime createdAt views")
      .lean(),
    Category.find().sort({ name: 1 }).lean(),
  ]);
  return { posts, categories };
}

export default async function HomePage() {
  const { posts, categories } = await getData();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="page-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 4rem" }}>
      <CategoryFilter categories={categories} active="all" />
      <hr className="divider-rule" />

      {/* Featured */}
      {featured && (
        <section style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "0.75rem" }}>
            — Top Story
          </div>
          <PostCard post={featured} featured />
        </section>
      )}

      <hr className="divider-thin" style={{ marginBottom: "2rem" }} />

      {/* Grid */}
      {rest.length > 0 ? (
        <div className="posts-grid">
          {rest.map((post, i) => (
            <div key={post._id} className={`fade-up-${Math.min(i % 3 + 1, 3)}`}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : !featured && (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--ink-muted)" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>No stories yet.</p>
          <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Check back soon.</p>
        </div>
      )}
    </div>
  );
}
