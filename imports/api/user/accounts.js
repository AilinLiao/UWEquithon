import Meteor from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


/*
 * Configure accounts in our app.
 */
Accounts.config({
    sendVerificationEmail: true,
});

/*
 * Validate the contents of a new user.
 * The services field will contain their various forms of authentication.
 */
Accounts.validateNewUser((user) => {
    new SimpleSchema({
        _id:                 { type: String },
        firstName:           { type: String },
        lastName:            { type: String },
        emails:              { type: Array },
        'emails.$':          { type: Object },
        'emails.$.address':  { type: String, regEx: SimpleSchema.RegEx.Email },
        'emails.$.verified': { type: Boolean },
        createdAt:           { type: Date },
        services:            { type: Object, blackbox: true },
    }).validate(user);

    return true;
});


/*
 * Add more fields to the user
 */
Accounts.onCreateUser((options, user) => {
    check(options, {
        firstName: String,
        lastName: String,
        email: String,
        password: Match.OneOf(String, { digest: String, algorithm: String })
    });

    /* Add extra non-Meteor fields and let Meteor add the rest */
    user.firstName = options.firstName;
    user.lastName  = options.lastName;

    return user;
});
