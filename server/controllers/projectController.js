const pool = require("../config/db");

const getProjects = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM projects");

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM projects WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const createProject = async (req, res) => {
    const newProject = req.body;

    if (!newProject.title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (!newProject.description) {
        return res.status(400).json({
            message: "Description is required"
        });
    }

    if (!newProject.status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    if (!newProject.owner) {
        return res.status(400).json({
            message: "Owner is required"
        });
    }

    if (newProject.progress === undefined) {
        return res.status(400).json({
            message: "Progress is required"
        });
    }

    if (!newProject.technologies) {
        return res.status(400).json({
            message: "Technologies are required"
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO projects
            (title, description, status, owner, progress, technologies)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                newProject.title,
                newProject.description,
                newProject.status,
                newProject.owner,
                newProject.progress,
                newProject.technologies
            ]
        );

        res.status(201).json({
            message: "Project added successfully!",
            project: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const updateProject = async (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;

    try {
        const project = await pool.query(
            "SELECT * FROM projects WHERE id = $1",
            [id]
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
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $7
             RETURNING *`,
            [
                updatedProject.title,
                updatedProject.description,
                updatedProject.status,
                updatedProject.owner,
                updatedProject.progress,
                updatedProject.technologies,
                id
            ]
        );

        res.status(200).json({
            message: "Project updated successfully!",
            project: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await pool.query(
            "SELECT * FROM projects WHERE id = $1",
            [id]
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
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};