import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (userId, displayName, avatar) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        displayName: displayName,
        avatar: avatar
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return dispatch => {
        axios.get('/api/auth/logout')
            .then(response => {
                dispatch({
                    type: actionTypes.AUTH_LOGOUT
                });
            })
            .catch(error=> {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const checkAuthStatus = () => {
    /* Try to get user auth info */
    return dispatch => {
        axios.get('/api/auth/user')
            .then(response => {
                dispatch(authSuccess(response.data.id, response.data.displayName, response.data.avatar));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
