import Product from "../models/Product.model.js";

const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

const uniqueSlug = async (base, excludeId = null) => {
  let slug = base, n = 1;
  while (true) {
    const q = { slug };
    if (excludeId) q._id = { $ne: excludeId };
    if (!(await Product.findOne(q))) return slug;
    slug = `${base}-${++n}`;
  }
};

const POPULATE_OPTS = [
  "category categories",
  "name slug",
];

export const createProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (!body.slug && body.name) body.slug = await uniqueSlug(toSlug(body.name));
    const product = await Product.create(body);
    res.status(201).json({ success: true, message: "Product created successfully", data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("category categories", "name slug")
      .populate("subCategory subCategories", "name")
      .populate("components", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category categories", "name slug")
      .populate("subCategory subCategories", "name")
      .populate({ path: "components", populate: [{ path: "componentType", select: "name" }, { path: "attributeId", select: "fields" }] });
    if (!product || !product.isActive)
      return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET /api/products/slug/:slug — slug-first with _id fallback */
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let product = await Product.findOne({ slug })
      .populate("category categories", "name slug")
      .populate("subCategory subCategories", "name")
      .populate({ path: "components", populate: [{ path: "componentType", select: "name" }, { path: "attributeId", select: "fields" }] });
    if (!product && /^[a-f0-9]{24}$/.test(slug))
      product = await Product.findById(slug)
        .populate("category categories", "name slug")
        .populate("subCategory subCategories", "name")
        .populate({ path: "components", populate: [{ path: "componentType", select: "name" }, { path: "attributeId", select: "fields" }] });
    if (!product || !product.isActive)
      return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.name && !body.slug) body.slug = await uniqueSlug(toSlug(body.name), req.params.id);
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false, status: "inactive" }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product disabled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
