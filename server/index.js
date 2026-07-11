const projectRoutes = require("./routes/projectRoutes");
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to DevSphere API"
    });
});

// Project routes
app.use("/projects", projectRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});