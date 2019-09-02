module.exports = async ctx => ({
    tokenRaw: ctx.request.headers.authorization,
    token: null,
    payload: {
        ...ctx.request.body
    },
    blogPostId: ctx.params.id,
    blogPost: null,
    userId: null
});
