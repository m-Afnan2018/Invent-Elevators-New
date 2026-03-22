/**
 * Upload Routes
 * -------------
 * Handles image uploads to Cloudinary.
 * All routes require authentication.
 *
 * POST   /api/upload           — single image  (field: "image")
 * POST   /api/upload/multiple  — up to 20 imgs (field: "images")
 * DELETE /api/upload           — delete by public_id
 */

import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { uploadSingle, uploadArray } from "../middlewares/multer.middleware.js";
import { uploadToCloudinary, uploadManyToCloudinary } from "../utils/cloudinaryUpload.js";
import cloudinary from "../configs/cloudinary.js";

const router = express.Router();

/* ─────────────────────────────────────────────────────────
   POST /api/upload
   Upload a single image.  FormData field name: "image"
───────────────────────────────────────────────────────── */
router.post("/", requireAuth, uploadSingle, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const result = await uploadToCloudinary(req.file.buffer);

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: {
                url: result.secure_url,
                public_id: result.public_id,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/* ─────────────────────────────────────────────────────────
   POST /api/upload/multiple
   Upload up to 20 images.  FormData field name: "images"
───────────────────────────────────────────────────────── */
router.post("/multiple", requireAuth, uploadArray, async (req, res) => {
    try {
        if (!req.files?.length) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const buffers = req.files.map((f) => f.buffer);
        const results = await uploadManyToCloudinary(buffers);

        res.status(200).json({
            success: true,
            message: "Images uploaded successfully",
            data: results.map((r) => ({
                url: r.secure_url,
                public_id: r.public_id,
            })),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/* ─────────────────────────────────────────────────────────
   DELETE /api/upload
   Remove an image from Cloudinary.  Body: { public_id }
───────────────────────────────────────────────────────── */
router.delete("/", requireAuth, async (req, res) => {
    try {
        const { public_id } = req.body;

        if (!public_id) {
            return res.status(400).json({ success: false, message: "public_id is required" });
        }

        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result !== "ok") {
            return res.status(400).json({ success: false, message: "Failed to delete image" });
        }

        res.status(200).json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
