const express = require('express');
const router = express.Router();

const authsRoute = require('./auth');
const usersRoute = require('./user');
const scholarshipsRoute = require('./scholarship');

router.use('/auths', authsRoute);
router.use('/users', usersRoute);
router.use('/scholarships', scholarshipsRoute);

module.exports = router;
