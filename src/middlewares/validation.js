const validator = require('validator');
const { sendError } = require('../services/responseHandler');
const { validationResult } = require('express-validator');

const expressValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sendError(res, "ExpressValidationError", errors.errors);
    } else {
        next();
    }
};

function validate(req, res, next) {
    const { password, contact, email } = req.body;
    if (password && !validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        sendError(res, 'Invalid password');
    } else if (contact && !validator.isMobilePhone(contact, ['id-ID'])) {
        sendError(res, 'Invalid contact');
    } else if (email && !validator.isEmail(email)) {
        sendError(res, 'Invalid email');
    } else {
        next();
    }
}

module.exports = {
    expressValidate,
    validate
};