import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';

import HomeAppBar from '/client/ui/components/HomeAppBar.js';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: '',
        }

        this.userComputation = undefined;
    }

    componentDidMount() {
        this.userComputation = Tracker.autorun(() => {
            let user = Meteor.user();
            if (user) this.setState({
                currentUser: user,
            });
        });
    }

    componentWillUnmount() {
        this.userComputation.stop();
    }

    render() {
        // TODO: Add user home.
        return(
            <div>
                <HomeAppBar />
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <p>This will be the home of the logged in user. We should see things like applications, settings, etc. here</p>
                    <p>The user is accessible via the currentUser prop passed from App.js</p>
                    <p>Your firstname is: {this.state.currentUser && this.state.currentUser.firstName}</p>
                    <p>Your username is: {this.state.currentUser && this.state.currentUser.username}</p>
                    <p>Your email is: {this.state.currentUser && this.state.currentUser.emails[0].address}</p>
                    <p>Your verification status is: { (this.state.currentUser && this.state.currentUser.emails[0].verified) ? 'verified' : 'unverified' }</p>
                    <p>Your internal id is: {this.state.currentUser && this.state.currentUser._id}</p>
                </div>
            </div>
        );
    }
}
