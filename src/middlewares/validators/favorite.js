const { body, param } = require('express-validator');
const { validate } = require('./validator');
const scholarshipServices = require('../../services/scholarship');
const userServices = require('../../services/user');

const addValidate = [
    body('scholarshipId').custom(async value => {
        const scholarship = await scholarshipServices.find(value);
        if (!scholarship) {
            throw new Error('Scholarship not found');
        }
    }),
    validate
];

module.exports = {
    addValidate,
};
