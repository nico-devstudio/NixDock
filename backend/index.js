import "dotenv/config";
import express from "express";
import userRoutes from "./routes/users.js";
import pool from "./db/database.js";
import projectRoutes from "./routes/projects.js";
import clientRoutes from "./routes/clients.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import deliverableRoutes from "./routes/deliverables.js";
import cors from "cors";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from .env");
}

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
app.use("/deliverables", deliverableRoutes);

app.use((error, _req, res, _next) => {
    console.error(error);

    if (error.code === "23505") {
        return res.status(409).json({
            message: "Email already exists"
        });
    }

    if (error.code === "23503") {
        return res.status(409).json({
            message: "Operation conflicts with a related record"
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


async function startServer() {
    try {
        await pool.query("SELECT NOW()");
        console.log("Database connected successfully");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}

startServer();
