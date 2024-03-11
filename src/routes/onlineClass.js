const express = require('express');
const router = express.Router();
const { addOnlineClass, getOnlineClass, updateOnlineClass, buyOnlineClass } = require('../controllers/onlineClass');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId } = require('../middlewares/authorize');

router
    .get('/', cache.get, getOnlineClass, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), cache.clear, addOnlineClass)
    .post('/buy', authToken, cache.clear, buyOnlineClass)
    .patch('/:id', upload.single('image'), authToken, checkRoleId([2]), cache.clear, updateOnlineClass);

module.exports = router;
