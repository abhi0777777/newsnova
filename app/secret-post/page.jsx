"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ImageUploader from "../../components/ImageUploader";
import toast from "react-hot-toast";

// Load Tiptap editor client-side only
const PostEditor = dynamic(() => import("../../components/PostEditor"), { ssr: false });

export default function SecretPostPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categoryId: "",
    tags: "",
    published: true,
  });

  // Category creation
  const [newCat, setNewCat] = useState({ name: "", color: "#c0392b" });

  // Auth check
  const handleAuth = (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    localStorage.setItem("nn_token", token);
    setAuthed(true);
    fetchCategories(token);
  };

  useEffect(() => {
    const saved = localStorage.getItem("nn_token");
    if (saved) {
      setToken(saved);
      setAuthed(true);
      fetchCategories(saved);
    }
  }, []);

  const fetchCategories = async (t) => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    if (Array.isArray(data)) setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.categoryId) {
      toast.error("Title, content, and category are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success(`Post published: ${data.slug}`);
      setForm({ title: "", excerpt: "", content: "", coverImage: "", categoryId: "", tags: "", published: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCat),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Category created!");
      setCategories((prev) => [...prev, data]);
      setNewCat({ name: "", color: "#c0392b" });
    } else {
      toast.error(data.error);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.7rem 0.9rem",
    border: "1px solid var(--paper-border)",
    borderRadius: 4,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    background: "white",
    color: "var(--ink)",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 600,
    marginBottom: "0.35rem",
    fontFamily: "'DM Mono', monospace",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--ink-muted)",
  };

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.25rem",
        }}
      >
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            background: "white",
            border: "1px solid var(--paper-border)",
            borderRadius: 8,
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔐</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "0.25rem" }}>
            Admin Access
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}>
            Enter your secret token to continue.
          </p>
          <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="password"
              placeholder="Secret token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={inputStyle}
              required
            />
            <button
              type="submit"
              style={{
                background: "var(--ink)",
                color: "white",
                border: "none",
                borderRadius: 4,
                padding: "0.75rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Enter →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent-red)" }}>
            Admin Panel
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, marginTop: "0.25rem" }}>
            New Post
          </h1>
        </div>
        <button
          onClick={() => { localStorage.removeItem("nn_token"); setAuthed(false); }}
          style={{ fontSize: "0.75rem", color: "var(--ink-muted)", background: "none", border: "none", cursor: "pointer" }}
        >
          Sign out
        </button>
      </div>
      <hr className="divider-rule" />

      {/* Category creator */}
      <details style={{ marginBottom: "2rem", background: "var(--paper-warm)", border: "1px solid var(--paper-border)", borderRadius: 6, padding: "1rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}>
          + Create New Category
        </summary>
        <form onSubmit={handleCreateCategory} style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <label style={labelStyle}>Category Name</label>
            <input
              style={inputStyle}
              placeholder="e.g. Technology"
              value={newCat.name}
              onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Color</label>
            <input
              type="color"
              value={newCat.color}
              onChange={(e) => setNewCat({ ...newCat, color: e.target.value })}
              style={{ height: 38, width: 48, border: "1px solid var(--paper-border)", borderRadius: 4, cursor: "pointer" }}
            />
          </div>
          <button
            type="submit"
            style={{ background: "var(--ink)", color: "white", border: "none", borderRadius: 4, padding: "0 1.25rem", height: 38, cursor: "pointer", fontWeight: 600 }}
          >
            Create
          </button>
        </form>
      </details>

      {/* Post form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label style={labelStyle}>Title *</label>
          <input
            style={{ ...inputStyle, fontSize: "1.1rem", fontFamily: "'Playfair Display', serif" }}
            placeholder="Post title…"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Excerpt (short summary)</label>
          <textarea
            style={{ ...inputStyle, minHeight: 72, resize: "vertical" }}
            placeholder="Brief description shown on cards…"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select
              style={inputStyle}
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              <option value="">Select category…</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Tags (comma separated)</label>
            <input
              style={inputStyle}
              placeholder="ai, startup, india"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Cover Image</label>
          <ImageUploader
            token={token}
            onUpload={(url) => setForm({ ...form, coverImage: url })}
          />
        </div>

        <div>
          <label style={labelStyle}>Content *</label>
          <PostEditor
            value={form.content}
            onChange={(html) => setForm({ ...form, content: html })}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            style={{ width: 16, height: 16 }}
          />
          <label htmlFor="published" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Publish immediately
          </label>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "var(--ink-muted)" : "var(--accent-red)",
              color: "white",
              border: "none",
              borderRadius: 4,
              padding: "0.85rem 2.5rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Publishing…" : "Publish Post →"}
          </button>
          <button
            type="button"
            onClick={() => window.open("/", "_blank")}
            style={{
              background: "var(--paper-warm)",
              color: "var(--ink)",
              border: "1px solid var(--paper-border)",
              borderRadius: 4,
              padding: "0.85rem 1.5rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            View Site ↗
          </button>
        </div>
      </form>
    </div>
  );
}
