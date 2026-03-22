// services/upload.service.js
// File Upload API service — uploads directly to Cloudinary via the backend.
// Returns Cloudinary HTTPS URLs, never base64 strings.

import apiConnector from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

/**
 * Upload a single image file.
 * FormData field name must match backend multer config: "image"
 *
 * @param {File} file - Image File object
 * @returns {Promise<string>} Cloudinary secure_url
 */
export const uploadImage = async (file) => {
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  const formData = new FormData();
  formData.append('image', file); // field name matches multer.single("image")

  // Content-Type is deleted by the apiConnector interceptor for FormData
  const response = await apiConnector.post(ENDPOINTS.UPLOAD, formData);

  // response shape: { success, data: { url, public_id } }
  const url = response?.data?.url;
  if (!url) throw new Error('Upload failed — no URL returned');
  return url;
};

/**
 * Upload multiple image files (up to 20).
 * FormData field name must match backend multer config: "images"
 *
 * @param {File[]|FileList} files - Array of image File objects
 * @returns {Promise<string[]>} Array of Cloudinary secure_urls
 */
export const uploadMultipleImages = async (files) => {
  const fileArray = Array.from(files);
  if (!fileArray.length) return [];

  const formData = new FormData();
  fileArray.forEach((f) => formData.append('images', f)); // field name matches multer.array("images")

  const response = await apiConnector.post(`${ENDPOINTS.UPLOAD}/multiple`, formData);

  // response shape: { success, data: [{ url, public_id }, ...] }
  const results = response?.data;
  if (!Array.isArray(results)) throw new Error('Upload failed — unexpected response');
  return results.map((r) => r.url);
};

/**
 * Delete an image from Cloudinary by public_id.
 * @param {string} publicId
 * @returns {Promise<void>}
 */
export const deleteImage = async (publicId) => {
  await apiConnector.delete(ENDPOINTS.UPLOAD, { data: { public_id: publicId } });
};

/**
 * Convert a file to a local base64 data URL (for instant preview before upload).
 * Does NOT upload anything — purely local.
 *
 * @param {File} file
 * @returns {Promise<string>} base64 data URL
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
