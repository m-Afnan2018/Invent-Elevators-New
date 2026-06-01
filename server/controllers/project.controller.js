import Project from "../models/Project.model.js";
import { deleteOne, getAll } from "./crud.factory.js";

const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

const uniqueSlug = async (base, excludeId = null) => {
  let slug = base;
  let n = 1;
  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const exists = await Project.findOne(query);
    if (!exists) return slug;
    n++;
    slug = `${base}-${n}`;
  }
};

export const createProject = async (req, res) => {
  try {
    const body = { ...req.body };
    if (!body.slug && body.title) body.slug = await uniqueSlug(toSlug(body.title));
    if (typeof body.metaKeywords === "string")
      body.metaKeywords = body.metaKeywords.split(",").map(k => k.trim()).filter(Boolean);
    const doc = await Project.create(body);
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const body = Object.fromEntries(Object.entries(req.body).filter(([, v]) => v !== ""));
    if (body.title && !body.slug)
      body.slug = await uniqueSlug(toSlug(body.title), req.params.id);
    if (typeof body.metaKeywords === "string")
      body.metaKeywords = body.metaKeywords.split(",").map(k => k.trim()).filter(Boolean);
    const doc = await Project.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* Fetch by slug — falls back to _id lookup for backwards compat */
export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let doc = await Project.findOne({ slug });
    if (!doc && /^[a-f0-9]{24}$/.test(slug)) doc = await Project.findById(slug);
    if (!doc) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllProjects = getAll(Project);
export const getProjectById = async (req, res) => {
  try {
    const doc = await Project.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const deleteProject = deleteOne(Project);
