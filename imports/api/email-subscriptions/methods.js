import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { EmailSubscriptions } from './email-subscriptions.js';


/*
 * Insert validated email provided it doesn't already exist.
 * Note: SimpleSchema only validates objects so we need to pass email around in an object.
 */
export const insertEmailSubscription = new ValidatedMethod({
    name: 'email_subscriptions.insert', // Needed for Meteor.call which hides implementation from the user.

    validate: new SimpleSchema({
        email: { type: String, regEx: SimpleSchema.RegEx.Email },
    }).validator(),

    run(emailObj) {
        if (EmailSubscriptions.find({ email: emailObj.email }).count() != 0) {
            throw new Meteor.Error('email_subscriptions.insert.email_exists', 'Email address already exists');
        } else {
            emailObj.createdAt = new Date();
            EmailSubscriptions.insert(emailObj);
        }
    },
});

export const removeEmailSubscription = new ValidatedMethod({
    name: 'email_subscriptions.remove',

    validate: new SimpleSchema({
        email: { type: String, regEx: SimpleSchema.RegEx.Email },
    }).validator(),

    run(emailObj) {
        let count = EmailSubscriptions.remove(emailObj);
        if (count == 0) {
            throw new Meteor.Error('email_subscriptions.remove.email_not_found', 'We could not find your email address');
        }
    }
});
