import { getProjects, getProjectById, createProject, updateProject, deleteProject } from "../services/projectsService.js";
import AppError from "../utils/AppError.js";

const getProjectsController = async (req, res, next) => {
    try {
        const projects = await getProjects(req.userId);
        res.json(projects);
    } catch (error) {
        next(error);
    }
};

const getProjectByIdController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const project = await getProjectById(id, req.userId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json(project);
    } catch (error) {
        next(error);
    }
};

const createProjectController = async (req, res, next) => {
    try {
        const { name, clientId, status, deadline } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            throw new AppError("Name is required", 400);
        }

        if (!Number.isInteger(clientId) || clientId <= 0) {
            throw new AppError("A valid Client ID is required", 400);
        }

        const allowedStatuses = ["Not Started", "In Progress", "Completed"];

        if (!allowedStatuses.includes(status)) {
            throw new AppError("A valid project status is required", 400);
        }

        const parsedDeadline = new Date(`${deadline}T00:00:00.000Z`);

        if (
            typeof deadline !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(deadline) ||
            Number.isNaN(parsedDeadline.getTime()) ||
            parsedDeadline.toISOString().slice(0, 10) !== deadline
        ) {
            throw new AppError("A valid deadline is required (YYYY-MM-DD)", 400);
        }

        const project = await createProject(
            name.trim(),
            clientId,
            status,
            deadline,
            req.userId,
        );

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
}


const updateProjectController = async (req, res, next) => {
    try {
        const { name, clientId, status, deadline } = req.body;
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("A valid Project ID is required", 400);
        }

        if (typeof name !== "string" || !name.trim()) {
            throw new AppError("Name is required", 400);
        }

        if (!Number.isInteger(clientId) || clientId <= 0) {
            throw new AppError("A valid Client ID is required", 400);
        }

        const allowedStatuses = ["Not Started", "In Progress", "Completed"];

        if (!allowedStatuses.includes(status)) {
            throw new AppError("A valid project status is required", 400);
        }

        const parsedDeadline = new Date(`${deadline}T00:00:00.000Z`);

        if (
            typeof deadline !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(deadline) ||
            Number.isNaN(parsedDeadline.getTime()) ||
            parsedDeadline.toISOString().slice(0, 10) !== deadline
        ) {
            throw new AppError("A valid deadline is required (YYYY-MM-DD)", 400);
        }

        const project = await updateProject(
            id,
            name.trim(),
            clientId,
            status,
            deadline,
            req.userId,
        );

        if (!project) {
            throw new AppError("Project not found", 404);
        }

        res.json(project);
    } catch (error) {
        next(error);
    }
};


const deleteProjectController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("A valid Project ID is required", 400);
        }

        const project = await deleteProject(id, req.userId);

        if (!project) {
            throw new AppError("Project not found", 404);
        }

        res.json(project);
    } catch (error) {
        next(error);
    }
};

export { getProjectsController, getProjectByIdController, createProjectController, updateProjectController, deleteProjectController };