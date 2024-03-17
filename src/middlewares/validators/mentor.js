const { body, param } = require('express-validator');
const { validate } = require('./validator');
const mentorServices = require('../../services/mentor');

const idValidate = [
    param('id').custom(async value => {
        const mentor = await mentorServices.find(value);
        if (!mentor) {
            throw new Error('Mentor not found');
        }
    }),
    validate
];

const addValidate = [
    body('programs').notEmpty(),
    body('mentoringInterval').notEmpty(),
    body('breakTime').notEmpty(),
    body('salaryRate').notEmpty(),
    validate
];

const patchValidate = [
    body('programs').customSanitizer(value => value ? value : undefined),
    body('mentoringInterval').customSanitizer(value => value ? value : undefined),
    body('breakTime').customSanitizer(value => value ? value : undefined),
    body('salaryRate').customSanitizer(value => value ? value : undefined),
]

module.exports = {
    idValidate,
    patchValidate,
    addValidate
};
