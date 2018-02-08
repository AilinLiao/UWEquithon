import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker'; // Enable validation error reactivity

/* Ensure that simpl-schema errors are translated to Meteor validation errors */
SimpleSchema.defineValidationErrorTransform(error => {
    const ddpError = new Meteor.Error(error.message);
    ddpError.error = 'validation-error';
    ddpError.details = error.details;
    return ddpError;
});

Schema = {};

/* Application submission schema */
Schema.applicationSubmit = new SimpleSchema({
    program: { type: String, },
    travellingFrom: { type: String, },
    cityOfInstitution: { type: String, },
    institution: { type: String, },
    yog: {
        type: Number,
        min: 1901,
        max: 2030,
    },
    longAnswer: {
        type: String,
        max: 2000,
    },
    eduLevel: { type: String, },
    gender: { type: String, },
    experience: { type: String, },
    hackathon: { type: String, },
    hearAbout: { type: String, },

    goals: Object,
    'goals.a': Boolean,
    'goals.b': Boolean,
    'goals.c': Boolean,
    'goals.d': Boolean,
    'goals.e': Boolean,
    'goals.f': Boolean,
    'goals.g': Boolean,
    categories: Object,
    'categories.a': Boolean,
    'categories.b': Boolean,
    'categories.c': Boolean,
    'categories.d': Boolean,
    'categories.e': Boolean,
    workshops: Object,
    'workshops.a': Boolean,
    'workshops.b': Boolean,
    'workshops.c': Boolean,
    'workshops.d': Boolean,
    'workshops.e': Boolean,
    'workshops.f': Boolean,
    'workshops.g': Boolean,
    'workshops.h': Boolean,
    'workshops.i': Boolean,
    'workshops.j': Boolean,
    'workshops.k': Boolean,
    'workshops.l': Boolean,
    'workshops.m': Boolean,

    userId: { type: String, },
    submitted: { type: Boolean, },
}, { tracker: Tracker }); // hook

/* Application save schema (keys become optional) */
Schema.applicationSave = new SimpleSchema({
    program: { type: String, optional: true, },
    travellingFrom: { type: String, optional: true, },
    cityOfInstitution: { type: String, optional: true, },
    institution: { type: String, optional: true, },
    yog: {
        type: Number,
        min: 1901,
        max: 2030,
        optional: true,
    },
    longAnswer: {
        type: String,
        max: 2000,
        optional: true,
    },
    eduLevel: { type: String, optional: true, },
    gender: { type: String, optional: true, },
    experience: {type: String, optional: true, },
    hackathon: {type: String, optional: true, },
    hearAbout: { type: String, optional: true, },

    goals: Object,  // These won't be optional as they wil always either be true or false.
    'goals.a': Boolean,
    'goals.b': Boolean,
    'goals.c': Boolean,
    'goals.d': Boolean,
    'goals.e': Boolean,
    'goals.f': Boolean,
    'goals.g': Boolean,
    categories: Object,
    'categories.a': Boolean,
    'categories.b': Boolean,
    'categories.c': Boolean,
    'categories.d': Boolean,
    'categories.e': Boolean,
    workshops: Object,
    'workshops.a': Boolean,
    'workshops.b': Boolean,
    'workshops.c': Boolean,
    'workshops.d': Boolean,
    'workshops.e': Boolean,
    'workshops.f': Boolean,
    'workshops.g': Boolean,
    'workshops.h': Boolean,
    'workshops.i': Boolean,
    'workshops.j': Boolean,
    'workshops.k': Boolean,
    'workshops.l': Boolean,
    'workshops.m': Boolean,

    userId: {
        type: String,
    },
    submitted: {
        type: Boolean,
    },
});

/* Configure appplication schema */
export const clientSubmitSchema = Schema.applicationSubmit.omit('userId'); // The client submits their application without userId.
export const clientSaveSchema = Schema.applicationSave.omit('userId'); // The server is the one that adds this field.

export default Schema;
