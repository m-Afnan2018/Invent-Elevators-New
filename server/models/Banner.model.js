import mongoose from "mongoose";

const PAGES = ["home","about","area-we-serve","faq","careers","contact","blogs","series","projects","privacy","cookies","terms","accessibility"];

const bannerSchema = new mongoose.Schema(
  {
    page:     { type: String, required: true, unique: true, enum: PAGES },
    image:    { type: String },
    video:    { type: String },
    title:    { type: String },
    subtitle: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
