const express = require('express');
const router = express.Router();
const { addOnlineClass, getOnlineClass, updateOnlineClass, buyOnlineClass, deleteOnlineClass } = require('../controllers/onlineClass');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId, checkClassOwnership } = require('../middlewares/authorize');
const { addValidate, idValidate } = require('../middlewares/validators/onlineClass');

router
    .get('/', cache.get, getOnlineClass, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), addValidate, cache.clear, addOnlineClass)
    .post('/:classId/buy', authToken, idValidate, cache.clear, buyOnlineClass)
    .patch('/:classId', upload.single('image'), authToken, checkClassOwnership, cache.clear, updateOnlineClass)
    .delete('/:classId', upload.single('image'), authToken, checkClassOwnership, cache.clear, deleteOnlineClass);

module.exports = router;
