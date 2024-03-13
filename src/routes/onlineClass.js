const express = require('express');
const router = express.Router();
const { addOnlineClass, getOnlineClass, updateOnlineClass, buyOnlineClass, deleteOnlineClass, getPayments, getPaymentsById } = require('../controllers/onlineClass');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId, checkClassOwnership } = require('../middlewares/authorize');
const { addValidate, idValidate } = require('../middlewares/validators/onlineClass');

router
    .get('/', cache.get, getOnlineClass, cache.set)
    .get('/payments', cache.get, getPayments, cache.set)
    .get('/payments/:id', cache.get, getPaymentsById, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), addValidate, addOnlineClass, cache.clear)
    .post('/:classId/buy', authToken, idValidate, cache.clear, buyOnlineClass)
    .patch('/:classId', upload.single('image'), authToken, checkClassOwnership, updateOnlineClass, cache.clear)
    .delete('/:classId', upload.single('image'), authToken, checkClassOwnership, deleteOnlineClass, cache.clear);

module.exports = router;
