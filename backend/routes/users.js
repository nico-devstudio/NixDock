import express from "express";

import {
    getUser,
    updateUserController,
    deleteUserController,
} from "../controllers/usersController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getUser);
router.put("/me", authMiddleware, updateUserController);
router.delete("/me", authMiddleware, deleteUserController);

export default router;