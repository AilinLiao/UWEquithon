import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import Text from '/client/ui/components/Text.js';
import FlatColoredButton from '/client/ui/buttons/FlatColoredButton.js';
import ForgotPasswordModal from '/client/ui/components/ForgotPasswordModal.js';
import { ErrorMessageChip, AccountsFooter } from '/client/ui/components/Accounts.js';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

            success: false,
            errorMessage: '',

            // Forgot Password Modal
            forgotPasswordModalOpen: false,
        };

        this.handleUserLogin                = this.handleUserLogin.bind(this);
        this.handleChange                   = this.handleChange.bind(this);
        this.handleForgotPasswordModalOpen  = this.handleForgotPasswordModalOpen.bind(this);
        this.handleForgotPasswordModalClose = this.handleForgotPasswordModalClose.bind(this);
    }

    /***** Event Handling *****/
    /* User Login */
    handleUserLogin(event) {
        event.preventDefault();

        Meteor.loginWithPassword({ email: this.state.email }, this.state.password, (err) => {
            if (err) this.setState({
                errorMessage: err.reason,
            });
            else this.setState({
                success: true,
                errorMessage: '',
            });
        });
    }

    /* Open ForgotPasswordModal */
    handleForgotPasswordModalOpen(event) {
        event.preventDefault();

        this.setState({
            forgotPasswordModalOpen: true,
        });
    }

    /* Close ForgotPasswordModal */
    handleForgotPasswordModalClose(event) {
        event.preventDefault();

        this.setState({
            forgotPasswordModalOpen: false,
        });
    }

    /* Change in any of the text fields */
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    /***** Rendering *****/
    /*
     * Main login form that handles actual logins.
     */
    render() {
        const { classes } = this.props;

        return(
            <div className="accounts-grid">
                <div style={{ gridArea: 'body', textAlign: 'center' }}>
                    {/* Logo */}
                    <img className="accounts-logo" src="/logos/logo-bulb_256x256.png" />

                    {/* Words */}
                    <Text style={{ color: 'white' }} align="center" type="display3"
                        text="Welcome Back!" />
                    <Text style={{ color: 'white' }} align="center" type="display1"
                        text="Let's get to work." />

                    {/* Form */}
                    <form onSubmit={this.handleUserLogin}>
                        {/* Email Field */}
                        <TextField
                            style={{ align: 'center' }}
                            InputProps={{ classes: {
                                root: classes.textFieldRoot,
                                input: classes.textFieldInput,
                            }}}
                            InputLabelProps={{ className: classes.textFieldFormLabel }}
                            fullWidth
                            margin="normal"

                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            required
                        />

                        {/* Password Field */}
                        <TextField
                            style={{ align: 'center' }}
                            InputProps={{ classes: {
                                root: classes.textFieldRoot,
                                input: classes.textFieldInput,
                            }}}
                            InputLabelProps={{ className: classes.textFieldFormLabel }}
                            fullWidth
                            margin="normal"

                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            required
                        />

                        {/* Forgot Password Optional Button */}
                        <div className="accounts-align-right" style={{ padding: '5px' }}>
                            <Button classes={{ root: classes.optionButtonRoot }}
                                onClick={this.handleForgotPasswordModalOpen}
                            >
                                <strong><em>I forgot my password</em></strong>
                            </Button>
                        </div>

                        {/* Login Main Button */}
                        <div style={{ textAlign: 'center', padding: '5px' }}>
                            <FlatColoredButton classes={{ root: classes.buttonRoot }}
                                onClick={this.handleUserLogin} content="Login"
                            />
                        </div>

                        {/* Home Main Button */}
                        <div style={{ textAlign: 'center', padding: '5px' }}>
                            <Link className="button-link" to="/">
                                <Button classes={{ root: classes.buttonRoot }}>HOME</Button>
                            </Link>
                        </div>
                    </form>

                    {/* Conditionally render error message */}
                    { (this.state.success) ?
                            <Redirect to="/apply" /> :
                            <ErrorMessageChip classes={classes} errorMessage={this.state.errorMessage} />
                    }

                    {/* Forgot password modal */}
                    <ForgotPasswordModal open={this.state.forgotPasswordModalOpen} onClose={this.handleForgotPasswordModalClose} />

                </div>

                {/* Footer */}
                <AccountsFooter classes={classes} link="/accounts/signup" text="New User?" buttonText="CREATE AN ACCOUNT" />
            </div>
        );
    }
}
