const projectRoutes = require("./routes/projectRoutes");
const errorHandler = require("./middleware/errorHandler");
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
const cors = require("cors");
app.use(cors());
const helmet = require("helmet");
app.use(helmet());
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
const morgan = require("morgan");
app.use(morgan("dev"));
// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to DevSphere API"
    });
});

// Project routes
app.use("/projects", projectRoutes);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});