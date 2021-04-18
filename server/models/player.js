'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    displayName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    openId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: DataTypes.STRING,
    lastActive: DataTypes.DATE
  }, {});
  Player.associate = function(models) {
    models.Player.hasMany(models.Company);
  };
  return Player;
};