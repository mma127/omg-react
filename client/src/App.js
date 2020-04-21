import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from './hoc/Layout/Layout';
import Lobby from './containers/Lobby/Lobby';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import axios from "axios";
import "./App.css";

import socketIOClient from 'socket.io-client';

/* From https://tylermcginnis.com/react-router-protected-routes-authentication/ */
const PrivateRoute = ({ component: Component, isAuthenticated: isAuthenticated, setAuthRedirect: setAuthRedirect, path: path, ...rest }) => (
    <Route {...rest} path={path} render={props => {
        if (isAuthenticated === true) {
            return (
                <Suspense fallback={<div>Loading</div>}>
                    <Component {...props} />
                </Suspense>)
        } else {
            setAuthRedirect(path);
            return <Redirect to='/' />;
        }
    }} />
)

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthStatus();

        const socket = socketIOClient(); // TODO Implement sockets for battles and chat
    }

    render() {
        const Companies = React.lazy(() => import('./containers/Companies/Companies'));
        const Stats = React.lazy(() => import('./containers/Stats/Stats'));
        const Resources = React.lazy(() => import('./containers/Resources/Resources'));

        // TODO implement auth redirect url so loading /companies works
        let authRedirect = null;
        if (this.props.isAuthenticated && this.props.authRedirectPath) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
            this.props.onSetAuthRedirectPath('');
        }

        let routes = (
            <Switch>
                <PrivateRoute path='/companies' component={Companies}
                    setAuthRedirect={this.props.onSetAuthRedirectPath}
                    isAuthenticated={this.props.isAuthenticated} />
                <Route path='/stats' render={(props) => (
                    <Suspense fallback={<div>Loading</div>}>
                        <Stats {...props} />
                    </Suspense>
                )} />
                <Route path='/resources' render={(props) => (
                    <Suspense fallback={<div>Loading</div>}>
                        <Resources {...props} />
                    </Suspense>
                )} />
                <Route path='/' exact component={Lobby} />
                <Redirect to='/' />
            </Switch>
        );
        // if (this.props.isAuthenticated) {
        //     routes = (
        //         <Switch>
        //             <Route path='/companies' render={(props) => (
        //                 <Suspense fallback={<div>Loading</div>}>
        //                     <Companies {...props} />
        //                 </Suspense>
        //             )} />
        //             <Route path='/stats' render={(props) => (
        //                 <Suspense fallback={<div>Loading</div>}>
        //                     <Stats {...props} />
        //                 </Suspense>
        //             )} />
        //             <Route path='/resources' render={(props) => (
        //                 <Suspense fallback={<div>Loading</div>}>
        //                     <Resources {...props} />
        //                 </Suspense>
        //             )} />
        //             <Route path='/' exact component={Lobby} />
        //             <Redirect to='/' />
        //         </Switch>
        //     );
        // }
        return (
            <div className="App">
                {authRedirect}
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.userId !== null,
        displayName: state.auth.displayName,
        avatar: state.auth.avatar,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthStatus: () => dispatch(actions.checkAuthStatus()),
        onSetAuthRedirectPath: (url) => dispatch(actions.setAuthRedirectPath(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
