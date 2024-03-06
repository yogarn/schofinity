const express = require('express');
const router = express.Router();

const authsRoute = require('./auth');
const usersRoute = require('./user');
const scholarshipsRoute = require('./scholarship');
const favoritesRoute = require('./favorite');

router.use('/auths', authsRoute);
router.use('/users', usersRoute);
router.use('/scholarships', scholarshipsRoute);
router.use('/favorites', favoritesRoute);

module.exports = router;
