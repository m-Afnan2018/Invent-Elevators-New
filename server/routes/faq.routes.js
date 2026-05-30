import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createFAQ, deleteFAQ, getAllFAQs, getFAQById, updateFAQ } from "../controllers/faq.controller.js";

const router = express.Router();

router.post("/",      requireAuth, createFAQ);
router.get("/",       getAllFAQs);
router.get("/:id",    getFAQById);
router.put("/:id",    requireAuth, updateFAQ);
router.delete("/:id", requireAuth, deleteFAQ);

export default router;
