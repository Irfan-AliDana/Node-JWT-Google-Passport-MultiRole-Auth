"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "Tokens",
            "employeId",
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Employes",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            }
            // {
            //     after: "token",
            // }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Tokens", "employeId");
    },
};
