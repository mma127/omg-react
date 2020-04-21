import React from 'react';
import classes from './SteamProfile.module.css';
import { Image, Segment } from 'semantic-ui-react'

const SteamProfile = props => (
    <div className={classes.SteamProfile}>
        <Image alt={props.name} src={props.avatar} avatar/>
        <Segment compact vertical className={classes.NameSegment}>
            <div className={classes.SteamName}>{props.name}</div>
            <a href='/api/auth/logout'>Logout</a>
        </Segment>
    </div>
);

export default SteamProfile;