/**
 * Upload Routes
 * -------------
 * Handles image uploads to local disk storage.
 * All routes require authentication.
 *
 * POST   /api/upload                       — single image  (field: "image", query: ?folder=products)
 * POST   /api/upload/multiple              — up to 20 imgs (field: "images", query: ?folder=products)
 * DELETE /api/upload                       — delete by file path (body: { filePath })
 */

import express from "express";
import fs from "fs";
import path from "path";
import { requireAuth } from "../middlewares/auth.middleware.js";
import Media from "../models/Media.model.js";
import { createUploadMiddleware } from "../middlewares/multer.middleware.js";

const router = express.Router();

const ALLOWED_FOLDERS = new Set(["products", "categories", "blogs", "projects", "users", "misc"]);
const UPLOAD_BASE = path.resolve("uploads", "images");

/** Resolve and validate the folder from query param. Defaults to "misc". */
const getFolder = (query) => {
    const folder = query?.folder;
    return folder && ALLOWED_FOLDERS.has(folder) ? folder : "misc";
};

/** Build the public URL path for a saved file. */
const toPublicUrl = (filePath) => {
    // filePath is absolute; strip CWD to get /uploads/images/...
    const rel = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
    return `/${rel}`;
};

/* ─────────────────────────────────────────────────────────
   POST /api/upload
   Upload a single image.  FormData field name: "image"
   Query param ?folder= selects the subfolder (default: misc)
───────────────────────────────────────────────────────── */
router.post("/", requireAuth, (req, res, next) => {
    const folder = getFolder(req.query);
    const { uploadSingle } = createUploadMiddleware(folder);
    uploadSingle(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const url = toPublicUrl(req.file.path);
    // Save to Media library (fire-and-forget)
    Media.create({
        url,
        filename: req.file.filename,
        originalName: req.file.originalname || req.file.filename,
        mimeType: req.file.mimetype,
        type: req.file.mimetype?.startsWith("video/") ? "video" : "image",
        size: req.file.size || 0,
        folder: getFolder(req.query),
    }).catch(() => {});
    res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: { url },
    });
});

/* ─────────────────────────────────────────────────────────
   POST /api/upload/multiple
   Upload up to 20 images.  FormData field name: "images"
   Query param ?folder= selects the subfolder (default: misc)
───────────────────────────────────────────────────────── */
router.post("/multiple", requireAuth, (req, res, next) => {
    const folder = getFolder(req.query);
    const { uploadArray } = createUploadMiddleware(folder);
    uploadArray(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}, (req, res) => {
    if (!req.files?.length) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const urls = req.files.map(f => toPublicUrl(f.path));
    // Save each to Media library (fire-and-forget)
    req.files.forEach(f => {
        Media.create({
            url: toPublicUrl(f.path),
            filename: f.filename,
            originalName: f.originalname || f.filename,
            mimeType: f.mimetype,
            type: f.mimetype?.startsWith("video/") ? "video" : "image",
            size: f.size || 0,
            folder: getFolder(req.query),
        }).catch(() => {});
    });
    res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        data: urls.map(url => ({ url })),
    });
});

/* ─────────────────────────────────────────────────────────
   DELETE /api/upload
   Remove a local image file.  Body: { filePath }
   filePath must be a relative URL like /uploads/images/products/foo.jpg
───────────────────────────────────────────────────────── */
router.delete("/", requireAuth, (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({ success: false, message: "filePath is required" });
    }

    // Security: ensure the path stays within the uploads directory
    const resolved = path.resolve(process.cwd(), filePath.replace(/^\//, ""));
    if (!resolved.startsWith(UPLOAD_BASE)) {
        return res.status(400).json({ success: false, message: "Invalid file path" });
    }

    if (!fs.existsSync(resolved)) {
        return res.status(404).json({ success: false, message: "File not found" });
    }

    fs.unlinkSync(resolved);
    res.status(200).json({ success: true, message: "Image deleted successfully" });
});

export default router;
