
import pool from "../db/database.js";

const findUserById = async (id) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createUser = async (name, age) => {
    try {
        const result = await pool.query(
            "INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *",
            [name, age]
        );

        return result.rows[0]
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateUser = async (id, name, age) => {
    try {
        const result = await pool.query(
            "UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *",
            [name, age, id]
        );

        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [id]
        );

        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { findUserById, createUser, updateUser, deleteUser };