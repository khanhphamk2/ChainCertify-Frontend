const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const showUser = catchAsync(async (_req, res) => {
    const result = await userService.showUser();
    res.status(httpStatus.OK).send({ result });
});

module.exports = {
    showUser,
};