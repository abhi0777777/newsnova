"use client";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const SHEETS_URL = process.env.NEXT_PUBLIC_SHEETS_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid var(--paper-border)",
    borderRadius: 4,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    background: "white",
    color: "var(--ink)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    marginBottom: "0.4rem",
    fontFamily: "'DM Mono', monospace",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--ink-muted)",
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
        Get in Touch
      </span>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", fontWeight: 700, margin: "0.5rem 0 0.5rem" }}>
        Contact Us
      </h1>
      <p style={{ color: "var(--ink-muted)", marginBottom: "2rem" }}>
        Have a tip, question, or feedback? We'd love to hear from you.
      </p>
      <hr className="divider-rule" />

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input style={inputStyle} type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Message</label>
          <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} required placeholder="Your message…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "var(--ink-muted)" : "var(--ink)",
            color: "var(--paper)",
            border: "none", borderRadius: 4,
            padding: "0.8rem 2rem",
            fontSize: "0.9rem", fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            alignSelf: "flex-start",
          }}
        >
          {loading ? "Sending…" : "Send Message →"}
        </button>
      </form>
    </div>
  );
}