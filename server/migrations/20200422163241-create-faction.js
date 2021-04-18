'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Factions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      displayName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      constName: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      internalName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      side: {
        type: Sequelize.ENUM('ALLIED','AXIS'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Factions');
  }
};