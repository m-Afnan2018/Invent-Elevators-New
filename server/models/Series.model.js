import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      enum: ["HT", "HZ", "OB", "AS"],
    },
    tagline:     { type: String },
    pitFree:     { type: Boolean },
    description: { type: String },
    heroImage:   { type: String },
    images:      [{ type: String }],
    details: [{
      label: { type: String },
      value: { type: String },
    }],
    tiers: [{
      name:     { type: String },
      subtitle: { type: String },
      bullets:  [{ type: String }],
    }],
    cabinStyles: [{
      name:  { type: String },
      label: { type: String },
      image: { type: String },
      desc:  { type: String },
    }],
    finishes: [{
      name:  { type: String },
      image: { type: String },
    }],
    applications: [{
      label: { type: String },
      image: { type: String },
    }],
    features: [{
      icon:  { type: String },
      label: { type: String },
      desc:  { type: String },
    }],
    techSpecs: [{
      icon:  { type: String },
      label: { type: String },
      sub:   { type: String },
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Series", seriesSchema);
