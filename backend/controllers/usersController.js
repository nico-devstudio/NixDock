import {
    findUserById,
    updateUser,
    deleteUser,
} from "../services/usersService.js";

import AppError from "../utils/AppError.js";

const getUser = async (req, res, next) => {
    try {
        const user = await findUserById(req.userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const updateUserController = async (req, res, next) => {
    try {
        const { name, age } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            throw new AppError("Name must be a non-empty string", 400);
        }

        if (typeof age !== "number" || !Number.isInteger(age) || age <= 0) {
            throw new AppError("Age must be a positive whole number", 400);
        }

        const user = await updateUser(
            req.userId,
            name.trim(),
            age
        );

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const deleteUserController = async (req, res, next) => {
    try {
        const deletedUser = await deleteUser(req.userId);

        if (!deletedUser) {
            throw new AppError("User not found", 404);
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getUser, updateUserController, deleteUserController };