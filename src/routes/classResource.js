const express = require('express');
const router = express.Router({ mergeParams: true });
const { addClassResource, getClassResource, getClassResourceById, updateClassResource, deleteClassResource } = require('../controllers/classResource');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId, checkClassOwnership, checkClassPayment } = require('../middlewares/authorize');
const { getValidate, addValidate, updateValidate, getIdValidate, deleteValidate } = require('../middlewares/validators/classResource');
const { ClassResource } = require('../models/index');
const filter = require('../middlewares/filter');

router
    .get('/:id', authToken, checkClassPayment, getIdValidate, cache.get, getClassResourceById, cache.set)
    .patch('/:id', upload.single('image'), authToken, checkClassOwnership, updateValidate, updateClassResource, cache.clear)
    .delete('/:id', authToken, checkClassOwnership, deleteValidate, deleteClassResource, cache.clear)
    .get('/', authToken, checkClassPayment, getValidate, cache.get, filter(ClassResource), getClassResource, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), addValidate, addClassResource, cache.clear);

module.exports = router;
