'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Doctrines', [{
        name: 'engineers',
        displayName: 'Royal Engineers', 
        factionId: 1,
        constName: 'OMGUPG.CMW.ROYALENGIESDOC',
        internalName: 'CMW.DOC.engineers'
      },
      {
        name: 'artillery',
        displayName: 'Royal Canadian Artillery',
        factionId: 1,
        constName: 'OMGUPG.CMW.ARTYDOC',
        internalName: 'CMW.DOC.artillery'
      },
      {
        name: 'commandos',
        displayName: 'Royal Commandos',
        factionId: 1,
        constName: 'OMGUPG.CMW.COMMANDODOC',
        internalName: 'CMW.DOC.commandos'
      },
      {
        name: 'infantry',
        displayName: 'Infantry',
        factionId: 2,
        constName: 'OMGUPG.ALLY.INFANTRYDOC',
        internalName: 'ALLY.DOC.Infantry'
      },
      {
        name: 'airborne',
        displayName: 'Airborne',
        factionId: 2,
        constName: 'OMGUPG.ALLY.AIRBORNEDOC',
        internalName: 'ALLY.DOC.Airborne'
      },
      {
        name: 'armor',
        displayName: 'Armor',
        factionId: 2,
        constName: 'OMGUPG.ALLY.ARMOURDOC',
        internalName: 'ALLY.DOC.Armor'
      },
      {
        name: 'defensive',
        displayName: 'Defensive',
        factionId: 3,
        constName: 'OMGUPG.AXIS.DEFENSEDOC',
        internalName: 'AXIS.DOC.Defense'
      },
      {
        name: 'terror',
        displayName: 'Terror',
        factionId: 3,
        constName: 'OMGUPG.AXIS.TERRORDOC',
        internalName: 'AXIS.DOC.Terror'
      },
      {
        name: 'blitz',
        displayName: 'Blitzkrieg',
        factionId: 3,
        constName: 'OMGUPG.AXIS.BLITZDOC',
        internalName: 'AXIS.DOC.Blitz'
      },
      {
        name: 'tank_hunters',
        displayName: 'Tank Hunters',
        factionId: 4,
        constName: 'OMGUPG.PE.TANKHUNTERDOC',
        internalName: 'PE.DOC.tank_hunters'
      },
      {
        name: 'scorched_earth',
        displayName: 'Scorched Earth',
        factionId: 4,
        constName: 'OMGUPG.PE.SCORCHEDDOC',
        internalName: 'PE.DOC.scorched_earth'
      },
      {
        name: 'luftwaffe',
        displayName: 'Luftwaffe',
        factionId: 4,
        constName: 'OMGUPG.PE.LUFTDOC',
        internalName: 'PE.DOC.luftwaffe'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Doctrines', null, {});
  }
};
