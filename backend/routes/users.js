import express from "express";
import { getUser, createUserController, updateUserController, deleteUserController } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id", getUser);

router.post("/", createUserController);

router.put("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;