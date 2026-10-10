import pool from "../db/database.js";

const getClients = async (userId) => {
    const result = await pool.query(`
    SELECT *
    FROM clients
    WHERE user_id = $1
    ORDER BY id
  `, [userId]);

    return result.rows;
};

const getClientById = async (id, userId) => {
    const result = await pool.query(
        `SELECT *
     FROM clients
    WHERE id = $1 AND user_id = $2`,
        [id, userId]
    );

    return result.rows[0];
};

const createClient = async (name, userId) => {
    const result = await pool.query(
        `INSERT INTO clients (name, user_id)
     VALUES ($1, $2)
     RETURNING *`,
        [name, userId]
    );

    return result.rows[0];
};

const updateClient = async (id, name, userId) => {
    const result = await pool.query(
        `UPDATE clients
     SET name = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
        [name, id, userId]
    );

    return result.rows[0];
};

const deleteClient = async (id, userId) => {
    const result = await pool.query(
        `DELETE FROM clients
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
        [id, userId]
    );

    return result.rows[0];
};

export {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};