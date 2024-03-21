const express = require('express');
const router = express.Router();
const { addOnlineClass, getAllOnlineClass, getOnlineClass, updateOnlineClass, buyOnlineClass, deleteOnlineClass } = require('../controllers/onlineClass');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId, checkClassOwnership } = require('../middlewares/authorize');
const { addValidate, idValidate, editValidate } = require('../middlewares/validators/onlineClass');
const { OnlineClass, ClassPayment } = require('../models/index');
const filter = require('../middlewares/filter');

router
    .post('/:classId/buy', authToken, idValidate, buyOnlineClass, cache.clear)
    .get('/:classId', cache.get, getOnlineClass, cache.set)
    .patch('/:classId', upload.single('image'), authToken, checkClassOwnership, editValidate, updateOnlineClass, cache.clear)
    .delete('/:classId', upload.single('image'), authToken, checkClassOwnership, deleteOnlineClass, cache.clear)
    .get('/', cache.get, getAllOnlineClass, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), addValidate, addOnlineClass, cache.clear);

module.exports = router;
