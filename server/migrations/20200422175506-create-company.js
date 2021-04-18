'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('ACTIVE','DELETED','STATIC'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },
      PlayerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Players',
          key: 'id'
        }
      },
      FactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Factions',
          key: 'id'
        }
      },
      DoctrineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Doctrines',
          key: 'id'
        }
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
      manpower: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      munitions: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fuel: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vpsEarned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    return queryInterface.dropTable('Companies');
  }
};