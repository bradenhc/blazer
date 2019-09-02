const Joi = require('@hapi/joi');
const { RequestValidationError } = require('../error');
const { Schema } = require('./model.blog-posts');

const CreateRequestSchema = Joi.object().keys({
    title: Schema.title.required(),
    summary: Schema.summary.required(),
    content: Schema.content.required(),
    tags: Schema.tags.optional(),
    isPublished: Schema.tags.optional()
});

const UpdateRequestSchema = Joi.object().keys({
    title: Schema.title.optional(),
    summary: Schema.summary.optional(),
    content: Schema.content.optional(),
    tags: Schema.tags.optional(),
    isPublished: Schema.tags.optional()
});

function validate(action, obj, schema) {
    let results = Joi.validate(obj, schema);
    if (results.error) {
        throw RequestValidationError(
            `Invalid request to ${action} blog post`,
            results.error.details.map(d => d.message)
        );
    }
}

module.exports = {
    validateCreateRequest: async pipelineData => {
        validate('create', pipelineData.payload, CreateRequestSchema);
        return pipelineData;
    },

    validateUpdateRequest: async pipelineData => {
        validate('update', pipelineData.payload, UpdateRequestSchema);
        return pipelineData;
    }
};
