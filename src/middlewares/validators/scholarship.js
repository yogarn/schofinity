const { body, param } = require('express-validator');
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
    body('educationId').notEmpty(),
    body('minSemester').notEmpty(),
    body('maxSemester').notEmpty(),
    body('typeId').notEmpty(),
    body('locationId').notEmpty(),
    body('categoryId').notEmpty(),
    body('link').notEmpty(),
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
    idValidate
};
