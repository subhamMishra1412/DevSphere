require("dotenv").config();
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
}
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10
});

app.use(apiLimiter);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/projects", projectRoutes);
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});