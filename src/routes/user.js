const express = require('express');
const router = express.Router();
const { addUser, getUser, getAllUsers, updateUser } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const validate = require('../middlewares/validation');
const upload = require('../config/multer');
const authorizeUser = require('../middlewares/authorize');

router
    .get('/', authToken, authorizeUser([3]), cache.get, getAllUsers, cache.set)
    .get('/:username', authToken, cache.get, getUser, cache.set)
    .post('/', upload.single('image'), validate, cache.clear, addUser)
    .patch('/', upload.single('image'), authToken, validate, cache.clear, updateUser)
    .patch('/:username', upload.single('image'), authToken, authorizeUser([3]), validate, cache.clear, updateUser);

module.exports = router;
