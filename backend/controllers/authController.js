import { registerUser, loginUser } from "../services/authService.js";
import AppError from "../utils/AppError.js";

const registerController = async (req, res, next) => {
    try {
        const { name, age, email, password } = req.body;

        if (!name || !age || !email || !password) {
            throw new AppError("All fields are required", 400);
        }

        if (typeof name !== "string" || !name.trim()) {
            throw new AppError("Name must be a non-empty string", 400);
        }

        const normalizedName = name.trim();

        if (typeof age !== "number" || !Number.isInteger(age) || age <= 0) {
            throw new AppError("Age must be a positive whole number", 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (typeof email !== "string" || !email.trim() || !emailRegex.test(email.trim())) {
            throw new AppError("Please provide a valid email address", 400);
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (typeof password !== "string" || password.length < 8) {
            throw new AppError("Password must be at least 8 characters long", 400);
        }


        const user = await registerUser(
            normalizedName,
            age,
            normalizedEmail,
            password
        );

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("Email and password are required", 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (typeof email !== "string" || !email.trim() || !emailRegex.test(email.trim())) {
            throw new AppError("Please provide a valid email address", 400);
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (typeof password !== "string" || !password) {
            throw new AppError("Password is required", 400);
        }

        const user = await loginUser(normalizedEmail, password);

        res.json(user);
    } catch (error) {
        next(error);
    }
};

export {
    registerController, loginController
};