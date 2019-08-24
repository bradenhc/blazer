const User = require('../../model/user.model');
const UsersRepository = require('../../data-access/users.repo');
const HttpStatus = require('http-status-codes');
const { ResourceNotFoundError } = require('../../error');

module.exports = {
    handleCreateNewUser: async function(ctx) {
        let { firstName, lastName, username, email } = ctx.request.body;
        let user = User.create(firstName, lastName, username, email);
        let repo = new UsersRepository(ctx.dbconn);
        await repo.add(user);
        ctx.status = HttpStatus.CREATED;
        ctx.body = user;
    },

    handleGetUserById: async function(ctx) {
        let id = ctx.params.id;
        let repo = new UsersRepository(ctx.dbconn);
        let user = await repo.get(id);
        if (!user) {
            throw ResourceNotFoundError(`Could not find user with ID "${id}"`);
        }
        ctx.status = HttpStatus.OK;
        ctx.body = user;
    }
};
