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
    body('mentoringInterval').notEmpty(),
    body('breakTime').notEmpty(),
    body('salaryRate').notEmpty(),
    validate
];

module.exports = {
    idValidate,
    addValidate
};
