const { body, param } = require('express-validator');
const { validate } = require('./validator');
const scholarshipServices = require('../../services/scholarship');
const userServices = require('../../services/user');

const getIdValidate = [
    param('username').custom(async value => {
        const user = await userServices.find(value);
        if (!user) {
            throw new Error('User not found');
        }
    }),
    validate
];

const addValidate = [
    body('scholarshipId').custom(async value => {
        const scholarship = await scholarshipServices.find(value);
        if (!scholarship) {
            throw new Error('Class not found');
        }
    }),
    validate
];

module.exports = {
    addValidate,
    getIdValidate
};
