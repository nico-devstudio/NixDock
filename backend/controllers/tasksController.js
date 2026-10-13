
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from "../services/tasksService.js";
import AppError from "../utils/AppError.js";

const getTasksController = async (req, res, next) => {
    try {
        const tasks = await getTasks(req.userId);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

const getTaskByIdController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid task ID", 400);
        }

        const task = await getTaskById(id, req.userId);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
};

const createTaskController = async (req, res, next) => {
    try {
        const { name, projectId, status, deadline } = req.body;

        if (!name?.trim()) {
            throw new AppError("Task name is required", 400);
        }

        if (!Number.isInteger(Number(projectId)) || Number(projectId) <= 0) {
            throw new AppError("Valid project ID is required", 400);
        }

        if (!["To Do", "In Progress", "Completed"].includes(status)) {
            throw new AppError("Invalid task status", 400);
        }

        if (!deadline) {
            throw new AppError("Deadline is required", 400);
        }

        const task = await createTask(
            name.trim(),
            Number(projectId),
            status,
            deadline,
            req.userId,
        );

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

const updateTaskController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid task ID", 400);
        }

        const { name, projectId, status, deadline } = req.body;

        if (!name?.trim()) {
            throw new AppError("Task name is required", 400);
        }

        if (!Number.isInteger(Number(projectId)) || Number(projectId) <= 0) {
            throw new AppError("Valid project ID is required", 400);
        }

        if (!["To Do", "In Progress", "Completed"].includes(status)) {
            throw new AppError("Invalid task status", 400);
        }

        if (!deadline) {
            throw new AppError("Deadline is required", 400);
        }

        const task = await updateTask(
            id,
            name.trim(),
            Number(projectId),
            status,
            deadline,
            req.userId,
        );

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
};

const deleteTaskController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid task ID", 400);
        }

        const task = await deleteTask(id, req.userId);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
};

export {
    getTasksController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
};
