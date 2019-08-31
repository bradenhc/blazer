const asyncPipe = require('../async-pipe');
const transform = require('./request.users');
const authorize = require('../authorize');
const { validateCreateRequest, validateUpdateRequest } = require('./validation.users');
const { createNewUser, updateExistingUser } = require('./model.users');
const { saveUser, getUser } = require('./data-access.users');
const { prepareUserResponse } = require('./response.users');
const HttpStatus = require('http-status-codes');

module.exports = {
    handleCreateNewUser: dbConn =>
        asyncPipe(
            transform,
            validateCreateRequest,
            createNewUser,
            saveUser(dbConn),
            prepareUserResponse(HttpStatus.CREATED)
        ),

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
