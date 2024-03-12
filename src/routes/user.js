const express = require('express');
const router = express.Router();
const { addUser, getUser, getAllUsers, updateUser } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId } = require('../middlewares/authorize');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validators/validator');

router
    .get('/', authToken, checkRoleId([3]), cache.get, getAllUsers, cache.set)
    .get('/:username', authToken, cache.get, getUser, cache.set)
    .post('/', upload.single('image'), [
        body('username').notEmpty(),
        body('password').notEmpty(),
    ], validate, cache.clear, addUser)
    .patch('/', upload.single('image'), authToken, cache.clear, updateUser)
    .patch('/:username', upload.single('image'), authToken, checkRoleId([3]), cache.clear, updateUser);

module.exports = router;
