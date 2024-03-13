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
    .post('/:id/accept', authToken, checkRoleId([3]), idValidate, acceptMentor, cache.clear)
    .post('/', authToken, addValidate, addMentor, cache.clear)
    .patch('/', authToken, checkRoleId([2]), updateMentor, cache.clear)
    .delete('/:id', authToken, checkRoleId([3]), idValidate, deleteMentor, cache.clear);

module.exports = router;
