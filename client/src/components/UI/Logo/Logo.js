import React from 'react';
import { Image } from 'semantic-ui-react'

import omgLogo from '../../../assets/omg-logo.png';
import classes from './Logo.module.css';

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <Image src={omgLogo} alt='Operation Market Garden mod'/>
    </div>
);

export default logo;