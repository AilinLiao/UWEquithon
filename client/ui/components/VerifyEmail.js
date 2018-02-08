import React, { Component } from 'react';

import MediaQuery from 'react-responsive';
import { Route, Link, Redirect } from 'react-router-dom';

import TextField from 'material-ui/TextField';

import Text from '/client/ui/components/Text.js';
import FlatColoredButton from '/client/ui/buttons/FlatColoredButton.js';


const bodyStyle = {
    gridArea: 'body',
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
}

export default class VerifyEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
        };
    }

    /****** Event Handling *****/
    handleResend(event) {
        event.preventDefault();
        Meteor.call('user.sendVerificationLink');
    }

    render() {
        const { classes } = this.props;

        return(
            <div className="accounts-grid">
                <div style={bodyStyle}>
                    {/* Words */}
                    <Text style={{ color: 'white' }} align="center" type="display3"
                        text="Verify Your Email Address" />
                    <Text style={{ color: 'white' }} align="center" type="display1"
                        text="to start using your account!" />

                    {/* Email Image */}
                    <img style={{ width: 'auto', height: 'auto' }} src="/images/mail.png" />

                    {/* Options */}
                    <div className="split-column-row">
                        <div style={{ gridArea: 'left', textAlign: 'center', padding: '10px' }}>
                            <FlatColoredButton classes={{ root: classes.buttonRoot }}
                                onClick={this.handleResend} content="Resend" />
                        </div>
                        <div style={{ gridArea: 'right', textAlign: 'center', padding: '10px' }}>
                            <Link className="button-link" to="/">
                                <FlatColoredButton classes={{ root: classes.buttonRoot }}
                                    content="Home" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div style={{ gridArea: 'footer', minHeight: '100%' }}></div>

            </div>
        );
    }
}

export class VerifyEmailWithToken extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            errorMessage: '',
        };

    }

    componentDidMount() {
        let token = this.props.match.params.token;
        this.verifyEmail(token);
    }

    /* Verify email with token */
    verifyEmail(token) {
        if (token) {
            Accounts.verifyEmail(token, (err) => {
                if (err) this.setState({
                    success: false,
                    errorMessage: err.reason,
                });
                else this.setState({
                    success: true,
                    errorMessage: '',
                });
            });
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <div className="accounts-grid">
                { (this.state.success) ? <EmailVerified classes={classes} /> :
                        <EmailNotVerified classes={classes} errorMessage={this.state.errorMessage} />
                }
                <div style={{ gridArea: 'footer', minHeight: '100%' }}></div>
            </div>

        );
    }
}

const EmailVerified = ({ classes }) => (
    <div style={bodyStyle}>
        {/* Words */}
        <Text style={{ color: 'white' }} align="center" type="display3"
            text="Awesome!" />
        <Text style={{ color: 'white', paddingBottom: '30px' }} align="center" type="headline"
            text="Let's get started." />

        {/* Email Image */}
        <img style={{ align: 'center', }} src="/images/verified-user.png" />

        {/* Go to home page */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Link className="button-link" to="/" replace>
                <MediaQuery maxDeviceWidth={600}>
                    { (matches) => {
                        if (matches) {
                            return(
                                <FlatColoredButton classes={{ root: classes.buttonRoot }}
                                    style={{ fontSize: 30, width: '100%' }} content="〉"/>
                            );
                        } else {
                            return(
                                <FlatColoredButton classes={{ root: classes.buttonRoot }}
                                    style={{ fontSize: 30, width: '270px' }} content="〉"/>
                            );
                        }
                    }}
                </MediaQuery>
            </Link>
        </div>
    </div>
);

const EmailNotVerified = ({ classes, errorMessage }) => (
    <div style={bodyStyle}>
        {/* Words */}
        <Text style={{ color: 'white' }} align="center" type="display3"
            text="Uh Oh - Something went wrong" />
        <Text style={{ color: 'white' }} align="center" type="display1"
            text={ <div>For help, please send an email to <a style={{ color: 'white', }} href="mailto:hello@equithon.org">hello@equithon.org</a></div> }
        />

        {/* Error Message */}
        <Text style={{ color: 'white', paddingTop: '50px' }} align="center" type="display1"
            text="We failed to verify your email for the following reason:" />
        <Text style={{ paddingBottom: '50px' }} color="error" align="center" type="display1"
            text={errorMessage} />

        {/* Options */}
        <div style={{ textAlign: 'center', padding: '10px' }}>
            <Link className="button-link" to="/">
                <FlatColoredButton classes={{ root: classes.buttonRoot }} content="Home" />
            </Link>
        </div>
    </div>
);
