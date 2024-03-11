const express = require('express');
const router = express.Router({ mergeParams: true });
const { addClassResource, getClassResource, updateClassResource } = require('../controllers/classResource');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId } = require('../middlewares/authorize');

router
    .get('/', cache.get, getClassResource, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), cache.clear, addClassResource)
    .patch('/:id', upload.single('image'), authToken, checkRoleId([2]), cache.clear, updateClassResource);

module.exports = router;
