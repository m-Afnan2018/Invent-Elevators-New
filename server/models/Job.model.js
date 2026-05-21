import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: {
      type: String,
      required: true,
      trim: true,
      enum: ["Engineering", "Sales", "Operations", "Customer Service", "Finance", "Marketing", "HR", "Other"],
    },
    location: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "contract", "remote"],
      default: "full-time",
    },
    experience: { type: String, trim: true },
    salary: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    requirements: [{ type: String, trim: true }],
    responsibilities: [{ type: String, trim: true }],
    benefits: [{ type: String, trim: true }],
    deadline: { type: Date },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
