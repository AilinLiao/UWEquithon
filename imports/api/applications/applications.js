import Schema from '../Schema.js'

const applicationCollectionName = "applications";

const Applications = new Mongo.Collection(applicationCollectionName);

/*
 * We attach the save schema to this collection.
 * It includes applications.submitted so we will know if the user
 * has not submitted and when the user does submit,
 * we validate that all the fields are there.
 */
Applications.attachSchema(Schema.applicationSave);

export default Applications;

