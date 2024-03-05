const validator = require('validator');
const sendResponse = require('./responseHandler');

function validate(req, res, next) {
    const { password, contact, email } = req.body;
    if (password && !validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        sendResponse(res, 400, 'invalid password');
    } else if (contact && !validator.isMobilePhone(contact, ['id-ID'])) { 
        sendResponse(res, 400, 'invalid contact');
    } else if (email && !validator.isEmail(email)) {
        sendResponse(res, 400, 'invalid email');
    } else {
        next();
    }
}

module.exports = validate;