import React, { Component } from 'react';
import { Button, Form, Grid, Input, Radio } from 'semantic-ui-react'

import DoctrineOption from './DoctrineOption';
import classes from './CompanyCreation.module.css';

import * as companyConstants from '../../shared/constants/company';
import { updateObject } from '../../shared/utils';

class CompanyCreation extends Component {
    // Expects to be initialized with a flag for allied or axis side, flag for war or fun
    // Displays available doctrine icons, allows user to set name
    state = {
        fields: {
            name: {
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
            },
            doctrine: {
                value: null,
                validation: {
                    isRequired: true
                },
                isValid: false,
                isTouched: false,
            },
        },
        isFormValid: false
    }

    checkValidity = (value, rules) => {
        // Returns true or false
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = isValid && value.trim() !== '';
            }
            if (rules.minLength) {
                isValid = isValid && value.length >= rules.minLength;
            }
            if (rules.maxLength) {
                isValid = isValid && value.length <= rules.maxLength;
            }
        }
        return isValid;
    }

    handleChange = (event, { name, value }) => {
        const updatedField = updateObject(this.state.fields[name], {
            value: value,
            isValid: this.checkValidity(value, this.state.fields[name].validation),
            isTouched: true
        });
        const updatedFields = updateObject(this.state.fields, {
            [name]: updatedField
        });

        // Check if this makes the entire form valid/invalid
        let isFormValid = true;
        for (let key in updatedFields) {
            if (updatedFields[key].validation) {
                isFormValid = isFormValid && updatedFields[key].isValid;
            }
        }

        this.setState({ fields: updatedFields, isFormValid: isFormValid });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const companyConfigs = [{
            name: this.state.fields.name.value,
            doctrine: this.state.fields.doctrine.value,
        }];        

        this.props.handleSubmit(this.props.side, companyConfigs);
    }

    render() {
        let doctrinesGroup = null;
        if (this.props.side === companyConstants.ALLIED_SIDE) {
            doctrinesGroup = (
                <React.Fragment>
                    <Form.Group>
                        {/* <Radio
                        label='Airborne'
                        name='doctrine'
                        value='airborne'
                        checked={this.state.doctrine.value === 'airborne'}
                        onChange={this.handleChange}
                    /> */}
                        <DoctrineOption
                            // label='Airborne'
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.AIRBORNE}
                            handleChange={this.handleChange}
                        />
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.ARMOR}
                            handleChange={this.handleChange}
                        />
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.INFANTRY}
                            handleChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.ARTILLERY}
                            handleChange={this.handleChange}
                        />
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.COMMANDOS}
                            handleChange={this.handleChange}
                        />
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.ENGINEERS}
                            handleChange={this.handleChange}
                        />
                    </Form.Group>
                </React.Fragment>
            );
        } else if (this.props.side === companyConstants.AXIS_SIDE) {
            doctrinesGroup = (
                <React.Fragment>
                    <Form.Group>
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.DEFENSIVE}
                            handleChange={this.handleChange}
                        />
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.BLITZ}
                            handleChange={this.handleChange}
                        />
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.TERROR}
                            handleChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.SCORCHED_EARTH}
                            handleChange={this.handleChange}
                        />
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.LUFTWAFFE}
                            handleChange={this.handleChange}
                        />
                        <DoctrineOption
                            groupName='doctrine'
                            value={this.state.fields.doctrine.value}
                            radioValue={companyConstants.TANK_HUNTERS}
                            handleChange={this.handleChange}
                        />
                    </Form.Group>
                </React.Fragment>
            );
        } else {
            return 'No side specified!';
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    name='name'
                    // label='Company name'
                    placeholder='Company name'
                    id='company-creation-company-name'
                    onChange={this.handleChange}
                    className={classes.Name}
                />
                {doctrinesGroup}
                <Button type='submit' disabled={!this.state.isFormValid}>Next</Button>
            </Form>
        );
    }

};

export default CompanyCreation;