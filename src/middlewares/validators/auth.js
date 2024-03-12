const { body } = require('express-validator');
const { validate } = require('./validator');

const authValidate = [
    body('username').notEmpty(),
    body('password').notEmpty(),
    validate
];

const generateOTPValidate = [
    body('username').notEmpty(),
    validate
];

const resetPasswordValidate = [
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('otp').notEmpty(),
    validate
];

const activateValidate = [
    body('username').notEmpty(),
    body('otp').notEmpty(),
    validate
];

module.exports = {
    authValidate,
    generateOTPValidate,
    resetPasswordValidate,
    activateValidate
};
