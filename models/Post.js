import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, trim: true },
    content: { type: String, required: true }, // HTML from rich text editor
    coverImage: { type: String, default: "" }, // ImgBB / Cloudinary URL
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [{ type: String, trim: true }],
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 1 }, // minutes
  },
  { timestamps: true }
);

// Auto-increment views
PostSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
