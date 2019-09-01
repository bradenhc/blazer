const Joi = require('@hapi/joi');
const { RequestValidationError } = require('../error');
const { Schema } = require('./model.users');

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
    validateUpdateRequest: pipelineData => () => {
        validate('update', pipelineData.body, UpdateRequestSchema);
        return pipelineData;
    }
};
