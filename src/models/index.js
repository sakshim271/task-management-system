const User = require("./User");
const Task = require("./Task");

// One User can have many Tasks
User.hasMany(Task, {
    foreignKey: "user_id",
    as: "tasks",
    onDelete: "CASCADE"
});

// Each Task belongs to one User
Task.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

module.exports = {
    User,
    Task
};