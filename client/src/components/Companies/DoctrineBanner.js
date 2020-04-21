import React from 'react';
import { Image } from 'semantic-ui-react';
import classes from './DoctrineOption.module.css';
import * as companyConstants from '../../shared/constants/company';

import airborne from '../../assets/factions/doctrines/banners/airborne.png';
import armor from '../../assets/factions/doctrines/banners/armor.png';
import infantry from '../../assets/factions/doctrines/banners/infantry.png';
import artillery from '../../assets/factions/doctrines/banners/artillery.png';
import commandos from '../../assets/factions/doctrines/banners/commandos.png';
import engineers from '../../assets/factions/doctrines/banners/engineers.png';
import defensive from '../../assets/factions/doctrines/banners/defensive.png';
import blitz from '../../assets/factions/doctrines/banners/blitz.png';
import terror from '../../assets/factions/doctrines/banners/terror.png';
import scorchedEarth from '../../assets/factions/doctrines/banners/scorched_earth.png';
import luftwaffe from '../../assets/factions/doctrines/banners/luftwaffe.png';
import tankHunters from '../../assets/factions/doctrines/banners/tank_hunters.png';

const doctrineBannerMap = {
    [companyConstants.AIRBORNE]: airborne,
    [companyConstants.ARMOR]: armor,
    [companyConstants.INFANTRY]: infantry,
    [companyConstants.ARTILLERY]: artillery,
    [companyConstants.COMMANDOS]: commandos,
    [companyConstants.ENGINEERS]: engineers,
    [companyConstants.DEFENSIVE]: defensive,
    [companyConstants.BLITZ]: blitz,
    [companyConstants.TERROR]: terror,
    [companyConstants.SCORCHED_EARTH]: scorchedEarth,
    [companyConstants.LUFTWAFFE]: luftwaffe,
    [companyConstants.TANK_HUNTERS]: tankHunters,
}

const DoctrineBanner = props => {

    const banner = doctrineBannerMap[props.doctrine];

    return (
        <Image
            src={banner}
            alt={props.doctrine}
            size={props.size ? props.size : null}
            centered={props.size ? props.centered : null}
        />
    );
}

export default DoctrineBanner;