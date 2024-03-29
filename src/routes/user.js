const express = require('express');
const router = express.Router();
const { addUser, getUser, getAllUsers, updateUser, deleteUser, setAdmin } = require('../controllers/user');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId } = require('../middlewares/authorize');
const { addValidate, idValidate, patchValidate } = require('../middlewares/validators/user');
const { User } = require('../models/index');
const filter = require('../middlewares/filter');

router
    .post('/:id/admin', authToken, checkRoleId([3]), idValidate, setAdmin, cache.clear)
    .get('/:id', authToken, cache.get, getUser, cache.set)
    .delete('/:id', authToken, checkRoleId([3]), idValidate, deleteUser, cache.clear)
    .post('/', upload.single('image'), addValidate, addUser, cache.clear)
    .patch('/', upload.single('image'), authToken, patchValidate, updateUser, cache.clear)
    .get('/', authToken, cache.get, filter(User), getAllUsers, cache.set);

module.exports = router;
