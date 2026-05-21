import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createJob, deleteJob, getActiveJobs, getAllJobs, getJobById, updateJob } from "../controllers/job.controller.js";

const router = express.Router();

router.get("/active", getActiveJobs);
router.get("/", requireAuth, getAllJobs);
router.get("/:id", getJobById);
router.post("/", requireAuth, createJob);
router.put("/:id", requireAuth, updateJob);
router.delete("/:id", requireAuth, deleteJob);

export default router;
