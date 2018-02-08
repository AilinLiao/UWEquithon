import React, { Component } from 'react';

import Modal from 'material-ui/Modal';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

import Text from '/client/ui/components/Text.js';
import FlatColoredButton from '/client/ui/buttons/FlatColoredButton.js';

/*
 * Popup modal for user to confirm their actions.
 * Props:
 * - open
 * - onClose
 * - onYes
 * - message
 */
export default class ConfirmationModal extends Component {
    constructor(props) {
        super(props);

        this.handleYes = this.handleYes.bind(this);
        this.handleNo  = this.handleNo.bind(this);
    }

    handleYes(event) {
        event.preventDefault();
        this.props.onYes();
        this.props.onClose();
    }

    handleNo(event) {
        event.preventDefault();
        this.props.onClose();
    }


    render() {
        return(
            <Modal
                aria-labelledby="Confirm"
                aria-describedby={this.props.message}
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <div className="center-screen-modal">
                    <Paper className="modal-paper" elevation={5}>
                        <Text color="primary" type="headline" align="center"
                            text={this.props.message} />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '20px', paddingTop: '20px' }}>
                            <FlatColoredButton style={{ width: 'auto' }} onClick={this.handleYes} content="Yes" />
                            <FlatColoredButton style={{ width: 'auto' }} onClick={this.handleNo} content="No" />
                        </div>
                    </Paper>
                </div>
            </Modal>
        );
    }
}
