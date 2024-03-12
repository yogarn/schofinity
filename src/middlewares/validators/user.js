const { body, param } = require('express-validator');
const { validate } = require('./validator');
const userServices = require('../../services/user');

const addValidate = [
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('email').notEmpty(),
    validate
];

const idValidate = [
    param('id').custom(async value => {
        const onlineClass = await userServices.findByUserId(value);
        if (!onlineClass) {
            throw new Error('User not found');
        }
    }),
    validate
]

module.exports = {
    addValidate,
    idValidate
};
