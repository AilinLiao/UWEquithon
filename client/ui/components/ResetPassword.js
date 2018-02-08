import React, { Component } from 'react';

import MediaQuery from 'react-responsive';
import { Route, Link, Redirect } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Text from '/client/ui/components/Text.js';
import FlatColoredButton from '/client/ui/buttons/FlatColoredButton.js';
import { SuccessMessageChip, ErrorMessageChip } from '/client/ui/components/Accounts.js';


const bodyStyle = {
    gridArea: 'body',
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
}


export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            success: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /***** Event Handling *****/
    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let token = this.props.match.params.token;
        let password = this.state.value;
        if (password) {
            Accounts.resetPassword(token, password, (err) => {
                if (err) {
                    this.setState({
                        success: false,
                        errorMessage: err.reason,
                    });
                } else {
                    this.setState({
                        success: true,
                        errorMessage: '',
                    });
                }
            });
        }
    }

    render() {
        const { classes } = this.props;

        if (this.props.match.params.token) {
            return(
                <div className="accounts-grid">
                    <div style={bodyStyle}>
                        {/* Logo */}


                        {/* Words */}
                        <Text style={{ color: 'white' }} align="center" type="display3"
                            text="To reset your password, enter a new one below:" />

                        {/* Reset Password Input */}
                        <TextField
                            InputProps={{ classes: {
                                root: classes.textFieldRoot,
                                input: classes.textFieldInput,
                            }}}
                            InputLabelProps={{ className: classes.textFieldFormLabel }}
                            fullWidth
                            margin="normal"

                            type="password"
                            autoComplete="current-password"
                            label="Password"
                            value={this.state.value}
                            onChange={this.handleChange}
                            required
                        />

                        {/* Submit */}
                        <div style={{ textAlign: 'center', padding: '5px' }}>
                            <FlatColoredButton classes={{ root: classes.buttonRoot }} onClick={this.handleSubmit}
                                content="Reset Password" />
                        </div>

                        {/* Back to Login */}
                        <div style={{ textAlign: 'center', padding: '5px' }}>
                            <Link className="button-link" to="/">
                                <Button classes={{ root: classes.buttonRoot }}>HOME</Button>
                            </Link>
                        </div>

                        {/* Error Message */}
                        { (this.state.success) ?
                                <SuccessMessageChip classes={classes} successMessage="We've successfully reset your password." /> :
                                <ErrorMessageChip classes={classes} errorMessage={this.state.errorMessage} />
                        }
                    </div>
                </div>
            );
        }
        return false;
    }
}
