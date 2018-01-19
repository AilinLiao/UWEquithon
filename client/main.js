import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'typeface-roboto';

import App from './ui/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('main'));
});


