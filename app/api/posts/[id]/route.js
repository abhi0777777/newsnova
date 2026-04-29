import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Post from "../../../../models/Post";
import { checkAdminToken } from "../../../../lib/auth";
import { generateSlug,estimateReadTime } from "../../../../lib/utils";

// GET /api/posts/[id] — get single post by id OR slug
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const post = await Post.findOne({
      $or: [{ _id: id.match(/^[a-f\d]{24}$/i) ? id : null }, { slug: id }],
    }).populate("category", "name slug color");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment views
    post.views += 1;
    await post.save();

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/posts/[id] — update post (admin only)
export async function PUT(request, { params }) {
  if (!checkAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const { title, content, coverImage, categoryId, tags, excerpt, published } =
      body;

    const updateData = {
      ...(title && { title, slug: generateSlug(title) }),
      ...(content && { content, readTime: estimateReadTime(content) }),
      ...(coverImage !== undefined && { coverImage }),
      ...(categoryId && { category: categoryId }),
      ...(tags && { tags }),
      ...(excerpt !== undefined && { excerpt }),
      ...(published !== undefined && { published }),
    };

    const post = await Post.findByIdAndUpdate(params.id, updateData, {
      new: true,
    }).populate("category", "name slug color");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/posts/[id] — delete post (admin only)
export async function DELETE(request, { params }) {
  if (!checkAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const post = await Post.findByIdAndDelete(params.id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
