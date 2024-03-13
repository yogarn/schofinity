const { body, param } = require('express-validator');
const { validate } = require('./validator');

const addValidate = [
    body('title').notEmpty(),
    body('body').notEmpty(),
    validate
];

module.exports = {
    addValidate,
};
