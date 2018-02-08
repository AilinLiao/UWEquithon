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

const signupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    padding: '10px',
    paddingTop: '110px',
};

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',

            success: false,
            errorMessage: '',
        };

        this.handleSignup = this.handleSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /***** Event Handling *****/
    /* User Signup */
    handleSignup(event) {
        event.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                success: false,
                errorMessage: "Your confirmation password does not match your actual password"
            });
        } else if (this.state.password === '') {
            this.setState({
                success: false,
                errorMessage: "Please enter a password"
            });
        } else {
            let user = {};
            if (this.state.firstName) user.firstName = this.state.firstName;
            if (this.state.lastName) user.lastName   = this.state.lastName;
            if (this.state.email) user.email         = this.state.email;
            if (this.state.password) user.password   = this.state.password;

            Accounts.createUser(user, (err) => {
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

    /* Change in any of the text fields */
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    /***** Rendering *****/
    /*
     * Main signup form
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
                        text="Create an Account" />

                    {/* Form */}
                    <form onSubmit={this.handleUserLogin}>
                        {/* First Name Field */}
                        <TextInputField classes={classes} label="First Name" value={this.state.firstName}
                            onChange={this.handleChange} stateName="firstName" />

                        {/* Last Name Field */}
                        <TextInputField classes={classes} label="Last Name" value={this.state.lastName}
                            onChange={this.handleChange} stateName="lastName" />

                        {/* Email Field */}
                        <TextInputField classes={classes} label="Email" value={this.state.email}
                            onChange={this.handleChange} stateName="email" />

                        {/* Password Field */}
                        <PasswordInputField classes={classes} label="Password" value={this.state.password}
                            onChange={this.handleChange} stateName="password" />

                        {/* Confirm Password Field */}
                        <PasswordInputField classes={classes} label="Confirm Password" value={this.state.confirmPassword}
                            onChange={this.handleChange} stateName="confirmPassword" />

                        {/* Signup Main Button */}
                        <div style={{ textAlign: 'center', padding: '5px' }}>
                            <FlatColoredButton classes={{ root: classes.buttonRoot }}
                                onClick={this.handleSignup} content="Signup"
                            />
                        </div>

                        {/* Home Main Button */}
                        <div style={{ textAlign: 'center', padding: '5px' }}>
                            <Link className="button-link" to="/">
                                <Button classes={{ root: classes.buttonRoot }}>
                                    HOME
                                </Button>
                            </Link>
                        </div>

                        {/* Conditionally render error message */}
                        { (this.state.success) ?
                                <Redirect to="/accounts/verify-email" /> :
                                <ErrorMessageChip classes={classes} errorMessage={this.state.errorMessage} />
                        }
                    </form>
                </div>

                {/* Footer */}
                <AccountsFooter classes={classes} link="/accounts/login" text="Already have an account?" buttonText="SIGN IN" />
            </div>
        );
    }
}


const PasswordInputField = ({ classes, label, value, onChange, stateName }) => (
    <TextField
        style={{ align: 'center' }}
        InputProps={{ classes: {
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
        }}}
        InputLabelProps={{ className: classes.textFieldFormLabel }}
        fullWidth
        margin="normal"

        type="password"
        autoComplete="current-password"
        label={label}
        value={value}
        onChange={onChange(stateName)}
        required
    />
);

const TextInputField = ({ classes, label, value, onChange, stateName }) => (
    <TextField
        style={{ align: 'center' }}
        InputProps={{ classes: {
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
        }}}
        InputLabelProps={{ className: classes.textFieldFormLabel }}
        fullWidth
        margin="normal"

        label={label}
        value={value}
        onChange={onChange(stateName)}
        required
    />
);
