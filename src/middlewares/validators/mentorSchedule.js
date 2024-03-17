const { body, param } = require('express-validator');
const { validate } = require('./validator');
const mentorServices = require('../../services/mentor');

const addValidate = [
    body('day').notEmpty(),
    body('startTime').notEmpty(),
    body('endTime').notEmpty(),
    validate
];

const patchValidate = [
    body('day').customSanitizer(value => value ? value : undefined),
    body('startTime').customSanitizer(value => value ? value : undefined),
    body('endTime').customSanitizer(value => value ? value : undefined),
]

module.exports = {
    addValidate,
    patchValidate
};
