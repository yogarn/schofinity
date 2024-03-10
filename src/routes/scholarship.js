const express = require('express');
const router = express.Router();
const { addScholarship, getScholarships, updateScholarship } = require('../controllers/scholarship');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkRoleId, checkScholarshipOwnership } = require('../middlewares/authorize');

router
    .get('/', cache.get, getScholarships, cache.set)
    .post('/', upload.single('image'), authToken, cache.clear, addScholarship)
    .patch('/:id', upload.single('image'), authToken, checkScholarshipOwnership, cache.clear, updateScholarship);

module.exports = router;
