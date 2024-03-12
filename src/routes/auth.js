const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authUser, activateUser, resetUserPassword, sendOTP } = require('../controllers/auth');

const { authValidate, activateValidate, generateOTPValidate, resetPasswordValidate } = require('../middlewares/validators/auth');

router
    .get('/', authValidate, authUser)
    .get('/generate-otp', generateOTPValidate, sendOTP)
    .post('/activate', activateValidate, activateUser)
    .post('/reset-password', resetPasswordValidate, resetUserPassword);

module.exports = router;
