"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState } from "react";

const Btn = ({ onClick, active, title, children, red }) => (
  <button type="button" onClick={onClick} title={title} style={{
    padding: "4px 8px", borderRadius: 3, border: "none",
    background: red ? "var(--accent-red)" : active ? "var(--ink)" : "transparent",
    color: (active || red) ? "white" : "var(--ink)",
    cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
    transition: "background 0.15s", whiteSpace: "nowrap",
  }}>
    {children}
  </button>
);

export default function PostEditor({ value, onChange, token }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Yahan article likho…" }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "post-content",
        style: "min-height:350px;outline:none;padding:1rem;",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, []);

  if (!editor) return null;

  // Upload image to ImgBB via /api/upload
  const uploadImage = async (file) => {
    if (!file) return;
    setUploading(true);

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

      // Insert image into editor
      editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
      onChange(editor.getHTML());
    } catch (err) {
      alert("Image upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const addLink = () => {
    const url = prompt("URL daalo:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImageUrl = () => {
    const url = prompt("Image URL daalo:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div style={{ border: "1px solid var(--paper-border)", borderRadius: 6, overflow: "hidden", background: "white" }}>
      {/* Hidden file input */}
      <input
        ref={fileRef} type="file" accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => uploadImage(e.target.files[0])}
      />

      {/* Toolbar */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "3px",
        padding: "8px 10px",
        borderBottom: "1px solid var(--paper-border)",
        background: "var(--paper-warm)",
      }}>
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><b>B</b></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><i>I</i></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="H2">H2</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="H3">H3</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">• List</Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">1. List</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">" Quote</Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Code">{"</>"}</Btn>
        <Btn onClick={addLink} title="Link">🔗</Btn>

        {/* Image upload button - RED so it stands out */}
        <Btn
          red
          onClick={() => fileRef.current?.click()}
          title="Upload an image from your computer."
        >
          {uploading ? "⏳ Uploading…" : "📤 Image Upload"}
        </Btn>

        <Btn onClick={addImageUrl} title="URL se image">🖼 URL</Btn>
        <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo">↩</Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo">↪</Btn>
      </div>

      {/* Uploading indicator */}
      {uploading && (
        <div style={{
          padding: "6px 12px", background: "#fff8e1",
          borderBottom: "1px solid var(--paper-border)",
          fontSize: "0.78rem", color: "var(--ink-muted)",
          fontFamily: "'DM Mono', monospace",
        }}>
⏳ Your image is being uploaded. Please wait a moment...
        </div>
      )}

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Hint bar */}
      <div style={{
        padding: "6px 12px", fontSize: "0.68rem", color: "var(--ink-muted)",
        borderTop: "1px solid var(--paper-border)", background: "var(--paper-warm)",
        fontFamily: "'DM Mono', monospace",
      }}>
      </div>
    </div>
  );
}
