'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Battles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      RulesetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Rulesets',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM('OPEN', 'STARTING', 'IN_PROGRESS', 'REPORTING', 'FINALIZED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'OPEN'
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
    return queryInterface.dropTable('Battles');
  }
};