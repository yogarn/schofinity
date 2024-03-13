const express = require('express');
const router = express.Router();
const { addFeedback, getAllFeedback, getFeedback } = require('../controllers/feedback');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { addValidate } = require('../middlewares/validators/feedback');
const { checkRoleId } = require('../middlewares/authorize');

router
    .get('/', authToken, checkRoleId([3]), cache.get, getAllFeedback, cache.set)
    .get('/:id', authToken, checkRoleId([3]), cache.get, getFeedback, cache.set)
    .post('/', authToken, addValidate, cache.clear, addFeedback);

module.exports = router;
