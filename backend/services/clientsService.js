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


const createClient = async (name, email, userId) => {
    const result = await pool.query(
        `INSERT INTO clients (name, email, user_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
        [name, email || null, userId],
    );

    return result.rows[0];
};



const updateClient = async (id, name, email, userId) => {
    const result = await pool.query(
        `UPDATE clients
     SET name = $1, email = $2
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
        [name, email || null, id, userId],
    );

    return result.rows[0];
};


const deleteClient = async (id, userId) => {
    const projects = await pool.query(
        `SELECT id
   FROM projects
   WHERE client_id = $1
     AND user_id = $2
   LIMIT 1`,
        [id, userId],
    );

    if (projects.rows.length > 0) {
        return { hasProjects: true };
    }

    const result = await pool.query(
        `DELETE FROM clients
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
        [id, userId],
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