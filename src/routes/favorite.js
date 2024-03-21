const express = require('express');
const router = express.Router();
const { addFavorite, getAllFavorites, getFavorite, deleteFavorite } = require('../controllers/favorite');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { addValidate } = require('../middlewares/validators/favorite');
const { checkFavoriteOwnership } = require('../middlewares/authorize');
const { Favorite } = require('../models/index');
const filter = require('../middlewares/filter');

router
    .get('/:id', authToken, cache.get, getFavorite, cache.set)
    .delete('/:id', authToken, checkFavoriteOwnership, deleteFavorite, cache.clear)
    .get('/', authToken, cache.get, filter(Favorite), getAllFavorites, cache.set)
    .post('/', authToken, addValidate, addFavorite, cache.clear);

module.exports = router;
