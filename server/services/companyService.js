import "regenerator-runtime/runtime";
import pool from '../utils/pool';
import * as doctrineService from './doctrineService';
import { keysToCamel } from '../utils/parsing';

const STARTING_MP = 9000;
const STARTING_MU = 1800;
const STARTING_FU = 1400;

const MAX_WAR_COMPANIES_PER_SIDE = 1;
const MAX_PATREON_WAR_COMPANIES_PER_SIDE = 2;

export const getWarCompanies = async (player) => {
    /**
     * Retrieve all ACTIVE WAR companies for the player.
     */
    let [result] = await pool.query(
        'SELECT * FROM companies JOIN players_companies pc on companies.id = pc.company_id where pc.player_id = ?', [player.id]);
    
    console.log('getWarCompanies Query result: ', result);

    const doctrinesById = await doctrineService.getDoctrinesById();

    let companies = result.map((company) => {
        const doctrine = doctrinesById[company.doctrine_id];
        company.doctrine = doctrine.name;
        return keysToCamel(company);
    });
    return companies;
}

export const createWarCompanies = async (player, alliedCompanyConfigs, axisCompanyConfigs) => {
    /**
     * Creates allied and axis war companies for the player. Verifies that the player is eligible
     * to create the given companies.
     */
    let [companies] = await pool.query(
        `SELECT * FROM companies JOIN players_companies pc ON companies.id = pc.company_id 
            WHERE pc.player_id = ${player.id} and companies.status = 'ACTIVE' and pc.company_type = 'WAR';`
    )

    let [alliedFactions] = await pool.query(
        `SELECT * FROM factions WHERE side = 'ALLIED'`
    )

    let [axisFactions] = await pool.query(
        `SELECT * FROM factions WHERE side = 'AXIS'`
    )

    const existingAlliedCount = 0,
        existingAxisCount = 0,
        alliedFactionIds = alliedFactions.map(f => f.id),
        axisFactionIds = axisFactions.map(f => f.id);

    for (let company in companies) {
        if (alliedFactionIds.contains(company.faction_id)) {
            existingAlliedCount += 1;
        } else if (axisFactionIds.contains(company.faction_id)) {
            existingAxisCount += 1;
        } else {
            throw new Error(`Unrecognized faction id: ${company.faction_id}`);
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

    // Player is all clear, can create these companies.
    alliedCompanyConfigs.concat(axisCompanyConfigs).forEach(companyConfig => {
        createCompany(player, companyConfig, 'WAR');
    })
}

export const createCompany = async (player, companyConfig, companyType) => {
    const doctrine = await doctrineService.getDoctrineByName(companyConfig.doctrine);

    console.log(`INSERT INTO companies (display_name, type, faction_id, doctrine_id, manpower, munitions, fuel) 
    VALUES ('${companyConfig.name}', '${companyType}', ${doctrine.faction_id}, ${doctrine.id}, 
            ${STARTING_MP}, ${STARTING_MU}, ${STARTING_FU})`)
    // Insert into companies
    let [company] = await pool.query(
        `INSERT INTO companies (display_name, type, faction_id, doctrine_id, manpower, munitions, fuel) 
            VALUES ('${companyConfig.name}', '${companyType}', ${doctrine.faction_id}, ${doctrine.id}, 
                    ${STARTING_MP}, ${STARTING_MU}, ${STARTING_FU})`,
    );

    console.log(`INSERT INTO players_companies (player_id, company_id, company_type) 
        VALUES (${player.id}, ${company.insertId}, '${companyType}')`);
    // Insert into players_companies
    let [result] = await pool.query(
        `INSERT INTO players_companies (player_id, company_id, company_type) 
            VALUES (${player.id}, ${company.insertId}, '${companyType}')`,
    );

    return result;
}