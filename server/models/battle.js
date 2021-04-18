'use strict';
module.exports = (sequelize, DataTypes) => {
  const Battle = sequelize.define('Battle', {
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('OPEN', 'STARTING', 'IN_PROGRESS', 'REPORTING', 'FINALIZED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'OPEN'
    }
  }, {});
  Battle.associate = function(models) {
    models.Battle.belongsTo(models.Ruleset, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Battle.belongsToMany(models.Company, { through: 'BattleCompanies'});
  };
  return Battle;
};