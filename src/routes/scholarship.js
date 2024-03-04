const express = require('express');
const router = express.Router();
const { addScholarship, getScholarships, updateScholarship } = require('../controllers/scholarship');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');

router
    .get('/', authToken, cache.get, getScholarships, cache.set)
    .post('/', authToken, cache.clear, addScholarship)
    .patch('/:id', authToken, cache.clear, updateScholarship);

module.exports = router;
