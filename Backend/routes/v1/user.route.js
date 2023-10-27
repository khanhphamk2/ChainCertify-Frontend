const multer = require('multer');
const express = require('express');
const upload = multer();

const router = express.Router();

const userController = require('../../controllers/user.controller');

router.route('/show').get(userController.showUser);

module.exports = router;