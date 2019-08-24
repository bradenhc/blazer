const uuid = require('uuid/v4');
const Joi = require('@hapi/joi');

const Schema = {
    id: Joi.string().uuid(),
    firstName: Joi.string()
        .regex(/([A-Za-z\-\ ])+/)
        .max(56),
    lastName: Joi.string()
        .regex(/([A-Za-z\-\ ])+/)
        .max(56),
    username: Joi.string()
        .alphanum()
        .max(56),
    email: Joi.string().email(),
    createdOn: Joi.date(),
    updatedOn: Joi.date()
};

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} username
 * @property {string} email
 * @property {Date} createdOn
 * @property {Date} updatedOn
 */

module.exports = {
    /**
     * Creates a new User state object.
     *
     * @param {string} firstName The first name of the user
     * @param {string} lastName The last name of the user
     * @param {string} username The username chosen by the user
     * @param {string} email The email of the user
     * @returns {User}
     */
    create: function(firstName, lastName, username, email) {
        return {
            id: uuid(),
            firstName,
            lastName,
            username,
            email,
            createdOn: new Date(),
            updatedOn: null
        };
    },

    Schema
};
