/**
 * Wraps an asynchronous function with error handling.
 * @param {Function} fn - An asynchronous function to be wrapped.
 * @returns {Function} - A new function that handles errors and passes them to the 'next' function.
 */
const catchAsync = (fn) => (req, res, next) => {
    // Execute the provided asynchronous function 'fn' and return the Promise.
    Promise.resolve(fn(req, res, next))
        .catch((err) => next(err)); // If there's an error, pass it to the 'next' function.
};

module.exports = catchAsync;
