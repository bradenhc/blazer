module.exports = async ctx => ({
    params: {
        ...ctx.params
    },
    headers: {
        ...ctx.request.headers
    },
    body: {
        ...ctx.request.body
    },
    user: null,
    blogPost: null
});
