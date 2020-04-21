import React from 'react';
import SteamLoginButton from './SteamLoginButton';
import SteamProfile from './SteamProfile';
import classes from './SteamProfileWrapper.module.css';

const SteamProfileWrapper = props => {

    let content = null;
    if (props.isAuthLoading) {
        content = null;
    } else if (props.isAuthenticated) {
        content = <SteamProfile name={props.displayName} avatar={props.avatar} />;
    } else {
        content = <SteamLoginButton />;
    }

    return (
        <div className={classes.SteamProfileWrapper}>
            {content}
        </div>
    )
};

export default SteamProfileWrapper;