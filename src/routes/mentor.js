const express = require('express');
const router = express.Router();
const { addMentor, getAllMentors, acceptMentor, updateMentor } = require('../controllers/mentor');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkRoleId } = require('../middlewares/authorize');

router
    .get('/', authToken, cache.get, getAllMentors, cache.set)
    .post('/', authToken, cache.clear, addMentor)
    .put('/accept/:username', authToken, cache.clear, acceptMentor)
    .patch('/', authToken, cache.clear, updateMentor);

module.exports = router;
