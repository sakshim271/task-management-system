"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("tasks", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },

            title: {
                type: Sequelize.STRING,
                allowNull: false
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            status: {
                type: Sequelize.ENUM(
                    "Pending",
                    "In Progress",
                    "Testing",
                    "Completed"
                ),
                allowNull: false,
                defaultValue: "Pending"
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("tasks");
    }
};