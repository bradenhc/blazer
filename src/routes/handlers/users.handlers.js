const User = require('../../model/user.model');
const UsersRepository = require('../../data-access/users.repo');
const HttpStatus = require('http-status-codes');

module.exports = {
    handleCreateNewUser: async function(ctx) {
        let { firstName, lastName, username, email } = ctx.request.body;
        let user = User.create(firstName, lastName, username, email);
        let repo = new UsersRepository(ctx.dbconn);
        await repo.add(user);
        ctx.status = HttpStatus.CREATED;
        ctx.body = user;
    }
};
