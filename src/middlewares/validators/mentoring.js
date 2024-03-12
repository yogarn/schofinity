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

module.exports = {
    addValidate
};
