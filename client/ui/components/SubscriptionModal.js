import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Text from '/client/ui/components/Text.js';
import { theme } from '/client/ui/CustomTheme.js';
import { EmailSubscriptions } from '/imports/api/email-subscriptions.js';


/* Popup modal for user to input email to subscribe to email notifications.
 * Borrowed from https://material-ui-next.com/demos/modals/ example.
 * Props:
 * - open
 * - onClose
 */
class SubscriptionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      success: false,
      messageVisible: 'hidden'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    this.setState({ value:  event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    Meteor.call('email_subscriptions.insert', this.state.value,
      (err, res) => {
        if (err) {
          this.setState({
            success: false,
            messageVisible: 'visible'
          });
        } else {
          this.setState({
            value: '',
            success: true,
            messageVisible: 'visible'
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
        aria-labelledby="Email Subscription"
        aria-describedby="Subscribe with your email account for Equithon notifications by email."
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <div style={style}>
          <Paper style={{ padding: '50px' }} elevation={5}>
            <Text color='primary' type='display1' text='Email Subscription' />
            <br/>
            <Text type='body1' text='Submit your email below to subscribe to the latest Equithon news.' />

            <form onSubmit={this.handleSubmit}>
              <div className='split-column-row'>
                <div style={{ gridArea: 'left', textAlign: 'left'}}>
                  <TextField
                    style={{ marginTop: '6px', float: 'left', width: '100%' }}
                    label='Your Email Address'
                    value={this.state.value}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div style={{ gridArea: 'right', padding: '20px' }}>
                  <Button style={{ background: theme.palette.primary[500], borderRadius: '25px', width: '100%' }}
                    color='contrast' onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            </form>

            <div style={{ visibility: this.state.messageVisible }} ref="success">
              <Text type='body1' color={ this.state.success ? 'primary' : 'error' }
                text={ this.state.success ? 'Your email was successfully submitted.' :
                    'The email address you entered is invalid.' }
              />
            </div>
          </Paper>
        </div>
      </Modal>
    );
  }
}

export default SubscriptionModal;
