import React from 'react';
import classes from './SteamLoginButton.module.css';
import steamLoginButton from '../../assets/sits_01.png';
import { Image } from 'semantic-ui-react'

const SteamLoginButton = () => {
    return (
        <a href='/api/auth/steam' className={classes.SteamLoginButton}>
            <Image 
                src={steamLoginButton} alt='Login through Steam'/>
        </a>
    );
}

export default SteamLoginButton;