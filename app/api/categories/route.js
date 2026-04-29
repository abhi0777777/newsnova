import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Category from "../../../models/Category";
import { generateSlug } from "../../../lib/utils";
import { checkAdminToken } from "../../../lib/auth";

// GET /api/categories — list all categories
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 }).lean();
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/categories — create category (admin only)
export async function POST(request) {
  if (!checkAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { name, description, color } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const slug = generateSlug(name);
    const category = await Category.create({
      name,
      slug,
      description: description || "",
      color: color || "#c0392b",
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
