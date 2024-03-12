const { body, param } = require('express-validator');
const { validate } = require('./validator');
const mentoringServices = require('../../services/mentoring');

const idValidate = [
    param('id').custom(async value => {
        const mentoring = await mentoringServices.find(value);
        if (!mentoring) {
            throw new Error('Mentor not found');
        }
    }),
    validate
];

module.exports = {
    idValidate
};
