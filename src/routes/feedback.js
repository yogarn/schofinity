const express = require('express');
const router = express.Router();
const { addFeedback, getAllFeedback, getFeedback } = require('../controllers/feedback');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { addValidate } = require('../middlewares/validators/feedback');
const { checkRoleId } = require('../middlewares/authorize');
const { Feedback } = require('../models/index');
const filter = require('../middlewares/filter');

router
    .get('/:id', authToken, cache.get, getFeedback, cache.set)
    .get('/', authToken, cache.get, filter(Feedback), getAllFeedback, cache.set)
    .post('/', authToken, addValidate, addFeedback, cache.clear);

module.exports = router;
