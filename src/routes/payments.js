const express = require('express');
const router = express.Router();
const { getPayments, getPaymentsById } = require('../controllers/onlineClass');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { ClassPayment } = require('../models/index');
const filter = require('../middlewares/filter');

router
    .get('/:id', authToken, cache.get, getPaymentsById, cache.set)
    .get('/', authToken, cache.get, filter(ClassPayment), getPayments, cache.set)

module.exports = router;
