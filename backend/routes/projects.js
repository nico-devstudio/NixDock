import express from "express";
import { getProjectsController, getProjectByIdController, createProjectController, updateProjectController, deleteProjectController } from "../controllers/projectsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getProjectsController);
router.get("/:id", authMiddleware, getProjectByIdController);
router.post("/", authMiddleware, createProjectController);
router.put("/:id", authMiddleware, updateProjectController);
router.delete("/:id", authMiddleware, deleteProjectController);

export default router;