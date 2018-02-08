import React, { Component } from 'react';

import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Text from '/client/ui/components/Text.js';
import FlatColoredButton from '/client/ui/buttons/FlatColoredButton.js';


/*
 * Popup modal for user to input email and unsubscribe from email notifications.
 * Props:
 * - open
 * - onClose
 */
export default class UnsubscribeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            success: false,
            messageVisible: 'hidden',
            failedMessage: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        Meteor.call('email_subscriptions.remove', { email: this.state.value },
            (err, res) => {
                if (err) {
                    this.setState({
                        success: false,
                        messageVisible: 'visible',
                        failedMessage: err.reason,
                    });
                } else {
                    this.setState({
                        value: '',
                        success: true,
                        messageVisible: 'visible',
                    });
                }
            }
        );
    }

    render() {
        style = {
            // Center in screen
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };

        return(
            <Modal
                aria-labelledby="Unsubscribe"
                aria-describedby="Unsubscribe from Equithon email notifications."
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <div style={style}>
                    <Paper style={{ padding: '50px' }} elevation={5}>
                        <Text color="primary" type="display1" text="Unsubscribe" />
                        <br/>
                        <Text type="body1" text="Unsubscribe from Equithon email notifications." />

                        <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>
                            <TextField
                                style={{ paddingBottom: '10px', width: '100%' }}
                                label="Email Address"
                                value={this.state.value}
                                onChange={this.handleChange}
                                required
                            />
                            <FlatColoredButton onClick={this.handleSubmit} content="Submit" />
                        </form>

                        <div style={{ visibility: this.state.messageVisible, paddingTop: '10px' }}>
                            <Text type="body1" color={ this.state.success ? "primary" : "error" }
                                text={ this.state.success ? 'Your email was successfully unsubscribed.' : this.state.failedMessage }
                            />
                        </div>
                    </Paper>
                </div>
            </Modal>
        );
    }
}
