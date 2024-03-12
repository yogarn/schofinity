const express = require('express');
const router = express.Router();
const { addMentor, getAllMentors, getMentorById, acceptMentor, updateMentor, deleteMentor } = require('../controllers/mentor');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkRoleId } = require('../middlewares/authorize');
const { idValidate, addValidate } = require('../middlewares/validators/mentor');

router
    .get('/', authToken, cache.get, getAllMentors, cache.set)
    .get('/:id', authToken, cache.get, getMentorById, cache.set)
    .post('/:id/accept', authToken, checkRoleId([3]), idValidate, cache.clear, acceptMentor)
    .post('/', authToken, addValidate, cache.clear, addMentor)
    .patch('/', authToken, checkRoleId([2]), cache.clear, updateMentor)
    .delete('/:id', authToken, checkRoleId([3]), idValidate, cache.clear, deleteMentor);

module.exports = router;
