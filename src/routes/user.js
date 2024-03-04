const express = require('express');
const router = express.Router();
const { addUser, getUsers, updateUser } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');

router
    .get('/', authToken, cache.get, getUsers, cache.set)
    .post('/', cache.clear, addUser)
    .patch('/:username', authToken, cache.clear, updateUser);

module.exports = router;
