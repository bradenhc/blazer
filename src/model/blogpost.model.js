const uuid = require('uuid/v4');
const Joi = require('@hapi/joi');

const Schema = {
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
};

/**
 * @typedef {object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} content
 * @property {string[]} tags
 * @property {string} authorId
 * @property {boolean} isPublished
 * @property {Date} publishedOn
 * @property {Date} createdOn
 * @property {Date} updatedOn
 */

module.exports = {
    /**
     * @returns {BlogPost}
     */
    create: (title, summary, content, tags, authorId, isPublished) => ({
        id: uuid(),
        title,
        summary,
        content,
        tags,
        authorId,
        isPublished,
        publishedOn: null,
        createdOn: new Date(),
        updatedOn: null
    }),

    Schema
};
