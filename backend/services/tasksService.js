import pool from "../db/database.js";

const getTasks = async (userId) => {
    const result = await pool.query(
        `SELECT
       tasks.id,
       tasks.name,
       tasks.project_id AS "projectId",
       projects.name AS "projectName",
       tasks.status,
       tasks.deadline
     FROM tasks
     JOIN projects ON tasks.project_id = projects.id
     WHERE tasks.user_id = $1
     ORDER BY tasks.id`,
        [userId],
    );

    return result.rows;
};

const getTaskById = async (id, userId) => {
    const result = await pool.query(
        `SELECT
       tasks.id,
       tasks.name,
       tasks.project_id AS "projectId",
       projects.name AS "projectName",
       tasks.status,
       tasks.deadline
     FROM tasks
     JOIN projects ON tasks.project_id = projects.id
     WHERE tasks.id = $1 AND tasks.user_id = $2`,
        [id, userId],
    );

    return result.rows[0];
};

const createTask = async (name, projectId, status, deadline, userId) => {
    const projectResult = await pool.query(
        `SELECT id, name
FROM projects
     WHERE id = $1 AND user_id = $2`,
        [projectId, userId],
    );

    if (projectResult.rows.length === 0) {
        const error = new Error("Project not found");
        error.status = 404;
        throw error;
    }

    const result = await pool.query(
        `INSERT INTO tasks (name, project_id, status, deadline, user_id)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING id, name, project_id AS "projectId", status, deadline`,
        [name, projectId, status, deadline, userId],
    );

    return {
        ...result.rows[0],
        projectName: projectResult.rows[0].name,
    };
};

const updateTask = async (id, name, projectId, status, deadline, userId) => {
    const projectResult = await pool.query(
        `SELECT id, name
     FROM projects
     WHERE id = $1 AND user_id = $2`,
        [projectId, userId],
    );

    if (projectResult.rows.length === 0) {
        const error = new Error("Project not found");
        error.status = 404;
        throw error;
    }

    const result = await pool.query(
        `UPDATE tasks
   SET name = $1,
       project_id = $2,
       status = $3,
       deadline = $4
   WHERE id = $5 AND user_id = $6
   RETURNING id, name, project_id AS "projectId", status, deadline`,
        [name, projectId, status, deadline, id, userId],
    );

    const task = result.rows[0];

    if (!task) return undefined;

    return {
        ...task,
        projectName: projectResult.rows[0].name,
    };
};

const deleteTask = async (id, userId) => {
    const result = await pool.query(
        `DELETE FROM tasks
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
        [id, userId],
    );

    return result.rows[0];
};

export {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
