'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctrine = sequelize.define('Doctrine', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    constName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    internalName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
  }, {});
  Doctrine.associate = function(models) {
    models.Doctrine.belongsTo(models.Faction, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Doctrine.hasMany(models.Company);
  };
  return Doctrine;
};