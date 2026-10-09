const { Task, User } = require("../models");

// CREATE TASK
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({
            user_id: req.user.id,
            title,
            description,
            status: "Pending"
        });

        return res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// GET ALL TASKS
const getTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === "admin") {
            // Admin can see all tasks
            tasks = await Task.findAll({
                include: {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email"]
                }
            });
        } else {
            // Regular user can see only own tasks
            tasks = await Task.findAll({
                where: {
                    user_id: req.user.id
                }
            });
        }

        return res.status(200).json({
            tasks
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// GET ONE TASK
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Regular users can only view their own task
        if (
            req.user.role !== "admin" &&
            task.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        return res.status(200).json({
            task
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// UPDATE TASK DETAILS
const updateTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Regular users can update only their own task
        if (
            req.user.role !== "admin" &&
            task.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        if (title !== undefined) {
            task.title = title;
        }

        if (description !== undefined) {
            task.description = description;
        }

        await task.save();

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// UPDATE TASK STATUS - ADMIN ONLY
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "In Progress",
            "Testing",
            "Completed"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.status = status;

        await task.save();

        return res.status(200).json({
            message: "Task status updated successfully",
            task
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    updateTaskStatus
};