const Joi = require('@hapi/joi');
const { Schema } = require('../../model/blogpost.model');
const { RequestValidationError } = require('../../error');

const CreateRequestSchema = Joi.object().keys({
    title: Schema.title.required(),
    summary: Schema.summary.optional(),
    content: Schema.content.required(),
    authorId: Schema.authorId.required(),
    tags: Schema.tags.optional(),
    isPublished: Schema.isPublished.optional()
});

const UpdateRequestSchema = Joi.object().keys({
    title: Schema.title.optional(),
    summary: Schema.summary.optional(),
    content: Schema.content.optional(),
    tags: Schema.tags.optional(),
    isPublished: Schema.isPublished.optional()
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
    validateCreateRequest: async function(ctx, next) {
        validate('create', ctx.request.body, CreateRequestSchema);
        await next();
    },

    validateUpdateRequest: async function(ctx, next) {
        validate('update', ctx.request.body, UpdateRequestSchema);
        await next();
    }
};
