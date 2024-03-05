const express = require('express');
const router = express.Router();
const { addUser, getUsers, updateUser } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const validate = require('../middlewares/validation');
const upload = require('../config/multer');

router
    .get('/', authToken, cache.get, getUsers, cache.set)
    .post('/', upload.single('image'), validate, cache.clear, addUser)
    .patch('/:username', upload.single('image'), authToken, validate, cache.clear, updateUser);

module.exports = router;
