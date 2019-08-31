module.exports = async ctx => ({
    params: {
        id: ctx.params.id
    },
    headers: {
        authorization: ctx.request.headers.authoriztion
    },
    body: {
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password: ctx.request.body.password
    },
    user: null,
    blogPosts: null
});
