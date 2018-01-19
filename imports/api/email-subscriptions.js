import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// All emails subscribed for Equithon notifications.
export const EmailSubscriptions = new Mongo.Collection('email_subscriptions');

// Quick regex check to make sure email address is valid.
var isEmailValid = function(address) {
  return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(address);
};

Meteor.methods({
  'email_subscriptions.insert'(email) {
    check(email, String);

    if (!isEmailValid(email)) {
      throw new Meteor.Error('invalid-address');
    }

    EmailSubscriptions.insert({
      email,
      createdAt: new Date(),
    });
  },

  'email_subscriptions.remove'(emailId) {
    check(email, String);
    EmailSubscriptions.remove(emailId);
  },
});
