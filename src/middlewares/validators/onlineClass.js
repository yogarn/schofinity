const { body, param } = require('express-validator');
const { validate } = require('./validator');
const onlineClassServices = require('../../services/onlineClass');

const addValidate = [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('image').customSanitizer(value => value ? value : undefined),
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
    body('name').customSanitizer(value => value ? value : undefined),
    body('description').customSanitizer(value => value ? value : undefined),
    body('image').customSanitizer(value => value ? value : undefined),
    body('community').customSanitizer(value => value ? value : undefined),
    body('startDate').customSanitizer(value => value ? value : undefined),
    body('endDate').customSanitizer(value => value ? value : undefined),
    body('price').customSanitizer(value => value ? value : undefined),
    body('typeId').customSanitizer(value => value ? value : undefined),
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
    body('rating').customSanitizer(value => value ? value : undefined),
    body('feedback').customSanitizer(value => value ? value : undefined),
    validate
]

module.exports = {
    addValidate,
    editValidate,
    idValidate
};
