const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const showUser = catchAsync(async (req, res) => {
    const user = await userService.showUser();
    res.status(httpStatus.OK).send(user);
});

module.exports = {
    showUser,
};