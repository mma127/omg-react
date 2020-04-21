INSERT INTO factions (name, display_name, const_name, internal_name, side)
VALUES
    ('british', 'British', 'CMW', 'Factions.British2ndArmy', 'ALLIED'),
    ('american', 'American', 'ALLY', 'Factions.Allies', 'ALLIED'),
    ('wehrmacht', 'Wehrmacht', 'AXIS', 'Factions.Axis', 'AXIS'),
    ('panzer_elite', 'Panzer Elite', 'PE', 'Factions.PanzerElite', 'AXIS');


INSERT INTO doctrines (name, display_name, faction_id, const_name, internal_name) 
VALUES 
    ('engineers', 'Royal Engineers', 1, 'OMGUPG.CMW.ROYALENGIESDOC', 'CMW.DOC.engineers'),
    ('artillery', 'Royal Canadian Artillery', 1, 'OMGUPG.CMW.ARTYDOC', 'CMW.DOC.artillery'),
    ('commandos', 'Royal Commandos', 1, 'OMGUPG.CMW.COMMANDODOC', 'CMW.DOC.commandos'),
    ('infantry', 'Infantry', 2, 'OMGUPG.ALLY.INFANTRYDOC', 'ALLY.DOC.Infantry'),
    ('airborne', 'Airborne', 2, 'OMGUPG.ALLY.AIRBORNEDOC', 'ALLY.DOC.Airborne'),
    ('armor', 'Armor', 2, 'OMGUPG.ALLY.ARMOURDOC', 'ALLY.DOC.Armor'),
    ('defensive', 'Defensive', 3, 'OMGUPG.AXIS.DEFENSEDOC', 'AXIS.DOC.Defense'),
    ('terror', 'Terror', 3, 'OMGUPG.AXIS.TERRORDOC', 'AXIS.DOC.Terror'),
    ('blitz', 'Blitzkrieg', 3, 'OMGUPG.AXIS.BLITZDOC', 'AXIS.DOC.Blitz'),
    ('tank_hunters', 'Tank Hunters', 4, 'OMGUPG.PE.TANKHUNTERDOC', 'PE.DOC.tank_hunters'),
    ('scorched_earth', 'Scorched Earth', 4, 'OMGUPG.PE.SCORCHEDDOC', 'PE.DOC.scorched_earth'),
    ('luftwaffe', 'Luftwaffe', 4, 'OMGUPG.PE.LUFTDOC', 'PE.DOC.luftwaffe');