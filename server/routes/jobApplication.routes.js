import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
  deleteApplication,
  getAllApplications,
  getApplicationById,
  resumeUpload,
  submitApplication,
  updateApplication,
} from "../controllers/jobApplication.controller.js";

const router = express.Router();

router.post("/", resumeUpload, submitApplication);
router.get("/", requireAuth, getAllApplications);
router.get("/:id", requireAuth, getApplicationById);
router.put("/:id", requireAuth, updateApplication);
router.delete("/:id", requireAuth, deleteApplication);

export default router;
