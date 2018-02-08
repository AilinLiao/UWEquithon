import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { clientSubmitSchema, clientSaveSchema } from '/imports/api/Schema.js';
import Applications from './applications.js';


/*
 * Publish the fields of the application to the user who owns the application.
 */
Meteor.publish('applicationData', function() {
    if (this.userId) {
        return Applications.find({ userId: this.userId }, {
            fields: {
                program:           1,
                travellingFrom:    1,
                institution:       1,
                cityOfInstitution: 1,
                yog:               1,
                longAnswer:        1,
                eduLevel:          1,
                gender:            1,
                experience:        1,
                hackathon:         1,
                hearAbout:         1,
                goals:             1,
                categories:        1,
                workshops:         1,
                submitted:         1,
            }
        });
    } else {
        this.ready();
    }
});


/*
 * Submit the application provided the user hasn't already
 * submitted an application.
 */
export const submitApplication = new ValidatedMethod({
    name: 'applications.submit',

    validate: clientSubmitSchema.validator(),

    run(application) {
        /* Validate user is logged in in order to submit application */
        if (!this.userId) {
            throw new Meteor.Error('applications.submit.unauthorized',
                'Please log in to submit your application');
        }

        let user = Meteor.users.find({ _id: this.userId }).fetch()[0];

        /* Validate user is verified in order to submit application */
        if (!user.emails[0].verified) {
            throw new Meteor.Error('applications.submit.unverified',
                'You must verify your email address first in order to submit your application');
        }

        let app = Applications.find({ userId: this.userId }).fetch()[0];

        /* Validate application has been saved first */
        if (!app) {
            throw new Meteor.Error('applications.submit.not_saved',
                'Please save your application first');
        }

        /* Validate application has not already been submitted by this user */
        if (app.submitted) {
            throw new Meteor.Error('applications.submit.already_submitted',
                'You have already submitted your application');
        }

        /* Submit the application */
        Applications.update({ userId: this.userId }, {
            $set: {
                program:                application.program,
                institution:            application.institution,
                cityOfInstitution:      application.cityOfInstitution,
                yog:                    application.yog,
                travellingFrom:         application.travellingFrom,
                longAnswer:             application.longAnswer,
                eduLevel:               application.eduLevel,
                gender:                 application.gender,
                experience:             application.experience,
                hackathon:              application.hackathon,
                hearAbout:              application.hearAbout,
                goals:                  application.goals,
                categories:             application.categories,
                workshops:              application.workshops,
                submitted: true,
            }
        });
    }
});

/*
 * Save the application.
 */
export const saveApplication = new ValidatedMethod({
    name: 'applications.save',

    validate: clientSaveSchema.validator(),

    run(application) {
        /* Validate user is logged in in order to save application */
        if (!this.userId) {
            throw new Meteor.Error('application.save.unauthorized',
                'Please log in to save your application');
        }

        let user = Meteor.users.find({ _id: this.userId }).fetch()[0];

        /* Validate user is verified in order to save application */
        if (!user.emails[0].verified) {
            throw new Meteor.Error('applications.save.unverified',
                'You must verify your email address first in order to save your application');
        }

        /* Validate application has not already been submitted */
        let app = Applications.find({ userId: this.userId }).fetch()[0];
        if (app && app.submitted) {
            throw new Meteor.Error('applications.save.already_submitted',
                'You have already submitted your application');
        }

        /* Save the application */
        Applications.upsert({ userId: this.userId }, {
            $set: {
                userId:                 this.userId,
                program:                application.program,
                institution:            application.institution,
                cityOfInstitution:      application.cityOfInstitution,
                yog:                    application.yog,
                travellingFrom:         application.travellingFrom,
                longAnswer:             application.longAnswer,
                eduLevel:               application.eduLevel,
                gender:                 application.gender,
                experience:             application.experience,
                hackathon:              application.hackathon,
                hearAbout:              application.hearAbout,
                goals:                  application.goals,
                categories:             application.categories,
                workshops:              application.workshops,
                submitted: false,
            }
        }, (err, res) => {
            if (err) throw err;
        });
    }
});
