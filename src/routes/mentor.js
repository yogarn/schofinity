const express = require('express');
const router = express.Router();
const { addMentor, getAllMentors, getMentorById, acceptMentor, updateMentor } = require('../controllers/mentor');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkRoleId } = require('../middlewares/authorize');

router
    .get('/', authToken, cache.get, getAllMentors, cache.set)
    .get('/:id', authToken, cache.get, getMentorById, cache.set)
    .post('/', authToken, cache.clear, addMentor)
    .put('/accept/:username', authToken, checkRoleId([3]), cache.clear, acceptMentor)
    .patch('/', authToken, checkRoleId([2]), cache.clear, updateMentor);

module.exports = router;
