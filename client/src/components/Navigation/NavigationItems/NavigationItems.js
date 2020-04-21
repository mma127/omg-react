import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <React.Fragment>
        <Menu.Item
            name='lobby'
            as={NavLink}
            to='/'
            exact
        />
        {props.isAuth ?
            <Menu.Item
                name='companies'
                as={NavLink}
                to='/companies'
                exact
            /> : null}
        <Menu.Item
            name='stats'
            as={NavLink}
            to='/stats'
            exact
        />
        <Menu.Item
            name='resources'
            as={NavLink}
            to='/resources'
            exact
        />
    </React.Fragment>
);

export default navigationItems;