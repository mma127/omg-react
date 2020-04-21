import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react'

import DoctrineBanner from './DoctrineBanner';
import classes from './CompanyCreationConfirmation.module.css';

const Company = (props) => {
    return (
        <React.Fragment>
            <Header as='h4' textAlign='center'>{props.name}</Header>
            <DoctrineBanner doctrine={props.doctrine} size='small' centered />
            <Header as='h5' textAlign='center'>{props.companyType}</Header>
        </React.Fragment>
    )
}


const CompanyCreationConfirmation = (props) => {
    return (
        <Grid centered>
            <Grid.Column width='eight'>
                {props.alliedCompanyConfigs.map(company => (
                    <Company name={company.name} doctrine={company.doctrine} companyType={props.companyType}/>
                ))}
            </Grid.Column>
            <Grid.Column width='eight' floated='right'>
                {props.axisCompanyConfigs.map(company => (
                    <Company name={company.name} doctrine={company.doctrine} companyType={props.companyType}/>
                ))}
            </Grid.Column>
            <Button type='submit' className={classes.Confirm} onClick={props.handleSubmit}>Confirm</Button>
        </Grid>
    );

};

export default CompanyCreationConfirmation;