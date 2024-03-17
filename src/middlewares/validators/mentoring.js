const { body, param } = require('express-validator');
const { validate } = require('./validator');
const mentorServices = require('../../services/mentor');

const addValidate = [
    body('startDate').notEmpty(),
    body('endDate').notEmpty(),
    body('mentorId').custom(async value => {
        const mentor = await mentorServices.find(value);
        if (!mentor) {
            throw new Error('Mentor not found');
        }
    }),
    validate
];

const patchValidate = [
    body('resource').customSanitizer(value => value ? value : undefined),
    body('startDate').customSanitizer(value => value ? value : undefined),
    body('endDate').customSanitizer(value => value ? value : undefined),
    body('rating').customSanitizer(value => value ? value : undefined),
    body('feedback').customSanitizer(value => value ? value : undefined),
]

module.exports = {
    addValidate,
    patchValidate
};
