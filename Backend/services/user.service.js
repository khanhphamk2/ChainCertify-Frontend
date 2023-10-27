const config = require('../config/config');
const httpStatus = require('http-status');

const showUser = async () =>{
    try {
        return config.port;
    } catch (error) {
        console.error('Lỗi khi gọi hàm showUser:', error);
    }
}

module.exports = {
    showUser,
};