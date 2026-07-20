const VALID_STATUSES = [
    "Planning",
    "Active",
    "Completed"
];

const validateProject = (req, res, next) => {
    const {
        title,
        description,
        status,
        owner,
        progress,
        technologies,
        due_date
    } = req.body;
    if (due_date && isNaN(Date.parse(due_date))) {
    return res.status(400).json({
        message: "Due date must be a valid date"
    });
}

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

    if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
            message: `Status must be one of: ${VALID_STATUSES.join(", ")}`
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

    if (progress < 0 || progress > 100) {
        return res.status(400).json({
            message: "Progress must be between 0 and 100"
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