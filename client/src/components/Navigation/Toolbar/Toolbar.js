import React from 'react';
import { Menu, Segment } from 'semantic-ui-react'

import classes from './Toolbar.module.css';

import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import SteamProfileWrapper from './../../Steam/SteamProfileWrapper';

const toolbar = (props) => (
    // <header className={classes.Toolbar}>
    //     <DrawerToggle clicked={props.drawerToggleClicked} />
    //     <div className={classes.Logo}>
    //         <Logo />
    //     </div>
    //     <nav className={classes.DesktopOnly}>
    //         <NavigationItems isAuth={props.isAuth} />
    //         <SteamProfileWrapper
    //             isAuthenticated={props.isAuth}
    //             displayName={props.displayName}
    //             avatar={props.avatar} />
    //     </nav>
    // </header>
    <header>
        <Menu size='large' pointing secondary className={classes.ToolbarMenu}>
            {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
            <Menu.Item className={classes.Logo}>
                <Logo />
            </Menu.Item>
            <Menu.Menu className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} />
            </Menu.Menu>
            <Menu.Item position='right' className={[classes.DesktopOnly, classes.SteamProfileMenuItem].join(' ')}>
                <SteamProfileWrapper
                        isAuthenticated={props.isAuth}
                        displayName={props.displayName}
                        avatar={props.avatar} />
            </Menu.Item>
        </Menu>
    </header>
);

export default toolbar;