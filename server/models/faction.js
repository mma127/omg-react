'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faction = sequelize.define('Faction', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    constName: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    internalName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    side: {
      type: DataTypes.ENUM('ALLIED','AXIS'),
      allowNull: false
    }
  }, {});
  Faction.associate = function(models) {
    models.Faction.hasMany(models.Doctrine);
    models.Faction.hasMany(models.Company);
  };
  return Faction;
};