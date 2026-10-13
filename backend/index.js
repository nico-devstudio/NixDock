import "dotenv/config";
import express from "express";
import userRoutes from "./routes/users.js";
import pool from "./db/database.js";
import projectRoutes from "./routes/projects.js";
import clientRoutes from "./routes/clients.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasksRoutes.js";
import cors from "cors";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from .env");
}

pool.query("SELECT NOW()")
    .then(result => {
        console.log(result.rows);
    })
    .catch(error => {
        console.error(error);
    });

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    }),
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/clients", clientRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use((error, _req, res, _next) => {
    console.error(error);

    if (error.code === "23505") {
        return res.status(409).json({
            message: "Email already exists"
        });
    }

    if (error.code === "23503") {
        return res.status(409).json({
            message: "Cannot delete client because it has associated projects"
        });
    }

    const status = error.status || 500;

    return res.status(status).json({
        message:
            status === 500
                ? "Internal server error"
                : error.message,
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});