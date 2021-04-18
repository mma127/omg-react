'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Rulesets', [{
        name: 'WAR Standard',
      }, {
        name: 'FUN Standard'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rulesets', null, {});
  }
};
