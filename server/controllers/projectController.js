const projects = require("../data/projects");
const getProjects = (req, res) => {
    res.json(projects);
};
const createProject = (req, res) => {
    const newProject = req.body;
    newProject.id = projects.length + 1;
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
    if  (newProject.progress === undefined) {
        return res.status(400).json({
            message: "Progress is required"
        });
    }
    if (!newProject.technologies) {
        return res.status(400).json({
            message: "Technologies are required"
        });
    
    }

    projects.push(newProject);

    res.status(201).json({
        message: "Project added successfully!",
        project: newProject
    });
    }
module.exports = {
    getProjects,
    createProject
};