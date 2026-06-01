import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createProject, deleteProject, getAllProjects, getProjectById, getProjectBySlug, updateProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/",          requireAuth, createProject);
router.get("/",           getAllProjects);
router.get("/slug/:slug", getProjectBySlug);  // must come before /:id
router.get("/:id",        getProjectById);
router.put("/:id",        requireAuth, updateProject);
router.delete("/:id",     requireAuth, deleteProject);

export default router;
