const express = require('express');
const router = express.Router();
const { addUser, getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId } = require('../middlewares/authorize');
const { addValidate, idValidate } = require('../middlewares/validators/user');

router
    .get('/', authToken, cache.get, getAllUsers, cache.set)
    .get('/:id', authToken, cache.get, getUser, cache.set)
    .post('/', upload.single('image'), addValidate, addUser, cache.clear)
    .patch('/', upload.single('image'), authToken, updateUser, cache.clear)
    .delete('/:id', upload.single('image'), authToken, checkRoleId([3]), idValidate, deleteUser, cache.clear)

module.exports = router;
