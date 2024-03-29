const express = require('express');
const router = express.Router();
const { addScholarship, getAllScholarships, getScholarship, updateScholarship, deleteScholarship, acceptScholarship } = require('../controllers/scholarship');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const upload = require('../config/multer');
const { checkScholarshipOwnership, checkRoleId } = require('../middlewares/authorize');
const { addValidate, editValidate, idValidate } = require('../middlewares/validators/scholarship');

router
    .post('/:id/accept', authToken, checkRoleId([3]), idValidate, acceptScholarship, cache.clear)
    .get('/:id', cache.get, getScholarship, cache.set)
    .patch('/:id', upload.single('image'), authToken, checkScholarshipOwnership, editValidate, updateScholarship, cache.clear)
    .delete('/:id', upload.single('image'), authToken, checkScholarshipOwnership, idValidate, deleteScholarship, cache.clear)
    .get('/', cache.get, getAllScholarships, cache.set)
    .post('/', upload.single('image'), authToken, addValidate, addScholarship, cache.clear);

module.exports = router;
