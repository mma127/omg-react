import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment, Container } from 'semantic-ui-react'

import * as actions from '../../store/actions/index';
import axios from 'axios';
import classes from './Lobby.module.css';

// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Lobby extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        axios.get("/api/users")
            .then(response => this.setState({ users: response.data }));
    }

    render() {
        return (
            <Container fluid className={classes.Lobby}>
                <h1>Users</h1>
                {this.state.users.map(user => (
                    <div key={user.id}>{user.username}</div>
                ))}

                <button color="primary">
                    Hello World
                </button>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.userId !== null,
        displayName: state.auth.displayName,
        avatar: state.auth.avatar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthStatus: () => dispatch(actions.checkAuthStatus()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Lobby, axios));
export default connect(mapStateToProps, mapDispatchToProps)(Lobby, axios);