'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'BattleCompanies',
      {
        BattleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          onDelete: 'CASCADE',
          references: {
            model: 'Battles',
            key: 'id'
          }
        },
        CompanyId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          onDelete: 'CASCADE',
          references: {
            model: 'Companies',
            key: 'id'
          }
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
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BattleCompanies');
  }
};
