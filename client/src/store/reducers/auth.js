import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
    userId: null,
    displayName: null,
    avatar: null,
    isLoading: false,
    error: null,
    authRedirect: ''
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, isLoading: true });
}
const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        displayName: action.displayName,
        avatar: action.avatar,
        error: null,
        isLoading: false
    })
}
const authFail = (state, action) => {
    return updateObject(state, { error: action.error, isLoading: false });
}
const authLogout = (state, action) => {
    return updateObject(state, { userId: null, displayName: null, avatar: null });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirect: action.path });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
}

export default reducer;