
import express from "express";
import {
    getTasksController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
} from "../controllers/tasksController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasksController);
router.get("/:id", getTaskByIdController);
router.post("/", createTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;
