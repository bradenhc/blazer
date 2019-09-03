/**
 * Calls the asynchronous function arguments in the order in which they are provided as arguments, passing the output
 * of a function as the input of the succeeding function.
 * 
 * @param {...function} fns The functions that make up the pipeline.
 * @returns {function} An asynchronous function that creates a pipeline creating a complete response workflow
 */
module.exports = (...fns) => x => fns.reduce(async (y, f) => f(await y), x);
