const express = require("express");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    updateTaskStatus
} = require("../controllers/taskController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// All task routes require login
router.use(authenticate);

// Create task
router.post("/", createTask);

// View all/own tasks
router.get("/", getTasks);

// View one task
router.get("/:id", getTaskById);

// Edit task
router.put("/:id", updateTask);

// Update status - Admin only
router.patch(
    "/:id/status",
    authorize("admin"),
    updateTaskStatus
);

module.exports = router;