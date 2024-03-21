const express = require('express');
const router = express.Router();
const { addMentor, getAllMentors, getMentorById, acceptMentor, updateMentor, deleteMentor } = require('../controllers/mentor');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkRoleId } = require('../middlewares/authorize');
const { idValidate, addValidate, patchValidate } = require('../middlewares/validators/mentor');
const { Mentor } = require('../models/index');
const filter = require('../middlewares/filter');

router
    .post('/:id/accept', authToken, checkRoleId([3]), idValidate, acceptMentor, cache.clear)
    .get('/:id', authToken, cache.get, getMentorById, cache.set)
    .delete('/:id', authToken, checkRoleId([3]), idValidate, deleteMentor, cache.clear)
    .post('/', authToken, addValidate, addMentor, cache.clear)
    .patch('/', authToken, checkRoleId([2]), patchValidate, updateMentor, cache.clear)
    .get('/', authToken, cache.get, filter(Mentor), getAllMentors, cache.set);

module.exports = router;
