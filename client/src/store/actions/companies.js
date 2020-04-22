import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getCompaniesStart = () => {
    return {
        type: actionTypes.GET_COMPANIES_START
    }
}
export const getCompaniesSuccess = (companies) => {
    return {
        type: actionTypes.GET_COMPANIES_SUCCESS,
        companies: companies
    }
}
export const getCompaniesFail = error => {
    return {
        type: actionTypes.GET_COMPANIES_FAIL,
        error: error
    }
}
export const getCompanies = () => {
    return dispatch => {
        dispatch(getCompaniesStart());
        axios.get('/api/companies')
            .then(response => dispatch(getCompaniesSuccess(response.data)))
            .catch(error => dispatch(getCompaniesFail(error)))
    }
}

export const postCompaniesStart = () => {
    return {
        type: actionTypes.POST_COMPANIES_START
    }
}
export const postCompaniesSuccess = (companies) => {
    return dispatch => {
        dispatch(getCompanies());
        dispatch({
            type: actionTypes.POST_COMPANIES_SUCCESS,
            companies: companies
        });
    }
}
export const postCompaniesFail = error => {
    return {
        type: actionTypes.POST_COMPANIES_FAIL,
        error: error
    }
}
export const postCompanies = (alliedCompanyConfigs, axisCompanyConfigs, companyType) => {
    return dispatch => {
        dispatch(postCompaniesStart());
        axios.post('/api/companies', {
            alliedCompanyConfigs: alliedCompanyConfigs,
            axisCompanyConfigs: axisCompanyConfigs,
            companyType: companyType,
        })
            .then(response => dispatch(postCompaniesSuccess(response.data)))
            .catch(error => dispatch(postCompaniesFail(error)))
    }
}

