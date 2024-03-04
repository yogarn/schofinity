const express = require('express');
const router = express.Router();
const { addUser, getUsers, updateUser } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const validate = require('../middlewares/validation');

router
    .get('/', authToken, cache.get, getUsers, cache.set)
    .post('/', validate, cache.clear, addUser)
    .patch('/:username', authToken, validate, cache.clear, updateUser);

module.exports = router;
