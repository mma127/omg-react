import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment, Container } from 'semantic-ui-react'

import * as actions from '../../store/actions/index';
import axios from 'axios';
import classes from './Resources.module.css';

// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Resources extends Component {
    state = {
        users: []
    };

    getSteamUser = () => {
        axios.get('/api/auth/user')
            .then(response => this.setState({ isAuthenticated: true, userData: response.data }))
            .catch(err => console.log(err));
    };

    componentDidMount() {
        axios.get("/api/users")
            .then(response => this.setState({ users: response.data }));
    }

    render() {
        return (
            <Container fluid className={classes.Resources}>
                <h1>Resources</h1>
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
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Lobby, axios));
export default connect(mapStateToProps, mapDispatchToProps)(Resources, axios);