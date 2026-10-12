
import pool from "../db/database.js";

const findUserById = async (id) => {
    const result = await pool.query(
        `SELECT id, name, age, email
         FROM users
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const updateUser = async (id, name, age) => {
    const result = await pool.query(
        `UPDATE users
         SET name = $1, age = $2
         WHERE id = $3
         RETURNING id, name, age, email`,
        [name, age, id]
    );

    return result.rows[0];
};

const deleteUser = async (id) => {
    const result = await pool.query(
        `DELETE FROM users
         WHERE id = $1
         RETURNING id, name, age, email`,
        [id]
    );

    return result.rows[0];
};

export { findUserById, updateUser, deleteUser };