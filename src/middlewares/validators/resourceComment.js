const { body, param } = require('express-validator');
const { validate } = require('./validator');
const onlineClassServices = require('../../services/onlineClass');
const classResourceServices = require('../../services/classResource');
const resourceCommentServices = require('../../services/resourceComment');

const getValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    param('resourceId').custom(async (value, { req }) => {
        const classResource = await classResourceServices.find(req.params.classId, value);
        if (!classResource) {
            throw new Error('Resource not found');
        }
    }),
    validate
];

const addValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    param('resourceId').custom(async (value, { req }) => {
        const classResource = await classResourceServices.find(req.params.classId, value);
        if (!classResource) {
            throw new Error('Resource not found');
        }
    }),
    body('comment').notEmpty(),
    validate
];

const patchValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    param('resourceId').custom(async (value, { req }) => {
        const classResource = await classResourceServices.find(req.params.classId, value);
        if (!classResource) {
            throw new Error('Resource not found');
        }
    }),
    param('id').custom(async (value, { req }) => {
        const resourceComment = await resourceCommentServices.find(req.params.resourceId, value);
        if (!resourceComment) {
            throw new Error('Comment not found');
        }
    }),
    body('comment').customSanitizer(value => value ? value : undefined),
    validate
]

const idValidate = [
    param('classId').custom(async value => {
        const onlineClass = await onlineClassServices.find(value);
        if (!onlineClass) {
            throw new Error('Class not found');
        }
    }),
    param('resourceId').custom(async (value, { req }) => {
        const classResource = await classResourceServices.find(req.params.classId, value);
        if (!classResource) {
            throw new Error('Resource not found');
        }
    }),
    param('id').custom(async (value, { req }) => {
        const resourceComment = await resourceCommentServices.find(req.params.resourceId, value);
        if (!resourceComment) {
            throw new Error('Comment not found');
        }
    }),
    validate
];

module.exports = {
    getValidate,
    idValidate,
    patchValidate,
    addValidate
};
