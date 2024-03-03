const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/auth');

router
    .get('/', authUser)

module.exports = router;
