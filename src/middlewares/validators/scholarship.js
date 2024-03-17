const { body, param, check } = require('express-validator');
const { validate } = require('./validator');
const scholarshipServices = require('../../services/scholarship');

const addValidate = [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('company').notEmpty(),
    body('benefit').notEmpty(),
    body('requirement').notEmpty(),
    body('startDate').notEmpty(),
    body('endDate').notEmpty(),
    body('image').customSanitizer(value => value ? value : undefined),
    body('categories')
        .isArray({ min: 1 }).withMessage('categories must be an array with at least one element')
        .custom((categories) => categories.every(category => category.categoryId))
        .withMessage('Each category object must have a categoryId'),
    body('locations')
        .isArray({ min: 1 }).withMessage('locations must be an array with at least one element')
        .custom((locations) => locations.every(category => category.locationId))
        .withMessage('Each category object must have a locationId'),
    body('educations')
        .isArray({ min: 1 }).withMessage('educations must be an array with at least one element')
        .custom((educations) => educations.every(education => education.educationLevelId && education.minSemester && education.maxSemester))
        .withMessage('Each education object must have a educationLevelId, minSemester, and maxSemester'),
    body('typeId').notEmpty(),
    body('link').notEmpty(),
    validate
];

const editValidate = [
    body('name').customSanitizer(value => value ? value : undefined),
    body('description').customSanitizer(value => value ? value : undefined),
    body('company').customSanitizer(value => value ? value : undefined),
    body('image').customSanitizer(value => value ? value : undefined),
    body('benefit').customSanitizer(value => value ? value : undefined),
    body('requirement').customSanitizer(value => value ? value : undefined),
    body('link').customSanitizer(value => value ? value : undefined),
    body('startDate').customSanitizer(value => value ? value : undefined),
    body('endDate').customSanitizer(value => value ? value : undefined),
    body('typeId').customSanitizer(value => value ? value : undefined),
    body('categories')
        .optional()
        .isArray({ min: 1 }).withMessage('categories must be an array with at least one element')
        .custom((categories) => categories.every(category => category.categoryId))
        .withMessage('Each category object must have a categoryId'),
    body('locations')
        .optional()
        .isArray({ min: 1 }).withMessage('locations must be an array with at least one element')
        .custom((locations) => locations.every(category => category.locationId))
        .withMessage('Each category object must have a locationId'),
    body('educations')
        .optional()
        .isArray({ min: 1 }).withMessage('educations must be an array with at least one element')
        .custom((educations) => educations.every(education => education.educationLevelId && education.minSemester && education.maxSemester))
        .withMessage('Each education object must have a educationLevelId, minSemester, and maxSemester'),
    validate
];

const idValidate = [
    param('id').custom(async value => {
        const onlineClass = await scholarshipServices.find(value);
        if (!onlineClass) {
            throw new Error('Scholarship not found');
        }
    }),
    validate
]

module.exports = {
    addValidate,
    editValidate,
    idValidate
};
