import { Meteor } from 'meteor/meteor';

import '/server/api.js';

import { EmailSubscriptions } from '/imports/api/email-subscriptions/email-subscriptions.js';
import Applications from '/imports/api/applications/applications.js';


Meteor.startup(() => {
    // Configure MAIL_URL using AWS SES SMTP service
    let smtpusername = encodeURIComponent("AKIAJWZSYASZKAUUE7NQ");
    let smtppassword = encodeURIComponent("Aurq/HxciqOHxj4XOkxVQbSoNOK1vH5/1oVGcbziwBZb");
    let smtphostname = encodeURIComponent("email-smtp.us-east-1.amazonaws.com");

    process.env.MAIL_URL = "smtp://" + smtpusername + ":" + smtppassword + "@" + smtphostname + ":587";

    // Deny all client-side updates on our collections.
    EmailSubscriptions.deny({
      insert() { return true; },
      update() { return true; },
      remove() { return true; },
    });

    Applications.deny({
      insert() { return true; },
      update() { return true; },
      remove() { return true; },
    });

    Meteor.users.deny({
        insert() { return true; },
        update() { return true; },
        remove() { return true; },
    });
});
