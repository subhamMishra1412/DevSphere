const pool = require("../config/db");

const getProjects = async (req, res , next) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
        "SELECT * FROM projects WHERE user_id = $1 ORDER BY id",
        [userId]
     );
        res.status(200).json(result.rows);
    } catch (error) {
    next(error);
    }
    }

const getProjectById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
        `SELECT * FROM projects
         WHERE id = $1
         AND user_id = $2`,
        [id, req.user.id]
       );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
    next(error);
}
};

const createProject = async (req, res, next) => {
    const newProject = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query(
    `INSERT INTO projects
    (title, description, status, owner, progress, technologies, user_id, due_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
        newProject.title,
        newProject.description,
        newProject.status,
        newProject.owner,
        newProject.progress,
        newProject.technologies,
        userId,
        newProject.due_date || null
    ]
);

        res.status(201).json({
            message: "Project added successfully!",
            project: result.rows[0]
        });

    } catch (error) {
    next(error);
}
};
const updateProject = async (req, res, next) => {
    const { id } = req.params;
    const updatedProject = req.body;

    try {
        const project = await pool.query(
        `SELECT * FROM projects
         WHERE id = $1
         AND user_id = $2`,
         [id, req.user.id]
        );

        if (project.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const result = await pool.query(
    `UPDATE projects
     SET
        title = $1,
        description = $2,
        status = $3,
        owner = $4,
        progress = $5,
        technologies = $6,
        due_date = $7,
        updated_at = CURRENT_TIMESTAMP
     WHERE id = $8
     RETURNING *`,
    [
        updatedProject.title,
        updatedProject.description,
        updatedProject.status,
        updatedProject.owner,
        updatedProject.progress,
        updatedProject.technologies,
        updatedProject.due_date || null,
        id
    ]
);
        res.status(200).json({
            message: "Project updated successfully!",
            project: result.rows[0]
        });

    } catch (error) {
    next(error);
}
};
const deleteProject = async (req, res, next) => {
    const { id } = req.params;

    try {
        const project = await pool.query(
        `SELECT * FROM projects
        WHERE id = $1
        AND user_id = $2`,
        [id, req.user.id]
        );

        if (project.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        await pool.query(
            "DELETE FROM projects WHERE id = $1",
            [id]
        );

        res.status(200).json({
            message: "Project deleted successfully!"
        });

    } catch (error) {
    next(error);
}
};
module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};