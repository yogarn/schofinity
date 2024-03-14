const express = require('express');
const router = express.Router();
const { authUser, activateUser, resetUserPassword, sendOTP } = require('../controllers/auth');

const { authValidate, activateValidate, generateOTPValidate, resetPasswordValidate } = require('../middlewares/validators/auth');

router
    .post('/', authValidate, authUser)
    .post('/generate-otp', generateOTPValidate, sendOTP)
    .post('/activate', activateValidate, activateUser)
    .post('/reset-password', resetPasswordValidate, resetUserPassword);

module.exports = router;
