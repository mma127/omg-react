import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment } from 'semantic-ui-react'

import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import * as actions from './../../store/actions/index';

class Layout extends Component {
    // In HOC as it's only to wrap other components
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Segment vertical className={classes.LayoutSegment}>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    isAuthLoading={this.props.isAuthLoading}
                    displayName={this.props.displayName}
                    avatar={this.props.avatar}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                {/* <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    displayName={this.props.displayName}
                    avatar={this.props.avatar}
                    isOpen={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} /> */}
                {/* <main className={classes.Content}> */}
                {this.props.children}
                {/* </main> */}
            </Segment>
        )
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.userId !== null,
        isAuthLoading: state.auth.isLoading,
        displayName: state.auth.displayName,
        avatar: state.auth.avatar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthStatus: () => dispatch(actions.checkAuthStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);