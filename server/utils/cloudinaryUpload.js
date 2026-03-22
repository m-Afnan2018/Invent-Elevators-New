/**
 * Cloudinary Upload Utility
 * -------------------------
 * Uploads a file buffer to Cloudinary using upload_stream.
 * Avoids base64 conversion overhead — streams the buffer directly.
 */

import cloudinary from "../configs/cloudinary.js";

/**
 * Upload a single file buffer to Cloudinary.
 * @param {Buffer} buffer  - Raw file buffer from multer memoryStorage
 * @param {string} folder  - Cloudinary folder name (default: "lift-project")
 * @returns {Promise<object>} Cloudinary upload result (secure_url, public_id, ...)
 */
export const uploadToCloudinary = (buffer, folder = "lift-project") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(buffer);
    });
};

/**
 * Upload multiple file buffers to Cloudinary in parallel.
 * @param {Buffer[]} buffers - Array of file buffers
 * @param {string}   folder  - Cloudinary folder name
 * @returns {Promise<object[]>} Array of Cloudinary upload results
 */
export const uploadManyToCloudinary = (buffers, folder = "lift-project") => {
    return Promise.all(buffers.map((buf) => uploadToCloudinary(buf, folder)));
};
