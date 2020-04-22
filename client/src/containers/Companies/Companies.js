import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Loader, Container } from 'semantic-ui-react'

import * as actions from '../../store/actions/index';
import axios from 'axios';
import classes from './Companies.module.css';
import CompaniesCreation from '../../components/Companies/CompaniesCreation';
import * as companyConstants from '../../shared/constants/company';

import DoctrineBanner from '../../components/Companies/DoctrineBanner';

const Company = (props) => {
    return (
        <React.Fragment>
            <Header as='h4' textAlign='center'>{props.name}</Header>
            <DoctrineBanner doctrine={props.doctrine} size='small' centered />
            <Header as='h5' textAlign='center'>{props.companyType}</Header>
        </React.Fragment>
    )
}
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Companies extends Component {
    componentDidMount() {
        this.props.onGetCompanies();
    }

    render() {
        let companies = null,
            title = null;
        if (this.props.isLoading || this.props.isCreatingCompany) {
            companies = <Loader active />;
        } else if (this.props.isInitialized && this.props.companies.length === 0) {
            // Player has no companies created, show the companies creation flow
            companies = <CompaniesCreation
                handleSubmit={this.props.onPostCompanies}
                companyType={companyConstants.WAR} />;
            title = 'Create your companies';
        } else if (this.props.companies.length > 0) {
            // Player has companies, display them
            companies = this.props.companies.map(company => (
                <Company key={company.id} name={company.displayName} doctrine={company.Doctrine.name} companyType={company.type} />
            ))
            title = 'Companies';
        }
        return (
            <Container fluid className={classes.Companies}>
                <Header as='h1' className={classes.Header}>{title}</Header>
                {companies}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        companies: state.companies.companies,
        isLoading: state.companies.isLoading,
        isInitialized: state.companies.isInitialized,
        isCreatingCompany: state.companies.isCreatingCompany,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCompanies: () => dispatch(actions.getCompanies()),
        onPostCompanies: (alliedCompanyConfigs, axisCompanyConfigs, companyType) =>
            dispatch(actions.postCompanies(alliedCompanyConfigs, axisCompanyConfigs, companyType)),
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Lobby, axios));
export default connect(mapStateToProps, mapDispatchToProps)(Companies, axios);