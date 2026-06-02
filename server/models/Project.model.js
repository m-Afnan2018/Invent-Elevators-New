import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug:  { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    description: { type: String, trim: true },
    client: { type: String, trim: true },
    location: { type: String, trim: true },
    completionDate: { type: Date },
    category: { type: String, trim: true },
    status: { type: String, enum: ["quote", "active", "delivered", "completed", "on-hold"], default: "quote" },
    featuredImage: { type: String },
    galleryImages: [{ type: String }],
    isFeatured:    { type: Boolean, default: false },
    showInFooter:  { type: Boolean, default: false },
    linkedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    customSpecs: { type: Object, default: {} },
    testimonials: [{ type: Object }],
    /* ── SEO / Metadata ── */
    metaTitle:       { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords:    [{ type: String, trim: true }],
    ogImage:         { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
