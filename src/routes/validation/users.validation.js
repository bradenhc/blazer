const Joi = require('@hapi/joi');
const { Schema } = require('../../model/user.model');
const { RequestValidationError } = require('../../error');

const CreateRequestSchema = Joi.object().keys({
    firstName: Schema.firstName.required(),
    lastName: Schema.lastName.required(),
    username: Schema.username.required(),
    email: Schema.email.required(),
    password: Joi.string()
        .min(12)
        .max(128)
        .required()
});

const UpdateRequestSchema = Joi.object().keys({
    firstName: Schema.firstName.optional(),
    lastName: Schema.lastName.optional(),
    email: Schema.email.optional()
});

function validate(action, obj, schema) {
    let results = Joi.validate(obj, schema);
    if (results.error) {
        throw RequestValidationError(`Invalid request to ${action} user`, results.error.details.map(d => d.message));
    }
}

module.exports = {
    validateCreateRequest: async function(ctx, next) {
        validate('create', ctx.request.body, CreateRequestSchema);
        await next();
    },

    validateUpdateRequest: async function(ctx, next) {
        validate('update', ctx.request.body, UpdateRequestSchema);
        await next();
    }
};
