import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
    companies: [],
    isLoading: false,
    isCreatingCompany: false,
    isInitialized: false,
    error: null
}

const getCompaniesStart = state => {
    return updateObject(state, { isLoading: true });
}
const getCompaniesSuccess = (state, action) => {
    return updateObject(state, { isLoading: false, isInitialized: true, companies: action.companies});
}
const getCompaniesFail = (state, action) => {
    return updateObject(state, { isLoading: false, isInitialized: true, error: action.error });
}

const postCompaniesStart = state => {
    return updateObject(state, { isCreatingCompany: true });
}
const postCompaniesSuccess = (state, action) => {
    return updateObject(state, { isCreatingCompany: false});
}
const postCompaniesFail = (state, action) => {
    return updateObject(state, { isCreatingCompany: false, error: action.error });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_COMPANIES_START:
            return getCompaniesStart(state);
        case actionTypes.GET_COMPANIES_SUCCESS:
            return getCompaniesSuccess(state, action);
        case actionTypes.GET_COMPANIES_FAIL:
            return getCompaniesFail(state, action);

        case actionTypes.POST_COMPANIES_START:
            return postCompaniesStart(state);
        case actionTypes.POST_COMPANIES_SUCCESS:
            return postCompaniesSuccess(state);
        case actionTypes.POST_COMPANIES_FAIL:
            return postCompaniesFail(state, action);
        default:
            return state;
    }
}

export default reducer;