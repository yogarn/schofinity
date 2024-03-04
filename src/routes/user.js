const express = require('express');
const router = express.Router();
const { addUser, getUsers } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');

router
    .get('/', authToken, cache.get, getUsers, cache.set)
    .post('/', addUser);

module.exports = router;
