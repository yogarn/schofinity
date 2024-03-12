const express = require('express');
const router = express.Router();
const { addUser, getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId } = require('../middlewares/authorize');
const { addValidate, idValidate } = require('../middlewares/validators/user');

router
    .get('/', authToken, checkRoleId([3]), cache.get, getAllUsers, cache.set)
    .get('/:id', authToken, cache.get, getUser, cache.set)
    .post('/', upload.single('image'), addValidate, cache.clear, addUser)
    .patch('/', upload.single('image'), authToken, cache.clear, updateUser)
    .delete('/:id', upload.single('image'), authToken, checkRoleId([3]), idValidate, cache.clear, deleteUser)

module.exports = router;
