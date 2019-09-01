module.exports = pipe => async ctx => {
    const { status, body } = await pipe(ctx);
    ctx.status = status;
    ctx.body = body;
};
