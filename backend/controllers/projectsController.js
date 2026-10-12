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
        const { name, clientId } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            throw new AppError("Name is required", 400);
        }

        if (!Number.isInteger(clientId) || clientId <= 0) {
            throw new AppError("A valid Client ID is required", 400);
        }

        const project = await createProject(name.trim(), clientId, req.userId);

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
}

const updateProjectController = async (req, res) => {
    try {
        const { name, clientId } = req.body;
        const id = Number(req.params.id);


        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        if (!clientId) {
            return res.status(400).json({
                message: "Client ID is required"
            });
        }

        const project = await updateProject(id, name, clientId, req.userId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }


        res.json(project);
    } catch (error) {
        console.error(error);

        res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

const deleteProjectController = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const project = await deleteProject(id, req.userId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json(project);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export { getProjectsController, getProjectByIdController, createProjectController, updateProjectController, deleteProjectController };