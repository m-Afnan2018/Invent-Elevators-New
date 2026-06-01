import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
    createProduct,
    getAllProducts,
    getProductById,
    getProductBySlug,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/",          requireAuth, createProduct);
router.get("/",           getAllProducts);
router.get("/slug/:slug", getProductBySlug); // must be before /:id
router.get("/:id",        getProductById);
router.put("/:id",        requireAuth, updateProduct);
router.delete("/:id",     requireAuth, deleteProduct);

export default router;
