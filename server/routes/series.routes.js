import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getAllSeries, getSeriesByCode, upsertSeries } from "../controllers/series.controller.js";

const router = express.Router();

router.get("/",      getAllSeries);
router.get("/:code", getSeriesByCode);
router.put("/:code", requireAuth, upsertSeries);

export default router;
