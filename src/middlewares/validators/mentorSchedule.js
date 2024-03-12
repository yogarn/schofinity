const { body, param } = require('express-validator');
const { validate } = require('./validator');
const mentorServices = require('../../services/mentor');

const addValidate = [
    body('day').notEmpty(),
    body('startTime').notEmpty(),
    body('endTime').notEmpty(),
    validate
];

module.exports = {
    addValidate
};
