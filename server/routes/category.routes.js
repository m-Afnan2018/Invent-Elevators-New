import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
    updateCategory,
    deleteCategory,
    updateCategoryCMS,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/",             requireAuth, createCategory);
router.get("/",              getAllCategories);
router.get("/by-slug/:slug", getCategoryBySlug); // must be before /:id
router.get("/:id",           getCategoryById);
router.put("/:id",           requireAuth, updateCategory);
router.delete("/:id",        requireAuth, deleteCategory);
router.put("/:id/cms",       requireAuth, updateCategoryCMS);

export default router;
