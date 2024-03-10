const express = require('express');
const router = express.Router();
const { addSchedule, getAllSchedule, updateSchedule } = require('../controllers/mentorSchedule');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkRoleId, checkScheduleOwnership } = require('../middlewares/authorize');

router
    .get('/', authToken, checkRoleId([3]), cache.get, getAllSchedule, cache.set)
    .post('/', authToken, checkRoleId([2]), cache.clear, addSchedule)
    .patch('/:id', authToken, checkScheduleOwnership, cache.clear, updateSchedule);

module.exports = router;
