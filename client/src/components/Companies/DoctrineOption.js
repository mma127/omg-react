import React from 'react';
import { Radio } from 'semantic-ui-react';
import classes from './DoctrineOption.module.css';
import * as companyConstants from '../../shared/constants/company';

const doctrineClassMap = {
    [companyConstants.AIRBORNE]: classes.Airborne,
    [companyConstants.ARMOR]: classes.Armor,
    [companyConstants.INFANTRY]: classes.Infantry,
    [companyConstants.ARTILLERY]: classes.Artillery,
    [companyConstants.COMMANDOS]: classes.Commandos,
    [companyConstants.ENGINEERS]: classes.Engineers,
    [companyConstants.DEFENSIVE]: classes.Defensive,
    [companyConstants.BLITZ]: classes.Blitz,
    [companyConstants.TERROR]: classes.Terror,
    [companyConstants.SCORCHED_EARTH]: classes.ScorchedEarth,
    [companyConstants.LUFTWAFFE]: classes.Luftwaffe,
    [companyConstants.TANK_HUNTERS]: classes.TankHunters,
}

const DoctrineOption = props => {

    const doctrineClass = doctrineClassMap[props.radioValue];

    const styles = [classes.DoctrineOption, doctrineClass].join(' ');

    return (<Radio
        // label={props.label} 
        name={props.groupName}
        value={props.radioValue}
        checked={props.value === props.radioValue}
        onChange={props.handleChange}
        className={styles}
    />);
}

export default DoctrineOption;