const validateProject = (req, res, next) => {
    const {
        title,
        description,
        status,
        owner,
        progress,
        technologies
    } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (!description) {
        return res.status(400).json({
            message: "Description is required"
        });
    }

    if (!status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    if (!owner) {
        return res.status(400).json({
            message: "Owner is required"
        });
    }

    if (progress === undefined) {
        return res.status(400).json({
            message: "Progress is required"
        });
    }

    if (!Array.isArray(technologies) || technologies.length === 0) {
    return res.status(400).json({
        message: "At least one technology is required"
    });
}

    next();
};

module.exports = validateProject;