const validator = require('validator');
const { sendError } = require('../../services/responseHandler');
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sendError(res, "ExpressValidationError", errors.errors);
    } else {
        next();
    }
};

module.exports = {
    validate
};
