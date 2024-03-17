const { body, param } = require('express-validator');
const { validate } = require('./validator');
const userServices = require('../../services/user');

const addValidate = [
    body('username').customSanitizer(value => value ? value : undefined),
    body('password').customSanitizer(value => value ? value : undefined),
    body('name').customSanitizer(value => value ? value : undefined),
    body('contact').customSanitizer(value => value ? value : undefined),
    body('description').customSanitizer(value => value ? value : undefined),
    body('birthDate').customSanitizer(value => value ? value : undefined),
    body('gender').customSanitizer(value => value ? value : undefined),
    body('address').customSanitizer(value => value ? value : undefined),
    body('email').customSanitizer(value => value ? value : undefined),
    body('image').customSanitizer(value => value ? value : undefined),
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('email').notEmpty(),
    validate
];

const patchValidate = [
    body('username').customSanitizer(value => value ? value : undefined),
    body('password').customSanitizer(value => value ? value : undefined),
    body('name').customSanitizer(value => value ? value : undefined),
    body('contact').customSanitizer(value => value ? value : undefined),
    body('description').customSanitizer(value => value ? value : undefined),
    body('birthDate').customSanitizer(value => value ? value : undefined),
    body('gender').customSanitizer(value => value ? value : undefined),
    body('address').customSanitizer(value => value ? value : undefined),
    body('email').customSanitizer(value => value ? value : undefined),
    body('image').customSanitizer(value => value ? value : undefined),
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
    patchValidate,
    idValidate
};
