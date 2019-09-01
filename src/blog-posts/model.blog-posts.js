const uuid = require('uuid/v4');
const Joi = require('@hapi/joi');

module.exports = {
    Schema: {
        id: Joi.string().uuid(),
        title: Joi.string()
            .regex(/([A-Za-z0-9\ \: \-]+)/)
            .max(128),
        summary: Joi.string().max(256),
        content: Joi.string(),
        tags: Joi.array().items(Joi.string().max(32)),
        authorId: Joi.string().uuid(),
        isPublished: Joi.bool(),
        publishedOn: Joi.date(),
        createdOn: Joi.date(),
        updatedOn: Joi.date()
    },

    createNewBlogPost: async pipelineData =>
        Object.assign({}, pipelineData, {
            blogPost: {
                id: uuid(),
                title: pipelineData.body.title,
                summary: pipelineData.body.summary,
                content: pipelineData.body.content,
                tags: pipelineData.body.tags || [],
                authorId: pipelineData.user.id,
                isPublished: pipelineData.body.isPublished || false,
                publishedOn: pipelineData.body.isPublished ? new Date() : null,
                createdOn: new Date(),
                updatedOn: null
            }
        }),

    updateExistingBlogPost: async pipelineData =>
        Object.assign({}, pipelineData, {
            blogPost: {
                ...pipelineData.blogPost,
                ...pipelineData.body,
                updatedOn: new Date()
            }
        })
};
