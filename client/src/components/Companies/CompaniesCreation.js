import React, { Component } from 'react';
import classes from './CompaniesCreation.module.css';
import { Container, Grid, Header } from 'semantic-ui-react';

import CompanyCreation from './CompanyCreation';
import CompanyCreationConfirmation from './CompanyCreationConfirmation';
import { ALLIED_SIDE, AXIS_SIDE } from '../../shared/constants/company';

class CompaniesCreation extends Component {
    // Needs to contain the 2-4 war company creation components allowed

    state = {
        isAlliedCreated: false,
        isAxisCreated: false,
        isPatreonEnabled: false,
        alliedCompanyConfigs: [],
        axisCompanyConfigs: [],
    }

    handleCompanySubmit = (side, companyConfigs) => {
        if (side === ALLIED_SIDE) {
            this.setState({
                alliedCompanyConfigs: this.state.alliedCompanyConfigs.concat(companyConfigs),
                isAlliedCreated: true
            });
        } else {
            this.setState({
                axisCompanyConfigs: this.state.axisCompanyConfigs.concat(companyConfigs),
                isAxisCreated: true
            });
        }
    }

    handleFinalSubmit = () => {
        // Submit all created company configs
        this.props.handleSubmit(
            this.state.alliedCompanyConfigs,
            this.state.axisCompanyConfigs,
            this.props.companyType,
        );
        console.log(`Submitted companies for creation!`);
        console.log(this.state.alliedCompanyConfigs);
        console.log(this.state.axisCompanyConfigs);
    }

    render() {
        let content = null,
            header = null;
        if (!this.state.isAlliedCreated) {
            content = <CompanyCreation
                key={ALLIED_SIDE}
                side={ALLIED_SIDE}
                handleSubmit={this.handleCompanySubmit} />;
            header = 'Allied';
        } else if (!this.state.isAxisCreated) {
            content = <CompanyCreation
                key={AXIS_SIDE}
                side={AXIS_SIDE}
                handleSubmit={this.handleCompanySubmit} />;
            header = 'Axis';
        } else {
            content = <CompanyCreationConfirmation
            companyType={this.props.companyType}
                alliedCompanyConfigs={this.state.alliedCompanyConfigs}
                axisCompanyConfigs={this.state.axisCompanyConfigs}
                handleSubmit={this.handleFinalSubmit}
            />;
            header = 'Review';
        }
        return (
            <Container>
                <Grid centered>
                    <Header as='h3' textAlign='left'>{header}</Header>
                    {content}
                </Grid>
            </Container>
        );
    }
};

export default CompaniesCreation;