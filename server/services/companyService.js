import logger from '../utils/logger';
import "regenerator-runtime/runtime";
import sequelize from '../utils/sequelize';
import models from '../models';
import * as doctrineService from './doctrineService';

const STARTING_MP = 9000;
const STARTING_MU = 1800;
const STARTING_FU = 1400;

const MAX_WAR_COMPANIES_PER_SIDE = 1;
const MAX_PATREON_WAR_COMPANIES_PER_SIDE = 2;

export const getWarCompanies = async (player) => {
    /**
     * Retrieve all ACTIVE WAR companies for the player.
     */
    logger.log('debug', 'Start GET companies');
    let result = await models.Company.findAll({
        where: {
            PlayerId: player.id
        },
        include: [{
            model: models.Doctrine
        }]
    })

    logger.log('debug', 'getWarCompanies Query result: ', result);

    return result;
}

export const createWarCompanies = async (player, alliedCompanyConfigs, axisCompanyConfigs) => {
    /**
     * Creates allied and axis war companies for the player. Verifies that the player is eligible
     * to create the given companies.
     */
    logger.log('debug', `CreateWarCompanies: checking existing companies for player ${player.id}`);
    let companies = await models.Company.findAll({
        where: { status: 'ACTIVE', RulesetId: 1 },
        include: [{
            model: models.Player,
            where: {
                id: player.id
            },
            required: true
        }]
    });

    let alliedFactions = await models.Faction.findAll({ where: { side: 'ALLIED' } });

    let axisFactions = await models.Faction.findAll({ where: { side: 'AXIS' } });

    const existingAlliedCount = 0,
        existingAxisCount = 0,
        alliedFactionIds = alliedFactions.map(f => f.id),
        axisFactionIds = axisFactions.map(f => f.id);

    for (let company in companies) {
        if (alliedFactionIds.contains(company.factionId)) {
            existingAlliedCount += 1;
        } else if (axisFactionIds.contains(company.factionId)) {
            existingAxisCount += 1;
        } else {
            throw new Error(`Unrecognized faction id: ${company.factionId}`);
        }
    }

    if (existingAlliedCount >= MAX_WAR_COMPANIES_PER_SIDE ||
        alliedCompanyConfigs.length > (MAX_WAR_COMPANIES_PER_SIDE - existingAlliedCount)) {
        throw new Error(`Cannot create additional Allied WAR companies for player ${player.id}. 
            Have ${existingAlliedCount} existing, ${alliedCompanyConfigs.length} requested, ${MAX_WAR_COMPANIES_PER_SIDE} max`);
    }
    if (existingAxisCount >= MAX_WAR_COMPANIES_PER_SIDE ||
        axisCompanyConfigs.length > (MAX_WAR_COMPANIES_PER_SIDE - existingAxisCount)) {
        throw new Error(`Cannot create additional Axis WAR companies for player ${player.id}. 
            Have ${existingAxisCount} existing, ${axisCompanyConfigs.length} requested, ${MAX_WAR_COMPANIES_PER_SIDE} max`);
    }

    logger.log('debug', `Player ${player.id} is clear to create war companies`);
    // Player is all clear, can create these companies.
    const companyConfigs = alliedCompanyConfigs.concat(axisCompanyConfigs);
    for (const companyConfig of companyConfigs) {
        await createCompany(player, companyConfig, 'WAR');
    }
}

export const createCompany = async (player, companyConfig, companyType) => {
    logger.log('debug', `Creating company for ${player.id} with name [${companyConfig.name}], 
    doctrine ${companyConfig.doctrine}`);
    const doctrine = await doctrineService.getDoctrineByName(companyConfig.doctrine);

    const company = await models.Company.create({
        displayName: companyConfig.name,
        PlayerId: player.id,
        FactionId: doctrine.FactionId,
        DoctrineId: doctrine.id,
        RulesetId: 1, // TODO Update this to use constant or db
        manpower: STARTING_MP,
        munitions: STARTING_MU,
        fuel: STARTING_FU
    })
    logger.log('debug', `CREATED COMPANY: ${company}`);

    return company;
}