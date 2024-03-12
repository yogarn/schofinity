const express = require('express');
const router = express.Router({ mergeParams: true });
const { addClassResource, getClassResource, getClassResourceById, updateClassResource } = require('../controllers/classResource');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId } = require('../middlewares/authorize');

const { getValidate, addValidate, updateValidate, getIdValidate } = require('../middlewares/validators/classResource');

router
    .get('/', getValidate, cache.get, getClassResource, cache.set)
    .get('/:id', getIdValidate, cache.get, getClassResourceById, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), addValidate, cache.clear, addClassResource)
    .patch('/:id', upload.single('image'), authToken, checkRoleId([2]), updateValidate, cache.clear, updateClassResource);

module.exports = router;
