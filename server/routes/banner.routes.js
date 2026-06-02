import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getAllBanners, getBannerByPage, upsertBanner } from "../controllers/banner.controller.js";

const router = express.Router();

router.get("/",       getAllBanners);
router.get("/:page",  getBannerByPage);
router.put("/:page",  requireAuth, upsertBanner);

export default router;
