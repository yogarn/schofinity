const express = require('express');
const router = express.Router();
const { addFavorite, getFavorite, getFavorites } = require('../controllers/favorite');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');

router
    .get('/', authToken, cache.get, getFavorites, cache.set)
    .get('/:username', authToken, cache.get, getFavorite, cache.set)
    .post('/', authToken, cache.clear, addFavorite);

module.exports = router;
