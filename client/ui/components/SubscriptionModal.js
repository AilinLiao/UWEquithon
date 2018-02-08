import React, { Component } from 'react';

import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Text from '/client/ui/components/Text.js';
import FlatColoredButton from '/client/ui/buttons/FlatColoredButton.js';


/* 
 * Popup modal for user to input email to subscribe to email notifications.
 * Borrowed from https://material-ui-next.com/demos/modals/ example.
 * Props:
 * - open
 * - onClose
 */
export default class SubscriptionModal extends Component {
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
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    Meteor.call('email_subscriptions.insert', { email: this.state.value },
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
            messageVisible: 'visible'
          });
        }
      }
    );
  }

  render() {
    return(
      <Modal
        aria-labelledby="Email Subscription"
        aria-describedby="Subscribe with your email account for Equithon notifications by email."
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <div className="center-screen-modal">
          <Paper className="modal-paper" elevation={5}>
            <Text color='primary' type='display1' text='Email Subscription' />
            <br/>
            <Text type='body1' text='Submit your email below to subscribe to the latest Equithon news.' />

            <form onSubmit={this.handleSubmit}>
              <div className='split-column-row'>
                <div style={{ gridArea: 'left', textAlign: 'left'}}>
                  <TextField
                    style={{ marginTop: '6px', float: 'left', width: '100%' }}
                    label='Email Address'
                    value={this.state.value}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div style={{ gridArea: 'right', padding: '20px' }}>
                  <FlatColoredButton
                    style={{ width: '100%' }}
                    onClick={this.handleSubmit}
                    content="Submit"
                  />
                </div>
              </div>
            </form>

            <div style={{ visibility: this.state.messageVisible }}>
              <Text type='body1' color={ this.state.success ? 'primary' : 'error' }
                text={ this.state.success ? 'Your email was successfully submitted.' : this.state.failedMessage }
              />
            </div>
          </Paper>
        </div>
      </Modal>
    );
  }
}
