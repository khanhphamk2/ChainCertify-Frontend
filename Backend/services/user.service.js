const config = require('../config/config');

async function showUser() {
    try {
        const user = config.port;
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    showUser,
};