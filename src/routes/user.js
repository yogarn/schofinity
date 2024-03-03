const express = require('express');
const router = express.Router();
const { addUser, getUsers } = require('../controllers/user');
const authToken = require('../middlewares/authToken');

router
    .get('/', authToken, getUsers)
    .post('/', addUser)

module.exports = router;
