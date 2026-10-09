require("dotenv").config();

const express = require("express");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");


const app = express();

app.use(express.json());

sequelize.authenticate()
    .then(() => console.log("MySQL connected successfully"))
    .catch(error => {
        console.log("Database connection failed:");
        console.log(error.message);
    });

app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});