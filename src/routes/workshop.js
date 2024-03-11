const express = require('express');
const router = express.Router();
const { addWorkshop, getWorkshops, updateWorkshop } = require('../controllers/workshop');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId } = require('../middlewares/authorize');

router
    .get('/', cache.get, getWorkshops, cache.set)
    .post('/', upload.single('image'), authToken, checkRoleId([2]), cache.clear, addWorkshop)
    .patch('/:id', upload.single('image'), authToken, checkRoleId([2]), cache.clear, updateWorkshop);

module.exports = router;
