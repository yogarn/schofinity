const express = require('express');
const router = express.Router();
const { addUser, getUsers, updateUser } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');

router
    .get('/', authToken, cache.get, getUsers, cache.set)
    .post('/', addUser)
    .patch('/:username', authToken, updateUser);

module.exports = router;
