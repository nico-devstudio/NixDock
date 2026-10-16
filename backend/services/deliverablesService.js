import pool from "../db/database.js";

const getDeliverables = async (userId) => {
    const result = await pool.query(
        `SELECT
       deliverables.id,
       deliverables.name,
       deliverables.project_id AS "projectId",
       projects.name AS "projectName",
       deliverables.date
     FROM deliverables
     JOIN projects
  ON deliverables.project_id = projects.id
  AND projects.user_id = deliverables.user_id
     WHERE deliverables.user_id = $1
     ORDER BY deliverables.id`,
        [userId],
    );

    return result.rows;
};


const getDeliverableById = async (id, userId) => {
    const result = await pool.query(
        `SELECT
       deliverables.id,
       deliverables.name,
       deliverables.project_id AS "projectId",
       projects.name AS "projectName",
       TO_CHAR(deliverables.date, 'YYYY-MM-DD') AS date
     FROM deliverables
     JOIN projects
  ON deliverables.project_id = projects.id
  AND projects.user_id = deliverables.user_id
     WHERE deliverables.id = $1
       AND deliverables.user_id = $2`,
        [id, userId],
    );

    return result.rows[0];
};


const createDeliverable = async (name, projectId, date, userId) => {
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
        `INSERT INTO deliverables (name, project_id, user_id, date)
     VALUES ($1, $2, $3, $4)
     RETURNING
       id,
       name,
       project_id AS "projectId",
       TO_CHAR(date, 'YYYY-MM-DD') AS date`,
        [name, projectId, userId, date],
    );

    return {
        ...result.rows[0],
        projectName: projectResult.rows[0].name,
    };
};

const updateDeliverable = async (id, name, projectId, date, userId) => {
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
        `UPDATE deliverables
     SET name = $1,
         project_id = $2,
         date = $3
     WHERE id = $4 AND user_id = $5
     RETURNING
       id,
       name,
       project_id AS "projectId",
       TO_CHAR(date, 'YYYY-MM-DD') AS date`,
        [name, projectId, date, id, userId],
    );

    const deliverable = result.rows[0];

    if (!deliverable) return undefined;

    return {
        ...deliverable,
        projectName: projectResult.rows[0].name,
    };
};

const deleteDeliverable = async (id, userId) => {
    const result = await pool.query(
        `DELETE FROM deliverables
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
        [id, userId],
    );

    return result.rows[0];
};



export { getDeliverables, getDeliverableById, createDeliverable, updateDeliverable, deleteDeliverable };
