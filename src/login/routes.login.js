// TODO: make this file functional

const Router = require('@koa/router');
const crypto = require('crypto');
const axios = require('axios');
const { createNewUser } = require('../users/model.users');
const { getUserByGithubId, saveUser } = require('../users/data-access.users');
const HttpStatus = require('http-status-codes');
const generateToken = require('../token');

const {
    GITHUB_AUTH_URL,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_REDIRECT_URI,
    GITHUB_TOKEN_URL,
    GITHUB_API_USER_URL
} = require('../config');

const router = new Router();

const states = {};

router.get('/login', async ctx => {
    let id = crypto.randomBytes(32).toString('hex');

    let state = crypto.randomBytes(32).toString('hex');

    // Set the login session ID
    ctx.cookies.set('authsid', id);

    // Store the state to check later
    states[id] = state;

    let url = `${GITHUB_AUTH_URL}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&state=${state}`;

    ctx.redirect(url);
});

router.get('/login/negotiate', async ctx => {
    // Get the code and state
    const { code, state } = ctx.request.query;

    // Verify the state
    let id = ctx.cookies.get('authsid');

    if (states[id] !== state) {
        console.log('INVALID STATE');
        ctx.redirect('/');
    }

    // We're good, clear the auth session cookie
    ctx.cookies.set('authsid', '', { expires: new Date() });

    // Make a request for an access token
    let url =
        `${GITHUB_TOKEN_URL}` +
        `?client_id=${GITHUB_CLIENT_ID}` +
        `&client_secret=${GITHUB_CLIENT_SECRET}` +
        `&code=${code}` +
        `&redirect_uri=${GITHUB_REDIRECT_URI}` +
        `&state=${state}`;
    let response = await axios({
        method: 'POST',
        url,
        headers: {
            accept: 'application/json'
        }
    });

    let token = response.data.access_token;

    // Get user information
    response = await axios({
        method: 'GET',
        url: GITHUB_API_USER_URL,
        headers: {
            authorization: `token ${token}`
        }
    });

    // We have the ID
    let githubId = response.data.id;

    try {
        var { user } = await getUserByGithubId({ params: { id: githubId } });
    } catch (e) {
        // Check if it is a resource not found error. If it is, then we need to create a new user
        if (e.status === HttpStatus.NOT_FOUND) {
            // Create the new user
            let name = response.data.name;
            let parts = name.split(' ');
            let firstName = parts[0];
            let lastName = parts.length > 1 ? parts[1] : null;
            let email = response.data.email;
            let username = response.data.login;

            var { user } = await createNewUser({ body: { firstName, lastName, username, email, githubId } });

            await saveUser({ user });
        }

        // It's not a resource not found error. Inform the client making the request
        ctx.throw(e.message);
    }

    // Everything worked out, we have a user. Generate a token for them and return it to the client
    token = await generateToken(user.id);

    ctx.status = HttpStatus.OK;
    ctx.body = { token, user };
});

module.exports = router.routes();
