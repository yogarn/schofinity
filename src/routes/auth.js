const express = require('express');
const router = express.Router();
const { authUser, activateUser, resetUserPassword, sendOTP } = require('../controllers/auth');

router
    .get('/', authUser)
    .get('/generate-otp', sendOTP)
    .post('/activate', activateUser)
    .post('/reset-password', resetUserPassword);

module.exports = router;
