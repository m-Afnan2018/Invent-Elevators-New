import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    icon: { type: String },
    image: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    order: { type: Number, default: 0 },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: [{ type: String, trim: true }],
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    isActive: { type: Boolean, default: true },
    /* ── CMS fields ── */
    aboutMeta: [{ label: { type: String }, value: { type: String } }],
    features:  [{ title: { type: String }, desc:  { type: String } }],
    ctaEyebrow: { type: String },
    ctaTitle:   { type: String },
    ctaDesc:    { type: String },
    /* ── Extended CMS fields for new layout ── */
    testimonial: {
      quote: { type: String },
      name:  { type: String },
      role:  { type: String },
      image: { type: String },
      video: { type: String },
    },
    galleryImages: [{ type: String }],
    applications:  [{ label: { type: String }, image: { type: String } }],
    stats: [{ value: { type: String }, label: { type: String } }],
  },
  { timestamps: true }
);

categorySchema.index({ name: 1, parentId: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
