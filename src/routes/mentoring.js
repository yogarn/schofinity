const express = require('express');
const router = express.Router();
const { addMentoring, getAllMentorings, updateMentoring } = require('../controllers/mentoring');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkRoleId, checkMentoringOwnership } = require('../middlewares/authorize');
const { addValidate } = require('../middlewares/validators/mentoring');

router
    .get('/', authToken, cache.get, getAllMentorings, cache.set)
    .post('/', authToken, addValidate, cache.clear, addMentoring)
    .patch('/:id', authToken, checkMentoringOwnership, cache.clear, updateMentoring);

module.exports = router;
