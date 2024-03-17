const express = require('express');
const router = express.Router();
const { addMentoring, getAllMentorings, updateMentoring, getMentoringById } = require('../controllers/mentoring');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkMentoringOwnership } = require('../middlewares/authorize');
const { addValidate, patchValidate } = require('../middlewares/validators/mentoring');
const { Mentoring } = require('../models/index');
const filter = require('../middlewares/filter');

router
    .get('/', authToken, cache.get, filter(Mentoring), getAllMentorings, cache.set)
    .get('/:id', authToken, cache.get, getMentoringById, cache.set)
    .post('/', authToken, addValidate, addMentoring, cache.clear)
    .patch('/:id', authToken, checkMentoringOwnership, patchValidate, updateMentoring, cache.clear);

module.exports = router;
