import {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} from "../services/clientsService.js";
import AppError from "../utils/AppError.js";

const getClientsController = async (req, res, next) => {
    try {
        const clients = await getClients(req.userId);

        res.json(clients);
    } catch (error) {
        next(error);

    }
};

const getClientByIdController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid client ID", 400);
        }

        const client = await getClientById(id, req.userId);

        if (!client) {
            throw new AppError("Client not found", 404)
        }

        res.json(client);
    } catch (error) {
        next(error);
    }
};

const createClientController = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        if (!name) {
            throw new AppError("Name is required", 400)
        }

        const client = await createClient(name, email, req.userId);

        res.status(201).json(client);
    } catch (error) {
        next(error);
    }
};

const updateClientController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid client ID", 400);
        }
        const { name, email } = req.body;

        if (!name) {
            throw new AppError("Name is required", 400)
        }

        const client = await updateClient(id, name, email, req.userId);

        if (!client) {
            throw new AppError("Client not found", 404);
        }

        res.json(client);
    } catch (error) {
        next(error);
    }
};

const deleteClientController = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid client ID", 400);
        }

        const client = await deleteClient(id, req.userId);

        if (client?.hasProjects) {
            throw new AppError(
                "Cannot delete this client because they still have projects. Reassign or delete those projects first.",
                409,
            );
        }

        if (!client) {
            throw new AppError("Client not found", 404);
        }

        res.json(client);
    } catch (error) {
        next(error);
    }
};

export {
    getClientsController,
    getClientByIdController,
    createClientController,
    updateClientController,
    deleteClientController
};