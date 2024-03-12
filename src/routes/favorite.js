const express = require('express');
const router = express.Router();
const { addFavorite, getFavorite, getFavorites } = require('../controllers/favorite');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { addValidate } = require('../middlewares/validators/favorite');
const { checkRoleId } = require('../middlewares/authorize');

router
    .get('/', authToken, checkRoleId([3]), cache.get, getFavorites, cache.set)
    .get('/:id', authToken, cache.get, getFavorite, cache.set)
    .post('/', authToken, addValidate, cache.clear, addFavorite);

module.exports = router;
