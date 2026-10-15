import pool from "../db/database.js";

const getProjects = async (userId) => {
    const result = await pool.query(`
  SELECT
    projects.id,
    projects.name,
    projects.client_id AS "clientId",
    clients.name AS "clientName",
    projects.status,
    projects.deadline
  FROM projects
  LEFT JOIN clients ON projects.client_id = clients.id
  WHERE projects.user_id = $1
`, [userId]);
    return result.rows;
};

const getProjectById = async (id, userId) => {
    const result = await pool.query(`
SELECT
    projects.id,
    projects.name,
    projects.client_id AS "clientId",
    clients.name AS "clientName",
    projects.status,
    projects.deadline
  FROM projects
  LEFT JOIN clients ON projects.client_id = clients.id
  WHERE projects.id = $1
  AND projects.user_id = $2
`, [id, userId]);

    return result.rows[0];
};

const createProject = async (name, clientId, status, deadline, userId) => {
    if (clientId !== null && clientId !== undefined) {
        const clientResult = await pool.query(
            `SELECT id
         FROM clients
         WHERE id = $1 AND user_id = $2`,
            [clientId, userId]
        );

        if (clientResult.rows.length === 0) {
            const error = new Error("Client not found");
            error.status = 404;
            throw error;
        }
    }

    const result = await pool.query(
        `INSERT INTO projects (name, client_id, status, deadline, user_id)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *`,
        [name, clientId, status, deadline, userId]
    );

    return result.rows[0];
};

const updateProject = async (id, name, clientId, status, deadline, userId) => {

    if (clientId !== null && clientId !== undefined) {
        const clientResult = await pool.query(
            `SELECT id
         FROM clients
         WHERE id = $1 AND user_id = $2`,
            [clientId, userId]
        );

        if (clientResult.rows.length === 0) {
            const error = new Error("Client not found");
            error.status = 404;
            throw error;
        }
    }


    if (deadline) {
        const taskResult = await pool.query(
            `SELECT id, name, deadline
     FROM tasks
     WHERE project_id = $1
       AND user_id = $2
       AND deadline > $3`,
            [id, userId, deadline],
        );

        if (taskResult.rows.length > 0) {
            const error = new Error(
                "Project deadline cannot be earlier than an existing task deadline",
            );
            error.status = 400;
            throw error;
        }
    }

    const result = await pool.query(
        `UPDATE projects
    SET name = $1,
    client_id = $2,
    status = $3,
    deadline = $4
WHERE id = $5 AND user_id = $6
RETURNING *`,
        [name, clientId, status, deadline, id, userId]
    );

    return result.rows[0];
};
const deleteProject = async (id, userId) => {
    const result = await pool.query(
        `DELETE FROM projects
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
        [id, userId]
    );

    return result.rows[0];
};


export { getProjects, getProjectById, createProject, updateProject, deleteProject };