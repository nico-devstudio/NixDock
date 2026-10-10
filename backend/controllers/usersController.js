import { findUserById, createUser, updateUser, deleteUser } from "../services/usersService.js";

const getUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await findUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createUserController = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        if (req.body.age === undefined) {
            return res.status(400).json({
                message: "Age is required"
            });
        }

        if (typeof req.body.age !== "number") {
            return res.status(400).json({
                message: "Age must be a number"
            });
        }

        const newUser = await createUser(req.body.name, req.body.age);

        return res.status(201).json(newUser);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateUserController = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!req.body.name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        if (req.body.age === undefined) {
            return res.status(400).json({
                message: "Age is required"
            });
        }

        if (typeof req.body.age !== "number") {
            return res.status(400).json({
                message: "Age must be a number"
            });
        }

        const user = await updateUser(
            id,
            req.body.name,
            req.body.age
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteUser(id);
        if (!deleted) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

};

export { getUser, createUserController, updateUserController, deleteUserController };