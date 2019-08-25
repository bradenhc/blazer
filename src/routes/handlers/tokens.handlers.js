const UsersRepository = require('../../data-access/users.repo');
const AuthInfoRepository = require('../../data-access/authinfo.repo');
const { ResourceNotFoundError } = require('../../error');
const HttpStatus = require('http-status-codes');

module.exports = {
    handleTokenRequest: async function(ctx) {
        let { username, password } = ctx.request.body;

        // Get the user
        let usersRepo = new UsersRepository(ctx.dbconn);
        let [user] = await usersRepo.query({ username });
        if (!user) {
            throw ResourceNotFoundError(`Failed to find user with username ${username}`);
        }

        // Get the authorization info for the user
        let authRepo = new AuthInfoRepository(ctx.dbconn);
        let info = await authRepo.get(user.id);

        // Authenticate the user
        let token = info.authenticate(password);

        ctx.status = HttpStatus.OK;
        ctx.body = { token };
    }
};
