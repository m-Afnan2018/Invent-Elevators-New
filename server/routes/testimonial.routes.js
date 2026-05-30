import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createTestimonial, deleteTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial } from "../controllers/testimonial.controller.js";

const router = express.Router();

router.post("/",      requireAuth, createTestimonial);
router.get("/",       getAllTestimonials);
router.get("/:id",    getTestimonialById);
router.put("/:id",    requireAuth, updateTestimonial);
router.delete("/:id", requireAuth, deleteTestimonial);

export default router;
