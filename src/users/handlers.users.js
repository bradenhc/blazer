const asyncPipe = require('../async-pipe');
const transform = require('./request.users');
const authorize = require('../authorize');
const { validateUpdateRequest } = require('./validation.users');
const { updateExistingUser } = require('./model.users');
const { saveUser, getUser } = require('./data-access.users');
const { prepareUserResponse } = require('./response.users');
const HttpStatus = require('http-status-codes');

module.exports = {
    handleGetSingleUser: dbConn => asyncPipe(transform, getUser(dbConn), prepareUserResponse(HttpStatus.OK)),

    handleUpdateSingleUser: dbConn =>
        asyncPipe(
            transform,
            authorize('users:write'),
            validateUpdateRequest,
            getUser(dbConn),
            updateExistingUser,
            saveUser(dbConn),
            prepareUserResponse(HttpStatus.OK)
        )
};
