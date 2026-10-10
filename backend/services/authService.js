import pool from "../db/database.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

const registerUser = async (name, age, email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `INSERT INTO users (name, age, email, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, age, email`,
        [name, age, email, passwordHash]
    );

    return result.rows[0];
};

const loginUser = async (email, password) => {
    const result = await pool.query(
        `SELECT *
     FROM users
     WHERE email = $1`,
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            age: user.age,
            email: user.email
        },
        token
    };
};

export {
    registerUser,
    loginUser
};