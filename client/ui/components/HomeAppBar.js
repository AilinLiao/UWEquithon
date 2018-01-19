import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

/* The AppBar for use across the application.
 * This is currently a bar with the logo in the middle.
 * We would add buttons etc. to this as we add new features.
 */
export default class HomeAppBar extends Component {
    render() {
        return (
            <AppBar id="appbar" position="fixed" color="inherit">
                <Toolbar>
                    <img className="equithon-logo" src="/logos/logo-bulb_417x417.png" />
                </Toolbar>
            </AppBar>
        );
    }
}
