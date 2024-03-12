const { body, param } = require('express-validator');
const { validate } = require('./validator');
const onlineClassServices = require('../../services/onlineClass');

const addValidate = [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('community').notEmpty(),
    body('typeId').notEmpty(),
    body('categoryId').notEmpty(),
    body('startDate').notEmpty(),
    body('price').notEmpty(),
    validate
];

const idValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    validate
]

module.exports = {
    addValidate,
    idValidate
};
