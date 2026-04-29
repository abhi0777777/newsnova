import PostCard from "../../../../components/PostCard";
import CategoryFilter from "../../../../components/CategoryFilter";
import connectDB from "../../../../lib/mongodb";
import Post from "../../../../models/Post";
import Category from "../../../../models/Category";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  await connectDB();
  const cat = await Category.findOne({ slug: params.slug });
  if (!cat) return {};
  return { title: `${cat.name} News`, description: cat.description };
}

async function getData(slug) {
  await connectDB();
  const [cat, categories] = await Promise.all([
    Category.findOne({ slug }),
    Category.find().sort({ name: 1 }).lean(),
  ]);
  if (!cat) return null;

  const posts = await Post.find({ category: cat._id, published: true })
    .populate("category", "name slug color")
    .sort({ createdAt: -1 })
    .limit(30)
    .select("title slug excerpt content coverImage category readTime createdAt")
    .lean();

  return { cat, categories, posts };
}

export default async function CategoryPage({ params }) {
  const data = await getData(params.slug);
  if (!data) notFound();

  const { cat, categories, posts } = data;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 4rem" }}>
      <CategoryFilter categories={categories} active={params.slug} />
      <hr className="divider-rule" />

      {/* Category header */}
      <div style={{ marginBottom: "2rem" }}>
        <span
          className="category-badge"
          style={{ background: cat.color, fontSize: "0.75rem", marginBottom: "0.5rem" }}
        >
          {cat.name}
        </span>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontWeight: 700,
            marginTop: "0.5rem",
          }}
        >
          {cat.name} News
        </h1>
        {cat.description && (
          <p style={{ color: "var(--ink-muted)", marginTop: "0.4rem" }}>
            {cat.description}
          </p>
        )}
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "var(--ink-muted)", marginTop: "0.4rem" }}>
          {posts.length} {posts.length === 1 ? "story" : "stories"}
        </p>
      </div>

      {posts.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--ink-muted)", textAlign: "center", padding: "3rem 0" }}>
          No stories in this category yet.
        </p>
      )}
    </div>
  );
}
