const express = require('express');
const router = express.Router();
const resolvePayments = require('../controllers/midtrans');

router
    .post('/', resolvePayments)

module.exports = router;
