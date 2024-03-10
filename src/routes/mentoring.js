const express = require('express');
const router = express.Router();
const { addMentoring, getAllMentorings, updateMentoring } = require('../controllers/mentoring');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkRoleId } = require('../middlewares/authorize');

router
    .get('/', authToken, cache.get, getAllMentorings, cache.set)
    .post('/', authToken, cache.clear, addMentoring)
    .patch('/:id', authToken, cache.clear, updateMentoring);

module.exports = router;
