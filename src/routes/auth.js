const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authUser, activateUser, resetUserPassword, sendOTP } = require('../controllers/auth');
const { expressValidate } = require('../middlewares/validation');

router
    .get('/', [
        body('username').notEmpty(),
        body('password').notEmpty(),
    ], expressValidate, authUser)
    .get('/generate-otp', sendOTP)
    .post('/activate', activateUser)
    .post('/reset-password', resetUserPassword);

module.exports = router;
