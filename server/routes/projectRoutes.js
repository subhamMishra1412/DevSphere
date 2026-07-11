const express = require("express");
const router = express.Router();
const validateProject = require("../middleware/validateProject");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.post("/", authMiddleware, validateProject, createProject);
router.put("/:id", authMiddleware, validateProject, updateProject);
router.delete("/:id", authMiddleware, deleteProject);
module.exports = router;