const uuid = require('uuid/v4');
const Joi = require('@hapi/joi');

module.exports = {
    Schema: {
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
        githubId: Joi.number().integer(),
        email: Joi.string().email(),
        createdOn: Joi.date(),
        updatedOn: Joi.date()
    },

    createNewUser: async pipelineData =>
        Object.assign({}, pipelineData, {
            user: {
                id: uuid(),
                firstName: pipelineData.payload.firstName,
                lastName: pipelineData.payload.lastName,
                username: pipelineData.payload.username,
                email: pipelineData.payload.email,
                githubId: pipelineData.githubId,
                createdOn: new Date(),
                updatedOn: null
            }
        }),

    updateExistingUser: async pipelineData =>
        Object.assign({}, pipelineData, {
            user: {
                ...pipelineData.user,
                ...pipelineData.payload,
                updatedOn: new Date()
            }
        })
};
