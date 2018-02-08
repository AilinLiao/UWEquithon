import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

/* All emails subscribed for Equithon notifications. */
export const EmailSubscriptions = new Mongo.Collection('email_subscriptions');
