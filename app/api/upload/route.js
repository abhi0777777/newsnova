import { NextResponse } from "next/server";
import { checkAdminToken } from "../../../lib/auth";
// POST /api/upload — upload image to ImgBB and return URL
// Accepts multipart/form-data with field "image"
export async function POST(request) {
  if (!checkAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    // Upload to ImgBB
    const imgbbForm = new FormData();
    imgbbForm.append("image", base64);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      { method: "POST", body: imgbbForm }
    );

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(
        { error: "ImgBB upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.data.url,           // direct image URL
      display_url: data.data.display_url,
      delete_url: data.data.delete_url,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
