module.exports = (...fns) => x => fns.reduce(async (y, f) => f(await y), x);
