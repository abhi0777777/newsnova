"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function ImageUploader({ onUpload, token }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    if (file.size > 1024 * 1024) {
      // Warn if > 1MB
      if (!confirm("Image is larger than 1MB. Large images slow down your site. Continue?")) return;
    }

    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setPreview(data.url);
      onUpload(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
        style={{
          border: "2px dashed var(--paper-border)",
          borderRadius: 6,
          padding: "2rem",
          textAlign: "center",
          cursor: "pointer",
          background: "var(--paper-warm)",
          transition: "border-color 0.2s",
        }}
      >
        {uploading ? (
          <p style={{ color: "var(--ink-muted)" }}>Uploading…</p>
        ) : preview ? (
          <div style={{ position: "relative", height: 160 }}>
            <Image src={preview} alt="Cover" fill style={{ objectFit: "contain" }} />
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🖼️</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
              Click or drag an image here
            </p>
            <p style={{ fontSize: "0.7rem", color: "var(--ink-muted)", marginTop: "0.3rem" }}>
              Keep under 200KB (WebP/JPEG) for fast loading
            </p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {error && (
        <p style={{ color: "var(--accent-red)", fontSize: "0.8rem", marginTop: "0.4rem" }}>
          {error}
        </p>
      )}
      {preview && (
        <p style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginTop: "0.4rem", wordBreak: "break-all" }}>
          URL: {preview}
        </p>
      )}
    </div>
  );
}
