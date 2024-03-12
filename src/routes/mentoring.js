const express = require('express');
const router = express.Router();
const { addMentoring, getAllMentorings, updateMentoring, getMentoringById } = require('../controllers/mentoring');
const authToken = require('../middlewares/authToken');
const { checkMentoringOwnership } = require('../middlewares/authorize');
const { addValidate } = require('../middlewares/validators/mentoring');

router
    .get('/', authToken, getAllMentorings)
    .get('/:id', authToken, getMentoringById)
    .post('/', authToken, addValidate, addMentoring)
    .patch('/:id', authToken, checkMentoringOwnership, updateMentoring);

module.exports = router;
