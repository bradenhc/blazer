module.exports = async ctx => ({
    tokenRaw: ctx.request.headers.authorization,
    token: null,
    payload: {
        ...ctx.request.body
    },
    userId: ctx.params.id,
    user: null,
    blogPosts: []
});
