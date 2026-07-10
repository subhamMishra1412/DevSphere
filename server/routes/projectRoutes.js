const express = require("express");
const router = express.Router();
const validateProject = require("../middleware/validateProject");

const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", validateProject, createProject);
router.put("/:id", validateProject, updateProject);

router.delete("/:id", deleteProject);
module.exports = router;