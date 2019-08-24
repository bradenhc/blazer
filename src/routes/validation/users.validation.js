const Joi = require('@hapi/joi');
const { Schema } = require('../../model/user.model');
const HttpStatus = require('http-status-codes');
const { RequestValidationError } = require('../../error');

const CreateRequestSchema = Joi.object().keys({
    firstName: Schema.firstName.required(),
    lastName: Schema.lastName.required(),
    username: Schema.username.required(),
    email: Schema.email.required()
});

module.exports = {
    validateCreateRequest: async function(ctx, next) {
        let results = Joi.validate(ctx.request.body, CreateRequestSchema);
        if (results.error) {
            throw RequestValidationError('Invalid request to create user', results.error.details.map(d => d.message));
        }
        await next();
    }
};
