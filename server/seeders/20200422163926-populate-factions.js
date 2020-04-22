'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Factions', [{
     name: 'british',
     displayName: 'British',
     constName: 'CMW',
     internalName: 'Factions.British2ndArmy',
     side: 'ALLIED'
   }, {
    name: 'american',
    displayName: 'American',
    constName: 'ALLY',
    internalName: 'Factions.Allies',
    side: 'ALLIED'
   }, {
    name: 'wehrmacht',
    displayName: 'Wehrmacht',
    constName: 'AXIS',
    internalName: 'Factions.Axis',
    side: 'AXIS'
   }, {
    name: 'panzer_elite',
    displayName: 'Panzer Elite',
    constName: 'PE',
    internalName: 'Factions.PanzerElite',
    side: 'AXIS'
   }]);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Factions', null, {});
  }
};
