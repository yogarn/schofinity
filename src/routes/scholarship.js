const express = require('express');
const router = express.Router();
const { addScholarship, getScholarships, updateScholarship, deleteScholarship } = require('../controllers/scholarship');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkScholarshipOwnership } = require('../middlewares/authorize');
const { addValidate } = require('../middlewares/validators/scholarship');

router
    .get('/', cache.get, getScholarships, cache.set)
    .post('/', upload.single('image'), authToken, addValidate, addScholarship, cache.clear)
    .patch('/:id', upload.single('image'), authToken, checkScholarshipOwnership, updateScholarship, cache.clear)
    .delete('/:id', upload.single('image'), authToken, checkScholarshipOwnership, deleteScholarship, cache.clear);

module.exports = router;
