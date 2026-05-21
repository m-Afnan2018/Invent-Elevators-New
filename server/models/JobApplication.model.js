import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    portfolio: { type: String, trim: true },
    coverLetter: { type: String, trim: true },
    resume: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "reviewing", "shortlisted", "rejected", "hired"],
      default: "pending",
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
