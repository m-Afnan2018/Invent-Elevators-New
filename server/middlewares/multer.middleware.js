/**
 * Multer Middleware
 * ----------------
 * Reusable multer config for image uploads.
 * Uses memoryStorage so buffers go straight to Cloudinary — no disk writes.
 */

import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const limits = { fileSize: 10 * 1024 * 1024 }; // 10 MB per file

const multerInstance = multer({ storage, limits, fileFilter });

/** Parse a single image field named "image" */
export const uploadSingle = multerInstance.single("image");

/** Parse up to 20 images from a field named "images" */
export const uploadArray = multerInstance.array("images", 20);
