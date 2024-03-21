const express = require('express');
const router = express.Router({ mergeParams: true });
const { addComment, getAllComment, getComment, updateComment, deleteComment } = require('../controllers/resourceComment');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { getValidate, idValidate, addValidate, patchValidate } = require('../middlewares/validators/resourceComment');
const { ResourceComment } = require('../models/index');
const filter = require('../middlewares/filter');
const { checkCommentOwnership, checkClassPayment } = require('../middlewares/authorize');

router
    .get('/:id', authToken, cache.get, getValidate, checkClassPayment, getComment, cache.set)
    .patch('/:id', authToken, patchValidate, checkClassPayment, checkCommentOwnership, updateComment, cache.clear)
    .delete('/:id', authToken, idValidate, checkClassPayment, checkCommentOwnership, deleteComment, cache.clear)
    .get('/', authToken, cache.get, getValidate, filter(ResourceComment), checkClassPayment, getAllComment, cache.set)
    .post('/', authToken, addValidate, checkClassPayment, addComment, cache.clear);

module.exports = router;
