import connectDB from "../lib/mongodb";
import Post from "../models/Post";

import Category from "../models/Category";

export default async function sitemap() {
  await connectDB();

  const posts = await Post.find({ published: true })
    .select("slug updatedAt")
    .lean();

  const categories = await Category.find().select("slug").lean();

  const staticPages = [
    { url: "https://newsnova.online", lastModified: new Date() },
    { url: "https://newsnova.online/about", lastModified: new Date() },
    { url: "https://newsnova.online/contact", lastModified: new Date() },
    { url: "https://newsnova.online/privacy-policy", lastModified: new Date() },
    { url: "https://newsnova.online/terms-conditions", lastModified: new Date() },
  ];

  const postPages = posts.map((post) => ({
    url: `https://newsnova.online/post/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `https://newsnova.online/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}