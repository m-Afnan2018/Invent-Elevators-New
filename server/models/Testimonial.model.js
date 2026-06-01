import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    role:       { type: String, trim: true },
    company:    { type: String, trim: true },
    quote:      { type: String, required: true, trim: true },
    avatar:     { type: String, trim: true },
    video:      { type: String, trim: true },
    location:   { type: String, trim: true },
    isActive:   { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
