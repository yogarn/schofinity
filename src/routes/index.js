const express = require('express');
const router = express.Router();

const usersRoute = require('./user');
const authRoute = require('./auth');

router.use('/users', usersRoute);
router.use('/auths', authRoute);

module.exports = router;
