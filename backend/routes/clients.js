import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    getClientsController,
    getClientByIdController,
    createClientController,
    updateClientController,
    deleteClientController
} from "../controllers/clientsController.js";

const router = express.Router();

router.get("/", authMiddleware, getClientsController);
router.get("/:id", authMiddleware, getClientByIdController);
router.post("/", authMiddleware, createClientController);
router.put("/:id", authMiddleware, updateClientController);
router.delete("/:id", authMiddleware, deleteClientController);

export default router;