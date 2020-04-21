import React, { Component } from 'react';

import { Button, Header, Image, Modal } from 'semantic-ui-react'

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component { // anonymous class component
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
            this.requestInterceptor = axiosInstance.interceptors.request.use(req => {
                this.setState({ error: null }); // Reset the error for new requests
                return req; // Return request so it continues through
            })
            this.responseInterceptor = axiosInstance.interceptors.response.use(res => res, error => { // Return res so it continues through
                this.setState({ error: error });
            });
        }

        componentWillUnmount = () => {
            axiosInstance.interceptors.request.eject(this.requestInterceptor);
            axiosInstance.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <React.Fragment>
                    <Modal
                        open={this.state.error}
                        onClose={this.errorConfirmedHandler}>
                        <Modal.Content>
                            {this.state.error ? this.state.error.message : null}
                        </Modal.Content>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        };
    };
};

export default withErrorHandler;