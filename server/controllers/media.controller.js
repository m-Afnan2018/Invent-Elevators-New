import fs from "fs";
import path from "path";
import Media from "../models/Media.model.js";
import Project from "../models/Project.model.js";
import Blog from "../models/Blog.model.js";
import Category from "../models/Category.model.js";
import Series from "../models/Series.model.js";
import Testimonial from "../models/Testimonial.model.js";
import Product from "../models/Product.model.js";

export const getAllMedia = async (_req, res) => {
  try {
    const items = await Media.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const renameMedia = async (req, res) => {
  try {
    const { originalName } = req.body;
    if (!originalName?.trim()) return res.status(400).json({ success: false, message: "Name required" });
    const doc = await Media.findByIdAndUpdate(req.params.id, { originalName: originalName.trim() }, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const doc = await Media.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });

    const usage = await findUsage(doc.url);
    if (usage.length > 0) {
      return res.status(409).json({ success: false, message: "Cannot delete — media is in use", usage });
    }

    const filePath = path.resolve(process.cwd(), doc.url.replace(/^\//, ""));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Media.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMediaUsage = async (req, res) => {
  try {
    const doc = await Media.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    const usage = await findUsage(doc.url);
    res.status(200).json({ success: true, data: usage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

async function findUsage(url) {
  const results = [];

  // Projects
  const projects = await Project.find({
    $or: [{ featuredImage: url }, { galleryImages: url }, { ogImage: url }, { "testimonials.image": url }, { "testimonials.video": url }],
  }).select("title _id slug").catch(() => []);
  projects.forEach(p => results.push({ entity: "Project", entityId: p._id, name: p.title, href: `/projects/${p.slug || p._id}` }));

  // Blogs
  const blogs = await Blog.find({
    $or: [{ featuredImage: url }, { ogImage: url }],
  }).select("title _id slug").catch(() => []);
  blogs.forEach(b => results.push({ entity: "Blog", entityId: b._id, name: b.title, href: `/blog/${b.slug || b._id}` }));

  // Categories
  const cats = await Category.find({
    $or: [{ image: url }, { icon: url }, { "testimonial.image": url }, { "testimonial.video": url }, { "applications.image": url }],
  }).select("name _id slug").catch(() => []);
  cats.forEach(c => results.push({ entity: "Category", entityId: c._id, name: c.name, href: `/categories/${c.slug || c._id}` }));

  // Testimonials
  const testimonials = await Testimonial.find({
    $or: [{ avatar: url }, { video: url }],
  }).select("name _id").catch(() => []);
  testimonials.forEach(t => results.push({ entity: "Testimonial", entityId: t._id, name: t.name, href: null }));

  // Products
  const products = await Product.find({
    $or: [{ image: url }, { images: url }],
  }).select("name _id slug").catch(() => []);
  products.forEach(p => results.push({ entity: "Product", entityId: p._id, name: p.name, href: `/products/${p.slug || p._id}` }));

  // Series CMS
  const seriesDocs = await Series.find({}).select("code heroImage images cabinStyles finishes applications").catch(() => []);
  seriesDocs.forEach(s => {
    const urls = [s.heroImage, ...(s.images||[]), ...(s.cabinStyles||[]).map(x=>x.image), ...(s.finishes||[]).map(x=>x.image), ...(s.applications||[]).map(x=>x.image)].filter(Boolean);
    if (urls.includes(url)) results.push({ entity: "Series CMS", entityId: s._id, name: s.code, href: `/series/${s.code?.toLowerCase()}` });
  });

  return results;
}
