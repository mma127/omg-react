'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    displayName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ACTIVE','DELETED','STATIC'),
      allowNull: false,
      defaultValue: 'ACTIVE'
    },
    manpower: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    munitions: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fuel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vpsEarned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});
  Company.associate = function(models) {
    models.Company.belongsTo(models.Player, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Company.belongsTo(models.Faction, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Company.belongsTo(models.Doctrine, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Company.belongsTo(models.Ruleset, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Company.belongsToMany(models.Battle, {through: 'BattleCompanies'});

  };
  return Company;
};