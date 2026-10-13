import {
    getDeliverables,
    getDeliverableById,
    createDeliverable,
    updateDeliverable,
    deleteDeliverable,
} from "../services/deliverablesService.js";
import AppError from "../utils/AppError.js";

const getDeliverablesController = async (req, res, next) => {
    try {
        const deliverables = await getDeliverables(req.userId);
        res.json(deliverables);
    } catch (error) {
        next(error);
    }
};

const getDeliverableByIdController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid deliverable ID", 400);
        }

        const deliverable = await getDeliverableById(id, req.userId);

        if (!deliverable) {
            throw new AppError("Deliverable not found", 404);
        }

        res.json(deliverable);
    } catch (error) {
        next(error);
    }
};


const createDeliverableController = async (req, res, next) => {
    try {
        const { name, projectId, date } = req.body;

        if (!name?.trim()) {
            throw new AppError("Deliverable name is required", 400);
        }

        if (!Number.isInteger(Number(projectId)) || Number(projectId) <= 0) {
            throw new AppError("Valid project ID is required", 400);
        }

        if (!date) {
            throw new AppError("Deliverable date is required", 400);
        }

        const deliverable = await createDeliverable(
            name.trim(),
            Number(projectId),
            date,
            req.userId,
        );

        res.status(201).json(deliverable);
    } catch (error) {
        next(error);
    }
};


const updateDeliverableController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid deliverable ID", 400);
        }

        const { name, projectId, date } = req.body;

        if (!name?.trim()) {
            throw new AppError("Deliverable name is required", 400);
        }

        if (!Number.isInteger(Number(projectId)) || Number(projectId) <= 0) {
            throw new AppError("Valid project ID is required", 400);
        }

        if (!date) {
            throw new AppError("Deliverable date is required", 400);
        }

        const deliverable = await updateDeliverable(
            id,
            name.trim(),
            Number(projectId),
            date,
            req.userId,
        );

        if (!deliverable) {
            throw new AppError("Deliverable not found", 404);
        }

        res.json(deliverable);
    } catch (error) {
        next(error);
    }
};

const deleteDeliverableController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid deliverable ID", 400);
        }

        const deliverable = await deleteDeliverable(id, req.userId);

        if (!deliverable) {
            throw new AppError("Deliverable not found", 404);
        }

        res.json(deliverable);
    } catch (error) {
        next(error);
    }
};

export {
    getDeliverablesController,
    getDeliverableByIdController,
    createDeliverableController,
    updateDeliverableController,
    deleteDeliverableController,
};

