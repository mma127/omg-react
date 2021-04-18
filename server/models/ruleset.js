'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ruleset = sequelize.define('Ruleset', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Ruleset.associate = function(models) {
    models.Ruleset.hasMany(models.Company);
  };
  return Ruleset;
};