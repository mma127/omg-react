import "regenerator-runtime/runtime";
import express from 'express';
import { ensureAuthenticated } from '../utils/passport';

import * as companyService from '../services/companyService';

const router = express.Router();

router.get('/', ensureAuthenticated, async function (req, res, next) {   
    /**
     * Get all active WAR companies for the user
     */
    const companies = await companyService.getWarCompanies(req.user);
    console.log('GET Companies result: ', companies);

    res.send(JSON.stringify(companies));
});

router.post('/', ensureAuthenticated, async function (req, res, next) {
    /**
     * POST new companies
     * Expects the payload to contain allied and axis company configs
     */

    const user = req.user,
        payload = req.body,
        companyType = payload.companyType;

    switch (companyType) {
        case 'WAR':
            console.log('--- Creating war companies ---')
            await companyService.createWarCompanies(
                user, 
                payload.alliedCompanyConfigs, 
                payload.axisCompanyConfigs);
            console.log('--- Finished creating war companies ---')
            break;
        case 'FUN':
        // TODO
        default:
            throw new Error(`Must have valid companyType, received ${companyType}`);
    }
    console.log('--- Returning from POST war companies ---')
    res.end();
});

export default router;
