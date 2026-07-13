const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const isKnownError = err.status !== undefined;

    res.status(err.status || 500).json({
        message: isKnownError ? err.message : "Internal Server Error"
    });
};

module.exports = errorHandler;