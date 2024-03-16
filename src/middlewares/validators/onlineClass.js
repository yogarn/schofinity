const { body, param } = require('express-validator');
const { validate } = require('./validator');
const onlineClassServices = require('../../services/onlineClass');

const addValidate = [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('community').notEmpty(),
    body('typeId').notEmpty(),
    body('subjects')
        .isArray({ min: 1 }).withMessage('subjects must be an array with at least one element')
        .custom((subjects) => subjects.every(subject => subject.subjectId))
        .withMessage('Each category object must have a subjectId'),
    body('startDate').notEmpty(),
    body('endDate').notEmpty(),
    body('price').notEmpty(),
    validate
];

const editValidate = [
    body('subjects')
        .optional()
        .isArray({ min: 1 }).withMessage('subjects must be an array with at least one element')
        .custom((subjects) => subjects.every(subject => subject.subjectId))
        .withMessage('Each category object must have a subjectId'),
    validate
]

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
    editValidate,
    idValidate
};
