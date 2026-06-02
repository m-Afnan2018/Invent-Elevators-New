import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getAllMedia, renameMedia, deleteMedia, getMediaUsage } from "../controllers/media.controller.js";

const router = express.Router();

router.get("/",           requireAuth, getAllMedia);
router.put("/:id",        requireAuth, renameMedia);
router.delete("/:id",     requireAuth, deleteMedia);
router.get("/:id/usage",  requireAuth, getMediaUsage);

export default router;
