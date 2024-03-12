const express = require('express');
const router = express.Router({ mergeParams: true });
const { addClassResource, getClassResource, getClassResourceById, updateClassResource, deleteClassResource } = require('../controllers/classResource');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId, checkClassOwnership, checkClassPayment } = require('../middlewares/authorize');

const { getValidate, addValidate, updateValidate, getIdValidate, deleteValidate } = require('../middlewares/validators/classResource');

router
    .get('/', authToken, checkClassPayment, getValidate, cache.get, getClassResource, cache.set)
    .get('/:id', authToken, checkClassPayment, getIdValidate, cache.get, getClassResourceById, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), addValidate, cache.clear, addClassResource)
    .patch('/:id', upload.single('image'), authToken, checkClassOwnership, updateValidate, cache.clear, updateClassResource)
    .delete('/:id', authToken, checkClassOwnership, deleteValidate, cache.clear, deleteClassResource);

module.exports = router;
