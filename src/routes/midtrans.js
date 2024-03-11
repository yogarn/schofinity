const express = require('express');
const router = express.Router();
const resolvePayments = require('../controllers/midtrans');
const cache = require('../middlewares/cache');

router
    .post('/', cache.clear, resolvePayments)

module.exports = router;
