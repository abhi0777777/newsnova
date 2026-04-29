import slugify from "slugify";
import { format, formatDistanceToNow } from "date-fns";

export function generateSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function formatDate(date) {
  return format(new Date(date), "MMMM d, yyyy");
}

export function formatRelativeDate(date) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 7) {
    return formatDistanceToNow(d, { addSuffix: true });
  }
  return formatDate(date);
}

export function estimateReadTime(html) {
  const text = html?.replace(/<[^>]*>/g, "") || "";
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function truncate(str, maxLength = 150) {
  if (!str) return "";
  const plain = str.replace(/<[^>]*>/g, "");
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).trim() + "…";
}
