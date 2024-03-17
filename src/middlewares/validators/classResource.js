const { body, param } = require('express-validator');
const { validate } = require('./validator');
const onlineClassServices = require('../../services/onlineClass');
const classResourceServices = require('../../services/classResource');

const getValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    validate
];

const getIdValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    param('id').custom(async (value, { req }) => {
        const classResource = await classResourceServices.find(req.params.classId, value);
        if (!classResource) {
            throw new Error('Resource not found');
        }
    }),
    validate
];

const addValidate = [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('image').customSanitizer(value => value ? value : undefined),
    body('resource').notEmpty(),
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    validate
];

const updateValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    param('id').custom(async (value, { req }) => {
        const classResource = await classResourceServices.find(req.params.classId, value);
        if (!classResource) {
            throw new Error('Resource not found');
        }
    }),
    body('name').customSanitizer(value => value ? value : undefined),
    body('description').customSanitizer(value => value ? value : undefined),
    body('image').customSanitizer(value => value ? value : undefined),
    body('resource').customSanitizer(value => value ? value : undefined),
    validate
];

const deleteValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    param('id').custom(async (value, { req }) => {
        const classResource = await classResourceServices.find(req.params.classId, value);
        if (!classResource) {
            throw new Error('Resource not found');
        }
    }),
    validate
];

module.exports = {
    getValidate,
    getIdValidate,
    addValidate,
    updateValidate,
    deleteValidate
};
