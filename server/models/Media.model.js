import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url:          { type: String, required: true, unique: true },
    filename:     { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType:     { type: String },
    type:         { type: String, enum: ["image", "video"], default: "image" },
    size:         { type: Number, default: 0 },
    folder:       { type: String, default: "misc" },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
