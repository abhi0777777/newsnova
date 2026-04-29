import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Post from "../../../models/Post";
import Category from "../../../models/Category";
import { generateSlug,estimateReadTime } from "../../../lib/utils";
import { checkAdminToken } from "../../../lib/auth";

// GET /api/posts — list all posts (with optional category filter)
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    let query = { published: true };

    if (categorySlug && categorySlug !== "all") {
      const cat = await Category.findOne({ slug: categorySlug });
      if (cat) query.category = cat._id;
    }

    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate("category", "name slug color")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content") // don't send full HTML for listing
        .lean(),
      Post.countDocuments(query),
    ]);

    return NextResponse.json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/posts — create a new post (admin only)
export async function POST(request) {
  if (!checkAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const { title, content, coverImage, categoryId, tags, excerpt } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { error: "title, content, categoryId are required" },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(title);
    // Ensure unique slug
    let slug = baseSlug;
    let count = 0;
    while (await Post.findOne({ slug })) {
      count++;
      slug = `${baseSlug}-${count}`;
    }

    const post = await Post.create({
      title,
      slug,
      content,
      excerpt: excerpt || "",
      coverImage: coverImage || "",
      category: categoryId,
      tags: tags || [],
      readTime: estimateReadTime(content),
    });

    await post.populate("category", "name slug color");
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
